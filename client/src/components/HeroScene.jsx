import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  MonitorPlay,
  UserRound,
  Briefcase,
  ArrowRight,
  Stethoscope,
  FileText,
  BarChart3
} from "lucide-react";

/* =========================================================
   HERO VIDEO — using local video from /public/hero-video.mp4
   ========================================================= */
export const HERO_VIDEO = {
  sources: [
    "/hero-video.mp4"
  ]
};

const floatingCards = [
  { id: "cert", title: "AAPC & AHIMA", subtitle: "Preparation", icon: ShieldCheck, iconBg: "bg-[#E7F9FB] text-[#0EA2B2]", link: "/courses", offset: "lg:ml-0" },
  { id: "classes", title: "Live & Recorded", subtitle: "Classes", icon: MonitorPlay, iconBg: "bg-[#D0F3F7] text-[#0B808D]", link: "/courses", offset: "lg:ml-2" },
  { id: "mentors", title: "Expert Trainers", subtitle: "& Mentorship", icon: UserRound, iconBg: "bg-[#E7F9FB] text-[#12BFD1]", link: "/about", offset: "lg:ml-3" },
  { id: "placement", title: "Placement", subtitle: "Assistance", icon: Briefcase, iconBg: "bg-[#D0F3F7] text-[#0EA2B2]", link: "/placements", offset: "lg:ml-2" }
];

const bottomCards = [
  { id: "case", label: ["Real", "Case Studies"], icon: Stethoscope, cls: "bg-gradient-to-b from-[#E7F9FB] to-white", iconCls: "text-[#0EA2B2]" },
  { id: "practice", label: ["Practice with", "Coding Scenarios"], icon: FileText, cls: "bg-white/95", iconCls: "text-[#12BFD1]" },
  { id: "global", label: ["Build a", "Global Career"], icon: BarChart3, cls: "bg-gradient-to-b from-[#D0F3F7] to-white", iconCls: "text-[#0B808D]" }
];

export default function HeroScene({ playSignal = 0 }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  // Autoplay automatically and silently on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // "Watch Our Video" button in Hero scrolls smoothly to the video
  useEffect(() => {
    if (playSignal > 0) {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [playSignal]);

  return (
    <div className="relative w-full lg:h-[600px] flex flex-col gap-5 lg:block">
      {/* Dashed connectors */}
      <svg className="hidden lg:block absolute -left-8 bottom-10 w-full h-52 pointer-events-none" viewBox="0 0 600 200" fill="none" stroke="#A1E7F0" strokeWidth="1.5" strokeDasharray="5 6">
        <path d="M30 10c-20 60 10 150 90 160" />
        <path d="M600 70c10 40-20 60-40 70" />
      </svg>

      {/* ============ VIDEO CARD ============ */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative lg:absolute lg:left-0 lg:top-2 w-full lg:w-[72%] aspect-[16/12.5] rounded-[26px] overflow-hidden border-[6px] border-white/90 bg-slate-900 shadow-[0_30px_60px_-20px_rgba(6,59,122,0.35)] select-none"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover pointer-events-none"
        >
          {HERO_VIDEO.sources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      </motion.div>

      {/* ============ FLOATING FEATURE CARDS ============ */}
      <div className="relative lg:absolute lg:right-0 lg:top-10 lg:w-[36%] grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-3 lg:gap-3.5 z-20">
        {floatingCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
              transition={{ opacity: { duration: 0.6, delay: 0.15 * idx }, x: { duration: 0.6, delay: 0.15 * idx }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.6 } }}
              className={card.offset}
            >
              <Link
                to={card.link}
                className="group flex items-center gap-3.5 bg-white rounded-2xl px-4 py-3 border border-[#E7F9FB] shadow-[0_10px_25px_-12px_rgba(6,59,122,0.3)] hover:-translate-x-1 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left whitespace-nowrap">
                  <div className="text-[13.5px] font-semibold text-[#04244B] leading-tight">{card.title}</div>
                  <div className="text-[12.5px] text-slate-500">{card.subtitle}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#12BFD1] transition-colors shrink-0" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ============ BOTTOM CARDS ============ */}
      <div className="relative lg:absolute lg:left-0 lg:bottom-0 lg:w-[62%] grid grid-cols-3 lg:flex gap-3 sm:gap-4 z-20">
        {bottomCards.map((c) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.id}
              whileHover={{ y: -4 }}
              className={`flex-1 rounded-3xl px-3 py-5 text-center shadow-[0_14px_30px_-14px_rgba(6,59,122,0.3)] ${c.cls}`}
            >
              <Icon className={`w-9 h-9 mx-auto mb-2.5 ${c.iconCls}`} strokeWidth={1.8} />
              <div className="text-[11px] sm:text-[13px] font-semibold text-[#04244B] leading-snug">
                {c.label[0]}<br />{c.label[1]}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ============ GLOBE + ANNOTATIONS ============ */}
      <motion.img
        src="/hero-globe-perfect.png"
        alt="Opportunities Across the Globe"
        style={{ maskImage: "radial-gradient(ellipse at center, black 70%, transparent 95%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 70%, transparent 95%)" }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute -right-4 bottom-0 w-[38%] h-auto [filter:hue-rotate(-35deg)_saturate(1.1)] pointer-events-none select-none z-10"
      />
    </div>
  );
}
