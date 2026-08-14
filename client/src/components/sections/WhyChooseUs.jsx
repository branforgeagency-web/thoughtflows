import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { whyChooseUsItems as items } from "../../config/whyChooseUsItems";

/* ------------------------------------------------------------------ */
/* Custom 3D Theme Icons matching each card                           */
/* ------------------------------------------------------------------ */

function Graduation3DIcon() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_12px_24px_rgba(147,51,234,0.28)]">
        <defs>
          <linearGradient id="capTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>
          <linearGradient id="capBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b21a8" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>
          <linearGradient id="goldTassel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>
        {/* Diploma Scroll */}
        <g transform="rotate(-15 45 65)">
          <rect x="20" y="58" width="55" height="18" rx="9" fill="url(#scrollGrad)" />
          <rect x="42" y="57" width="10" height="20" rx="3" fill="url(#ribbonGrad)" />
          <path d="M 47 77 L 44 87 L 47 85 L 50 87 Z" fill="url(#ribbonGrad)" />
          <ellipse cx="20" cy="67" rx="4" ry="9" fill="#cbd5e1" />
          <ellipse cx="75" cy="67" rx="4" ry="9" fill="#f8fafc" />
        </g>
        {/* Cap Base */}
        <path d="M 35 38 L 65 38 L 65 50 C 65 56 35 56 35 50 Z" fill="url(#capBase)" />
        {/* Top Diamond */}
        <polygon points="50,15 88,32 50,48 12,32" fill="url(#capTop)" />
        {/* Button & Tassel */}
        <circle cx="50" cy="31" r="3.5" fill="url(#goldTassel)" />
        <path d="M 50 31 Q 30 35 25 50 L 25 62" fill="none" stroke="url(#goldTassel)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="25" cy="64" r="4" fill="url(#goldTassel)" />
      </svg>
    </div>
  );
}

function Folder3DIcon() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_12px_24px_rgba(14,116,144,0.28)]">
        <defs>
          <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="folderFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="crossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        <rect x="25" y="12" width="38" height="52" rx="6" fill="url(#docGrad)" transform="rotate(-6 44 38)" />
        <rect x="32" y="24" width="22" height="4" rx="2" fill="#ffffff" opacity="0.8" transform="rotate(-6 44 38)" />
        <rect x="32" y="32" width="16" height="4" rx="2" fill="#ffffff" opacity="0.8" transform="rotate(-6 44 38)" />
        <rect x="34" y="30" width="46" height="52" rx="8" fill="url(#folderFront)" />
        <circle cx="57" cy="56" r="14" fill="url(#crossGrad)" stroke="#ffffff" strokeWidth="2.5" />
        <rect x="53.5" y="47" width="7" height="18" rx="2" fill="#ffffff" />
        <rect x="48" y="52.5" width="18" height="7" rx="2" fill="#ffffff" />
      </svg>
    </div>
  );
}

function Placement3DIcon() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_12px_24px_rgba(225,29,72,0.28)]">
        <defs>
          <linearGradient id="podiumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="tieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
        </defs>
        <polygon points="18,68 82,68 70,82 30,82" fill="#b45309" />
        <rect x="22" y="62" width="56" height="8" rx="3" fill="url(#podiumGrad)" />
        <path d="M 32 62 C 32 44 40 38 50 38 C 60 38 68 44 68 62 Z" fill="url(#bodyGrad)" />
        <polygon points="48,42 52,42 54,58 50,62 46,58" fill="url(#tieGrad)" />
        <circle cx="50" cy="25" r="12" fill="url(#headGrad)" />
        <circle cx="46" cy="21" r="3" fill="#ffffff" opacity="0.5" />
      </svg>
    </div>
  );
}

function Experience3DIcon() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_12px_24px_rgba(234,179,8,0.28)]">
        <defs>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="sleeveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="handSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <polygon points="50,12 53,20 62,21 55,27 57,36 50,31 43,36 45,27 38,21 47,20" fill="url(#starGrad)" />
        <polygon points="32,24 34,29 39,30 35,34 36,39 32,36 28,39 29,34 25,30 30,29" fill="url(#starGrad)" transform="scale(0.7) translate(12 5)" />
        <polygon points="68,24 70,29 75,30 71,34 72,39 68,36 64,39 65,34 61,30 66,29" fill="url(#starGrad)" transform="scale(0.7) translate(30 5)" />
        <path d="M 22 66 Q 40 76 68 64 Q 78 58 72 52 Q 62 56 46 54 Z" fill="url(#handSkin)" />
        <path d="M 68 64 L 84 70 L 76 84 L 60 76 Z" fill="url(#sleeveGrad)" />
        <rect x="62" y="63" width="8" height="15" rx="3" fill="#ffffff" transform="rotate(-25 66 70)" />
      </svg>
    </div>
  );
}

