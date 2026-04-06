import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ─── 环境变量校验 ─────────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "[Supabase] NEXT_PUBLIC_SUPABASE_URL is not set. Add it to .env.local."
  );
}
if (!supabaseAnonKey) {
  throw new Error(
    "[Supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Add it to .env.local."
  );
}

// ─── 数据库类型定义（按需扩展） ───────────────────────────────────────────────
// 运行 `npx supabase gen types typescript` 可自动生成，
// 此处提供手动定义的基础示例。

export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          message: string;
          replied: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          message: string;
          replied?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          message?: string;
          replied?: boolean;
        };
      };
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// ─── 类型别名 ─────────────────────────────────────────────────────────────────

export type TypedSupabaseClient = SupabaseClient<Database>;

export type ContactMessage =
  Database["public"]["Tables"]["contact_messages"]["Row"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// ─── 客户端实例（浏览器可用，受 RLS 限制） ──────────────────────────────────

export const supabase: TypedSupabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// ─── 服务端管理员实例（仅限 Server Actions / Route Handlers） ────────────────
// 使用 service_role key，可绕过 RLS。
// 永远不要在客户端组件中 import 此函数。

export function createSupabaseAdmin(): TypedSupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      "[Supabase] SUPABASE_SERVICE_ROLE_KEY is not set. " +
        "This key must ONLY be used server-side — never expose it to the client."
    );
  }

  return createClient<Database>(supabaseUrl!, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ─── 工具函数 ─────────────────────────────────────────────────────────────────

/**
 * 检查 Supabase 错误并抛出可读异常，方便上层统一处理。
 * 用法：const data = checkError(await supabase.from("...").select("*"));
 */
export function checkError<T>(
  result: { data: T | null; error: { message: string } | null }
): T {
  if (result.error) {
    throw new Error(`[Supabase] ${result.error.message}`);
  }
  if (result.data === null) {
    throw new Error("[Supabase] No data returned.");
  }
  return result.data;
}
