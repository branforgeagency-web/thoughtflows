import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Monitor,
  CheckCircle2,
  Sparkles,
  Award,
  ChevronRight,
  Star,
  BookOpen
} from "lucide-react";
import RevealOnScroll from "../RevealOnScroll";
import MagneticButton from "../MagneticButton";
import { getCourseImage } from "../../config/courseImages";

const coursesData = [
  {
    id: "01",
    name: "CPC — Certified Professional Coder",
    category: "AAPC Certification",
    slug: "cpc-certification",
    tagline: "Master AAPC CPC exam preparation with live chart coding, CPT, ICD-10-CM & HCPCS guidelines.",
    duration: "3 Months",
    format: "Online & Classroom",
    badge: "Most Popular AAPC Track",
    rating: "4.9 ★ (12,400+ Students)",
    image: getCourseImage("cpc-certification"),
    highlights: ["CPT & ICD-10-CM Medical Coding", "100+ Live Mock Exam Drills", "AAPC Exam Voucher & Retake Support"]
  },
  {
    id: "02",
    name: "CCS — Certified Coding Specialist",
    category: "AHIMA Certification",
    slug: "ccs-certification",
    tagline: "Hospital inpatient DRG coding & AHIMA CCS certification training for complex clinical charts.",
    duration: "4 Months",
    format: "Classroom & Live Online",
    badge: "Inpatient Hospital Specialist",
    rating: "4.8 ★ (8,900+ Students)",
    image: getCourseImage("ccs-certification"),
    highlights: ["ICD-10-PCS Inpatient Coding", "DRG Grouping & Clinical Auditing", "Hospital Medical Record Review"]
  },
  {
    id: "03",
    name: "HCC Risk Adjustment Coding",
    category: "Specialty Training",
    slug: "hcc-risk-adjustment",
    tagline: "Specialized Risk Adjustment coding for Medicare Advantage & US healthcare analytics.",
    duration: "2 Months",
    format: "Online Interactive",
    badge: "High Growth Specialty",
    rating: "4.9 ★ (6,200+ Students)",
    image: getCourseImage("hcc-risk-adjustment"),
    highlights: ["RAF Score & CMS Guidelines", "Chart Auditing & Compliance", "Medicare Advantage Analytics"]
  },
  {
    id: "04",
    name: "Medical Billing & Denial Management",
    category: "Revenue Cycle",
    slug: "medical-billing-denial-management",
    tagline: "Master RCM revenue cycle management, claims scrubbing, and denial resolution for BPO roles.",
    duration: "2.5 Months",
    format: "Online & Offline",
    badge: "RCM Career Track",
    rating: "4.8 ★ (5,100+ Students)",
    image: getCourseImage("medical-billing-denial-management"),
    highlights: ["Claims Scrubbing & AR Follow-up", "Denial Management Strategies", "HIPAA & Billing Software"]
  },
  {
    id: "05",
    name: "Medical Coding Foundation Program",
    category: "Foundation Track",
    slug: "medical-coding-foundation",
    tagline: "Essential human anatomy, medical terminology, and ICD-10 basics for beginners.",
    duration: "1.5 Months",
    format: "Classroom Training",
    badge: "Beginner Friendly",
    rating: "4.9 ★ (15,000+ Graduates)",
    image: getCourseImage("medical-coding-foundation"),
    highlights: ["Human Anatomy & Physiology 3D", "Medical Terminology Mastery", "ICD-10-CM Coding Fundamentals"]
  },
  {
    id: "06",
    name: "Advanced E/M & Surgical Coding",
    category: "Specialty Training",
    slug: "advanced-em-surgery-coding",
    tagline: "Specialty coding course for Evaluation & Management guidelines and complex surgical procedures.",
    duration: "3 Months",
    format: "Online Interactive",
    badge: "Advanced Level",
    rating: "4.9 ★ (4,800+ Students)",
    image: getCourseImage("advanced-em-surgery-coding"),
    highlights: ["Operative Report Coding", "E/M Audit Guidelines 2024", "Complex Surgical Modifiers"]
  }
];

export default function CoursesPreview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCourse = coursesData[activeIdx];

  return (
    <section className="py-24 bg-[#0B192C] text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#16ADBA]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

      <div className="container-max px-6 sm:px-10 lg:px-16 relative z-10 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-[#16ADBA]/20 text-teal-300 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#16ADBA]/30">
            <Sparkles size={14} className="text-[#16ADBA]" /> Interactive Program Explorer
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Explore Certified <span className="text-[#16ADBA]">Medical Coding Tracks</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Select or hover over any program on the left to preview the curriculum, certification details, and career outcomes.
          </p>
        </div>

        {/* Dynamic Interactive Split Stage (Non-Card Layout) */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          
          {/* Left Column: Interactive Course List / Accordion Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {coursesData.map((course, idx) => {
              const isActive = activeIdx === idx;
              return (
                <motion.div
                  key={course.id}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  whileHover={{ x: 6 }}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between border ${
                    isActive
                      ? "bg-gradient-to-r from-[#16ADBA] to-teal-700 text-white border-teal-400/50 shadow-lg shadow-teal-500/20"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-black text-sm ${isActive ? "text-white" : "text-[#16ADBA]"}`}>
                      {course.id}
                    </span>
                    <div>
                      <h3 className={`font-extrabold text-sm sm:text-base leading-snug ${isActive ? "text-white" : "text-white/90"}`}>
                        {course.name}
                      </h3>
                      <p className={`text-xs mt-0.5 ${isActive ? "text-teal-100" : "text-slate-400"}`}>
                        {course.category} • {course.duration}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={18} className={`transition-transform duration-300 shrink-0 ${isActive ? "translate-x-1 text-white" : "text-white/30"}`} />
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stage Spotlight Display */}
          <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[520px] rounded-3xl overflow-hidden border border-white/15 bg-slate-950 flex flex-col justify-end p-8 sm:p-12">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCourse.slug}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-0"
              >
                <img
                  src={activeCourse.image}
                  alt={activeCourse.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/20" />
              </motion.div>
            </AnimatePresence>

            {/* Stage Foreground Details */}
            <div className="relative z-10 space-y-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCourse.slug + "-details"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#16ADBA] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                      {activeCourse.badge}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md text-teal-200 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                      {activeCourse.rating}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                    {activeCourse.name}
                  </h3>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
                    {activeCourse.tagline}
                  </p>

                  {/* Highlights List */}
                  <div className="grid sm:grid-cols-2 gap-2 pt-2">
                    {activeCourse.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs font-bold text-teal-200">
                        <CheckCircle2 size={15} className="text-[#16ADBA] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs & Format Chips */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/courses/${activeCourse.slug}`}
                      className="bg-[#16ADBA] hover:bg-teal-600 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-teal-500/30 inline-flex items-center gap-2"
                    >
                      <span>Explore Full Syllabus</span>
                      <ArrowRight size={16} />
                    </Link>

                    <Link
                      to="/contact"
                      className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all border border-white/20"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

        </div>

        {/* Ticker Marquee Bottom Bar */}
        <div className="pt-4 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#16ADBA] hover:text-teal-300 transition-colors"
          >
            <span>Browse Full 49+ Certification Modules Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
