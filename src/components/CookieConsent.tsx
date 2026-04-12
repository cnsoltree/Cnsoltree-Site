"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    // TODO: 未来加 Google Analytics 时，在这里初始化
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
        <p className="flex-1 text-sm text-gray-600 leading-relaxed">
          We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.{" "}
          <a href="/privacy" className="text-green-700 underline underline-offset-2 hover:text-green-800">
            Privacy Policy
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={decline}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-800"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
