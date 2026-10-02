import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Award,
  GraduationCap,
  Star,
} from "lucide-react";
import { getCourseImage } from "../../config/courseImages";

export const programsData = [
  {
    id: "cpc",
    tag: "CPC",
    title: "Certified Professional Coder",
    slug: "cpc-certification",
    rating: 5,
    duration: "3 Months",
    methodLabel: "Method of Training Available",
    methodDetails: "Online & Offline Classroom Training",
    image: getCourseImage("cpc-certification"),
    highlightColor: "cyan",
    icon: ShieldCheck,
  },
  {
    id: "surgery",
    tag: "SD",
    title: "Surgery Department",
    slug: "advanced-em-surgery-coding",
    rating: 5,
    duration: "2 Months",
    methodLabel: "Method of Training Available",
    methodDetails: "Online & Hybrid Specialty Batches",
    image: getCourseImage("advanced-em-surgery-coding"),
    highlightColor: "pink",
    icon: GraduationCap,
  },
  {
    id: "cic",
    tag: "CIC",
    title: "Certified Inpatient Coder",
    slug: "cic-certification",
    rating: 5,
    duration: "3 Months",
    methodLabel: "Method of Training Available",
    methodDetails: "Online & Offline Regular Classroom",
    image: getCourseImage("cic-certification"),
    highlightColor: "cyan",
    icon: Award,
  },
  {
    id: "anesthesia",
    tag: "AD",
    title: "Anesthesia Department",
    slug: "anesthesia-coding",
    rating: 5,
    duration: "2 Months",
    methodLabel: "Eligibility",
    methodDetails: "Life Science Graduates & Coders",
    image: getCourseImage("anesthesia-coding"),
    highlightColor: "pink",
    icon: ShieldCheck,
  },
  {
    id: "ccs",
    tag: "CCS",
    title: "Certified Coding Specialist",
    slug: "ccs-certification",
    rating: 5,
    duration: "3 Months",
    methodLabel: "Method of Training Available",
    methodDetails: "AHIMA Exam Focused Training",
    image: getCourseImage("ccs-certification"),
    highlightColor: "cyan",
    icon: Award,
  },
  {
    id: "ed",
    tag: "ED",
    title: "Emergency Department",
    slug: "ed-coding",
    rating: 5,
    duration: "2 Months",
    methodLabel: "Method of Training Available",
    methodDetails: "Online & Classroom Practice",
    image: getCourseImage("ed-coding"),
    highlightColor: "pink",
    icon: GraduationCap,
  },
  {
    id: "hcc",
    tag: "HCC",
    title: "HCC Risk Adjustment",
    slug: "hcc-risk-adjustment",
    rating: 5,
    duration: "2 Months",
    methodLabel: "Eligibility",
    methodDetails: "Medical Coders & Healthcare Pros",
    image: getCourseImage("hcc-risk-adjustment"),
    highlightColor: "cyan",
    icon: ShieldCheck,
  },
  {
    id: "radiology",
    tag: "RAD",
    title: "Radiology Department",
    slug: "radiology-coding",
    rating: 5,
    duration: "2 Months",
    methodLabel: "Method of Training Available",
    methodDetails: "Specialty Diagnostic Coding",
    image: getCourseImage("radiology-coding"),
    highlightColor: "pink",
    icon: Award,
  },
];