function Curriculum3DIcon() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_12px_24px_rgba(6,182,212,0.28)]">
        <defs>
          <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>
          <linearGradient id="yellowBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="cyanBadge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        <rect x="36" y="32" width="46" height="52" rx="8" fill="url(#yellowBack)" transform="rotate(12 59 58)" />
        <rect x="22" y="24" width="50" height="58" rx="8" fill="url(#bookCover)" />
        <rect x="28" y="30" width="38" height="46" rx="4" fill="#ffffff" />
        <rect x="34" y="38" width="26" height="3" rx="1.5" fill="#38bdf8" />
        <rect x="34" y="46" width="22" height="3" rx="1.5" fill="#e2e8f0" />
        <rect x="34" y="54" width="26" height="3" rx="1.5" fill="#e2e8f0" />
        <rect x="34" y="62" width="18" height="3" rx="1.5" fill="#e2e8f0" />
        <rect x="58" y="16" width="16" height="26" rx="4" fill="url(#cyanBadge)" stroke="#ffffff" strokeWidth="2" />
        <line x1="63" y1="23" x2="69" y2="23" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="63" y1="29" x2="69" y2="29" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const ICONS_MAP = {
  training: Graduation3DIcon,
  learning: Folder3DIcon,
  placement: Placement3DIcon,
  experience: Experience3DIcon,
  curriculum: Curriculum3DIcon
};

export default function WhyChooseUs() {
  const topRow = items.slice(0, 3);
  const bottomRow = items.slice(3, 5);

  return (
    <section className="px-6 md:px-10 lg:px-20 py-10 md:py-14 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-navy-500/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="BEST COACHING"
          title="Why Choose Thoughtflows Medical Coding Academy?"
        />

        <div className="mt-12 md:mt-16 flex flex-col gap-8 md:gap-10">
          {/* Top Row: 3 Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {topRow.map((item, i) => {
              const IconComp = ICONS_MAP[item.id] || Graduation3DIcon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-3xl p-8 md:p-9 border border-slate-200/80 shadow-[0_10px_30px_-5px_rgba(21,63,108,0.07)] hover:shadow-[0_22px_45px_-10px_rgba(22,173,186,0.18)] transition-all duration-300 flex flex-col items-center text-center"
                >
                  {/* Floating 3D Icon Container */}
                  <motion.div
                    className="mb-4"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <IconComp />
                  </motion.div>

                  <h3 className="text-xl font-bold text-navy-900 leading-snug mb-3.5">
                    {item.title}
                  </h3>

                  <p className="text-navy-900/60 text-sm md:text-base leading-relaxed mb-6 flex-1">
                    {item.text}
                  </p>

                  <Link
                    to={item.link || "/about"}
                    className="inline-flex items-center gap-1.5 text-teal-600 font-semibold text-sm hover:text-teal-700 transition-all group-hover:gap-2.5 mt-auto"
                  >
                    Learn More <ArrowRight size={15} />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row: 2 Cards (Centered) */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            {bottomRow.map((item, i) => {
              const IconComp = ICONS_MAP[item.id] || Experience3DIcon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (i + 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-3xl p-8 md:p-9 border border-slate-200/80 shadow-[0_10px_30px_-5px_rgba(21,63,108,0.07)] hover:shadow-[0_22px_45px_-10px_rgba(22,173,186,0.18)] transition-all duration-300 flex flex-col items-center text-center"
                >
                  {/* Floating 3D Icon Container */}
                  <motion.div
                    className="mb-4"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: (i + 3) * 0.4 }}
                  >
                    <IconComp />
                  </motion.div>

                  <h3 className="text-xl font-bold text-navy-900 leading-snug mb-3.5">
                    {item.title}
                  </h3>

                  <p className="text-navy-900/60 text-sm md:text-base leading-relaxed mb-6 flex-1">
                    {item.text}
                  </p>

                  <Link
                    to={item.link || "/about"}
                    className="inline-flex items-center gap-1.5 text-teal-600 font-semibold text-sm hover:text-teal-700 transition-all group-hover:gap-2.5 mt-auto"
                  >
                    Learn More <ArrowRight size={15} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
