import fs from 'node:fs';
import path from 'node:path';
import { randomBytes, randomUUID } from 'node:crypto';
import { adminProblem } from './admin-auth.mjs';

/** Local development only: directory is outside the repository and deployment bundle. */
export function createAiLocalStore(directory) {
  const filename = path.join(directory, 'ai-settings.json');
  function load() {
    try {
      const row = JSON.parse(fs.readFileSync(filename, 'utf8'));
      if (!Number.isSafeInteger(row.revision) || row.revision < 1 || !row.payload)
        throw new Error();
      return row;
    } catch (error) {
      if (error.code === 'ENOENT') return null;
      throw adminProblem(503, '本地 AI 设置无法读取，原文件未被覆盖。');
    }
  }
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  const secretPath = path.join(directory, 'ai-encryption-key');
  try {
    fs.writeFileSync(secretPath, randomBytes(32).toString('base64'), { flag: 'wx', mode: 0o600 });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
  return {
    encryptionKey: fs.readFileSync(secretPath, 'utf8').trim(),
    store: {
      load,
      save(revision, payload) {
        const lock = `${filename}.lock`;
        let fd;
        try {
          fd = fs.openSync(lock, 'wx', 0o600);
        } catch (error) {
          if (error.code === 'EEXIST')
            throw adminProblem(409, '本地 AI 设置正在保存，请稍后重试。');
          throw error;
        }
        const temporary = `${filename}.${randomUUID()}.tmp`;
        try {
          if ((load()?.revision || 0) !== revision)
            throw adminProblem(409, 'AI 设置已被修改，请刷新后重试。');
          const row = { revision: revision + 1, payload };
          fs.writeFileSync(temporary, JSON.stringify(row), { flag: 'wx', mode: 0o600 });
          fs.renameSync(temporary, filename);
          return row;
        } finally {
          fs.rmSync(temporary, { force: true });
          fs.closeSync(fd);
          fs.unlinkSync(lock);
        }
      },
    },
  };
}
