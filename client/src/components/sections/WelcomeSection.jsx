import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Play } from "lucide-react";
import RevealOnScroll from "../RevealOnScroll";
import MagneticButton from "../MagneticButton";

const YOUTUBE_ID = "Ph1XztrKgms";

const highlights = [
  { label: "Expert Trainers", className: "text-emerald-500 bg-emerald-500/15" },
  { label: "Great Results", className: "text-amber-500 bg-amber-500/15" },
  { label: "Flexible Scheduling", className: "text-rose-500 bg-rose-500/15" },
  { label: "Online Learning Modules", className: "text-violet-500 bg-violet-500/15" }
];

const headingLines = ["Welcome to", "Thoughtflows Academy"];

/**
 * Click-to-play YouTube embed. Renders a thumbnail + play button until
 * clicked, then swaps in the iframe — keeps the homepage fast (no YouTube
 * script/iframe cost paid until the visitor actually wants the video).
 */
function VideoPanel() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative max-w-lg mx-auto lg:mx-0">
      {/* ambient glow blobs */}
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-teal-400/20 blur-3xl animate-float-slow" aria-hidden="true" />
      <div className="absolute -bottom-14 -right-10 h-48 w-48 rounded-full bg-navy-500/20 blur-3xl animate-float" aria-hidden="true" />

      <div className="relative rounded-[2rem] overflow-hidden aspect-video bg-navy-950 shadow-premium ring-1 ring-white/10">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
            title="What is Thoughtflows Academy?"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label="Play video: What is Thoughtflows Academy?"
          >
            <img
              src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`}
              alt="What is Thoughtflows Academy? video preview"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-teal-500/40 animate-pulse-glow" />
                <span className="relative h-14 w-14 md:h-16 md:w-16 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-glow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play size={22} fill="currentColor" className="ml-1" />
                </span>
              </span>
            </span>
          </button>
        )}
      </div>

      {/* floating caption badge */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotate: -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: -3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-6 left-6 glass-strong rounded-2xl pl-3 pr-4 py-3 flex items-center gap-3 shadow-premium animate-float"
      >
        <span className="h-10 w-10 shrink-0 rounded-full bg-teal-500 text-white flex items-center justify-center">
          <Play size={14} fill="currentColor" />
        </span>
        <span className="text-xs font-semibold text-navy-900 leading-tight">
          What is
          <br />
          Thoughtflows?
        </span>
      </motion.div>

      {/* floating stat badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: 8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-6 -right-4 glass-strong rounded-2xl px-4 py-3 shadow-premium animate-float-slow"
      >
        <div className="flex items-center gap-2">
          <GraduationCap size={18} className="text-teal-600" />
          <div className="leading-tight">
            <p className="text-sm font-bold text-navy-900">9+ Years</p>
            <p className="text-[10px] text-navy-900/50 uppercase tracking-wide">Experience</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Homepage intro section right after the Hero — "No.1 Medical Coding
 * Training / Welcome to Thoughtflows Academy". Renders a click-to-play
 * "What is Thoughtflows?" YouTube video.
 */
export default function WelcomeSection() {
  return (
    <section id="welcome" className="section-pad bg-white pt-20 md:pt-28 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-glow pointer-events-none" aria-hidden="true" />

      <div className="container-max grid lg:grid-cols-2 gap-16 lg:gap-12 items-center relative">
        <RevealOnScroll>
          <VideoPanel />
        </RevealOnScroll>

        <div>
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-teal-600 text-xs md:text-sm font-semibold uppercase mb-4"
          >
            <span className="h-px w-8 bg-teal-400" />
            <span className="tracking-[0.2em]">No.1 Medical Coding Training</span>
          </motion.span>

          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 leading-tight mb-5" style={{ perspective: 800 }}>
            {headingLines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, rotateX: 60, y: 24 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`block origin-bottom ${i === 1 ? "text-gradient" : ""}`}
              >
                {line}
              </motion.span>
            ))}
          </h2>

          <RevealOnScroll delay={0.25}>
            <p className="text-navy-900/60 text-base md:text-lg leading-relaxed mb-8">
              At Thoughtflows Academy, we are committed to helping you become a confident, certified medical coding
              professional. Our courses are designed to give students the real-world knowledge and hands-on skills
              they need to succeed, taught by expert trainers with genuine hospital and payer-side experience.
            </p>
          </RevealOnScroll>

          <div className="flex flex-wrap gap-3 mb-9">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.7, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -3 }}
                className="flex items-center gap-2.5 rounded-full border border-navy-900/10 bg-white pl-2 pr-4 py-2 shadow-sm"
              >
                <span className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center ${item.className}`}>
                  <CheckCircle2 size={15} />
                </span>
                <span className="text-navy-900 font-medium text-sm">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="relative inline-block"
          >
            <span className="absolute inset-0 rounded-full bg-teal-500/30 blur-xl animate-pulse-glow" aria-hidden="true" />
            <MagneticButton as={Link} to="/courses" className="relative">
              Discover Now
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
