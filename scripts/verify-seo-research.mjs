import assert from 'node:assert/strict';
import { createSeoResearchProvider } from './seo-research-provider.mjs';

const context = {
  input: { groupSlug: 'circuit-protection', topicSlug: 'mcb', language: 'en' },
  topics: [
    { id: 'topic-1', title: 'MCB selection', keyword: 'MCB selection', intent: 'selection' },
  ],
  knowledge: [
    {
      title: 'Verified',
      content: 'Confirmed data',
      groupSlug: 'circuit-protection',
      status: 'verified',
      enabled: true,
    },
    { title: 'Unverified', content: 'Do not send draft data', status: 'draft', enabled: true },
    { title: 'Disabled', content: 'Do not send disabled data', status: 'verified', enabled: false },
    {
      title: 'Other',
      content: 'Do not send unrelated data',
      groupSlug: 'fire-suppression',
      status: 'verified',
      enabled: true,
    },
  ],
};
const result = {
  topics: [
    {
      id: 'topic-1',
      researchSummary:
        'An independently sourced selection angle; product facts require verification.',
      missingInformation: ['Applicable model data'],
      sources: [{ title: 'Source', url: 'https://www.iec.ch/standards' }],
    },
  ],
};
const completion = () => ({
  status: 'completed',
  output: [
    {
      type: 'web_search_call',
      status: 'completed',
      action: { sources: [{ title: 'IEC original source', url: 'https://www.iec.ch/standards' }] },
    },
    {
      type: 'message',
      content: [{ type: 'output_text', text: JSON.stringify(result), annotations: [] }],
    },
  ],
});
let received;
const provider = (data = completion(), status = 200) =>
  createSeoResearchProvider({
    getConfig: () => ({ apiKey: 'private-test-key', model: 'configured-model' }),
    fetchImpl: async (url, options) => {
      received = { url, options, body: JSON.parse(options.body) };
      return new Response(JSON.stringify(data), { status });
    },
  });
const unavailable = createSeoResearchProvider({
  getConfig: () => ({ apiKey: '', model: '' }),
  fetchImpl: () => assert.fail('Unconfigured research must never contact a provider.'),
});
assert.equal(unavailable.getCapabilities().researchConfigured, false);
await assert.rejects(unavailable.researchTopics({}, context), /尚未配置/);
const configured = provider();
assert.equal(configured.getCapabilities().researchConfigured, true);
assert(!JSON.stringify(configured.getCapabilities()).includes('private-test-key'));
const researched = await configured.researchTopics({}, context);
assert.equal(researched[0].sources[0].title, 'IEC original source');
assert.equal(received.url, 'https://api.openai.com/v1/responses');
assert.equal(received.body.model, 'configured-model');
assert.equal(received.body.store, false);
assert.equal(received.body.tool_choice, 'required');
assert.deepEqual(received.body.tools, [{ type: 'web_search' }]);
assert(received.options.signal instanceof AbortSignal);
const input = JSON.parse(received.body.input);
assert.deepEqual(
  input.verifiedKnowledge.map((item) => item.title),
  ['Verified'],
);
assert(!received.body.input.includes('private-test-key'));

const withoutSearch = completion();
withoutSearch.output.shift();
await assert.rejects(provider(withoutSearch).researchTopics({}, context), /没有取得可核对/);
const forged = completion();
forged.output[1].content[0].text = JSON.stringify({
  topics: [
    {
      ...result.topics[0],
      sources: [{ title: 'Fabricated', url: 'https://unretrieved.example.com/claim' }],
    },
  ],
});
await assert.rejects(provider(forged).researchTopics({}, context), /缺少实际检索到/);
const privateSource = completion();
privateSource.output[0].action.sources[0].url = 'http://127.0.0.1:4323/admin';
await assert.rejects(provider(privateSource).researchTopics({}, context), /没有取得可核对/);
const wrongId = completion();
wrongId.output[1].content[0].text = JSON.stringify({
  topics: [{ ...result.topics[0], id: 'another-id' }],
});
await assert.rejects(provider(wrongId).researchTopics({}, context), /对应关系无效/);
const incomplete = completion();
incomplete.status = 'incomplete';
await assert.rejects(provider(incomplete).researchTopics({}, context), /尚未完整生成/);
const refusal = completion();
refusal.output[1].content[0] = { type: 'refusal', refusal: 'Cannot complete.' };
await assert.rejects(provider(refusal).researchTopics({}, context), /未能完成这组主题/);
for (const code of [401, 403, 429, 500]) {
  try {
    await provider({ error: { message: 'private-test-key must not leak' } }, code).researchTopics(
      {},
      context,
    );
    assert.fail('A failed provider request must fail.');
  } catch (error) {
    assert(!error.message.includes('private-test-key'));
    assert.equal(error.status, 502);
  }
}
console.log(
  'PASS: research is opt-in, source-grounded, bounded, private and honest when unavailable. No live API calls made.',
);
