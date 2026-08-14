import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useTransform,
  animate
} from "framer-motion";
import { MapPin, X, ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { BRANCHES } from "../../data/branches";

/** Splits the "City, State" strings in the branch data into their parts for display. */
function splitCity(city) {
  const [cityPart, statePart] = (city || "").split(",").map((s) => s.trim());
  return { cityPart: cityPart || city || "", statePart: statePart || "" };
}

/* ------------------------------------------------------------------ */
/* Layout tuning per breakpoint. cardW/cardH drive the physical card    */
/* size; radius is derived from cardW + branch count so the cylinder    */
/* always keeps cards edge-to-edge without overlap.                     */
/* ------------------------------------------------------------------ */
function computeDims(width) {
  if (width < 560) return { cardW: 190, cardH: 270, perspective: 900, stageHeight: 360 };
  if (width < 768) return { cardW: 230, cardH: 310, perspective: 1050, stageHeight: 400 };
  if (width < 1024) return { cardW: 260, cardH: 340, perspective: 1200, stageHeight: 440 };
  if (width < 1440) return { cardW: 300, cardH: 380, perspective: 1450, stageHeight: 500 };
  return { cardW: 340, cardH: 420, perspective: 1700, stageHeight: 560 };
}

const CLICK_THRESHOLD = 8; // px of pointer travel below which a tap counts as a click, not a drag
const DRAG_SENSITIVITY = 0.18; // degrees of rotation per pixel of horizontal drag — lower = heavier, less twitchy
const MOMENTUM_PROJECTION_MS = 180; // how far (in ms) release velocity is projected forward, i.e. how far a flick carries
// Tuned for "smooth, heavy, cinematic, precise" per spec: damping ratio ~0.97 (just at critical
// damping) so every settle glides to a stop with zero bounce, while still arriving briskly.
const SETTLE_SPRING = { type: "spring", stiffness: 140, damping: 24, mass: 1.1 };

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
/** Shortest rotational delta (in degrees, -180..180) from `current` to `target`. */
const shortestDelta = (current, target) => (((target - current) % 360) + 540) % 360 - 180;

/* ------------------------------------------------------------------ */
/* Ambient medical-network background — subtle, aria-hidden, and inert  */
/* under prefers-reduced-motion. Siblings of the motifs used on          */
/* CoursesPreview, kept local since each section owns its own decor.     */
/* ------------------------------------------------------------------ */

function MedicalGrid() {
  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(rgba(21,63,108,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(21,63,108,0.05) 1px, transparent 1px)",
        backgroundSize: "46px 46px",
        maskImage: "radial-gradient(ellipse 75% 65% at 50% 35%, black 30%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 35%, black 30%, transparent 85%)"
      }}
    />
  );
}

const PARTICLES = [
  { top: "14%", left: "5%", size: 5, delay: 0, duration: 8 },
  { top: "72%", left: "8%", size: 3, delay: 1.4, duration: 9.5 },
  { top: "22%", left: "93%", size: 4, delay: 0.7, duration: 7.5 },
  { top: "80%", left: "90%", size: 6, delay: 2, duration: 10 },
  { top: "48%", left: "2%", size: 3, delay: 2.6, duration: 8.5 },
  { top: "58%", left: "96%", size: 4, delay: 1, duration: 7 }
];

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-teal-400/40 blur-[1px] motion-reduce:animate-none animate-float-slow"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
        />
      ))}
    </div>
  );
}

const ECG_PATH =
  "M0,30 L60,30 L75,30 L85,8 L95,52 L105,18 L115,30 L160,30 L175,30 L185,10 L195,50 L205,20 L215,30 L400,30";

