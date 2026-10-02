import * as React from "react";

/**
 * ThoughtflowsMedicalCodingHero — "Next stop: Thoughtflows"
 * ------------------------------------------------------------------
 * Scroll-driven cinematic hero. A metro train glides into the platform,
 * stops, its doors slide open, the camera pushes through the doorway and
 * the visitor is welcomed into Thoughtflows Medical Coding Academy.
 *
 * The whole scene is built in code (no video required). Optionally pass
 * `videoSrc` to scrub a real train/door video instead of the built scene.
 *
 * Scroll model: the section is 100vh + scrubDistance tall and its stage is
 * position:sticky. Scroll inside that range maps 0 → 1 onto the story; after
 * it the stage releases and the page continues normally. Scrolling back up
 * plays the story in reverse. No wheel/touch hijacking — nobody gets trapped.
 *
 * Every per-frame update writes straight to DOM refs inside one rAF loop
 * (no React re-renders while scrolling). Reduced-motion / Save-Data users get
 * a static, fully readable "doors open" hero with all messaging and CTAs.
 */

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface ThoughtflowsHeroBranch {
  name: string;
  city?: string;
}

export interface ThoughtflowsHeroProps {
  /** Optional: scrub a real video instead of the built-in train scene. */
  videoSrc?: string;
  mobileVideoSrc?: string;
  /** Still shown until the video is ready (first frame of the video). */
  videoPosterSrc?: string;
  /** Image seen through the open doors (the academy). */
  interiorImageSrc?: string;
  /**
   * Video mode: academy photos revealed through the opening doors (replacing
   * what the footage shows behind them). The first appears in the doorway as the
   * doors part; later ones cross-fade in as the story moves to the final message.
   */
  doorRevealImages?: string[];
  /** Logo for dark backgrounds (light wordmark). Pass "" to show the text label instead. */
  logoSrc?: string;
  academyName?: string;
  tagline?: string;
  /** Opening headline (page <h1>). */
  title?: string;
  /** Final headline. Sentences split on "." onto their own lines. */
  subtitle?: string;
  description?: string;
  /** Text on the LED sign above the door. */
  stationText?: string;
  branchCount?: number;
  /** Branch data from CMS/API — only city names are shown, never a full list. */
  branches?: ThoughtflowsHeroBranch[];
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  /** Pass "" to hide. */
  tertiaryCtaText?: string;
  tertiaryCtaHref?: string;
  /** Scroll distance (px) for the full story on desktop. */
  scrubDistance?: number;
  mobileScrubFactor?: number;
  mobileBreakpoint?: number;
  /** SPA navigation (e.g. react-router `navigate`). Anchors keep real hrefs. */
  onNavigate?: (href: string) => void;
  /** id of the section after the hero (for "Skip intro"). */
  nextSectionId?: string;
  /** Hide the site's fixed <header> while the hero plays; it slides back once the visitor scrolls past. */
  hideSiteHeader?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const CHAPTERS = ["Arrive", "Doors Open", "Welcome", "Learn", "Career"] as const;
const WINDOWS_PER_SIDE = 7;

function prefersStatic(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return true;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !!conn?.saveData;
}

function splitSentences(text: string): string[] {
  return text.split(".").map((s) => s.trim()).filter(Boolean).map((s) => `${s}.`);
}

function uniqueCities(branches?: ThoughtflowsHeroBranch[]): string[] {
  if (!branches?.length) return [];
  const seen = new Set<string>();
  for (const b of branches) {
    const city = (b.city ?? b.name).split(",")[0].trim();
    if (city) seen.add(city);
  }
  return Array.from(seen);
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function ThoughtflowsMedicalCodingHero({
  videoSrc,
  mobileVideoSrc,
  videoPosterSrc,
  interiorImageSrc = "/videos/thoughtflows-hero-poster.jpg",
  doorRevealImages = ["/videos/thoughtflows-hero-poster.jpg", "/branch-classroom.jpg"],
  logoSrc = "/thoughtflows-logo-light-720.png",
  academyName = "THOUGHTFLOWS",
  tagline = "Medical Coding Academy",
  title = "BUILD YOUR FUTURE IN MEDICAL CODING",
  subtitle = "Learn. Get Certified. Build Your Career.",
  description = "Industry-focused medical coding training designed to help you take the next step toward a successful healthcare career.",
  stationText = "NEXT STOP · THOUGHTFLOWS",
  branchCount = 15,
  branches,
  primaryCtaText = "Explore Courses",
  primaryCtaHref = "/courses",
  secondaryCtaText = "Find a Branch",
  secondaryCtaHref = "/branches",
  tertiaryCtaText = "Start Your Career",
  tertiaryCtaHref = "/contact",
  scrubDistance = 3600,
  mobileScrubFactor = 0.7,
  mobileBreakpoint = 768,
  onNavigate,
  nextSectionId = "journey",
  hideSiteHeader = true,
  className = "",
}: ThoughtflowsHeroProps) {
  /* ---------------- refs ---------------- */
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const sceneRef = React.useRef<HTMLDivElement>(null);
  const trainRef = React.useRef<HTMLDivElement>(null);
  const doorLRef = React.useRef<HTMLDivElement>(null);
  const doorRRef = React.useRef<HTMLDivElement>(null);
  const signRef = React.useRef<HTMLDivElement>(null);
  const spillRef = React.useRef<HTMLDivElement>(null);
  const dimRef = React.useRef<HTMLDivElement>(null);
  const streakRef = React.useRef<HTMLDivElement>(null);
  const interiorRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const gradeRef = React.useRef<HTMLDivElement>(null);
  const revealRef = React.useRef<HTMLDivElement>(null);
  const revealImgRefs = React.useRef<(HTMLImageElement | null)[]>([]);
  const doorRevealCount = React.useRef(0);
  const videoModeRef = React.useRef(false);
  const wantedProgress = React.useRef(0);

  /**
   * One seek in flight at a time; the newest target always wins. Called every
   * frame and again the instant a seek completes ("seeked"), so the decoder is
   * never idle while the visitor is scrolling and never flooded with stale seeks.
   */
  const pumpSeek = React.useCallback(() => {
    const video = videoRef.current;
    if (!video || video.seeking || video.readyState < 1) return;
    const d = video.duration;
    if (!Number.isFinite(d) || d <= 0) return;
    const t = wantedProgress.current * Math.max(0, d - 0.05);
    if (Math.abs(video.currentTime - t) < 1 / 90) return;
    const v = video as HTMLVideoElement & { fastSeek?: (time: number) => void };
    // While moving fast, keyframe seeks (fastSeek, Safari/Firefox) keep up; land precisely when settling.
    const moving = Math.abs(target.current - current.current) > 0.01;
    if (moving && typeof v.fastSeek === "function") v.fastSeek(t);
    else video.currentTime = t;
  }, []);
  const openingRef = React.useRef<HTMLDivElement>(null);
  const hintRef = React.useRef<HTMLDivElement>(null);
  const welcomeRef = React.useRef<HTMLDivElement>(null);
  const finalRef = React.useRef<HTMLDivElement>(null);
  const branchRef = React.useRef<HTMLDivElement>(null);
  const ctaRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const chapterRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  const target = React.useRef(0);
  const current = React.useRef(0);
  const raf = React.useRef<number | null>(null);
  const visible = React.useRef(true);
  const trainHalf = React.useRef(1500);
  const activeChapter = React.useRef(-1);
  const ctaLive = React.useRef(false);
  const headerHidden = React.useRef(false);
  const actionsHidden = React.useRef(false);

  /* ---------------- state (rare changes only) ---------------- */
  const [isMobile, setIsMobile] = React.useState(false);
  const [isStatic, setIsStatic] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);
  const [navOffset, setNavOffset] = React.useState(0);

  const useVideo = !!videoSrc && !videoFailed;
  videoModeRef.current = useVideo;
  doorRevealCount.current = doorRevealImages.length;
  const [videoReady, setVideoReady] = React.useState(false);
  const cities = React.useMemo(() => uniqueCities(branches), [branches]);
  const finalLines = React.useMemo(() => splitSentences(subtitle), [subtitle]);
  const effectiveScrub = Math.round(isMobile ? scrubDistance * mobileScrubFactor : scrubDistance);

  /* ---------------- environment ---------------- */
  React.useEffect(() => {
    const mqMobile = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => {
      setIsMobile(mqMobile.matches);
      setIsStatic(prefersStatic());
    };
    evaluate();
    mqMobile.addEventListener("change", evaluate);
    mqMotion.addEventListener("change", evaluate);
    return () => {
      mqMobile.removeEventListener("change", evaluate);
      mqMotion.removeEventListener("change", evaluate);
    };
  }, [mobileBreakpoint]);

  React.useEffect(() => {
    if (hideSiteHeader && !isStatic) {
      setNavOffset(0);
      return;
    }
    const header = document.querySelector<HTMLElement>("body header");
    if (!header || getComputedStyle(header).position !== "fixed") return;
    const measure = () => setNavOffset(header.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, [hideSiteHeader, isStatic]);

  /** Toggle the site header (only touches the DOM when the state flips). */
  const setHeaderHidden = React.useCallback((hide: boolean) => {
    if (hide === headerHidden.current) return;
    headerHidden.current = hide;
    if (hide) document.documentElement.setAttribute("data-tf-hero", "active");
    else document.documentElement.removeAttribute("data-tf-hero");
  }, []);

  /** Floating quick actions (WhatsApp / call / socials) wait until the doors open. */
  const setActionsHidden = React.useCallback((hide: boolean) => {
    if (hide === actionsHidden.current) return;
    actionsHidden.current = hide;
    if (hide) document.documentElement.setAttribute("data-tf-actions", "hidden");
    else document.documentElement.removeAttribute("data-tf-actions");
  }, []);

  /* ---------------- optional video (deferred, blob-first) ---------------- */
  React.useEffect(() => {
    if (!useVideo || isStatic) return;
    const video = videoRef.current;
    if (!video) return;
    const src = isMobile && mobileVideoSrc ? mobileVideoSrc : videoSrc!;
    const controller = new AbortController();
    let objectUrl: string | null = null;
    const start = async () => {
      try {
        const res = await fetch(src, { signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));
        objectUrl = URL.createObjectURL(await res.blob());
        video.src = objectUrl;
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        video.preload = "auto";
        video.src = src;
      }
    };
    const id = window.setTimeout(start, 200);
    return () => {
      controller.abort();
      window.clearTimeout(id);
      video.removeAttribute("src");
      video.load();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [useVideo, isStatic, isMobile, videoSrc, mobileVideoSrc]);

  /* ---------------- per-frame rendering ---------------- */
  const render = React.useCallback((p: number) => {
    const set = (el: HTMLElement | null, styles: Partial<CSSStyleDeclaration>) => {
      if (el) Object.assign(el.style, styles);
    };

    // 1 — Opening title lifts away (0.02 → 0.20)
    const o = easeOut(range(p, 0.02, 0.2));
    set(openingRef.current, {
      opacity: String(1 - o),
      transform: `translate3d(0, ${-70 * o}px, 0) scale(${1 + 0.08 * o})`,
      filter: o > 0.001 ? `blur(${12 * o}px)` : "none",
      visibility: o >= 0.999 ? "hidden" : "visible",
    });
    set(hintRef.current, { opacity: String(1 - range(p, 0, 0.04)) });

    // 2 — Train arrives and decelerates (0.05 → 0.38)
    const a = easeOut(range(p, 0.05, 0.38));
    const offset = (trainHalf.current + window.innerWidth * 0.6) * (1 - a);
    if (trainRef.current) {
      trainRef.current.style.transform = `translate3d(calc(-50% + ${offset.toFixed(1)}px), 0, 0)`;
      trainRef.current.style.setProperty("--glare", `${(offset * 0.35).toFixed(1)}px`);
    }
    const speed = range(p, 0.05, 0.09) * (1 - range(p, 0.12, 0.36));
    set(streakRef.current, { opacity: String(speed * 0.9) });

    // 3 — LED sign + doors open (0.36 → 0.62)
    set(signRef.current, { opacity: String(range(p, 0.36, 0.42)) });
    const d = easeInOut(range(p, 0.44, 0.62));
    set(doorLRef.current, { transform: `translate3d(${-96 * d}%, 0, 0)` });
    set(doorRRef.current, { transform: `translate3d(${96 * d}%, 0, 0)` });
    set(spillRef.current, { opacity: String(d) });
    set(dimRef.current, { opacity: String(range(p, 0.5, 0.64)) });

    // 4 — Welcome + camera pushes through the doorway (0.56 → 0.86)
    const w = videoModeRef.current && doorRevealCount.current > 0 ? 0 : range(p, 0.55, 0.66) * (1 - range(p, 0.76, 0.82));
    set(welcomeRef.current, {
      opacity: String(w),
      transform: `translate3d(0, calc(50% + ${(1 - range(p, 0.55, 0.66)) * 24}px), 0) scale(${1 + 0.12 * range(p, 0.6, 0.82)})`,
      visibility: w <= 0.001 ? "hidden" : "visible",
    });
    const vm = videoModeRef.current;
    const z = easeIn(range(p, 0.62, 0.86));
    // Video mode: the footage opens the doors itself — just a slow push-in.
    set(sceneRef.current, { transform: `scale(${vm ? 1 + 0.06 * p : 1 + 2.4 * z})` });
    set(gradeRef.current, { opacity: String(0.6 + 0.38 * range(p, 0.68, 0.84)) });

    // Video mode: the academy appears in the doorway as the doors part,
    // then the doorway widens to fill the frame (stepping inside).
    if (vm && revealRef.current) {
      const open = easeInOut(range(p, 0.34, 0.52)); // doors parting (matches the footage)
      const enter = easeInOut(range(p, 0.56, 0.72)); // walking through
      const side = 50 - 23 * open - 27 * enter; // % inset left/right (doorway ≈ 27%–73%)
      const top = 12 * (1 - enter);
      const r = revealRef.current.style;
      r.clipPath = `inset(${top.toFixed(2)}% ${side.toFixed(2)}% 0% ${side.toFixed(2)}%)`;
      r.opacity = open > 0.001 ? "1" : "0";
      r.transform = `scale(${(1.12 - 0.12 * enter).toFixed(4)})`;
      const imgs = revealImgRefs.current;
      const n = imgs.length;
      imgs.forEach((img, i) => {
        if (!img) return;
        // image 0 shows first; each later image cross-fades in over the remaining story
        const fade = i === 0 ? 1 : range(p, 0.7 + (i - 1) * (0.14 / Math.max(1, n - 1)), 0.8 + (i - 1) * (0.14 / Math.max(1, n - 1)));
        img.style.opacity = String(fade);
      });
    }
    const inside = vm ? 0 : range(p, 0.74, 0.84);
    set(interiorRef.current, {
      opacity: String(inside),
      transform: `scale(${1.14 - 0.14 * inside})`,
      visibility: inside <= 0.001 ? "hidden" : "visible",
    });

    // 5 — Final message, branches, CTAs (0.82 → 0.98)
    const f = easeOut(range(p, 0.82, 0.91));
    set(finalRef.current, {
      opacity: String(f),
      transform: `translate3d(0, ${40 * (1 - f)}px, 0)`,
      filter: f < 0.999 ? `blur(${10 * (1 - f)}px)` : "none",
      visibility: f <= 0.001 ? "hidden" : "visible",
    });
    const b = easeOut(range(p, 0.86, 0.94));
    set(branchRef.current, { opacity: String(b), transform: `translate3d(0, ${20 * (1 - b)}px, 0)` });
    const c = easeOut(range(p, 0.9, 0.98));
    if (ctaRef.current) {
      ctaRef.current.style.opacity = String(c);
      ctaRef.current.style.transform = `translate3d(0, ${24 * (1 - c)}px, 0)`;
      const live = c > 0.6;
      if (live !== ctaLive.current) {
        ctaLive.current = live;
        ctaRef.current.style.pointerEvents = live ? "auto" : "none";
      }
    }

    // Journey rail
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    const idx = p < 0.4 ? 0 : p < 0.62 ? 1 : p < 0.8 ? 2 : p < 0.9 ? 3 : 4;
    if (idx !== activeChapter.current) {
      activeChapter.current = idx;
      chapterRefs.current.forEach((el, i) => {
        if (el) el.dataset.state = i < idx ? "done" : i === idx ? "active" : "todo";
      });
    }

    // Optional video scrub — remember the wanted time, seek as soon as the decoder is free.
    wantedProgress.current = p;
    pumpSeek();
  }, []);

  const loop = React.useCallback(() => {
    const diff = target.current - current.current;
    current.current = Math.abs(diff) < 0.0004 ? target.current : current.current + diff * (videoModeRef.current ? 0.1 : 0.14);
    render(current.current);
    raf.current = current.current !== target.current && visible.current ? requestAnimationFrame(loop) : null;
  }, [render]);

  const readProgress = React.useCallback(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const travel = section.offsetHeight - stage.offsetHeight;
    const top = section.getBoundingClientRect().top;
    target.current = travel > 0 ? clamp(-top / travel) : 0;
    // Header stays hidden for the whole story, returns once the hero starts scrolling away.
    if (hideSiteHeader) setHeaderHidden(top <= 1 && top > -(travel + 40));
    setActionsHidden(top <= 1 && target.current < 0.6);
  }, [hideSiteHeader, setHeaderHidden, setActionsHidden]);

  const requestTick = React.useCallback(() => {
    readProgress();
    if (raf.current == null) raf.current = requestAnimationFrame(loop);
  }, [readProgress, loop]);

  React.useEffect(() => {
    if (isStatic) return;
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      if (trainRef.current) trainHalf.current = trainRef.current.offsetWidth / 2;
    };
    measure();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting) requestTick();
      },
      { rootMargin: "100px 0px" }
    );
    io.observe(section);

    const onScroll = () => visible.current && requestTick();
    const onResize = () => {
      measure();
      requestTick();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    readProgress();
    current.current = target.current;
    activeChapter.current = -1;
    ctaLive.current = false;
    render(current.current);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
      setHeaderHidden(false);
      setActionsHidden(false);
    };
  }, [isStatic, isMobile, effectiveScrub, useVideo, readProgress, requestTick, render]);

