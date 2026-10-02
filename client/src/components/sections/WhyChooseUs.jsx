import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare } from "lucide-react";
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
        <g transform="rotate(-15 45 65)">
          <rect x="20" y="58" width="55" height="18" rx="9" fill="url(#scrollGrad)" />
          <rect x="42" y="57" width="10" height="20" rx="3" fill="url(#ribbonGrad)" />
          <path d="M 47 77 L 44 87 L 47 85 L 50 87 Z" fill="url(#ribbonGrad)" />
          <ellipse cx="20" cy="67" rx="4" ry="9" fill="#cbd5e1" />
          <ellipse cx="75" cy="67" rx="4" ry="9" fill="#f8fafc" />
        </g>
        <path d="M 35 38 L 65 38 L 65 50 C 65 56 35 56 35 50 Z" fill="url(#capBase)" />
        <polygon points="50,15 88,32 50,48 12,32" fill="url(#capTop)" />
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

export default function WhyChooseUs() {
  return (
    <section className="px-6 md:px-10 lg:px-20 py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container-max relative z-10 space-y-16">
        
        {/* Placements and Results Banner Container (Matching Reference Screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#EAF7F9] rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden border border-[#12BFD1]/20 shadow-sm"
        >
          {/* Top-Right Decorative Circular White Badge */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-xs" />

          {/* Section Header */}
          <div className="mb-8 sm:mb-10 space-y-1">
            <div className="text-[#12BFD1] font-extrabold text-xs sm:text-sm tracking-[0.25em] uppercase font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#12BFD1] animate-pulse" />
              BEST COACHING ACADEMY
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#063B7A] tracking-tight font-display uppercase">
              PLACEMENTS AND RESULTS
            </h2>
          </div>

          {/* Dual Stat Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Card 1: Placements (Navy Blue Brand Card) */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#063B7A] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-9 text-white min-h-[320px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden group shadow-xl shadow-[#063B7A]/25 border border-white/10"
            >
              <div>
                {/* Top Avatars Pill */}
                <div className="inline-flex items-center -space-x-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 mb-6 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Placed Student 1"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="Placed Student 2"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
                    alt="Placed Student 3"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover"
                  />
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/30 border-2 border-white text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    +
                  </div>
                </div>

                {/* Big Stat Number & Label */}
                <div className="space-y-0.5">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-none">
                    30000<sup>+</sup>
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#12BFD1] font-display">
                    PLACEMENTS
                  </div>
                </div>
              </div>

              {/* Bottom Action Arrow & Subtitle */}
              <div className="relative z-20 flex items-end gap-3 pt-6">
                <Link
                  to="/placements"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#063B7A] flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/40 shrink-0"
                >
                  <ArrowUpRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
                </Link>
                <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white max-w-[140px] leading-tight font-display">
                  THOUGHTFLOWS MEDICAL CODING PLACEMENTS
                </div>
              </div>

              {/* Right Horizontal Photo Banner Image */}
              <div className="absolute top-4 bottom-4 right-4 w-[48%] sm:w-[52%] pointer-events-none z-10 flex items-center justify-end">
                <img
                  src="/placements-horizontal.jpg"
                  alt="Medical Coding Placement Certificate"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/20 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>
            </motion.div>

            {/* Card 2: Students Trained (Cyan Teal Brand Card) */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#12BFD1] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-9 text-white min-h-[320px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden group shadow-xl shadow-[#12BFD1]/25 border border-white/10"
            >
              <div>
                {/* Top Avatars Pill */}
                <div className="inline-flex items-center -space-x-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 mb-6 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Trained Student 1"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Trained Student 2"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                    alt="Trained Student 3"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover"
                  />
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/30 border-2 border-white text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    +
                  </div>
                </div>

                {/* Big Stat Number & Label */}
                <div className="space-y-0.5">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-none">
                    35000<sup>+</sup>
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#063B7A] font-display">
                    STUDENTS TRAINED
                  </div>
                </div>
              </div>

              {/* Bottom Action Arrow & Subtitle */}
              <div className="relative z-20 flex items-end gap-3 pt-6">
                <Link
                  to="/placements"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#12BFD1] flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/40 shrink-0"
                >
                  <ArrowUpRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
                </Link>
                <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white max-w-[140px] leading-tight font-display">
                  THOUGHTFLOWS MEDICAL CODING RESULTS
                </div>
              </div>

              {/* Right Horizontal Photo Banner Image */}
              <div className="absolute top-4 bottom-4 right-4 w-[48%] sm:w-[52%] pointer-events-none z-10 flex items-center justify-end">
                <img
                  src="/trained-horizontal.jpg"
                  alt="Medical Coding Students Studying"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/20 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Core Benefits / OUR ACADEMY ADVANTAGES - Staggered Cards (Matching Reference Screenshot) */}
        <div className="pt-6 space-y-10">
          <SectionHeading
            eyebrow="OUR ACADEMY ADVANTAGES"
            title="Why Choose Thoughtflows Medical Coding Academy?"
            subtitle="Empowering healthcare coders with hands-on hospital chart practice, expert mentorship, and a 100% committed placement cell."
          />

          {/* Staggered Cards Track with Horizontal Connecting Dashed Line */}
          <div className="relative py-6">
            {/* Connecting Dashed Line Across Cards */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 border-t-2 border-dashed border-[#12BFD1]/50 pointer-events-none z-0" />

            {/* Scrollable / Grid Cards */}
            <div className="flex lg:grid lg:grid-cols-5 gap-5 overflow-x-auto scrollbar-none pb-8 pt-4 px-2 relative z-10">
              {items.map((item, i) => {
                const isEven = i % 2 === 1;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: isEven ? 8 : -8, scale: 1.02 }}
                    className={`shrink-0 w-[270px] sm:w-[290px] lg:w-auto bg-gradient-to-b from-[#041E3F] via-[#063B7A] to-[#12BFD1] rounded-[2rem] p-6 sm:p-7 text-white flex flex-col justify-between shadow-2xl border border-white/20 transition-all duration-300 relative overflow-hidden group ${
                      isEven ? "lg:translate-y-6" : "lg:-translate-y-4"
                    }`}
                  >
                    {/* Top Light Wash Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

                    <div>
                      {/* Top Left White Quote Speech Bubble Icon */}
                      <div className="w-10 h-10 rounded-full bg-white text-[#12BFD1] flex items-center justify-center shadow-lg mb-5 shrink-0 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-5 h-5 fill-[#12BFD1] text-[#12BFD1]" />
                      </div>

                      {/* Main Body Text */}
                      <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-medium mb-6 min-h-[140px] sm:min-h-[160px]">
                        "{item.text}"
                      </p>
                    </div>

                    {/* Bottom Title & Author Accent */}
                    <div className="pt-4 border-t border-white/25 space-y-1">
                      <h4 className="font-display font-black text-white text-xs sm:text-sm tracking-wide uppercase line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <div className="text-[10px] font-extrabold text-[#12BFD1] uppercase tracking-widest font-display">
                        ADVANTAGE 0{i + 1}
                      </div>
                      <div className="w-12 h-1 bg-[#12BFD1] rounded-full mt-2" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