function EcgLine({ className = "" }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div className="relative h-10 w-full overflow-hidden">
        <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="branchEcgGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#16ADBA" stopOpacity="0" />
              <stop offset="50%" stopColor="#16ADBA" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#16ADBA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={ECG_PATH}
            fill="none"
            stroke="url(#branchEcgGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <motion.span
          className="absolute h-1.5 w-1.5 rounded-full bg-teal-400 shadow-glow motion-reduce:hidden"
          animate={{ left: ["0%", "100%"], top: ["50%", "18%", "83%", "13%", "50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.5 }}
        />
      </div>
    </div>
  );
}

/** Abstract network of the branch locations — a visual "this academy is a connected system"
 *  motif, not a literal geographic map (the API doesn't carry verified lat/lng yet). */
function NetworkNodes({ total, activeIndex }) {
  const nodes = useMemo(() => {
    if (!total) return [];
    return Array.from({ length: total }, (_, i) => {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      return { cx: 50 + Math.cos(angle) * 40, cy: 50 + Math.sin(angle) * 40 };
    });
  }, [total]);

  if (!nodes.length) return null;

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-60"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {nodes.map((node, i) => {
        const next = nodes[(i + 1) % nodes.length];
        const isLive = i === activeIndex || (i + 1) % nodes.length === activeIndex;
        return (
          <line
            key={`edge-${i}`}
            x1={node.cx}
            y1={node.cy}
            x2={next.cx}
            y2={next.cy}
            stroke="#16ADBA"
            strokeWidth={isLive ? 0.25 : 0.15}
            strokeOpacity={isLive ? 0.5 : 0.18}
            strokeDasharray="1.2 1.6"
          />
        );
      })}
      {nodes.map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.cx}
          cy={node.cy}
          r={i === activeIndex ? 1.1 : 0.55}
          fill={i === activeIndex ? "#0B8995" : "#16ADBA"}
          opacity={i === activeIndex ? 0.9 : 0.35}
          animate={i === activeIndex ? { r: [0.9, 1.5, 0.9] } : {}}
          transition={i === activeIndex ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : {}}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* A single branch card, positioned on the cylinder via a shared         */
