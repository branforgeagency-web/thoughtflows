import { useId, useState } from "react";
import { Chapter, ChapterHeader, Accent, Reveal } from "./cinematic";

function Item({ item, open, onToggle }) {
  const id = useId();
  return (
    <div
      className={`rounded-2xl bg-white transition-shadow duration-500 ${
        open
          ? "shadow-[0_2px_4px_rgba(6,59,122,0.05),0_26px_54px_-26px_rgba(6,59,122,0.35)]"
          : "shadow-[0_1px_2px_rgba(6,59,122,0.04),0_12px_30px_-22px_rgba(6,59,122,0.25)] hover:shadow-[0_2px_4px_rgba(6,59,122,0.05),0_20px_44px_-24px_rgba(6,59,122,0.3)]"
      }`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left font-display text-base font-bold text-[#0A2540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#12BFD1] sm:px-7 sm:text-lg"
        >
          {item.question}
          <span
            aria-hidden="true"
            className={`relative h-9 w-9 shrink-0 rounded-full transition-[transform,background-color,color] duration-500 ${open ? "rotate-45 bg-[#063B7A] text-white" : "bg-[#EEF6FB] text-[#063B7A]"}`}
          >
            <span className="absolute left-1/2 top-1/2 h-[2px] w-3 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
            <span className="absolute left-1/2 top-1/2 h-3 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-relaxed text-[#4A5D73] sm:px-7 sm:text-[15px]">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

/** Chapter 08 — FAQ (same homeFaqs data as FaqSection). */
export default function HomeFaq({ items = [] }) {
  const [open, setOpen] = useState(0);
  if (!items.length) return null;

  return (
    <Chapter id="faq-section" labelledBy="faq-heading" glow="center">
      <ChapterHeader
        chapter={8}
        eyebrow="Before You Board"
        headingId="faq-heading"
        center
        title={
          <>
            Frequently asked <Accent>questions</Accent>
          </>
        }
        lead="Find quick answers to common questions about our medical coding programs, certifications, placements, and campus centers."
      />
      <ul className="mx-auto mt-10 grid max-w-4xl gap-4">
        {items.map((item, i) => (
          <Reveal as="li" key={item.question} delay={Math.min(i, 6) * 70} y={24}>
            <Item item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          </Reveal>
        ))}
      </ul>
    </Chapter>
  );
}
