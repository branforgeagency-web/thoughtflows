import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Chapter, ChapterHeader, Accent, Reveal } from "./cinematic";

/** Chapter 07 — student stories (same /testimonials API as TestimonialsSection). */
export default function HomeStories() {
  const { data: testimonials, loading } = useFetch("/testimonials");
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [hovered, setHovered] = useState(null);

  const list = Array.isArray(testimonials) ? testimonials : [];
  const go = (i) => {
    const next = (i + list.length) % list.length;
    if (next === index || !fade) return;
    setFade(false);
    window.setTimeout(() => {
      setIndex(next);
      setFade(true);
    }, 220);
  };

  useEffect(() => {
    if (list.length < 2 || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(index + 1), 8000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, list.length]);

  // Hide quietly if the API is unavailable — never show a broken block.
  if (!loading && list.length === 0) return null;
  const t = list[index % Math.max(list.length, 1)];

  return (
    <Chapter id="stories" labelledBy="stories-heading" glow="right">
      <ChapterHeader
        chapter={7}
        eyebrow="Their Stories"
        headingId="stories-heading"
        title={
          <>
            Hear from our <Accent>certified graduates</Accent>
          </>
        }
        lead="From career-switchers to fresh graduates — hear how Thoughtflows transformed their career trajectories."
      />

      <Reveal delay={200} y={40} className="mt-10">
        <figure className="flex flex-col items-center gap-10 py-10 sm:py-16" aria-live="polite">
          {loading || !t ? (
            <div className="h-32 w-full max-w-2xl animate-pulse rounded-2xl bg-[#EEF6FB]" />
          ) : (
            <>
              {/* Quote */}
              <div className="relative px-8">
                <span aria-hidden="true" className="pointer-events-none absolute -left-2 -top-8 select-none font-serif text-8xl leading-none text-[#063B7A]/[0.07]">
                  “
                </span>
                <blockquote
                  className="max-w-2xl text-center text-2xl font-light leading-relaxed text-[#0A2540] transition-all duration-[400ms] ease-out md:text-3xl"
                  style={{ opacity: fade ? 1 : 0, filter: fade ? "none" : "blur(4px)", transform: fade ? "scale(1)" : "scale(0.98)" }}
                >
                  {t.quote}
                </blockquote>
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-2 select-none font-serif text-8xl leading-none text-[#063B7A]/[0.07]">
                  ”
                </span>
              </div>

              <figcaption className="mt-2 flex flex-col items-center gap-6">
                {/* Role */}
                <p
                  className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7C8F] transition-all duration-500 ease-out"
                  style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(8px)" }}
                >
                  {t.role}
                  {t.company ? ` · ${t.company}` : ""}
                  {(t.beforeRole || t.afterRole) && (
                    <span className="mt-2 block normal-case tracking-normal text-[#0E8FA0]">
                      {t.beforeRole} → {t.afterRole}
                    </span>
                  )}
                </p>

                {/* Avatar pills — the active one (or hovered) expands to show the name */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {list.map((s, i) => {
                    const isActive = i === index;
                    const showName = isActive || (hovered === i && !isActive);
                    return (
                      <button
                        key={s._id || s.id || i}
                        type="button"
                        onClick={() => go(i)}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        aria-label={`Show story from ${s.name}`}
                        aria-current={isActive}
                        className={`relative flex cursor-pointer items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BFD1] ${
                          isActive ? "bg-[#063B7A] shadow-lg" : "bg-transparent hover:bg-[#EEF6FB]"
                        } ${showName ? "py-2 pl-2 pr-4" : "p-0.5"}`}
                      >
                        {s.photo ? (
                          <img
                            src={s.photo}
                            alt=""
                            loading="lazy"
                            className={`h-8 w-8 shrink-0 rounded-full object-cover transition-all duration-500 ${isActive ? "ring-2 ring-white/30" : "hover:scale-105"}`}
                          />
                        ) : (
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isActive ? "bg-white/15 text-white" : "bg-[#E7F9FB] text-[#063B7A]"}`}>
                            {String(s.name || "?").charAt(0).toUpperCase()}
                          </span>
                        )}
                        <span
                          className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            showName ? "ml-2 grid-cols-[1fr] opacity-100" : "ml-0 grid-cols-[0fr] opacity-0"
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className={`block whitespace-nowrap text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-[#0A2540]"}`}>
                              {s.name}
                            </span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </figcaption>
            </>
          )}
        </figure>
      </Reveal>
    </Chapter>
  );
}