export default function CoursesPreview() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const distance = direction === "left" ? -360 : 360;
    scrollRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8FBFF] via-[#EBF4FC] to-[#F3F8FE] relative overflow-hidden">
      
      {/* Animated Light Orb 1 - Cyan Glow */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-[#12BFD1]/18 blur-[130px] pointer-events-none"
      />

      {/* Animated Light Orb 2 - Deep Navy Glow */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 45, -20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-32 w-[580px] h-[580px] rounded-full bg-[#063B7A]/12 blur-[150px] pointer-events-none"
      />

      {/* Animated Light Orb 3 - Soft Gold Pulse Center */}
      <motion.div
        animate={{
          opacity: [0.25, 0.55, 0.25],
          scale: [0.85, 1.15, 0.85],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#F3C853]/10 blur-[160px] pointer-events-none"
      />

      {/* Animated Diagonal Light Sheen Sweep */}
      <motion.div
        animate={{
          x: ["-120%", "220%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 5,
        }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-30deg] pointer-events-none"
      />

      {/* Floating Ambient Glowing Particles / Nodes */}
      {[
        { top: "12%", left: "8%", delay: 0, duration: 6, size: "w-2.5 h-2.5" },
        { top: "22%", left: "88%", delay: 2, duration: 8, size: "w-3 h-3" },
        { top: "68%", left: "12%", delay: 1, duration: 7, size: "w-2 h-2" },
        { top: "78%", left: "82%", delay: 3, duration: 9, size: "w-3 h-3" },
        { top: "42%", left: "48%", delay: 1.5, duration: 8.5, size: "w-2.5 h-2.5" },
        { top: "85%", left: "35%", delay: 2.5, duration: 7.5, size: "w-2 h-2" },
      ].map((particle, idx) => (
        <motion.div
          key={idx}
          style={{ top: particle.top, left: particle.left }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.25, 0.85, 0.25],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          className={`absolute ${particle.size} rounded-full bg-[#12BFD1]/70 blur-[0.5px] pointer-events-none shadow-[0_0_10px_#12BFD1]`}
        />
      ))}

      {/* Subtle Micro Pattern Wash */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%3C%23063B7A%3E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-max px-6 sm:px-8 lg:px-12 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-[#12BFD1] font-extrabold text-xs sm:text-sm tracking-[0.25em] uppercase font-display flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#12BFD1] animate-pulse" />
            THOUGHTFLOWS ACADEMY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#063B7A] tracking-tight leading-tight font-display">
            Your Path to Success in Medical Coding
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white text-[#063B7A] border border-[#12BFD1]/30 hover:bg-[#12BFD1] hover:text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white text-[#063B7A] border border-[#12BFD1]/30 hover:bg-[#12BFD1] hover:text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-8 pt-3 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {programsData.map((prog) => {
              const isPink = prog.highlightColor === "pink";

              return (
                <motion.div
                  key={prog.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 w-[300px] sm:w-[350px] relative bg-white rounded-t-[32px] rounded-bl-[32px] rounded-br-none p-5 sm:p-6 shadow-[0_15px_35px_rgba(6,59,122,0.08)] flex flex-col justify-between border border-white/90 hover:shadow-[0_20px_45px_rgba(18,191,209,0.18)] transition-all duration-300 overflow-hidden group/card"
                >
                  <div>
                    {/* Top Image Preview & Badge */}
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 mb-4">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                      {/* Badge Pill */}
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#063B7A] text-white font-black text-[10px] tracking-widest uppercase shadow-md backdrop-blur-xs">
                        {prog.tag}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="font-display font-black text-[#063B7A] text-base sm:text-lg leading-snug tracking-tight uppercase mb-3 line-clamp-2 min-h-[48px]">
                      {prog.title}
                    </h3>

                    {/* Star Rating & Training Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-bold text-xs">{prog.methodLabel}</span>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(prog.rating)].map((_, i) => (
                            <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-[#063B7A] font-bold text-xs sm:text-[13px] leading-snug">
                        <Award className="w-4 h-4 text-[#FF5A60] shrink-0 mt-0.5" />
                        <span>{prog.methodDetails}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Duration Badge */}
                  <div className="relative pt-3.5 flex items-center justify-between border-t border-slate-100 mt-2 pr-14">
                    {/* Duration Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3C853] text-[#4A3300] font-black text-xs shadow-xs">
                      <span className="text-sm">⌛</span>
                      <span>{prog.duration}</span>
                    </div>
                  </div>

                  {/* Inward S-Curve Corner SVG Cutout Patch */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute bottom-0 right-0 w-28 h-28 pointer-events-none text-white fill-current z-10"
                    aria-hidden="true"
                  >
                    <path d="M 0,0 L 100,0 C 100,45 55,45 55,65 C 55,85 35,100 0,100 Z" />
                  </svg>

                  {/* Circular Action Arrow Button inside Notched Corner */}
                  <Link
                    to={`/courses/${prog.slug}`}
                    className={`absolute bottom-2.5 right-2.5 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer ${
                      isPink
                        ? "bg-[#FF5A60] text-white hover:bg-[#E0484E]"
                        : "bg-white border-2 border-[#12BFD1] text-[#12BFD1] hover:bg-[#12BFD1] hover:text-white"
                    }`}
                  >
                    <ArrowUpRight size={22} className="stroke-[2.5]" />
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
