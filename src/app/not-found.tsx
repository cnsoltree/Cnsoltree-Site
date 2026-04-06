import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "页面未找到",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-6xl font-bold text-primary-600">404</p>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">页面未找到</h1>
      <p className="mt-4 text-gray-500">
        抱歉，你访问的页面不存在或已被移除。
      </p>
      <Link href="/" className="mt-8 btn-primary">
        返回首页
      </Link>
    </div>
  );
}
