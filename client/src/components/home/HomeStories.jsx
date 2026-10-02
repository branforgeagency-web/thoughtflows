import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Chapter, ChapterHeader, Accent, Reveal, ArrowButton, card } from "./cinematic";

/** Chapter 07 — student stories (same /testimonials API as TestimonialsSection). */
export default function HomeStories() {
  const { data: testimonials, loading } = useFetch("/testimonials");
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const list = Array.isArray(testimonials) ? testimonials : [];
  const go = (i) => {
    setFade(false);
    window.setTimeout(() => {
      setIndex((i + list.length) % list.length);
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
        aside={
          list.length > 1 ? (
            <div className="flex items-center gap-3">
              <ArrowButton dir={-1} label="Previous story" onClick={() => go(index - 1)} />
              <ArrowButton dir={1} label="Next story" onClick={() => go(index + 1)} />
            </div>
          ) : null
        }
      />

      <Reveal delay={200} y={40} className="mt-10">
        <figure className={`${card} relative overflow-hidden p-8 hover:translate-y-0 sm:p-12 lg:p-14`} aria-live="polite">
          <span aria-hidden="true" className="pointer-events-none absolute -top-10 right-8 font-display text-[12rem] leading-none text-[#12BFD1]/10">
            ”
          </span>
          {loading || !t ? (
            <div className="h-40 animate-pulse rounded-2xl bg-[#EEF6FB]" />
          ) : (
            <div
              className="relative grid gap-10 transition-[opacity,filter,transform] duration-300 lg:grid-cols-12 lg:items-center"
              style={{ opacity: fade ? 1 : 0, filter: fade ? "none" : "blur(6px)", transform: fade ? "none" : "translateY(8px)" }}
            >
              <blockquote className="font-display text-xl font-semibold leading-relaxed text-[#0A2540] sm:text-2xl lg:col-span-8">“{t.quote}”</blockquote>
              <figcaption className="flex items-center gap-4 lg:col-span-4 lg:flex-col lg:items-start">
                {t.photo && <img src={t.photo} alt="" loading="lazy" className="h-16 w-16 rounded-2xl object-cover shadow-[0_12px_30px_-12px_rgba(6,59,122,0.5)]" />}
                <span>
                  <span className="block font-display text-base font-extrabold text-[#063B7A]">{t.name}</span>
                  <span className="mt-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#6B7C8F]">
                    {t.role}
                    {t.company ? ` · ${t.company}` : ""}
                  </span>
                  {(t.beforeRole || t.afterRole) && (
                    <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#E7F9FB] px-4 py-1.5 text-xs font-bold text-[#4A5D73]">
                      {t.beforeRole} <span className="text-[#0E8FA0]">→</span> <span className="text-[#0E8FA0]">{t.afterRole}</span>
                    </span>
                  )}
                </span>
              </figcaption>
            </div>
          )}

          {list.length > 1 && (
            <div className="relative mt-10 flex gap-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to story ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-10 bg-[#12BFD1]" : "w-1.5 bg-[#063B7A]/20 hover:bg-[#063B7A]/40"}`}
                />
              ))}
            </div>
          )}
        </figure>
      </Reveal>
    </Chapter>
  );
}
