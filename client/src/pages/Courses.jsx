import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  Clock,
  Monitor,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Filter,
  GraduationCap
} from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import FaqSection from "../components/sections/FaqSection";
import CTASection from "../components/sections/CTASection";
import { getCourseImage } from "../config/courseImages";
import { coursesFaqs } from "../config/pageFaqs";

const ALL_COURSES = [
  // ----------------------------------------------------------------------
  // AAPC CERTIFICATIONS (11 Courses)
  // ----------------------------------------------------------------------
  {
    name: "CPC — Certified Professional Coder",
    code: "CPC",
    category: "AAPC",
    slug: "cpc-certification",
    tagline: "Gold standard AAPC preparation for physician office & outpatient medical coding.",
    duration: "3 Months",
    format: "Online & Classroom",
    badge: "AAPC Certified",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    skills: ["CPT-4 Coding", "ICD-10-CM Guidelines", "HCPCS Level II", "Modifier Usage"]
  },
  {
    name: "CIC — Certified Inpatient Coder",
    code: "CIC",
    category: "AAPC",
    slug: "cic-certification",
    tagline: "Specialized AAPC certification for hospital inpatient medical chart coding & ICD-10-PCS.",
    duration: "3.5 Months",
    format: "Classroom & Live Online",
    badge: "AAPC Inpatient",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    skills: ["ICD-10-PCS Procedure", "MS-DRG Grouping", "Inpatient Records", "Facility Guidelines"]
  },
  {
    name: "COC — Certified Outpatient Coder",
    code: "COC",
    category: "AAPC",
    slug: "coc-certification",
    tagline: "Outpatient hospital facility coding certification covering APCs and ambulatory surgical centers.",
    duration: "3 Months",
    format: "Online & Offline",
    badge: "AAPC Outpatient",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    skills: ["OPPS & APC Payment", "Facility CPT", "Ambulatory Surgery", "Revenue Codes"]
  },
  {
    name: "CPMA — Certified Professional Medical Auditor",
    code: "CPMA",
    category: "AAPC",
    slug: "cpma-certification",
    tagline: "Advanced chart auditing, compliance risk assessment, and SOAP note verification.",
    duration: "2 Months",
    format: "Online Interactive",
    badge: "Auditing & Compliance",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    skills: ["Chart Audit Sampling", "Compliance Risk", "SOAP Note Audit", "E/M Audit Tools"]
  },
  {
    name: "CRC — Certified Risk Adjustment Coder",
    code: "CRC",
    category: "AAPC",
    slug: "hcc-risk-adjustment",
    tagline: "Hierarchical Condition Category (HCC) risk adjustment coding for Medicare Advantage.",
    duration: "2 Months",
    format: "Online",
    badge: "AAPC Risk Adjustment",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    skills: ["HCC Models", "RAF Score Calculation", "CMS Guidelines", "Chronic Conditions"]
  },
  {
    name: "CPB — Certified Professional Biller",
    code: "CPB",
    category: "AAPC",
    slug: "medical-billing-denial-management",
    tagline: "Revenue cycle management, electronic claims submission, and denial resolution.",
    duration: "2.5 Months",
    format: "Online & Offline",
    badge: "AAPC Billing",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    skills: ["Claims Scrubbing", "EOB & ERA Posting", "Denial Management", "HIPAA 837 Forms"]
  },
  {
    name: "CEDC — Emergency Department Coder",
    code: "CEDC",
    category: "AAPC",
    slug: "cedc-certification",
    tagline: "Specialized ED facility level assignment, trauma coding, and emergency procedures.",
    duration: "2 Months",
    format: "Online",
    badge: "AAPC Specialty",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    skills: ["ED Leveling", "Trauma Coding", "Infusion & Injection", "Critical Care CPT"]
  },
  {
    name: "CEMC — Evaluation and Management Coder",
    code: "CEMC",
    category: "AAPC",
    slug: "advanced-em-surgery-coding",
    tagline: "In-depth E/M guidelines 2024, MDM risk calculation, and time-based coding.",
    duration: "2 Months",
    format: "Online",
    badge: "AAPC Specialty",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    skills: ["Medical Decision Making", "History & Exam 2024", "Time-Based Coding", "Audit Grids"]
  },
  {
    name: "CDEO — Documentation Expert Outpatient",
    code: "CDEO",
    category: "AAPC",
    slug: "cdeo-certification",
    tagline: "Physician clinical documentation improvement for outpatient medical records.",
    duration: "1.5 Months",
    format: "Online",
    badge: "Outpatient CDI",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    skills: ["Physician Querying", "Outpatient CDI", "Clinical Specificity", "EHR Workflow"]
  },
  {
    name: "CDEI — Documentation Expert Inpatient",
    code: "CDEI",
    category: "AAPC",
    slug: "cdei-certification",
    tagline: "Hospital inpatient clinical documentation improvement for MS-DRG severity.",
    duration: "1.5 Months",
    format: "Online",
    badge: "Inpatient CDI",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    skills: ["CC & MCC Capture", "Inpatient CDI Query", "Severity of Illness", "Risk of Mortality"]
  },
  {
    name: "CPPM — Physician Practice Manager",
    code: "CPPM",
    category: "AAPC",
    slug: "cppm-certification",
    tagline: "Healthcare office operations, revenue cycle oversight, and practice compliance.",
    duration: "2.5 Months",
    format: "Online",
    badge: "Practice Management",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    skills: ["Practice Operations", "RCM Oversight", "HIPAA Compliance", "HR & Payroll"]
  },

  // ----------------------------------------------------------------------
  // SPECIALTY TRAINING (9 Courses)
  // ----------------------------------------------------------------------
  {
    name: "SURGERY — Advanced Surgical CPT Coding",
    code: "SURGERY",
    category: "SPECIALTY",
    slug: "advanced-em-surgery-coding",
    tagline: "Operative report analysis, surgical CPT coding, and complex modifier applications.",
    duration: "2.5 Months",
    format: "Online & Classroom",
    badge: "Specialty Master",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    skills: ["Operative Reports", "Orthopedic Surgery", "General Surgery CPT", "CCI Edits"]
  },
  {
    name: "ED — Emergency Department Coding",
    code: "ED",
    category: "SPECIALTY",
    slug: "ed-coding",
    tagline: "Fast-paced ED chart coding, facility E/M leveling, and emergency procedure CPTs.",
    duration: "2 Months",
    format: "Online Interactive",
    badge: "Specialty Master",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    skills: ["ED Level 1-5 Charting", "Trauma Coding", "Laceration Repair", "Critical Care"]
  },
  {
    name: "EM — Evaluation & Management Specialist",
    code: "EM",
    category: "SPECIALTY",
    slug: "advanced-em-surgery-coding",
    tagline: "Expert E/M code selection for inpatient, outpatient, emergency, and consultation services.",
    duration: "2 Months",
    format: "Online",
    badge: "Specialty Master",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    skills: ["2024 E/M Guidelines", "MDM Matrix", "Time-Based Billing", "Consultation Codes"]
  },
  {
    name: "RADIOLOGY — Diagnostic & Interventional",
    code: "RADIOLOGY",
    category: "SPECIALTY",
    slug: "radiology-coding",
    tagline: "X-ray, CT, MRI, Ultrasound, and nuclear medicine diagnostic coding guidelines.",
    duration: "2 Months",
    format: "Online",
    badge: "Specialty Master",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    skills: ["Diagnostic Radiology", "CT / MRI Modifiers", "Contrast Supervision", "Mammography"]
  },
  {
    name: "ANESTHESIA — Anesthesia Time & Crosswalk",
    code: "ANESTHESIA",
    category: "SPECIALTY",
    slug: "anesthesia-coding",
    tagline: "ASA physical status modifiers, anesthesia base units, and concurrency calculations.",
    duration: "1.5 Months",
    format: "Online",
    badge: "Specialty Master",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    skills: ["ASA Crosswalk", "Base & Time Units", "Physical Status P1-P6", "CRNA Concurrency"]
  },
  {
    name: "IP DRG — Hospital Inpatient Grouping",
    code: "IP DRG",
    category: "SPECIALTY",
    slug: "ccs-certification",
    tagline: "MS-DRG, APR-DRG, principal diagnosis selection, and hospital reimbursement algorithms.",
    duration: "2.5 Months",
    format: "Online & Offline",
    badge: "Hospital Master",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    skills: ["MS-DRG Grouping", "APR-DRG Severity", "POA Indicators", "GEMS Mapping"]
  },
  {
    name: "HCC — Risk Adjustment Analytics",
    code: "HCC",
    category: "SPECIALTY",
    slug: "hcc-risk-adjustment",
    tagline: "Medicare Advantage V24/V28 models, chronic condition validation, and RAF scores.",
    duration: "2 Months",
    format: "Online",
    badge: "Specialty Master",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    skills: ["CMS-HCC V28 Model", "RAF Scores", "MEAT Criteria", "RADV Audit Prep"]
  },
  {
    name: "IVR — Interventional Vascular Radiology",
    code: "IVR",
    category: "SPECIALTY",
    slug: "ivr-coding",
    tagline: "Complex catheter placement, angiography, vascular order coding, and embolization.",
    duration: "2 Months",
    format: "Online",
    badge: "Advanced Specialty",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    skills: ["Catheter Order", "Diagnostic Angiogram", "Stent & Embolization", "Vascular Families"]
  },
  {
    name: "CDI — Clinical Documentation Improvement",
    code: "CDI",
    category: "SPECIALTY",
    slug: "cdi-coding",
    tagline: "Bridging clinical documentation gaps between physicians, coders, and hospital billing.",
    duration: "2 Months",
    format: "Online",
    badge: "CDI Specialist",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    skills: ["Physician Querying", "Clinical Specificity", "Severity & Mortality", "EHR Auditing"]
  },

  // ----------------------------------------------------------------------
  // AHIMA CERTIFICATIONS (4 Courses)
  // ----------------------------------------------------------------------
  {
    name: "CCS — Certified Coding Specialist",
    code: "CCS",
    category: "AHIMA",
    slug: "ccs-certification",
    tagline: "Premier AHIMA hospital coding credential covering inpatient ICD-10-PCS & CPT.",
    duration: "4 Months",
    format: "Classroom & Live Online",
    badge: "AHIMA Gold Standard",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    skills: ["ICD-10-PCS Inpatient", "Hospital DRG", "AHIMA Exam Prep", "Clinical Records"]
  },
  {
    name: "CCS-P — Certified Coding Specialist (Physician)",
    code: "CCS-P",
    category: "AHIMA",
    slug: "ccs-p-certification",
    tagline: "AHIMA physician-based coding credential for clinic, group practice, and specialty care.",
    duration: "3.5 Months",
    format: "Online",
    badge: "AHIMA Physician",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    skills: ["Physician CPT-4", "Outpatient ICD-10", "E/M Audit", "AHIMA Physician Prep"]
  },
  {
    name: "RHIA — Health Information Administrator",
    code: "RHIA",
    category: "AHIMA",
    slug: "rhia-certification",
    tagline: "Healthcare information management, data analytics, and administrative oversight.",
    duration: "6 Months",
    format: "Online & Executive",
    badge: "AHIMA Admin",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    skills: ["Health Data Analytics", "Privacy & Security", "HIM Leadership", "EHR Governance"]
  },
  {
    name: "RHIT — Health Information Technician",
    code: "RHIT",
    category: "AHIMA",
    slug: "rhit-certification",
    tagline: "Technical health records management, medical coding audit, and quality assurance.",
    duration: "5 Months",
    format: "Online",
    badge: "AHIMA Technician",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    skills: ["Record Assembly", "Data Integrity", "Coding Quality", "Release of Info"]
  },

  // ----------------------------------------------------------------------
  // HIMAA CERTIFICATIONS (2 Courses)
  // ----------------------------------------------------------------------
  {
    name: "CCC — Clinical Coding Certificate",
    code: "CCC",
    category: "HIMAA",
    slug: "ccc-certification",
    tagline: "International health record coding certification accredited by HIMAA standards.",
    duration: "3 Months",
    format: "Online",
    badge: "HIMAA Accredited",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    skills: ["Clinical Coding", "Health Records", "Global Classification", "Quality Metrics"]
  },
  {
    name: "HIM — Health Information Management",
    code: "HIM",
    category: "HIMAA",
    slug: "him-certification",
    tagline: "Foundational health information management systems, electronic health records, and privacy.",
    duration: "3 Months",
    format: "Online",
    badge: "HIMAA Accredited",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    skills: ["EHR Management", "Medical Privacy", "Health Data Standards", "Hospital Workflows"]
  }
];

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = ALL_COURSES.filter((course) => {
    const matchesCategory = selectedCategory === "ALL" || course.category === selectedCategory;
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF8F5] text-navy-900 overflow-hidden min-h-screen">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO HEADER BANNER                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-36 pb-20 bg-gradient-to-r from-navy-950 via-[#0b3347] to-teal-900 text-white overflow-hidden">
        <div className="container-max px-6 sm:px-10 lg:px-16 relative z-10 text-center space-y-5">
          <span className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-teal-400/30">
            <Sparkles size={14} className="text-teal-400" /> Master Course Directory
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Medical Coding & <span className="text-[#16ADBA]">Certification Programs</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
            Explore 26+ industry-accredited AAPC, AHIMA, HIMAA, and Specialty Training certification tracks with 100% placement support.
          </p>

          {/* Search Box & Category Filters */}
          <div className="max-w-2xl mx-auto pt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses (e.g. CPC, CCS, Surgery, Billing, Risk Adjustment)..."
                className="w-full bg-white text-navy-900 rounded-full pl-12 pr-6 py-4 text-sm font-semibold shadow-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-[#16ADBA] transition-all placeholder:text-navy-900/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400 hover:text-navy-900"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {[
                { id: "ALL", label: `All Programs (${ALL_COURSES.length})` },
                { id: "AAPC", label: "AAPC (11)" },
                { id: "SPECIALTY", label: "Specialty Training (9)" },
                { id: "AHIMA", label: "AHIMA (4)" },
                { id: "HIMAA", label: "HIMAA (2)" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-[#16ADBA] text-white shadow-lg shadow-teal-500/30 scale-105"
                      : "bg-white/10 hover:bg-white/20 text-white/90 border border-white/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MASTER COURSES DIRECTORY GRID                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16">
        <div className="container-max px-6 sm:px-10 lg:px-16 space-y-12">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 flex items-center gap-2">
              <GraduationCap className="text-[#16ADBA]" size={24} />
              <span>
                {selectedCategory === "ALL" ? "All Programs" : `${selectedCategory} Certification Tracks`}
              </span>
            </h2>
            <span className="text-xs font-extrabold text-navy-900/50">
              Showing {filteredCourses.length} Programs
            </span>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-xl space-y-3">
              <h3 className="text-xl font-extrabold text-navy-900">No Courses Found</h3>
              <p className="text-navy-900/60 text-sm">No medical coding courses matched "{searchQuery}". Try searching for CPC, CCS, or Surgery.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(""); setSelectedCategory("ALL"); }}
                className="inline-block text-xs font-extrabold text-[#16ADBA] underline pt-2"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course, idx) => (
                  <RevealOnScroll key={course.name} delay={(idx % 3) * 0.06}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100/90 flex flex-col justify-between group hover:shadow-2xl hover:border-teal-400/40 transition-all duration-300 h-full"
                    >
                      {/* Card Photo & Category Badge */}
                      <div className="relative h-52 overflow-hidden bg-slate-900">
                        <img
                          src={getCourseImage(course.slug || course)}
                          alt={course.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />

                        {/* Category Badge */}
                        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#16ADBA] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md">
                          {course.badge}
                        </span>

                        <span className="absolute bottom-3 right-3 bg-navy-950/70 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-white/20 uppercase tracking-wider">
                          {course.code}
                        </span>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                        <div className="space-y-2">
                          <h3 className="text-xl font-extrabold text-navy-900 leading-snug group-hover:text-[#16ADBA] transition-colors">
                            {course.name}
                          </h3>
                          <p className="text-navy-900/70 text-xs leading-relaxed line-clamp-2">
                            {course.tagline}
                          </p>

                          {/* Skill Pills */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {course.skills.map((skill) => (
                              <span
                                key={skill}
                                className="bg-slate-50 text-navy-900/80 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-200/60"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Metadata & CTA Link */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between text-xs font-bold text-navy-900/60">
                            <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 px-3 py-1 rounded-full border border-teal-200/50">
                              <Clock size={13} /> {course.duration}
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-navy-900/80 px-3 py-1 rounded-full">
                              <Monitor size={13} /> {course.format}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <Link
                              to={`/courses/${course.slug}`}
                              className="flex-1 bg-[#16ADBA] hover:bg-teal-600 text-white font-extrabold text-xs py-3 rounded-2xl transition-all text-center shadow-md hover:shadow-lg inline-flex items-center justify-center gap-1.5"
                            >
                              <span>Curriculum & Syllabus</span>
                              <ArrowRight size={14} />
                            </Link>
                            <Link
                              to="/contact"
                              className="bg-slate-100 hover:bg-slate-200 text-navy-900 font-extrabold text-xs px-4 py-3 rounded-2xl transition-all"
                            >
                              Enroll
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </RevealOnScroll>
                ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      <FaqSection items={coursesFaqs} />
      <CTASection />
    </div>
  );
}
