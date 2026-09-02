"use client";

import { useState } from "react";
import type { Faq } from "@/lib/faqs";

/** Native details/summary would do, but this keeps the gold caret styling. */
export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-${index}`}
              >
                <span className="font-bold text-body-text">{item.question}</span>
                <span
                  className="shrink-0 text-xl text-gold"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>

            {isOpen ? (
              <div id={`faq-${index}`} className="pb-5">
                {item.answer.map((paragraph) => (
                  <p key={paragraph} className="description mt-2 text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
