import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  TrendingUp,
  MapPin,
  FileText,
  Check,
} from "lucide-react";
import RevealOnScroll from "../RevealOnScroll";

function AnimatedNumber({ value }) {
  const numeric = parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;
  const suffix = String(value).replace(/[\d,]/g, "");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, numeric]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

{/* Dot Matrix Pattern helper for card corners */}
function DotGrid({ color }) {
  return (
    <div className="grid grid-cols-4 gap-1.5 opacity-35 pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

{/* Stat Card Component */}
function StatCard({
  icon: Icon,
  number,
  label,
  iconBgColor,
  iconColor,
  accentColor,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-[28px] p-6 sm:p-7 text-center shadow-[0_14px_35px_rgba(6,59,122,0.06)] border border-slate-100/90 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-[0_22px_45px_rgba(6,59,122,0.12)] transition-all duration-300 min-h-[210px]"
    >
      {/* Top Right Dot Grid Matrix */}
      <div className="absolute top-4 right-4">
        <DotGrid color={accentColor} />
      </div>

      {/* Bottom Left Corner Ambient Blur & Smooth Wave Graphic */}
      <div
        className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full pointer-events-none opacity-40 blur-md"
        style={{ backgroundColor: iconBgColor }}
      />
      <svg
        className="absolute bottom-0 left-0 w-28 h-20 pointer-events-none opacity-25"
        viewBox="0 0 100 70"
        fill="none"
      >
        <path
          d="M0 70 C 35 70, 45 25, 100 0 L 0 0 Z"
          fill={accentColor}
        />
      </svg>

      {/* Top Center Circular Icon Badge */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-xs shrink-0 group-hover:scale-105 transition-transform"
        style={{ backgroundColor: iconBgColor, color: iconColor }}
      >
        <Icon size={26} className="stroke-[2.2]" />
      </div>

      {/* Main Count Up Stat Number */}
      <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0A2540] font-display tracking-tight leading-none mb-1.5 z-10">
        <AnimatedNumber value={number} />
      </div>

      {/* Metric Label */}
      <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-600 font-display max-w-[135px] leading-snug z-10">
        {label}
      </div>

      {/* Bottom Rounded Accent Pill */}
      <div
        className="w-10 h-1.5 rounded-full mt-3.5 z-10"
        style={{ backgroundColor: accentColor }}
      />
    </motion.div>
  );
}

export default function ImpactStats() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-r from-[#EAF7F9] via-[#F3FAFC] to-[#FFFFFF] overflow-hidden">
      
      {/* Background Decorative Soft Glows */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-[#12BFD1]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-[#12BFD1]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-max px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ================= LEFT COLUMN: Header Text & Eyebrow ================= */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <RevealOnScroll>
              {/* Eyebrow Label */}
              <div className="flex items-center gap-2 font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                <span className="text-[#12BFD1] font-black">THOUGHTFLOWS</span>
                <span className="text-[#063B7A] font-black">ACADEMY TRUST</span>
              </div>
              <div className="w-9 h-1 bg-[#12BFD1] rounded-full mt-1.5 mb-4" />

              {/* Main Headline */}
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-[48px] leading-[1.1] text-[#063B7A] tracking-tight">
                Build Your <br />
                <span className="text-[#12BFD1]">Future in</span> <br />
                Medical Coding
              </h2>

              {/* Paragraph Body Text */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-md pt-1">
                Industry-oriented training, AAPC &amp; AHIMA certification programs, real-time practice, and dedicated placement support to launch a successful healthcare career.
              </p>

              {/* Cyan Pill Outcome Badge & Swoosh */}
              <div className="pt-3 relative inline-block">
                <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#E0F7FA] border border-[#12BFD1]/30 shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-[#12BFD1] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <div className="text-xs font-black text-[#063B7A] leading-tight font-display">
                    100% Verified Career Outcomes <br />
                    <span className="text-slate-500 font-bold">&amp; Alumni Network</span>
                  </div>
                </div>

                {/* Bottom Cyan Loop Swoosh Decor */}
                <div className="absolute -bottom-8 -left-2 pointer-events-none opacity-80">
                  <svg width="120" height="35" viewBox="0 0 120 35" fill="none">
                    <path
                      d="M 5 25 C 25 35, 45 5, 65 20 C 80 32, 95 10, 115 15"
                      stroke="#12BFD1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* ================= CENTER COLUMN: Doctor Cutout Image ================= */}
          <div className="lg:col-span-3 relative flex items-center justify-center py-4 lg:py-0">
            <RevealOnScroll delay={0.1}>
              <div className="relative w-full max-w-[270px] sm:max-w-[300px] mx-auto aspect-[4/5] flex items-end justify-center">
                
                {/* Organic Circular Cyan Backdrop */}
                <div className="absolute top-10 inset-x-2 aspect-square rounded-full bg-gradient-to-tr from-[#4CD5DD] via-[#7DE3EA] to-[#B3F2F6] shadow-md pointer-events-none" />

                {/* Floating Cyan Cross Badge (+) Behind Shoulder */}
                <div className="absolute top-12 right-0 opacity-80 pointer-events-none z-0">
                  <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#52D2DD] fill-current">
                    <rect x="38" y="10" width="24" height="80" rx="8" />
                    <rect x="10" y="38" width="80" height="24" rx="8" />
                  </svg>
                </div>

                {/* Overlapping Female Doctor Image */}
                <img
                  src="/doctor-trust.jpg"
                  alt="Thoughtflows Medical Coding Professional"
                  className="relative z-10 w-full h-[106%] object-cover sm:object-contain rounded-3xl drop-shadow-[0_18px_28px_rgba(6,59,122,0.18)]"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80";
                  }}
                />

                {/* Organic Teal Wave Blob at Doctor Base */}
                <div className="absolute -bottom-4 inset-x-0 h-16 bg-[#52D2DD] rounded-[40%] blur-xs pointer-events-none opacity-90 z-10" />
              </div>
            </RevealOnScroll>
          </div>

          {/* ================= RIGHT COLUMN: 2x2 Stat Cards Grid ================= */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            
            {/* Card 1: 35,000+ Students Trained (Blue) */}
            <StatCard
              icon={GraduationCap}
              number="35,000+"
              label="STUDENTS TRAINED"
              iconBgColor="#E3F2FD"
              iconColor="#1E88E5"
              accentColor="#1E88E5"
            />

            {/* Card 2: 95% Placement Rate (Orange) */}
            <StatCard
              icon={TrendingUp}
              number="95%"
              label="PLACEMENT RATE"
              iconBgColor="#FFE0B2"
              iconColor="#F57C00"
              accentColor="#FF9800"
            />

            {/* Card 3: 15 Branches Pan-India (Purple) */}
            <StatCard
              icon={MapPin}
              number="15"
              label="BRANCHES PAN-INDIA"
              iconBgColor="#EDE7F6"
              iconColor="#7E57C2"
              accentColor="#7E57C2"
            />

            {/* Card 4: 49+ Certification Modules (Teal/Green) */}
            <StatCard
              icon={FileText}
              number="49+"
              label="CERTIFICATION MODULES"
              iconBgColor="#E0F2F1"
              iconColor="#26A69A"
              accentColor="#26A69A"
            />

          </div>

        </div>
      </div>
    </section>
  );
}




