"use client";

import { useState } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(true);

  if (items.length === 0) return null;

  // Build numbering: H2 gets "1", "2", … ; H3 under H2 #2 gets "2.1", "2.2", …
  let h2Index = 0;
  let h3Index = 0;
  const numbered = items.map((item) => {
    if (item.level === 2) {
      h2Index++;
      h3Index = 0;
      return { ...item, num: `${h2Index}` };
    } else {
      h3Index++;
      return { ...item, num: `${h2Index}.${h3Index}` };
    }
  });

  return (
    <nav className="my-6 rounded-xl border border-gray-200 bg-gray-50">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-3"
      >
        <span className="text-base font-bold text-gray-900">Contents</span>
        <span className="text-xs text-blue-600 hover:text-blue-800 select-none">
          [{open ? "Hide" : "Show"}]
        </span>
      </button>

      {/* List */}
      {open && (
        <ul className="px-5 pb-4 space-y-1.5">
          {numbered.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-baseline gap-2 text-sm leading-relaxed text-blue-700 hover:text-blue-900 hover:underline transition-colors ${
                  item.level === 3 ? "pl-6" : ""
                }`}
              >
                <span className="text-gray-400 shrink-0 tabular-nums">{item.num}</span>
                <span>{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
