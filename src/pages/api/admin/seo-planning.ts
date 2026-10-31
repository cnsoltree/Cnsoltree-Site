import type { APIRoute } from 'astro';
import { adminFailure } from '@/lib/admin-server';
import { adminBody, adminJson, adminProblem } from '@/lib/admin-auth.mjs';
import { adminAiContext } from '@/lib/admin-ai-server';
import { generateTopicCandidates, planningInput } from '@/lib/seo-topic-planning.mjs';

export const prerender = false;
const handle: APIRoute = async (context) => {
  try {
    const { local, service } = await adminAiContext(context);
    const invoke = async (method: string, body?: unknown) => {
      let result: any;
      if (local) {
        // Reuse the native Node middleware and its write queue, avoiding a second local store.
        const origin = new URL(context.request.url).origin;
        const response = await fetch(`${origin}/__cms/seo`, {
          method,
          headers: { Origin: origin, 'Content-Type': 'application/json' },
          ...(body ? { body: JSON.stringify(body) } : {}),
          signal: AbortSignal.timeout(20_000),
        });
        result = { status: response.status, value: await response.json() };
      } else
        result = await (
          await import('@/lib/admin-content')
        ).handleCloudContent('seo', method, body);
      if (result.status !== 200)
        throw adminProblem(result.status, result.value.error || '规划操作未完成。');
      return result.value;
    };
    let result;
    if (context.request.method === 'GET') result = await invoke('GET');
    else {
      const input = await adminBody(context.request, 8192);
      if (
        Object.keys(input).some(
          (key) => !['action', 'revision', 'input', 'batchId', 'ids', 'id', 'patch'].includes(key),
        )
      )
        throw adminProblem(422, '规划请求包含未知字段。');
      if (input.action === 'generate') {
        const current = await invoke('GET');
        if (local && current.capabilities?.aiPlanningImport !== true)
          throw adminProblem(
            503,
            '本地规划保存服务版本较旧，请重启网站服务后再生成；本次未调用 AI。',
          );
        if (input.revision !== current.revision)
          throw adminProblem(409, '规划已被修改，请刷新后重试。');
        const selection = planningInput(input.input, current.taxonomy);
        const topics = await generateTopicCandidates(service, selection, current);
        result = await invoke('POST', {
          action: 'importAiCandidates',
          revision: current.revision,
          input: selection,
          topics,
        });
      } else if (input.action === 'addToOperations' || input.action === 'updatePlan') {
        result = await invoke('POST', {
          ...input,
          action: input.action === 'addToOperations' ? 'buildTasks' : 'updateTask',
        });
      } else throw adminProblem(422, '规划操作无效。');
    }
    return adminJson({
      revision: result.revision,
      taxonomy: result.taxonomy,
      batches: result.workspace.batches,
      plans: result.workspace.tasks.map(
        ({ id, title, status, notes, batchId, topicId, topic, createdAt }: any) => ({
          id,
          title,
          status,
          notes,
          batchId,
          topicId,
          keyword: topic.keyword,
          createdAt,
        }),
      ),
    });
  } catch (error) {
    return adminFailure(error);
  }
};
export const GET = handle;
export const POST = handle;
