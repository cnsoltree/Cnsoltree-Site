const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const source = fs.readFileSync(
  path.join(__dirname, "../src/app/api/contact/route.ts"), "utf8"
);
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

async function submit(send) {
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    process: { env: { RESEND_FROM_EMAIL: "jacky@elesoltree.com" } },
    console: { error() {} },
    require(name) {
      if (name === "next/server") {
        return { NextResponse: {
          json: (body, options) => ({ body, status: options?.status ?? 200 }),
        } };
      }
      if (name === "resend") {
        return { Resend: class { emails = { send }; } };
      }
      if (name === "@/lib/supabase") {
        return { createSupabaseAdmin: () => ({ from: () => ({
          insert: async () => ({ error: null }),
        }) }) };
      }
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return exports.POST({ json: async () => ({
    name: "Test", email: "customer@example.com", message: "Product enquiry test",
  }) });
}

(async () => {
  const accepted = await submit(async (email) => {
    assert.equal(email.to, "shawn@cnsoltree.com");
    assert.equal(email.reply_to, "customer@example.com");
    return { data: { id: "test-email-id" }, error: null };
  });
  assert.equal(accepted.status, 200);
  assert.equal(accepted.body.success, true);

  for (const send of [
    async () => ({ data: null, error: { message: "Domain not verified" } }),
    async () => ({ data: null, error: null }),
    async () => { throw new Error("Network unavailable"); },
  ]) {
    const rejected = await submit(send);
    assert.equal(rejected.status, 502);
    assert.equal(rejected.body.success, false);
  }
  console.log("Contact route: accepted email succeeds; rejected and failed sends return 502.");
})().catch((error) => { console.error(error); process.exitCode = 1; });