/* `groupRotation` motion value. All per-frame math happens inside       */
/* motion-value transforms (GPU transform/opacity writes only) — no      */
/* React state changes while dragging.                                   */
/* ------------------------------------------------------------------ */
function BranchOrbitCard({ branch, index, angleStep, radius, perspective, groupRotation, cardW, cardH, onOpen }) {
  const angle = useTransform(groupRotation, (r) => index * angleStep + r);

  // CSS `perspective` inherently magnifies anything translated toward the
  // viewer (positive world Z) and shrinks anything pushed away — on a
  // cylinder that means the front card gets magnified for free just from
  // sitting at translateZ(radius). Left alone, that stacks with our own
  // depth-based scale below and the front card balloons far past cardW/H.
  // We cancel that built-in magnification exactly (perspective / (perspective
  // - worldZ) and its inverse multiply out to 1) so the only thing left
  // controlling apparent size is the explicit `scale` curve here — the
  // front card always renders at exactly cardW x cardH.
  const transform = useTransform(angle, (deg) => {
    const rad = (deg * Math.PI) / 180;
    const worldZ = radius * Math.cos(rad);
    const perspectiveCompensation = (perspective - worldZ) / perspective;
    const depth = Math.pow((Math.cos(rad) + 1) / 2, 1.6); // 1 = facing viewer, 0 = facing away
    const scale = (0.68 + depth * 0.32) * perspectiveCompensation;
    return `translate3d(-50%, -50%, 0) rotateY(${deg}deg) translateZ(${radius}px) scale(${scale})`;
  });

  const opacity = useTransform(angle, (deg) => {
    const rad = (deg * Math.PI) / 180;
    const depth = Math.pow((Math.cos(rad) + 1) / 2, 1.6);
    return clamp(depth * 1.25 - 0.08, 0.1, 1);
  });

  const pointerEvents = useTransform(opacity, (o) => (o > 0.4 ? "auto" : "none"));

  const { cityPart, statePart } = splitCity(branch.city);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      data-card-index={index}
      aria-label={`View details for Thoughtflows Academy ${branch.name}, ${branch.city}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="absolute top-1/2 left-1/2 rounded-[26px] overflow-hidden border border-navy-900/10 shadow-premium outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.98] transition-shadow duration-300"
      style={{
        width: cardW,
        height: cardH,
        transform,
        opacity,
        pointerEvents,
        willChange: "transform, opacity"
      }}
    >
      <img
        src={branch.heroImage}
        alt={`Thoughtflows Academy ${branch.name} campus, ${branch.city}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-ink-950/10" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/35 to-teal-900/15 mix-blend-multiply" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.09]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "18px 18px"
        }}
      />

      <div className="absolute top-3 inset-x-3 flex items-start justify-between gap-2">
        <span className="text-[8px] font-semibold tracking-[0.16em] text-white/50 uppercase">Medical Coding Centre</span>
        <div className="flex flex-col items-end gap-1.5">
          {branch.hasStudio && (
            <span className="bg-teal-500 text-ink-950 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wide">
              Studio
            </span>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-3.5">
        <div className="flex items-center gap-1.5 text-teal-300 text-[10px] font-medium">
          <MapPin size={11} className="shrink-0" /> {cityPart}
        </div>
        <h4 className="text-white font-semibold text-[15px] leading-snug mt-0.5">{branch.name}</h4>
        {statePart && <p className="text-white/40 text-[9.5px] mt-1 tracking-wide">{statePart}</p>}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Expanded branch details — a fullscreen "digital campus profile".     */
/* ------------------------------------------------------------------ */
function BranchModal({ branch, onClose }) {
  const closeBtnRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  const { cityPart, statePart } = splitCity(branch.city);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-xl" aria-hidden="true" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="branch-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl border border-navy-900/10 bg-white shadow-2xl"
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close branch details"
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white text-navy-900 flex items-center justify-center backdrop-blur shadow-sm transition-colors"
        >
          <X size={18} />
        </button>

        <div className="relative h-56 md:h-72 overflow-hidden rounded-t-3xl">
          <img src={branch.heroImage} alt={`${branch.name} campus`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          <div className="absolute bottom-5 left-6 md:left-8 right-16">
            <span className="inline-flex items-center gap-1.5 text-teal-300 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <MapPin size={12} /> {branch.hasStudio ? "Branch Campus + Studio" : "Branch Campus"}
            </span>
            <h2 id="branch-modal-title" className="text-2xl md:text-3xl font-bold text-white mt-2">
              Thoughtflows Academy &mdash; {branch.name}
            </h2>
            <p className="text-white/70 text-sm mt-1">
              {cityPart}
              {statePart ? `, ${statePart}` : ""}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-6">
            <div>
              <h3 className="text-navy-900/80 text-sm font-semibold uppercase tracking-wide mb-3">Address</h3>
              <p className="text-navy-900/60 text-sm leading-relaxed flex items-start gap-2">
                <MapPin size={15} className="text-teal-600 shrink-0 mt-0.5" /> {branch.address}
              </p>
            </div>

            {branch.gallery?.length > 0 && (
              <div>
                <h3 className="text-navy-900/80 text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Images size={14} className="text-teal-600" /> Inside This Branch
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {branch.gallery.map((g) => (
                    <div key={g.url} className="relative rounded-xl overflow-hidden aspect-[4/3] group">
                      <img
                        src={g.url}
                        alt={`${branch.name} — ${g.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute bottom-1.5 left-2 right-2 text-white text-[10px] font-medium leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                        {g.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {branch.mapEmbedUrl && (
              <div>
                <h3 className="text-navy-900/80 text-sm font-semibold uppercase tracking-wide mb-3">Find Us</h3>
                <div className="rounded-xl overflow-hidden border border-navy-900/10">
                  <iframe
                    title={`${branch.name} branch map`}
                    src={branch.mapEmbedUrl}
                    className="w-full h-56 border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-navy-900/10 bg-navy-900/[0.03] p-5 flex flex-col gap-4">
              <h3 className="text-navy-900 text-sm font-semibold">{branch.name} Branch</h3>
              <p className="text-navy-900/50 text-sm">Talk to our team about courses, batches, and fees at this location.</p>
              <Link
                to={`/contact?branch=${branch.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-ink-950 font-semibold text-sm px-5 py-3 shadow-glow hover:shadow-glow-lg transition-shadow"
              >
                Enquire Now <ArrowRight size={15} />
              </Link>
              {branch.gmapUrl && (
                <a
                  href={branch.gmapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-900/15 text-navy-900/70 text-sm px-5 py-3 hover:bg-navy-900/5 transition-colors"
                >
                  Open in Google Maps <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */
export default function BranchesPreview() {
  const branches = BRANCHES;
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [dims, setDims] = useState(() => computeDims(typeof window !== "undefined" ? window.innerWidth : 1280));

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const inViewRef = useRef(false);
  const rotation = useMotionValue(0);
  const controlsRef = useRef(null);
  const pointerRef = useRef({ down: false, x: 0, y: 0, moved: false, startRotation: 0, lastX: 0, lastT: 0, velocity: 0, targetIndex: null });

  const total = branches?.length || 0;
  const angleStep = total ? 360 / total : 0;
  const radius = useMemo(() => {
    if (!total) return 0;
    const base = dims.cardW / 2 / Math.tan(Math.PI / total);
    // Reduced radius multiplier to bring adjacent 3D cards closer together
    return clamp(base * 0.82, 180, dims.perspective * 0.55);
  }, [dims.cardW, dims.perspective, total]);

  // Responsive breakpoint tracking (single state update per resize, never per frame).
  useEffect(() => {
    let raf;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setDims(computeDims(window.innerWidth)));
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Reset to the first branch whenever the branch count actually changes.
  useEffect(() => {
    if (!branches) return;
    rotation.set(0);
    setActiveIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branches?.length]);

  // Scope arrow-key navigation to when the carousel is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cancelMomentum = useCallback(() => {
    controlsRef.current?.stop?.();
    controlsRef.current = null;
  }, []);

  const goTo = useCallback(
    (idx) => {
      if (!total) return;
      cancelMomentum();
      const normalized = ((idx % total) + total) % total;
      const current = rotation.get();
      const rawTarget = -normalized * angleStep;
      const target = current + shortestDelta(current, rawTarget);
      controlsRef.current = animate(rotation, target, {
        type: "spring",
        stiffness: 130,
        damping: 20,
        mass: 0.9,
        onUpdate: (latest) => {
          const liveIdx = Math.round((((-latest / angleStep) % total) + total) % total);
          setActiveIndex(liveIdx);
        },
        onComplete: () => {
          setActiveIndex(normalized);
          controlsRef.current = null;
        }
      });
    },
    [angleStep, total, cancelMomentum, rotation]
  );

  const settle = useCallback(
    (velocity) => {
      if (!total) return;
      // Projected momentum based on release velocity (deg/ms)
      const momentum = clamp(velocity * MOMENTUM_PROJECTION_MS, -angleStep * 2.5, angleStep * 2.5);
      const projected = rotation.get() + momentum;
      const target = Math.round(projected / angleStep) * angleStep;
      
      // Convert velocity from deg/ms to deg/s for Framer Motion initial velocity
      const initialVelocity = velocity * 1000;

      controlsRef.current = animate(rotation, target, {
        type: "spring",
        stiffness: 120,
        damping: 19,
        mass: 0.85,
        velocity: initialVelocity,
        onUpdate: (latest) => {
          const liveIdx = Math.round((((-latest / angleStep) % total) + total) % total);
          setActiveIndex(liveIdx);
        },
        onComplete: () => {
          const finalIdx = Math.round((((-target / angleStep) % total) + total) % total);
          setActiveIndex(finalIdx);
          controlsRef.current = null;
        }
      });
    },
    [angleStep, total, rotation]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (!inViewRef.current || selectedBranch) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable) return;
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      else if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo, selectedBranch]);

  const handlePointerDown = useCallback(
    (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      cancelMomentum();
      stageRef.current?.setPointerCapture?.(e.pointerId);
      const cardEl = e.target.closest?.("[data-card-index]");
      const now = performance.now();
      pointerRef.current = {
        down: true,
        x: e.clientX,
        y: e.clientY,
        moved: false,
        startRotation: rotation.get(),
        lastX: e.clientX,
        lastT: now,
        velocity: 0,
        targetIndex: cardEl ? Number(cardEl.dataset.cardIndex) : null
      };
    },
    [cancelMomentum, rotation]
  );

  const handlePointerMove = useCallback(
    (e) => {
      const p = pointerRef.current;
      if (!p.down) return;
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      if (!p.moved && Math.hypot(dx, dy) > CLICK_THRESHOLD) {
        p.moved = true;
      }
      if (p.moved) {
        const newRot = p.startRotation + dx * DRAG_SENSITIVITY;
        rotation.set(newRot);

        const now = performance.now();
        const dt = now - p.lastT;
        if (dt > 0) {
          const instVel = ((e.clientX - p.lastX) * DRAG_SENSITIVITY) / dt;
          p.velocity = p.velocity * 0.35 + instVel * 0.65;
          p.lastX = e.clientX;
          p.lastT = now;
        }

        const liveIdx = Math.round((((-newRot / angleStep) % total) + total) % total);
        setActiveIndex(liveIdx);
      }
    },
    [rotation, angleStep, total]
  );

  const handlePointerUp = useCallback(
    (e) => {
      const p = pointerRef.current;
      if (!p.down) return;
      p.down = false;
      try {
        if (e?.pointerId) {
          stageRef.current?.releasePointerCapture?.(e.pointerId);
        }
      } catch (_) {}

      if (p.moved) {
        const dt = performance.now() - p.lastT;
        const finalVel = dt > 60 ? 0 : p.velocity;
        settle(finalVel);
      } else if (p.targetIndex != null && branches) {
        const branch = branches[p.targetIndex];
        if (p.targetIndex === activeIndex) setSelectedBranch(branch);
        else goTo(p.targetIndex);
      }
    },
    [settle, branches, activeIndex, goTo]
  );

  const activeBranch = branches?.[activeIndex];

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        aria-label="Thoughtflows Academy branch locations"
        className="relative w-full overflow-hidden bg-white bg-hero-gradient py-12 md:py-16"
      >
        {/* Dynamic City Special Background Landmark Overlay */}
        <AnimatePresence mode="wait">
          {activeBranch && activeBranch.cityBgImage && (
            <motion.div
              key={activeBranch.cityBgImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.16, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
            >
              <img
                src={activeBranch.cityBgImage}
                alt={activeBranch.city}
                className="w-full h-full object-cover filter blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/90" />
            </motion.div>
          )}
        </AnimatePresence>

        <MedicalGrid />
        <FloatingParticles />
        <EcgLine className="absolute top-12 md:top-16 inset-x-0 opacity-80" />
        <div className="absolute inset-0 pointer-events-none">
          <NetworkNodes total={total} activeIndex={activeIndex} />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(22,173,186,0.08), transparent 70%)" }}
        />

        <div className="relative z-20 px-6 md:px-10 lg:px-16 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="flex items-center gap-2 text-teal-600 text-xs md:text-sm font-semibold uppercase mb-4">
              <span className="h-px w-8 bg-teal-400" />
              <span className="tracking-[0.2em]">Our Locations</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 leading-tight max-w-2xl">
              Find Your Nearest <span className="text-gradient">Thoughtflows Academy</span>
            </h2>
            <p className="text-navy-900/55 text-sm md:text-base max-w-xl mt-4 leading-relaxed">
              From flagship campuses to regional centers, every branch delivers the same industry-focused curriculum and placement support.
            </p>
          </motion.div>
        </div>

        {total > 0 && (
          <>
            <div
              ref={stageRef}
              className="relative z-10 select-none"
              style={{ height: dims.stageHeight, touchAction: "pan-y" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: dims.perspective }}>
                <div
                  className="relative"
                  style={{ width: dims.cardW, height: dims.cardH, transformStyle: "preserve-3d", willChange: "transform" }}
                >
                  {branches.map((branch, i) => (
                    <BranchOrbitCard
                      key={branch.id}
                      branch={branch}
                      index={i}
                      angleStep={angleStep}
                      radius={radius}
                      perspective={dims.perspective}
                      groupRotation={rotation}
                      cardW={dims.cardW}
                      cardH={dims.cardH}
                      onOpen={() => setSelectedBranch(branch)}
                    />
                  ))}
                </div>
              </div>

              {/* prev/next navigation buttons */}
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(activeIndex - 1);
                }}
                aria-label="Previous branch"
                className="flex glass absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full text-navy-900/70 hover:text-navy-900 hover:scale-110 active:scale-95 items-center justify-center transition-all shadow-md"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(activeIndex + 1);
                }}
                aria-label="Next branch"
                className="flex glass absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full text-navy-900/70 hover:text-navy-900 hover:scale-110 active:scale-95 items-center justify-center transition-all shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="relative z-20 px-6 md:px-10 lg:px-16 pb-8 md:pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <AnimatePresence mode="wait">
                {activeBranch && (
                  <motion.div
                    key={activeBranch.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-2 text-teal-600 text-xs mb-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400/50 animate-ping motion-reduce:animate-none" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
                      </span>
                      {activeBranch.city}
                    </div>
                    <h3 className="text-navy-900 text-2xl md:text-3xl font-semibold">
                      Thoughtflows Academy &mdash; {activeBranch.name}
                    </h3>
                    <p className="text-navy-900/45 text-sm mt-1.5 max-w-md">{activeBranch.address}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3">
                <span className="text-navy-900/40 text-xs uppercase tracking-[0.2em] font-semibold">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="hidden md:inline-flex items-center gap-2 text-navy-900/35 text-xs">
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    &#8596;
                  </motion.span>
                  Drag to explore locations
                </span>
                <span className="md:hidden text-navy-900/35 text-xs">Swipe to explore</span>
              </div>
            </div>
          </>
        )}
      </section>

      <AnimatePresence>
        {selectedBranch && <BranchModal branch={selectedBranch} onClose={() => setSelectedBranch(null)} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
