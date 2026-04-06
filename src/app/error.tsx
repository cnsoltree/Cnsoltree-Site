"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-6xl font-bold text-red-500">500</p>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">出了点问题</h1>
      <p className="mt-4 text-gray-500">
        服务器发生了错误，请稍后重试。
      </p>
      <button onClick={reset} className="mt-8 btn-primary">
        重试
      </button>
    </div>
  );
}
