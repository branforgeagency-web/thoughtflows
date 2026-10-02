import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Star, Award, ShieldCheck } from "lucide-react";
import VideoModal from "./VideoModal";
import EstablishedStampBadge from "./EstablishedStampBadge";

export default function Hero() {
  const videoRef = useRef(null);
  const [navH, setNavH] = useState(88);
  const [videoOpen, setVideoOpen] = useState(false);

  // Measure fixed navbar height
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => setNavH(header.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      style={{ "--nav-h": `${navH}px` }}
      className="relative w-full overflow-hidden bg-[#F4F9FE] pt-[var(--nav-h)] lg:h-[100svh] lg:min-h-[640px]"
    >
      <div className="relative w-full lg:h-full">

        {/* ================= LEFT: VIDEO EXTENDED UNDER CURVED GLASS OVERLAY (72%) ================= */}
        <div className="relative w-full aspect-[16/10] sm:aspect-video lg:aspect-auto lg:absolute lg:inset-y-0 lg:left-0 lg:w-[72%] overflow-hidden bg-slate-900 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Warm light wash + soft bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/15 via-transparent to-[#063B7A]/10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#F4F9FE] to-transparent lg:hidden pointer-events-none" />
        </div>

        {/* ================= CURVED GLASS PANEL OVERLAY (DESKTOP) ================= */}
        <svg
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroPanel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EAF3FD" stopOpacity="1" />
              <stop offset="45%" stopColor="#F7FAFE" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFF4E3" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="heroWave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#CFE3FA" stopOpacity="1" />
              <stop offset="60%" stopColor="#E6F0FC" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="heroEdge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="heroFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="heroSun" cx="0.82" cy="0.78" r="0.35">
              <stop offset="0%" stopColor="#FFE2A8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFE2A8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft glow behind the curve */}
          <path d="M960,0 C820,190 790,470 500,800 L1440,800 L1440,0 Z" fill="#FFFFFF" opacity="0.4" transform="translate(-28,0)" />
          {/* Main solid opaque content panel */}
          <path d="M960,0 C820,190 790,470 500,800 L1440,800 L1440,0 Z" fill="url(#heroPanel)" opacity="1" />
          <path d="M960,0 C820,190 790,470 500,800 L1440,800 L1440,0 Z" fill="url(#heroSun)" />
          {/* Bright edge highlight */}
          <path d="M960,0 C820,190 790,470 500,800" fill="none" stroke="url(#heroEdge)" strokeWidth="6" />

          {/* Bottom solid glass wave */}
          <path d="M0,720 C260,650 520,640 760,700 C980,755 1180,760 1440,690 L1440,800 L0,800 Z" fill="url(#heroWave)" opacity="1" />
          <path d="M0,720 C260,650 520,640 760,700 C980,755 1180,760 1440,690" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="1" />
          <rect x="0" y="740" width="1440" height="60" fill="url(#heroFade)" />
        </svg>

        {/* ================= ESTABLISHED ROTATING BADGE ================= */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-12 lg:top-8 lg:right-16 z-30 pointer-events-auto">
          <EstablishedStampBadge variant="cyan" />
        </div>

        {/* ================= RIGHT: CONTENT COLUMN ================= */}
        <div className="relative z-20 lg:absolute lg:inset-0 lg:flex lg:items-center">
          <div className="container-max w-full px-6 sm:px-8 lg:px-12 pt-8 pb-14 lg:pt-0 lg:pb-12">
            <div className="lg:ml-auto lg:w-[50%] xl:w-[46%] 2xl:w-[44%] space-y-5 max-w-xl mx-auto lg:mx-0 flex flex-col items-center text-center">

              {/* Accreditation Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F7FA]/80 border border-[#12BFD1]/30 text-[#063B7A] text-xs font-extrabold shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#12BFD1] animate-pulse" />
                <span>AAPC &amp; AHIMA Certified Academy • #1 Medical Coding Institute</span>
              </motion.div>

              {/* Subheader Accent Line */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-3 text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#063B7A] uppercase"
              >
                <span className="h-[2px] w-8 sm:w-10 rounded-full bg-[#12BFD1]" />
                <span>Build a Brighter Future</span>
                <span className="h-[2px] w-8 sm:w-10 rounded-full bg-[#12BFD1]" />
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-[44px] xl:text-[54px] 2xl:text-[64px] font-extrabold text-[#063B7A] tracking-tight leading-[1.08] text-center"
              >
                Master Medical <br className="hidden sm:inline" />
                <span className="text-[#12BFD1]">Coding Skills</span>
              </motion.h1>

              {/* Supporting Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[#063B7A]/85 text-base sm:text-lg 2xl:text-xl leading-relaxed max-w-md 2xl:max-w-lg font-medium text-center"
              >
                Get industry-ready training, expert guidance, and real-world practice to build a successful career in medical coding.
              </motion.p>

              {/* Dual Action CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="pt-1 flex flex-wrap items-center justify-center gap-3.5 w-full"
              >
                <Link
                  to="/courses"
                  className="group inline-flex items-center gap-4 pl-7 pr-2.5 py-2.5 rounded-full bg-[#063B7A] hover:bg-[#12BFD1] text-white font-extrabold text-base shadow-xl shadow-[#063B7A]/20 hover:shadow-[#12BFD1]/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Explore Our Courses</span>
                  <span className="w-10 h-10 rounded-full bg-white text-[#063B7A] group-hover:text-[#12BFD1] flex items-center justify-center transition-colors duration-300 shadow-sm">
                    <ArrowRight size={18} />
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 pl-6 pr-3 py-2.5 rounded-full bg-white hover:bg-[#12BFD1]/10 text-[#063B7A] border-2 border-[#12BFD1] font-extrabold text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Book Course</span>
                  <span className="w-8 h-8 rounded-full bg-[#12BFD1]/15 text-[#12BFD1] group-hover:bg-[#12BFD1] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs">
                    <GraduationCap size={16} />
                  </span>
                </Link>
              </motion.div>

              {/* Social Proof Metric Strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 border-t border-[#063B7A]/10 text-xs font-semibold text-[#063B7A]/80 w-full max-w-md"
              >
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="font-extrabold text-[#063B7A]">4.9/5</span>
                  <span className="text-slate-500">(2,500+ Reviews)</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#12BFD1]/40 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <Award size={14} className="text-[#12BFD1]" />
                  <span className="font-extrabold text-[#063B7A]">98.4%</span>
                  <span className="text-slate-500">Pass Rate</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#12BFD1]/40 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span className="font-extrabold text-[#063B7A]">100%</span>
                  <span className="text-slate-500">Placement</span>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Trigger */}
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