  /* ---------------- navigation + a11y ---------------- */
  const navigate = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (/^(https?:)?\/\//.test(href) || href.startsWith("#")) return;
    e.preventDefault();
    onNavigate(href);
  };

  const revealOnFocus = () => {
    if (isStatic || target.current >= 0.97) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const end = section.getBoundingClientRect().top + window.scrollY + section.offsetHeight - stage.offsetHeight;
    window.scrollTo({ top: end, behavior: "auto" });
  };

  const skipIntro = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const next = document.getElementById(nextSectionId);
    if (!next) return;
    e.preventDefault();
    next.scrollIntoView({ behavior: "smooth", block: "start" });
    next.focus({ preventScroll: true });
  };

  /* ---------------- pieces ---------------- */
  const sectionStyle = {
    "--tf-nav": `${navOffset}px`,
    height: isStatic ? undefined : `calc(100vh + ${effectiveScrub}px)`,
  } as React.CSSProperties;

  const branchLine = branchCount > 0 && (
    <div ref={branchRef} className="mt-6 flex flex-col items-center gap-2 sm:mt-9" style={isStatic ? undefined : { opacity: 0 }}>
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7FE3EE] sm:text-xs">
        {branchCount} Branches Across India
      </p>
      {cities.length > 0 && (
        <p className="hidden max-w-[34rem] text-sm text-white/60 sm:block">
          {cities.slice(0, 5).join(" · ")}
          {cities.length > 5 ? " & more" : ""}
        </p>
      )}
    </div>
  );

  const ctas = (
    <div
      ref={ctaRef}
      onFocusCapture={revealOnFocus}
      className="mt-6 flex w-full max-w-sm flex-col items-center gap-2.5 sm:mt-9 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center sm:gap-3"
      style={isStatic ? undefined : { opacity: 0, pointerEvents: "none" }}
    >
      <a
        href={primaryCtaHref}
        onClick={navigate(primaryCtaHref)}
        className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-7 font-display text-sm font-bold text-[#06213F] shadow-[0_12px_40px_-12px_rgba(18,191,209,0.6)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#E9FBFD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7FE3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06213F] sm:h-12 sm:w-auto"
      >
        {primaryCtaText}
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <a
        href={secondaryCtaHref}
        onClick={navigate(secondaryCtaHref)}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.07] px-7 font-display text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-white/45 hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7FE3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06213F] sm:h-12 sm:w-auto"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M10 18s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" strokeLinejoin="round" />
          <circle cx="10" cy="8" r="2.2" />
        </svg>
        {secondaryCtaText}
      </a>
      {tertiaryCtaText && (
        <a
          href={tertiaryCtaHref}
          onClick={navigate(tertiaryCtaHref)}
          className="inline-flex h-10 items-center justify-center px-4 font-display text-sm font-semibold text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7FE3EE] sm:h-12"
        >
          {tertiaryCtaText}
        </a>
      )}
    </div>
  );

  const finalBlock = (
    <>
      {logoSrc ? (
        // Static mode already shows the logo above the page title.
        !isStatic && (
          <img
            src={logoSrc}
            alt={`${academyName.charAt(0) + academyName.slice(1).toLowerCase()} – ${tagline}`}
            width={720}
            height={165}
            decoding="async"
            className="h-auto w-[clamp(160px,18vw,260px)] -translate-x-[9%] drop-shadow-[0_4px_24px_rgba(3,11,23,0.6)]"
          />
        )
      ) : (
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.34em] text-[#7FE3EE] sm:text-xs">
          Welcome to {academyName.charAt(0) + academyName.slice(1).toLowerCase()}
        </p>
      )}
      <p className="mt-5 font-display text-[clamp(1.75rem,6vw,4.5rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-white sm:mt-5">
        {finalLines.map((line, i) => (
          <span key={line} className={`block ${i === finalLines.length - 1 ? "bg-gradient-to-r from-white via-[#C9F5FA] to-[#7FE3EE] bg-clip-text text-transparent" : ""}`}>
            {line}
          </span>
        ))}
      </p>
      <p className="mx-auto mt-4 max-w-[36rem] text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base">{description}</p>
      {branchLine}
      {ctas}
    </>
  );

  /** The academy, as seen through the open doors. */
  const interiorArt = (
    <>
      <img src={interiorImageSrc} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,26,51,0.82)_0%,rgba(6,26,51,0.62)_45%,rgba(6,26,51,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,13,28,0.6)_100%)]" />
    </>
  );

  /* ---------------- render ---------------- */
  return (
    <section
      ref={sectionRef}
      aria-label={`${academyName} ${tagline}`}
      className={`relative w-full bg-[#040F20] ${isStatic ? "min-h-[100svh]" : ""} ${className}`}
      style={sectionStyle}
    >
      <div
        ref={stageRef}
        className={`${isStatic ? "relative min-h-[100svh]" : "sticky top-0 h-screen supports-[height:100svh]:h-[100svh]"} w-full overflow-hidden [--car-h:min(calc((100vh_-_var(--tf-nav))*0.5),420px)] [--door-w:clamp(150px,40vw,230px)] [--plat-h:15vh] md:[--car-h:min(calc((100vh_-_var(--tf-nav))*0.6),560px)] md:[--door-w:clamp(200px,19vw,330px)] md:[--plat-h:16vh]`}
      >
        {isStatic ? (
          /* ---------- Static: doors already open, everything readable ---------- */
          <>
            <div className="absolute inset-0" aria-hidden="true">{interiorArt}</div>
            <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-12 pt-[calc(var(--tf-nav)+2.5rem)] text-center">
              {logoSrc && <img
                    src={logoSrc}
                    alt={`${academyName.charAt(0) + academyName.slice(1).toLowerCase()} – ${tagline}`}
                    width={720}
                    height={165}
                    decoding="async"
                    fetchPriority="high"
                    className="mx-auto mb-6 h-auto w-[clamp(170px,22vw,300px)] -translate-x-[9%] drop-shadow-[0_4px_24px_rgba(3,11,23,0.6)] sm:mb-8"
                  />}
              <h1 className="mx-auto mb-8 max-w-[18ch] font-display text-[clamp(1.5rem,3.6vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.01em] text-white/90">
                {title}
              </h1>
              {finalBlock}
            </div>
          </>
        ) : (
          <>
            {/* ================= SCENE (zooms through the door) ================= */}
            <div ref={sceneRef} aria-hidden="true" className="absolute inset-0 origin-[50%_calc(100%-var(--plat-h)-var(--car-h)*0.46)]">
              {useVideo ? (
                <>
                {videoPosterSrc && (
                  <img src={videoPosterSrc} alt="" decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
                )}
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  disablePictureInPicture
                  preload="metadata"
                  tabIndex={-1}
                  onLoadedData={(e) => {
                    const v = e.currentTarget;
                    v.play().then(() => v.pause()).catch(() => {}).finally(() => {
                      setVideoReady(true);
                      requestTick();
                    });
                  }}
                  onSeeked={pumpSeek}
                  onError={() => setVideoFailed(true)}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
                />
                {/* Academy photos revealed through the opening doors */}
                {doorRevealImages.length > 0 && (
                  <div ref={revealRef} className="absolute inset-0 will-change-[clip-path,transform]" style={{ opacity: 0, clipPath: "inset(12% 50% 0% 50%)" }}>
                    {doorRevealImages.map((src, i) => (
                      <img
                        key={src + i}
                        ref={(el) => {
                          revealImgRefs.current[i] = el;
                        }}
                        src={src}
                        alt=""
                        decoding="async"
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ opacity: i === 0 ? 1 : 0 }}
                      />
                    ))}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(4,15,32,0.45)_100%)]" />
                  </div>
                )}
                {/* Navy grade — deepens toward the end so the final message reads */}
                <div
                  ref={gradeRef}
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,15,32,0.85)_0%,rgba(4,15,32,0.55)_35%,rgba(4,15,32,0.65)_70%,rgba(4,15,32,0.95)_100%)]"
                  style={{ opacity: 0.6 }}
                />
                </>
              ) : (
                <>
                  {/* Tunnel */}
                  <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_30%,#0C2A4F_0%,#061A33_45%,#030B17_100%)]" />
                  <div className="absolute inset-x-0 top-[9%] flex justify-between px-[4vw] opacity-80">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} className="h-1.5 w-16 rounded-full bg-[#BFEFF5] shadow-[0_0_24px_6px_rgba(127,227,238,0.35)] md:w-28" />
                    ))}
                  </div>
                  <div className="absolute inset-x-0 top-[9%] h-[40%] bg-[linear-gradient(180deg,rgba(127,227,238,0.08),transparent)]" />
                  {/* Back wall branding */}
                  <p className="absolute inset-x-0 top-[17%] text-center font-display text-[11px] font-semibold uppercase tracking-[0.6em] text-white/15 md:text-sm">
                    {academyName} · Station
                  </p>

                  {/* Speed streaks while the train is moving */}
                  <div
                    ref={streakRef}
                    className="absolute inset-x-0 bottom-[calc(var(--plat-h)+var(--car-h)*0.1)] h-[calc(var(--car-h)*0.8)] opacity-0 [background:repeating-linear-gradient(180deg,transparent_0_22px,rgba(191,239,245,0.12)_22px_23px)] [mask-image:linear-gradient(90deg,transparent,black_30%,black_70%,transparent)]"
                  />

                  {/* ---------- Train carriage ---------- */}
                  <div
                    ref={trainRef}
                    className="absolute bottom-[var(--plat-h)] left-1/2 h-[var(--car-h)] w-[calc(var(--door-w)*15)] rounded-l-[calc(var(--car-h)*0.45)] rounded-r-[24px] bg-[linear-gradient(180deg,#F4F7FB_0%,#DCE4EE_55%,#B9C6D6_100%)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),inset_0_2px_0_rgba(255,255,255,0.9)] [--glare:0px]"
                    style={{ transform: "translate3d(calc(-50% + 200vw), 0, 0)" }}
                  >
                    {/* roof line */}
                    <div className="absolute inset-x-[3%] top-[4%] h-[3px] rounded-full bg-[#9FB0C4]/60" />
                    {/* livery */}
                    <div className="absolute inset-x-0 bottom-[10%] h-[13%] bg-[linear-gradient(90deg,#063B7A,#0B4F9C_60%,#0E8FA0)]" />
                    <div className="absolute inset-x-0 bottom-[24%] h-[3px] bg-[#12BFD1] shadow-[0_0_12px_rgba(18,191,209,0.8)]" />
                    <div className="absolute inset-x-0 bottom-0 h-[10%] rounded-br-[24px] bg-[#2A3A4F]" />
                    {/* headlight on the nose */}
                    <div className="absolute bottom-[30%] left-[1.2%] h-[5%] w-[1.6%] rounded-full bg-white shadow-[0_0_40px_14px_rgba(255,255,255,0.55)]" />

                    {/* windows — left & right of the door */}
                    {(["left", "right"] as const).map((side) => (
                      <div
                        key={side}
                        className={`absolute top-[16%] flex h-[42%] gap-[calc(var(--door-w)*0.22)] ${side === "left" ? "right-[calc(50%+var(--door-w)*0.72)] flex-row-reverse" : "left-[calc(50%+var(--door-w)*0.72)]"}`}
                      >
                        {Array.from({ length: WINDOWS_PER_SIDE }).map((_, i) => (
                          <span
                            key={i}
                            className="h-full w-[calc(var(--door-w)*0.82)] shrink-0 rounded-[14px] border-[3px] border-[#C7D2DF] bg-[#0A1C33] [background-image:linear-gradient(105deg,transparent_35%,rgba(191,239,245,0.22)_45%,transparent_55%),linear-gradient(180deg,#123257,#071629)] [background-position:var(--glare)_0,0_0] [background-size:220%_100%,100%_100%]"
                          />
                        ))}
                      </div>
                    ))}

                    {/* LED station sign */}
                    <div
                      ref={signRef}
                      className="absolute bottom-[calc(86%+4px)] left-1/2 w-[calc(var(--door-w)*1.25)] -translate-x-1/2 rounded-md bg-[#050B14] px-2 py-1 text-center font-mono text-[9px] font-bold tracking-[0.18em] text-[#5EF0FF] opacity-0 shadow-[0_0_18px_rgba(94,240,255,0.35)] [text-shadow:0_0_8px_rgba(94,240,255,0.9)] md:text-[11px]"
                    >
                      {stationText}
                    </div>

                    {/* ---------- Door ---------- */}
                    <div className="absolute bottom-[4%] left-1/2 h-[82%] w-[var(--door-w)] -translate-x-1/2">
                      {/* aperture: the academy behind the doors */}
                      <div className="absolute inset-0 overflow-hidden rounded-t-[12px] bg-[#061A33]">
                        {interiorArt}
                        <div className="absolute inset-x-0 top-0 h-[10%] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),transparent)]" />
                      </div>
                      {/* panels */}
                      {(["L", "R"] as const).map((s) => (
                        <div
                          key={s}
                          ref={s === "L" ? doorLRef : doorRRef}
                          className={`absolute inset-y-0 w-1/2 bg-[linear-gradient(180deg,#F1F5FA,#CBD6E3)] shadow-[inset_0_0_0_2px_#B3C1D2] ${s === "L" ? "left-0 rounded-tl-[12px]" : "right-0 rounded-tr-[12px]"}`}
                        >
                          <span className={`absolute top-[10%] h-[46%] w-[66%] rounded-[10px] border-[3px] border-[#B3C1D2] bg-[#0A1C33] [background-image:linear-gradient(115deg,transparent_40%,rgba(191,239,245,0.25)_50%,transparent_60%)] ${s === "L" ? "right-[14%]" : "left-[14%]"}`} />
                          <span className={`absolute bottom-[14%] h-[12%] w-[5px] rounded-full bg-[#12BFD1] shadow-[0_0_10px_rgba(18,191,209,0.9)] ${s === "L" ? "right-[3px]" : "left-[3px]"}`} />
                        </div>
                      ))}
                      {/* door frame */}
                      <div className="pointer-events-none absolute -inset-x-[6px] -top-[6px] bottom-0 rounded-t-[16px] border-[6px] border-b-0 border-[#9FB0C4]" />
                    </div>

                    {/* Livery wordmark */}
                    <p className="absolute bottom-[12.5%] left-[calc(50%+var(--door-w)*0.95)] hidden font-display md:block text-[clamp(10px,1.1vw,16px)] font-extrabold tracking-[0.42em] text-white/95">
                      {academyName}
                    </p>
                    <p className="absolute bottom-[12.5%] right-[calc(50%+var(--door-w)*0.95)] hidden font-display md:block text-[clamp(10px,1.1vw,16px)] font-semibold tracking-[0.3em] text-white/70">
                      {tagline.toUpperCase()}
                    </p>
                  </div>

                  {/* Platform dims as the doors open — the doorway stays lit */}
                  <div
                    ref={dimRef}
                    className="pointer-events-none absolute inset-0 opacity-0"
                    style={{
                      background:
                        "radial-gradient(calc(var(--door-w) * 1.1) calc(var(--car-h) * 0.75) at 50% calc(100% - var(--plat-h) - var(--car-h) * 0.45), transparent 55%, rgba(3,11,23,0.78) 100%)",
                    }}
                  />

                  {/* Light spilling from the open door onto the platform */}
                  <div
                    ref={spillRef}
                    className="absolute bottom-0 left-1/2 h-[calc(var(--plat-h)+20px)] w-[calc(var(--door-w)*3)] -translate-x-1/2 opacity-0 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(191,239,245,0.45),transparent_75%)]"
                  />

                  {/* Platform */}
                  <div className="absolute inset-x-0 bottom-0 h-[var(--plat-h)] bg-[linear-gradient(180deg,#1B2A3D_0%,#0B1626_100%)]">
                    <div className="absolute inset-x-0 top-0 h-[6px] bg-[repeating-linear-gradient(90deg,#E8C547_0_14px,#C9A92E_14px_16px)] opacity-80" />
                    <div className="absolute inset-x-0 top-[6px] h-px bg-[#12BFD1]/50" />
                    <div className="absolute inset-0 top-[7px] [background:repeating-linear-gradient(90deg,transparent_0_119px,rgba(255,255,255,0.04)_119px_120px)]" />
                  </div>
                </>
              )}
            </div>

            {/* Full-bleed interior once the camera is through the door */}
            <div ref={interiorRef} aria-hidden="true" className="absolute inset-0" style={{ opacity: 0, visibility: "hidden" }}>
              {interiorArt}
            </div>

            {/* ================= TEXT ================= */}
            <div className="relative z-10 flex h-full flex-col pt-[var(--tf-nav)]">
              <div className="relative flex-1">
                {/* Opening */}
                <div ref={openingRef} className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-[18vh] sm:px-6">
                  {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`${academyName.charAt(0) + academyName.slice(1).toLowerCase()} – ${tagline}`}
                    width={720}
                    height={165}
                    decoding="async"
                    fetchPriority="high"
                    className="mb-6 h-auto w-[clamp(170px,22vw,300px)] -translate-x-[9%] drop-shadow-[0_4px_24px_rgba(3,11,23,0.6)] sm:mb-8"
                  />
                  ) : (
                  <p className="mb-5 text-center font-display text-[11px] font-semibold uppercase tracking-[0.36em] text-white/70 sm:text-xs">
                    {academyName} <span className="text-[#7FE3EE]">·</span> {tagline}
                  </p>
                  )}
                  <h1 className="mx-auto max-w-[15ch] text-center font-display text-[clamp(2.1rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-white [text-shadow:0_4px_40px_rgba(3,13,28,0.6)]">
                    {title}
                  </h1>
                </div>

                {/* Scroll hint */}
                <div ref={hintRef} className="pointer-events-none absolute inset-x-0 bottom-[calc(var(--plat-h)+1.5rem)] flex flex-col items-center gap-3" aria-hidden="true">
                  <span className="font-display text-[10px] font-semibold uppercase tracking-[0.4em] text-white/60">{useVideo ? "Scroll · doors opening" : "Scroll · the train is arriving"}</span>
                  <span className="relative h-10 w-px overflow-hidden bg-white/15">
                    <span className="absolute inset-x-0 top-0 h-1/2 animate-[tf-hint_1.8s_ease-in-out_infinite] bg-[#7FE3EE]" />
                  </span>
                </div>

                {/* Welcome (as the doors open) */}
                <div
                  ref={welcomeRef}
                  className={`absolute inset-x-0 ${useVideo ? "bottom-1/2" : "bottom-[calc(var(--plat-h)+var(--car-h)*0.5)]"} flex flex-col items-center px-4 text-center [text-shadow:0_2px_30px_rgba(3,11,23,0.9)]`}
                  style={{ opacity: 0, visibility: "hidden" }}
                >
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.5em] text-[#7FE3EE] sm:text-sm">Welcome to</span>
                  <span className="mt-2 font-display text-[clamp(2.2rem,8vw,6.5rem)] font-extrabold leading-none tracking-[0.04em] text-white [text-shadow:0_0_60px_rgba(127,227,238,0.45)]">
                    {academyName}
                  </span>
                </div>

                {/* Final */}
                <div
                  ref={finalRef}
                  className="absolute inset-0 flex flex-col items-center justify-center px-5 pb-12 text-center sm:pb-16"
                  style={{ opacity: 0, visibility: "hidden" }}
                >
                  {finalBlock}
                </div>

                {/* Journey rail */}
                <div className="pointer-events-none absolute inset-x-0 bottom-5 px-6 sm:bottom-7" aria-hidden="true">
                  <div className="mx-auto max-w-xl">
                    <div className="relative h-px w-full bg-white/15">
                      <div ref={barRef} className="absolute inset-0 origin-left bg-gradient-to-r from-[#12BFD1] to-white" style={{ transform: "scaleX(0)" }} />
                    </div>
                    <ol className="mt-3 hidden justify-between sm:flex">
                      {CHAPTERS.map((c, i) => (
                        <li
                          key={c}
                          ref={(el) => {
                            chapterRefs.current[i] = el;
                          }}
                          data-state="todo"
                          className="font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35 transition-colors duration-500 data-[state=active]:text-white data-[state=done]:text-white/60"
                        >
                          {c}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={`#${nextSectionId}`}
              onClick={skipIntro}
              className="sr-only z-20 rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-[#06213F] focus:not-sr-only focus:absolute focus:right-4 focus:top-[calc(var(--tf-nav)+1rem)]"
            >
              Skip intro
            </a>
          </>
        )}
      </div>

      <style>{`@keyframes tf-hint{0%{transform:translateY(-100%)}60%,100%{transform:translateY(200%)}}html[data-tf-hero=active] body header{transform:translateY(-110%);opacity:0;visibility:hidden;pointer-events:none;transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .3s ease,visibility 0s linear .45s}[data-floating-actions]{transition:opacity .5s ease,translate .6s cubic-bezier(.16,1,.3,1),visibility 0s}html[data-tf-actions=hidden] [data-floating-actions]{opacity:0;translate:32px 0;visibility:hidden;pointer-events:none;transition:opacity .3s ease,translate .4s ease,visibility 0s linear .4s}`}</style>
    </section>
  );
}

export default ThoughtflowsMedicalCodingHero;
