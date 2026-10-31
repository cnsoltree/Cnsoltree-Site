import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { adminProblem } from './admin-auth.mjs';

const keyPattern = /^sk-[A-Za-z0-9_-]{20,400}$/;
const modelPattern = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,199}$/;
const empty = () => ({ apiKey: '', model: '' });

/** Server only. The store contains an authenticated ciphertext, never the API key. */
export function createAiSettings({ store, encryptionKey, fetchImpl = fetch }) {
  function masterKey() {
    const key = Buffer.from(encryptionKey || '', 'base64');
    if (key.length !== 32)
      throw adminProblem(503, 'AI 设置尚未配置服务端加密密钥，请联系维护人员。');
    return key;
  }
  function seal(value) {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', masterKey(), iv);
    cipher.setAAD(Buffer.from('soltree-ai-settings-v1'));
    const ciphertext = Buffer.concat([
      cipher.update(JSON.stringify(value), 'utf8'),
      cipher.final(),
    ]);
    return {
      iv: iv.toString('base64'),
      tag: cipher.getAuthTag().toString('base64'),
      ciphertext: ciphertext.toString('base64'),
    };
  }
  function unseal(box) {
    try {
      const decipher = createDecipheriv('aes-256-gcm', masterKey(), Buffer.from(box.iv, 'base64'));
      decipher.setAAD(Buffer.from('soltree-ai-settings-v1'));
      decipher.setAuthTag(Buffer.from(box.tag, 'base64'));
      const value = JSON.parse(
        Buffer.concat([
          decipher.update(Buffer.from(box.ciphertext, 'base64')),
          decipher.final(),
        ]).toString('utf8'),
      );
      if (
        !value ||
        typeof value.apiKey !== 'string' ||
        (value.apiKey && !keyPattern.test(value.apiKey)) ||
        typeof value.model !== 'string' ||
        (value.model && !modelPattern.test(value.model))
      )
        throw new Error();
      return value;
    } catch {
      throw adminProblem(503, '无法解密 AI 设置，请检查服务端加密密钥；原配置未被覆盖。');
    }
  }
  async function credentials() {
    const row = await store.load();
    return { revision: row?.revision || 0, ...(row ? unseal(row.payload) : empty()) };
  }
  const publicValue = ({ revision, apiKey, model }) => ({
    revision,
    configured: Boolean(apiKey),
    keyHint: apiKey ? `••••••••${apiKey.slice(-4)}` : '',
    model,
  });

  async function request(apiKey, path, body, timeout = 30_000) {
    let response;
    try {
      response = await fetchImpl(`https://api.openai.com/v1/${path}`, {
        method: body ? 'POST' : 'GET',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        ...(body ? { body: JSON.stringify(body) } : {}),
        signal: AbortSignal.timeout(timeout),
        redirect: 'error',
      });
    } catch {
      throw adminProblem(502, 'OpenAI 连接失败或超时，请稍后重试。');
    }
    if (!response.ok) {
      // Never reflect upstream messages: they can contain credential fragments.
      const messages = {
        400: '该模型不支持当前请求，请在设置中选择其他文字模型。',
        401: 'API Key 无效或已撤销，请检查后重新填写。',
        403: '当前 API 项目没有此模型或接口的访问权限。',
        404: '该模型不可用，请刷新模型列表后重新选择。',
        429: 'API 额度不足或请求受到限流，请检查 OpenAI 账单和限额。',
      };
      throw adminProblem(502, messages[response.status] || 'OpenAI 服务暂时不可用，请稍后重试。');
    }
    try {
      return await response.json();
    } catch {
      throw adminProblem(502, 'OpenAI 返回了无效数据，请稍后重试。');
    }
  }

  return {
    // Future translation/SEO handlers may use this after authenticating the admin.
    credentials,
    async respond(body) {
      const { apiKey, model } = await credentials();
      if (!apiKey || !model) throw adminProblem(422, '请先到设置中保存 API Key 和默认模型。');
      return request(apiKey, 'responses', { ...body, model, store: false }, 90_000);
    },
    async read() {
      return publicValue(await credentials());
    },
    async act(input) {
      if (
        !input ||
        typeof input !== 'object' ||
        Array.isArray(input) ||
        !['save', 'delete', 'models', 'test'].includes(input.action)
      )
        throw adminProblem(422, 'AI 设置操作无效。');
      if (
        Object.keys(input).some((key) => !['action', 'revision', 'apiKey', 'model'].includes(key))
      )
        throw adminProblem(422, 'AI 设置包含未知字段。');
      if (
        input.apiKey !== undefined &&
        (typeof input.apiKey !== 'string' ||
          (input.apiKey.trim() && !keyPattern.test(input.apiKey.trim())))
      )
        throw adminProblem(422, '请填写有效的 OpenAI API Key。');
      if (
        input.model !== undefined &&
        (typeof input.model !== 'string' || (input.model && !modelPattern.test(input.model)))
      )
        throw adminProblem(422, '模型名称格式无效。');
      const current = await credentials();
      const apiKey = input.apiKey?.trim() || current.apiKey;
      const model = input.model ?? current.model;
      if (['save', 'delete'].includes(input.action)) {
        if (!Number.isSafeInteger(input.revision) || input.revision !== current.revision)
          throw adminProblem(409, 'AI 设置已被修改，请刷新后重试。');
        if (input.action === 'save' && (!apiKey || !model))
          throw adminProblem(422, '请填写 API Key 并选择默认模型。');
        const value = input.action === 'delete' ? empty() : { apiKey, model };
        const row = await store.save(current.revision, seal(value));
        return publicValue({ revision: row.revision, ...value });
      }
      if (!apiKey) throw adminProblem(422, '请先填写 API Key。');
      if (input.action === 'models') {
        const result = await request(apiKey, 'models');
        if (!Array.isArray(result.data)) throw adminProblem(502, '模型列表格式无效。');
        const models = [
          ...new Set(
            result.data
              .map((item) => item?.id)
              .filter(
                (id) =>
                  typeof id === 'string' &&
                  modelPattern.test(id) &&
                  /^(gpt-|o\d|chatgpt-)/.test(id) &&
                  !/audio|realtime|transcrib|tts|image|search|moderation|embedding/i.test(id),
              ),
          ),
        ].sort();
        return { models };
      }
      if (!model) throw adminProblem(422, '请先选择模型。');
      const result = await request(apiKey, 'responses', {
        model,
        input: 'This is a connectivity check. Reply with OK only.',
        max_output_tokens: 512,
        store: false,
      });
      if (
        result.status !== 'completed' ||
        !Array.isArray(result.output) ||
        !result.output.some(
          (item) =>
            item.type === 'message' &&
            item.content?.some((part) => part.type === 'output_text' && part.text?.trim()),
        )
      )
        throw adminProblem(502, '模型未完成文字回复，请重试或选择其他模型。');
      return {
        ok: true,
        model,
        message: '连接成功，所选模型已完成文字回复。本次测试未更改已保存配置。',
      };
    },
  };
}
