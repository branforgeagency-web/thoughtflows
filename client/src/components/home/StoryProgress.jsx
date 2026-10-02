import { useEffect, useState } from "react";
import { CHAPTERS } from "./cinematic";

/**
 * Fixed chapter guide (large screens). Appears once the story begins after the
 * hero, highlights the chapter being read and lets visitors jump between them.
 */
export default function StoryProgress({ chapters = CHAPTERS }) {
  const [active, setActive] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = chapters.findIndex((c) => c.id === e.target.id);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));

    const first = els[0];
    const last = els[els.length - 1];
    const onScroll = () => {
      const vh = window.innerHeight;
      const startTop = first.getBoundingClientRect().top;
      const endBottom = last.getBoundingClientRect().bottom;
      setVisible(startTop < vh * 0.6 && endBottom > vh * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Homepage chapters"
      className={`fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,transform] duration-500 min-[1640px]:block ${
        visible ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-4 opacity-0"
      }`}
    >
      <ol className="flex flex-col gap-0.5 rounded-full bg-white/85 p-1 shadow-[0_1px_2px_rgba(6,59,122,0.05),0_18px_40px_-20px_rgba(6,59,122,0.35)] backdrop-blur-md">
        {chapters.map((c, i) => {
          const on = i === active;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => go(c.id)}
                aria-current={on ? "step" : undefined}
                aria-label={`Chapter ${i + 1}: ${c.label}`}
                className="group relative flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BFD1]"
              >
                <span
                  className={`rounded-full transition-all duration-500 ${
                    on ? "h-7 w-7 bg-[#063B7A] shadow-[0_8px_18px_-6px_rgba(6,59,122,0.6)]" : i < active ? "h-2.5 w-2.5 bg-[#12BFD1]" : "h-2.5 w-2.5 bg-[#063B7A]/20 group-hover:bg-[#063B7A]/40"
                  }`}
                />
                {on && <span className="absolute font-display text-[10px] font-extrabold text-white">{String(i + 1).padStart(2, "0")}</span>}
                <span
                  className={`pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-full bg-white px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#063B7A] shadow-[0_10px_24px_-12px_rgba(6,59,122,0.4)] transition-[opacity,transform] duration-300 ${
                    "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  }`}
                >
                  {c.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
