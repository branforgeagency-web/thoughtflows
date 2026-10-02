import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Homepage story system.
 * One continuous light canvas (no section seams or divider lines): every
 * section is a numbered chapter with the same header layout, depth comes from
 * soft shadows, and motion uses the hero's blur → focus reveal plus gentle
 * scroll parallax on imagery.
 */

export const CHAPTERS = [
  { id: "journey", label: "The Journey Begins" },
  { id: "welcome", label: "Where It Starts" },
  { id: "programs", label: "Choose Your Path" },
  { id: "impact", label: "Proof in Numbers" },
  { id: "branches", label: "Find Your Station" },
  { id: "why", label: "Why Learners Choose Us" },
  { id: "stories", label: "Their Stories" },
  { id: "faq-section", label: "Before You Board" },
  { id: "boarding", label: "Your Next Step" },
];

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* Motion                                                             */
/* ------------------------------------------------------------------ */

export function useReveal(margin = "0px 0px -12% 0px") {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion() || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, shown];
}

/** Blur → focus reveal (same curve as the hero). */
export function Reveal(props) {
  const { as: Tag = "div", delay = 0, y = 32, scale = 1, className = "", style, children, ...rest } = props;
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate3d(0,${y}px,0) scale(${scale})`,
        filter: shown ? "none" : "blur(10px)",
        transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 1.1s cubic-bezier(.16,1,.3,1) ${delay}ms, filter .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Gentle scroll parallax for imagery (transform only, rAF-throttled, off for reduced motion). */
export function Parallax(props) {
  const { strength = 40, className = "", children } = props;
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let raf = 0;
    let visible = false;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1 … 1
      el.style.transform = `translate3d(0, ${(-t * strength).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/** Count-up number that starts when visible ("35,000+", "95%"). */
export function CountUp(props) {
  const { value, duration = 1600 } = props;
  const raw = String(value);
  const numeric = parseInt(raw.replace(/[^\d]/g, ""), 10) || 0;
  const suffix = raw.replace(/[\d,]/g, "");
  const comma = raw.includes(",");
  const [ref, shown] = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!shown) return;
    if (reducedMotion()) {
      setN(numeric);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min((now - t0) / duration, 1);
      setN(Math.round((1 - Math.pow(1 - t, 3)) * numeric));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, numeric, duration]);
  return (
    <span ref={ref} aria-label={raw}>
      <span aria-hidden="true">
        {comma ? n.toLocaleString("en-IN") : n}
        {suffix}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Type                                                               */
/* ------------------------------------------------------------------ */

export function Eyebrow(props) {
  const { chapter, children, className = "" } = props;
  return (
    <p className={`flex flex-wrap items-center gap-3 font-display text-[11px] font-bold uppercase tracking-[0.3em] text-[#0E8FA0] sm:text-xs ${className}`}>
      {chapter != null && (
        <span className="inline-flex h-7 items-center rounded-full bg-[#063B7A] px-3 text-[10px] tracking-[0.2em] text-white shadow-[0_8px_20px_-8px_rgba(6,59,122,0.6)]">
          Chapter {String(chapter).padStart(2, "0")}
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}

export function Heading(props) {
  const { as: Tag = "h2", className = "", children, id } = props;
  return (
    <Tag id={id} className={`font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] !text-[#0A2540] ${className}`}>
      {children}
    </Tag>
  );
}

export function Accent({ children }) {
  return <span className="bg-gradient-to-r from-[#063B7A] via-[#0B5FA8] to-[#12BFD1] bg-clip-text text-transparent">{children}</span>;
}

export function Lead(props) {
  const { className = "", children } = props;
  return <p className={`text-[15px] leading-relaxed text-[#4A5D73] sm:text-lg ${className}`}>{children}</p>;
}

/**
 * The one header layout every chapter uses, so all left edges and spacing line up:
 * eyebrow → heading → lead on the left, optional aside bottom-right.
 */
export function ChapterHeader(props) {
  const { chapter, eyebrow, title, lead, headingId, aside, center = false } = props;
  if (center) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow chapter={chapter} className="justify-center">
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <Heading id={headingId} className="mt-6">
            {title}
          </Heading>
        </Reveal>
        {lead && (
          <Reveal delay={180}>
            <Lead className="mx-auto mt-5 max-w-2xl">{lead}</Lead>
          </Reveal>
        )}
        {aside && (
          <Reveal delay={240} className="mt-8 flex justify-center">
            {aside}
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8 xl:col-span-7">
        <Reveal>
          <Eyebrow chapter={chapter}>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <Heading id={headingId} className="mt-6">
            {title}
          </Heading>
        </Reveal>
        {lead && (
          <Reveal delay={180}>
            <Lead className="mt-5 max-w-2xl">{lead}</Lead>
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal delay={240} className="flex lg:col-span-4 lg:justify-end xl:col-span-5">
          {aside}
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layout                                                             */
/* ------------------------------------------------------------------ */

/**
 * Chapter wrapper. Transparent (the page canvas shows through, so there are
 * no seams between chapters); soft light blooms flow freely across them.
 */
export function Chapter(props) {
  const { id, labelledBy, glow = "right", className = "", children } = props;
  const glowPos = {
    right: "right-[-12%] top-[5%]",
    left: "left-[-12%] top-[15%]",
    center: "left-1/2 top-0 -translate-x-1/2",
    none: "hidden",
  }[glow];
  return (
    <section
      id={id}
      data-chapter={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-24 overflow-x-clip px-4 py-10 sm:px-8 sm:py-14 lg:px-12 ${className}`}
    >
      <div aria-hidden="true" className={`pointer-events-none absolute ${glowPos} h-[520px] w-[720px] max-w-[110vw] rounded-full bg-[#12BFD1]/[0.08] blur-[140px]`} />
      <div className="container-max relative">{children}</div>
    </section>
  );
}

/** Card surface: white, soft layered shadow, lifts on hover. */
export const card =
  "rounded-3xl border border-[#063B7A]/[0.07] bg-white shadow-[0_1px_2px_rgba(6,59,122,0.04),0_18px_44px_-24px_rgba(6,59,122,0.22)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 hover:border-[#12BFD1]/35 hover:shadow-[0_2px_4px_rgba(6,59,122,0.05),0_30px_60px_-24px_rgba(6,59,122,0.32)]";

/** Photo card shadow. */
export const photoShadow = "shadow-[0_24px_60px_-28px_rgba(6,59,122,0.45)]";

/* ------------------------------------------------------------------ */
/* Controls                                                           */
/* ------------------------------------------------------------------ */

const btnBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 font-display text-sm font-bold transition-[transform,background-color,box-shadow,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export function Arrow(props) {
  const { className = "" } = props;
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PrimaryButton(props) {
  const { to, href, children, className = "", ...rest } = props;
  const cls = `${btnBase} group bg-[#063B7A] text-white shadow-[0_14px_32px_-12px_rgba(6,59,122,0.55)] hover:-translate-y-0.5 hover:bg-[#0B4F9C] hover:shadow-[0_18px_40px_-12px_rgba(6,59,122,0.6)] ${className}`;
  const inner = (
    <>
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </>
  );
  return to ? (
    <Link to={to} className={cls} {...rest}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}

export function GhostButton(props) {
  const { to, href, children, className = "", ...rest } = props;
  const cls = `${btnBase} bg-white text-[#063B7A] shadow-[0_1px_2px_rgba(6,59,122,0.06),0_10px_24px_-14px_rgba(6,59,122,0.3)] hover:-translate-y-0.5 hover:text-[#0B4F9C] hover:shadow-[0_2px_4px_rgba(6,59,122,0.06),0_16px_32px_-14px_rgba(6,59,122,0.38)] ${className}`;
  return to ? (
    <Link to={to} className={cls} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}

/** Round prev/next control used by carousels. */
export function ArrowButton(props) {
  const { dir = 1, label, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#063B7A] shadow-[0_1px_2px_rgba(6,59,122,0.06),0_10px_24px_-14px_rgba(6,59,122,0.35)] transition-[transform,box-shadow,color] duration-300 hover:-translate-y-0.5 hover:text-[#0E8FA0] hover:shadow-[0_16px_32px_-14px_rgba(6,59,122,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BFD1]"
    >
      <Arrow className={dir < 0 ? "rotate-180" : ""} />
    </button>
  );
}

export function useCarousel() {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    const item = el.querySelector("li");
    const step = item ? item.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: reducedMotion() ? "auto" : "smooth" });
  };
  return [ref, scroll];
}

/** Horizontal track whose first card lines up exactly with the chapter header. */
export const trackClass =
  "-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-8 pt-3 [scroll-padding-inline:1rem] [scrollbar-width:none] sm:-mx-8 sm:px-8 sm:[scroll-padding-inline:2rem] lg:-mx-12 lg:px-12 lg:[scroll-padding-inline:3rem] [&::-webkit-scrollbar]:hidden";
