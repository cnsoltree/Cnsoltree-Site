import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseAdmin } from "@/lib/supabase";

// ─── Resend 初始化 ────────────────────────────────────────────────────────────

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "noreply@cnsoltree.com";
const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL ?? FROM_EMAIL;

// ─── 请求体类型 ───────────────────────────────────────────────────────────────

interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// ─── 简单校验工具 ─────────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateBody(body: unknown): body is ContactRequestBody {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    b.name.length <= 100 &&
    typeof b.email === "string" &&
    isValidEmail(b.email) &&
    typeof b.message === "string" &&
    b.message.trim().length >= 10 &&
    b.message.length <= 5000
  );
}

// ─── 邮件模板 ─────────────────────────────────────────────────────────────────

function adminEmailHtml(data: ContactRequestBody): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 32px 24px; border-radius: 12px;">
      <div style="background: #fff; border-radius: 8px; padding: 24px; border: 1px solid #e5e7eb;">
        <h2 style="margin: 0 0 16px; color: #111827; font-size: 18px;">📬 新联系消息</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 80px;">姓名</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">邮箱</td>
            <td style="padding: 8px 0; font-size: 14px;">
              <a href="mailto:${data.email}" style="color: #059669;">${data.email}</a>
            </td>
          </tr>
          ${
            data.company
              ? `<tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">公司</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;">${data.company}</td>
          </tr>`
              : ""
          }
          <tr>
            <td colspan="2" style="padding-top: 16px;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">消息内容</p>
              <div style="background: #f3f4f6; border-radius: 6px; padding: 12px; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;
}

function userConfirmationHtml(name: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #059669; padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <div style="display: inline-flex; align-items: center; gap: 8px; color: white; font-size: 20px; font-weight: 700;">
          🌿 Cnsoltree
        </div>
      </div>
      <div style="background: #fff; padding: 32px 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <h2 style="margin: 0 0 12px; color: #111827; font-size: 20px;">感谢你的留言，${name}！</h2>
        <p style="margin: 0 0 16px; color: #4b5563; font-size: 15px; line-height: 1.7;">
          我们已收到你的消息，团队会在 <strong>1–2 个工作日内</strong>通过邮件与你联系。
        </p>
        <p style="margin: 0 0 24px; color: #4b5563; font-size: 15px; line-height: 1.7;">
          如有紧急需求，欢迎直接回复本邮件，我们会尽快处理。
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://cnsoltree.com"}"
           style="display: inline-block; background: #059669; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
          访问 Cnsoltree
        </a>
        <p style="margin: 32px 0 0; color: #9ca3af; font-size: 13px; border-top: 1px solid #f3f4f6; padding-top: 16px;">
          © ${new Date().getFullYear()} Cnsoltree. 保留所有权利。
        </p>
      </div>
    </div>
  `;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. 解析请求体
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // 2. 校验字段
  if (!validateBody(body)) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Please check your form: name (required, max 100 characters), email (valid format), message (10–5000 characters).",
      },
      { status: 422 }
    );
  }

  const { name, email, company, message } = body;

  // 3. 存入 Supabase（失败不阻断邮件发送）
  try {
    const supabase = createSupabaseAdmin();
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });

    if (dbError) {
      console.error("[Contact] Supabase insert error:", dbError.message);
    }
  } catch (err) {
    console.error("[Contact] Supabase unavailable:", err);
  }

  // 4. 发送管理员通知邮件 + 用户确认邮件（并发）
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `[Soltree] New enquiry from ${name}${company ? ` · ${company}` : ""}`,
      html: adminEmailHtml({ name, email, company, message }),
    });
  } catch (err) {
    console.error("[Contact] Resend error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

// ─── 不支持其他方法 ───────────────────────────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
