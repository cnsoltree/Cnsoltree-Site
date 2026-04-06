import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error(
    "Missing RESEND_API_KEY. Please add it to your .env.local file."
  );
}

export const resend = new Resend(resendApiKey);

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "noreply@yourdomain.com";

// -------------------------------------------------------
// 通用发送邮件函数
// -------------------------------------------------------
interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = FROM_EMAIL,
  replyTo,
}: SendEmailOptions) {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    console.error("[Resend] Failed to send email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

// -------------------------------------------------------
// 预置模板：欢迎邮件
// -------------------------------------------------------
export async function sendWelcomeEmail(to: string, username: string) {
  return sendEmail({
    to,
    subject: `欢迎加入 My App，${username}！`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0284c7;">欢迎加入 My App！</h1>
        <p>你好，${username}，</p>
        <p>感谢你注册 My App。你的账户已成功创建。</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard"
           style="display: inline-block; background: #0284c7; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
          立即开始
        </a>
        <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
          如果你没有注册过此账户，请忽略这封邮件。
        </p>
      </div>
    `,
  });
}

// -------------------------------------------------------
// 预置模板：密码重置邮件
// -------------------------------------------------------
export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  return sendEmail({
    to,
    subject: "重置你的 My App 密码",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0284c7;">重置密码</h1>
        <p>我们收到了你的密码重置请求。点击下方按钮重置密码：</p>
        <a href="${resetUrl}"
           style="display: inline-block; background: #0284c7; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
          重置密码
        </a>
        <p style="margin-top: 16px; color: #6b7280; font-size: 14px;">
          此链接将在 1 小时后失效。如果你没有请求重置密码，请忽略这封邮件。
        </p>
      </div>
    `,
  });
}
