import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Monitor,
  IndianRupee,
  ArrowRight,
  Briefcase,
  CalendarDays,
  FileCheck2,
  Users,
  PhoneCall,
  ShieldCheck,
  Award,
  Sparkles,
  BookOpen,
  GraduationCap,
  Target,
  FileText
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import RevealOnScroll from "../components/RevealOnScroll";
import MagneticButton from "../components/MagneticButton";
import FaqAccordion from "../components/FaqAccordion";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/sections/CTASection";
import useFetch from "../hooks/useFetch";
import { whyChooseUsItems } from "../config/whyChooseUsItems";
import { COURSE_IMAGES, getCourseImage } from "../config/courseImages";

const COURSE_FALLBACKS = {
  "cpc-certification": { name: "Certified Professional Coder (CPC)", category: "AAPC" },
  "cic-certification": { name: "Certified Inpatient Coder (CIC)", category: "AAPC" },
  "cpma-certification": { name: "Certified Professional Medical Auditor (CPMA)", category: "AAPC" },
  "coc-certification": { name: "Certified Outpatient Coder (COC)", category: "AAPC" },
  "crc-certification": { name: "Certified Risk Adjustment Coder (CRC)", category: "AAPC" },
  "cpb-certification": { name: "Certified Professional Biller (CPB)", category: "AAPC" },
  "cedc-certification": { name: "Certified Emergency Department Coder (CEDC)", category: "AAPC" },
  "cemc-certification": { name: "Certified Evaluation and Management Coder (CEMC)", category: "AAPC" },
  "cdeo-certification": { name: "Certified Documentation Expert Outpatient (CDEO)", category: "AAPC" },
  "cdei-certification": { name: "Certified Documentation Expert Inpatient (CDEI)", category: "AAPC" },
  "cppm-certification": { name: "Certified Physician Practice Manager (CPPM)", category: "AAPC" },
  "surgery-specialty-coding": { name: "Surgery Specialty Medical Coding", category: "Speciality" },
  "ed-specialty-coding": { name: "Emergency Department (ED) Specialty Coding", category: "Speciality" },
  "em-specialty-coding": { name: "Evaluation & Management (E/M) Specialty Coding", category: "Speciality" },
  "radiology-specialty-coding": { name: "Radiology Specialty Medical Coding", category: "Speciality" },
  "anesthesia-specialty-coding": { name: "Anesthesia Specialty Medical Coding", category: "Speciality" },
  "ip-drg-coding": { name: "Inpatient DRG (Diagnosis-Related Group) Coding", category: "Speciality" },
  "hcc-risk-adjustment": { name: "HCC Risk Adjustment Coding", category: "Speciality" },
  "ivr-specialty-coding": { name: "Interventional Radiology (IVR) Specialty Coding", category: "Speciality" },
  "cdi-specialty-coding": { name: "Clinical Documentation Improvement (CDI)", category: "Speciality" },
  "ccs-certification": { name: "Certified Coding Specialist (CCS)", category: "AHIMA" },
  "ccs-p-certification": { name: "Certified Coding Specialist - Physician-based (CCS-P)", category: "AHIMA" },
  "rhia-certification": { name: "Registered Health Information Administrator (RHIA)", category: "AHIMA" },
  "rhit-certification": { name: "Registered Health Information Technician (RHIT)", category: "AHIMA" },
  "ccc-certification": { name: "Clinical Coding Certification (CCC)", category: "HIMAA" },
  "him-certification": { name: "Health Information Management (HIM)", category: "HIMAA" }
};

function buildFallbackCourse(slug) {
  if (slug === "cpc-certification") {
    return {
      name: "Certified Professional Coder (CPC)",
      slug: "cpc-certification",
      eyebrow: "INDIA'S LEADING ONLINE & OFFLINE Medical Coding Academy",
      tagline: "Certified Professional Coder (CPC) certification is the gold standard for medical coding. It validates your ability to accurately assign CPT, ICD-10-CM, and HCPCS Level II codes for physician and outpatient claims.",
      duration: "2-3 Months",
      format: "Online & Offline",
      fee: "₹45,000",
      phone: "+91 91764 43331",
      image: getCourseImage({ slug }),
      highlights: [
        "High Job Demand",
        "Flexible Work Models",
        "Globally Recognized Certification"
      ],
      description: "Certified Professional Coder (CPC) certification is the gold standard for medical coding. It validates your ability to accurately assign CPT, ICD-10-CM, and HCPCS Level II codes for physician and outpatient claims.",
      whatIsIt: "Certified Professional Coder (CPC) certification is the gold standard for medical coding. It validates your ability to accurately assign CPT, ICD-10-CM, and HCPCS Level II codes for physician and outpatient claims — the exact skill set clinics, hospitals, and healthcare RCM organizations hire for worldwide.",
      whyItMatters: "Medical coders review medical documentation and translate healthcare services into standardized code sets. Certified coders ensure billing accuracy, compliance, and swift claims reimbursement across outpatient centers and hospitals.",
      whoIsItFor: [
        "Life science, nursing, and pharmacy graduates",
        "Healthcare professionals looking for career growth",
        "Medical coders expanding into AAPC specialty certifications",
        "Detail-oriented students seeking high-demand healthcare careers"
      ],
      roles: [
        "Reviewing clinical records for billing and coding accuracy",
        "Assigning CPT, ICD-10-CM, and HCPCS Level II code sets",
        "Ensuring compliance with healthcare audit guidelines",
        "Preventing claims denials and optimizing reimbursement"
      ],
      batchOptions: [
        { label: "Standard Training Duration", schedule: "2-3 Months (Weekday & Weekend Batches)" },
        { label: "Learning Mode", schedule: "Classroom & Live Interactive Online" },
        { label: "Placement Assistance", schedule: "100% Placement Support" },
        { label: "Admissions & Counseling Contact", schedule: "+91 91764 43331" }
      ],
      examOverview: {
        duration: "4 Hours",
        format: "100 MCQs (Open Code Book)",
        passRequirement: "70% or higher",
        language: "English",
        codeBooks: "AAPC Official CPT, ICD-10-CM & HCPCS Level II"
      },
      whyChooseCPC: [
        {
          title: "Expert Management",
          description: "Experienced faculty guiding through real chart coding and exam preparation."
        },
        {
          title: "Comprehensive Study Material",
          description: "Includes latest CPT, ICD-10-CM & HCPCS Level II codebooks & practice tests."
        },
        {
          title: "Flexible Learning Modes",
          description: "Online & Offline flexible batches tailored for students & working professionals."
        },
        {
          title: "Practical Experience",
          description: "Hands-on medical records chart coding practice with live physician documentation."
        },
        {
          title: "CPC Exam Readiness",
          description: "Timed mock exams & score analysis to ensure first-attempt pass success."
        },
        {
          title: "Placement Support",
          description: "Resume preparation, mock interviews & direct hiring referrals to 500+ healthcare companies."
        }
      ],
      placementServices: {
        title: "Placement Services",
        subtitle: "Transform your career path with Thoughtflows CPC Certification",
        before: [
          "Limited growth opportunities in basic entry-level roles",
          "Non-certified coding background with lower pay scales",
          "Uncertain career roadmap and slow progression",
          "Difficulty clearing initial employer technical screenings"
        ],
        after: [
          "High demand across top hospitals & international RCM MNCs",
          "Direct eligibility for Senior Coder & Auditor positions",
          "Clear career path to Coding Lead, QA & Billing Manager",
          "Competitive compensation packages & remote work opportunities"
        ]
      },
      curriculum: [
        {
          title: "Medical Terminology & Anatomy",
          topics: [
            "Fundamentals of human anatomy, physiology, and medical terms needed for accurate coding.",
            "Body systems, anatomical terminology, and directional terms",
            "Clinical documentation vocabulary and diagnostic phrasing"
          ]
        },
        {
          title: "ICD-10-CM Coding Guidelines",
          topics: [
            "In-depth training on diagnosis coding conventions, official guidelines, and chapter-specific rules.",
            "Alphabetic Index and Tabular List navigation techniques",
            "Coding rules for acute vs chronic diseases and sequelae"
          ]
        },
        {
          title: "CPT Coding & Procedure Basics",
          topics: [
            "Core principles of procedure coding, E/M coding, surgery guidelines, and modifiers usage.",
            "Evaluation and Management (E/M) service level selection",
            "Surgical, Radiology, Pathology & Anesthesia procedure coding"
          ]
        },
        {
          title: "HCPCS Level II Coding",
          topics: [
            "Understanding national codes for supplies, equipment, drugs, and outpatient services.",
            "Durable Medical Equipment (DME) coding & national modifiers",
            "Coordinating CPT and HCPCS codes on single outpatient claims"
          ]
        },
        {
          title: "Chart Auditing & Compliance",
          topics: [
            "Reviewing clinical charts, ensuring documentation compliance, HIPAA rules, and fraud prevention.",
            "Healthcare compliance, OIG guidelines, and audit preparedness",
            "Identifying documentation gaps to prevent claim rejections"
          ]
        },
        {
          title: "Claims & Denial Management",
          topics: [
            "Understanding healthcare reimbursement, claim submission workflows, and resolving code-related claim denials.",
            "End-to-end RCM workflow from patient intake to claim pay-out",
            "Analyzing denial codes and resubmitting clean corrected claims"
          ]
        },
        {
          title: "Mock Exams & Exam Prep Strategy",
          topics: [
            "Timed full-length CPC model exams, doubt clearing sessions, and test-taking strategies.",
            "Simulated 4-hour AAPC exam environment and time management",
            "Item-by-item score analysis and focus areas review"
          ]
        },
        {
          title: "Career & Placement Assistance",
          topics: [
            "Resume building, LinkedIn profile setup, mock interviews, and guaranteed placement assistance.",
            "Technical coding interview preparation with subject matter leads",
            "Direct interview referrals across 500+ corporate hiring partners"
          ]
        }
      ],
      skills: ["CPT Coding", "ICD-10-CM", "HCPCS Level II", "Medical Terminology", "Anatomy & Physiology", "Chart Auditing", "Claims Compliance", "Denial Management"],
      careerOpportunities: ["Medical Coder", "CPC Certified Coder", "Senior Coding Specialist", "Medical Coding Auditor", "Claims Analyst", "Billing & Coding Team Lead"],
      faqs: [
        {
          question: "What is the eligibility for CPC training?",
          answer: "Any graduate (life sciences, pharmacy, nursing, or general) or working professional looking to start or advance a medical coding career can enroll. No prior coding experience is required."
        },
        {
          question: "What is the duration of the CPC training program?",
          answer: "The standard CPC training program runs for 2 to 3 months, offering flexible weekday and weekend options to suit both fresh graduates and working professionals."
        },
        {
          question: "Is classroom and online training available?",
          answer: "Yes! We offer both offline classroom training at all 15 branches nationwide and live interactive online batches with dedicated mentor support."
        },
        {
          question: "What certification exam does this course prepare for?",
          answer: "This course specifically prepares students for the official AAPC Certified Professional Coder (CPC) examination."
        },
        {
          question: "Does Thoughtflows provide job placement assistance?",
          answer: "Yes, we provide 100% placement support with resume optimization, mock technical interviews, and direct hiring referrals to 500+ healthcare companies."
        },
        {
          question: "Is medical background mandatory for CPC certification?",
          answer: "No, a medical background is not mandatory. Candidates from non-medical fields are given comprehensive foundational training in human anatomy and medical terminology."
        },
        {
          question: "What code books are required for CPC training?",
          answer: "The program requires the official AAPC CPT, ICD-10-CM, and HCPCS Level II codebooks, which are guided and reviewed extensively in class."
        },
        {
          question: "How to register for CPC exam?",
          answer: "Our academic team guides you step-by-step through official AAPC exam voucher registration, center selection, and exam scheduling."
        },
        {
          question: "What is the salary of a CPC certified coder?",
          answer: "CPC certified coders earn competitive packages starting from ₹3.5 LPA to ₹8+ LPA depending on experience, specialty, and employer organization."
        },
        {
          question: "Are mock exams included in the course?",
          answer: "Yes, multiple timed full-length mock exams modeled after the actual AAPC exam format are included, complete with detailed score reviews."
        }
      ]
    };
  }

  if (slug === "cic-certification") {
    return {
      name: "Certified Inpatient Coder (CIC)",
      slug: "cic-certification",
      eyebrow: "AAPC INPATIENT FACILITY CERTIFICATION",
      tagline: "Certified Inpatient Coder (CIC) certification validates specialized expertise in hospital inpatient facility coding, ICD-10-PCS procedure coding, and MS-DRG assignment.",
      duration: "3-4 Months",
      format: "Online & Offline",
      fee: "₹48,000",
      phone: "+91 91764 43331",
      image: getCourseImage({ slug }),
      highlights: [
        "Inpatient Hospital Specialist",
        "High Salary Trajectory",
        "Globally Recognized Credential"
      ],
      description: "Certified Inpatient Coder (CIC) certification validates specialized expertise in hospital inpatient facility coding, ICD-10-PCS procedure coding, and MS-DRG assignment.",
      whatIsIt: "The Certified Inpatient Coder (CIC) credential, issued by AAPC, is the premier certification dedicated to inpatient hospital facility coding. It validates your ability to assign ICD-10-CM diagnosis codes and ICD-10-PCS inpatient procedure codes for acute care inpatient records.",
      whyItMatters: "Inpatient coding is significantly more complex than outpatient coding. Inpatient coders analyze extensive clinical records to determine principal diagnoses and procedures that drive hospital Medicare Severity Diagnosis-Related Group (MS-DRG) reimbursement.",
      whoIsItFor: [
        "CPC certified coders wanting to expand into inpatient hospital coding",
        "Life science, nursing, and medical graduates",
        "Hospital billing and HIM department staff seeking career advancement",
        "Coders aiming for high-paying facility coding and auditing roles"
      ],
      roles: [
        "Auditing complex inpatient hospital medical records",
        "Assigning ICD-10-CM diagnoses and ICD-10-PCS inpatient procedure codes",
        "Determining MS-DRG and APR-DRG groupings for facility reimbursement",
        "Ensuring compliance with CMS inpatient coding guidelines and UHDDS standards"
      ],
      batchOptions: [
        { label: "Standard Training Duration", schedule: "3-4 Months (Weekday & Weekend Batches)" },
        { label: "Learning Mode", schedule: "Classroom & Live Interactive Online" },
        { label: "Placement Assistance", schedule: "100% Placement Support" },
        { label: "Admissions & Counseling Contact", schedule: "+91 91764 43331" }
      ],
      examOverview: {
        duration: "4 Hours",
        format: "Multiple Choice & Fill-in-the-Blank Case Studies",
        passRequirement: "70% or higher",
        language: "English",
        codeBooks: "Official ICD-10-CM & ICD-10-PCS Code Books"
      },
      whyChooseCPC: [
        {
          title: "Inpatient Expert Faculty",
          description: "Train directly under senior hospital inpatient coders with years of acute care experience."
        },
        {
          title: "ICD-10-PCS Mastery",
          description: "Comprehensive step-by-step training on ICD-10-PCS tables, approach values, and root operations."
        },
        {
          title: "Real Inpatient Chart Practice",
          description: "Hands-on coding of actual discharged inpatient medical charts across surgical & medical specialties."
        },
        {
          title: "MS-DRG Calculation Drills",
          description: "Learn how CCs, MCCs, and principal diagnoses impact hospital MS-DRG reimbursement."
        },
        {
          title: "Timed CIC Model Exams",
          description: "Multiple timed mock exams simulating the official AAPC CIC examination."
        },
        {
          title: "Placement Support",
          description: "Direct placement referrals to top hospital chains and international healthcare BPOs."
        }
      ],
      placementServices: {
        title: "CIC Placement Services",
        subtitle: "Advance into high-tier hospital facility coding with CIC Certification",
        before: [
          "Limited to outpatient physician office coding",
          "Lack of ICD-10-PCS procedural coding expertise",
          "Lower compensation ceiling compared to facility coders",
          "Inability to apply for inpatient auditor or DRG reviewer roles"
        ],
        after: [
          "High demand across major multi-specialty hospital systems",
          "Direct eligibility for Inpatient Coder & DRG Auditor positions",
          "Significant salary increment and remote inpatient coding options",
          "Clear advancement to HIM Leadership and Clinical Documentation Improvement (CDI)"
        ]
      },
      curriculum: [
        {
          title: "Inpatient Anatomy & Clinical Documentation",
          topics: [
            "Advanced anatomical concepts relevant to acute care inpatient documentation.",
            "UHDDS definitions (Uniform Hospital Discharge Data Set)",
            "Interpreting physician discharge summaries, operative reports & progress notes"
          ]
        },
        {
          title: "ICD-10-CM Inpatient Diagnosis Coding",
          topics: [
            "Inpatient specific coding guidelines for principal vs secondary diagnoses",
            "Present on Admission (POA) indicator assignment guidelines",
            "Complications and Comorbidities (CC) & Major CCs (MCC) identification"
          ]
        },
        {
          title: "ICD-10-PCS Procedure Coding System",
          topics: [
            "Structure and logic of the 7-character ICD-10-PCS coding system",
            "Root operation definitions across Medical and Surgical sections",
            "Body system, approach, device, and qualifier selection rules"
          ]
        },
        {
          title: "MS-DRG & Inpatient Reimbursement Systems",
          topics: [
            "Medicare Severity Diagnosis-Related Groups (MS-DRG) methodology",
            "All Patient Refined DRGs (APR-DRG) & severity of illness scoring",
            "Inpatient Prospective Payment System (IPPS) compliance"
          ]
        },
        {
          title: "Inpatient Chart Auditing & Compliance",
          topics: [
            "Auditing discharge summaries and clinical indicator queries",
            "Resolving physician documentation ambiguity before coding lock",
            "HIPAA compliance, OIG audit targets, and inpatient fraud prevention"
          ]
        },
        {
          title: "Mock Exams & Timed CIC Strategy",
          topics: [
            "Full-length AAPC CIC mock exam practice sessions",
            "Time allocation tactics for long inpatient case study questions",
            "Detailed answer explanation and error analysis reviews"
          ]
        }
      ],
      skills: ["ICD-10-PCS", "ICD-10-CM Inpatient", "MS-DRG Assignment", "APR-DRG", "UHDDS Guidelines", "POA Indicators", "Inpatient Chart Auditing", "Hospital Billing"],
      careerOpportunities: ["Inpatient Medical Coder", "CIC Certified Coder", "Inpatient DRG Auditor", "HIM Coding Specialist", "Hospital Reimbursement Analyst"],
      faqs: [
        {
          question: "What is the difference between CPC and CIC certification?",
          answer: "CPC focuses on outpatient physician office coding (using CPT and ICD-10-CM), while CIC focuses on hospital inpatient facility coding (using ICD-10-PCS and ICD-10-CM for DRG reimbursement)."
        },
        {
          question: "Who is eligible to take the CIC course?",
          answer: "Any graduate (life sciences, pharmacy, nursing, or general) or coders who already hold a CPC or foundational coding credential looking to specialize in hospital inpatient coding."
        },
        {
          question: "What code books are required for the CIC exam?",
          answer: "The CIC exam requires the official ICD-10-CM and ICD-10-PCS codebooks."
        },
        {
          question: "What is the duration of the CIC training program?",
          answer: "The CIC program runs for 3 to 4 months, covering acute care documentation, ICD-10-PCS, MS-DRGs, and intensive case study mock practice."
        },
        {
          question: "Does Thoughtflows assist with job placement after CIC certification?",
          answer: "Yes! Our placement team works with leading hospital networks, corporate healthcare providers, and global RCM MNCs to secure job placements."
        }
      ]
    };
  }

  const known = COURSE_FALLBACKS[slug];
  const name = known?.name || slug
    .split("-")
    .map((w) => w.toUpperCase())
    .join(" ");

  const category = known?.category || "Medical Coding";

  return {
    name,
    slug,
    tagline: `Industry-aligned ${category} training & certification preparation`,
    duration: "3 Months",
    format: "Classroom + Live Online",
    fee: "₹45,000",
    image: getCourseImage({ slug }),
    description: `Comprehensive professional program in ${name}. Master coding guidelines, chart documentation, and pass official certification exams.`,
    whatIsIt: `${name} is an industry-recognized credential validating advanced medical coding, record auditing, and healthcare compliance skills.`,
    whoIsItFor: [
      "Life science, nursing, and pharmacy graduates",
      "Healthcare professionals looking for career growth",
      "Medical coders expanding into specialty certifications",
      "Detail-oriented students seeking high-demand healthcare careers"
    ],
    roles: [
      "Reviewing clinical records for billing and coding accuracy",
      "Assigning ICD-10-CM, CPT, and specialty code sets",
      "Ensuring compliance with healthcare audit guidelines",
      "Preventing claims denials and optimizing reimbursement"
    ],
    batchOptions: [
      { label: "Weekday", schedule: "Monday to Friday, 9:00 AM - 11:00 AM" },
      { label: "Weekend", schedule: "Saturday & Sunday, 10:00 AM - 1:00 PM" }
    ],
    examOverview: {
      duration: "4 Hours",
      format: "Multiple Choice Questions (Open Code Book)",
      passRequirement: "70% or higher",
      language: "English"
    },
    features: [
      {
        title: "Live Interactive Classes",
        description: `Instructor-led training for ${name} with live case charts and real-time guidance.`
      },
      {
        title: "Mock Exams & Assessment",
        description: "Full-length timed practice exams with step-by-step score reviews and doubt resolution."
      },
      {
        title: "Study Material & LMS Access",
        description: "Official code books guidance, practice problem sets, and 24/7 digital learning portal access."
      },
      {
        title: "Job Placement Support",
        description: "Resume optimization, mock interviews, and direct referrals to our 500+ hiring partners."
      }
    ],
    skills: ["Medical Coding", "ICD-10-CM", "CPT Coding", "Chart Auditing", "Compliance", "Reimbursement"],
    careerOpportunities: ["Medical Coder", "Coding Auditor", "Facility Coding Specialist", "Claims Analyst"],
    curriculum: [
      {
        title: "Anatomy, Terminology & Physiology",
        topics: ["Body systems & medical vocabulary", "Clinical documentation standards", "Disease processes"]
      },
      {
        title: "Coding Systems & Official Guidelines",
        topics: ["ICD-10-CM diagnosis coding", "CPT procedure coding & modifiers", "HCPCS Level II supply coding"]
      },
      {
        title: "Specialty Applications & Compliance",
        topics: ["Chart audits & modifier usage", "HIPAA & compliance regulations", "Claims denial management"]
      },
      {
        title: "Mock Exams & Final Preparation",
        topics: ["Timed exam simulation", "Score analysis & review", "Test-taking strategies"]
      }
    ],
    faqs: [
      {
        question: `Who can enroll in the ${name} program?`,
        answer: "Any graduate (life sciences, pharmacy, nursing, or general) or working professional looking to start or advance a medical coding career can enroll."
      },
      {
        question: "Are classes available online or in classroom?",
        answer: "We offer both classroom training at all 15 branches nationwide and live interactive online batches."
      },
      {
        question: "Does Thoughtflows provide job placement support?",
        answer: "Yes, our placement team works with 500+ hiring partners and supports you with resume prep, mock interviews, and job referrals until placed."
      }
    ]
  };
}

export default function CourseDetail() {
  const { slug } = useParams();
  const { data: apiCourse, loading, error, refetch } = useFetch(`/courses/slug/${slug}`, { deps: [slug] });

  const rawCourse = (apiCourse && apiCourse.slug === slug) ? apiCourse : (loading ? null : buildFallbackCourse(slug));
  const course = rawCourse ? { ...rawCourse, image: getCourseImage(rawCourse) } : null;

  if (loading && !course) return <LoadingSpinner label="Loading course..." />;
  if (error && !course) return <ErrorState message={error} onRetry={refetch} />;
  if (!course) return null;

  const whyChooseList = course.whyChooseCPC || whyChooseUsItems;

  return (
    <>
      {/* Hero section */}
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid-glow pointer-events-none" />
        <div className="container-max px-6 md:px-10 lg:px-20 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2 text-teal-600 text-xs font-semibold tracking-[0.18em] uppercase glass rounded-full px-3 py-1 w-fit">
                <Sparkles size={14} className="text-teal-500" />
                {course.eyebrow || course.format}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-navy-900 leading-tight">{course.name}</h1>
              <p className="text-navy-900/70 text-lg leading-relaxed">{course.tagline}</p>
              
              {course.highlights?.length > 0 && (
                <div className="flex flex-wrap gap-2 my-1">
                  {course.highlights.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-teal-200 shadow-sm">
                      <ShieldCheck size={14} className="text-teal-600" />
                      {item}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 text-sm text-navy-900/60 mt-1">
                <span className="flex items-center gap-2 glass rounded-full px-4 py-2 font-medium"><Clock size={14} className="text-teal-600" /> {course.duration}</span>
                <span className="flex items-center gap-2 glass rounded-full px-4 py-2 font-medium"><Monitor size={14} className="text-teal-600" /> {course.format}</span>
                {course.fee && <span className="flex items-center gap-2 glass rounded-full px-4 py-2 font-medium"><IndianRupee size={14} className="text-teal-600" /> {course.fee}</span>}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <MagneticButton as={Link} to="/contact" className="self-start">
                  Enroll Now <ArrowRight size={18} />
                </MagneticButton>
                {course.phone && (
                  <a
                    href={`tel:${course.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-teal-500/30 text-navy-900 text-sm font-semibold hover:bg-teal-50/50 transition-all shadow-sm"
                  >
                    <PhoneCall size={16} className="text-teal-600" />
                    Call {course.phone}
                  </a>
                )}
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <div className="rounded-3xl overflow-hidden glass-strong p-2 shadow-2xl relative">
              <img src={getCourseImage(course)} alt={course.name} className="rounded-2xl w-full h-[380px] object-cover" />
              <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-xl border border-white/40 shadow-lg flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-teal-500 text-navy-950 font-bold flex items-center justify-center text-lg shrink-0">
                  100%
                </div>
                <div>
                  <div className="text-navy-900 font-bold text-sm">Placement Assistance</div>
                  <div className="text-navy-900/60 text-xs">Direct hiring referrals across 500+ partner companies</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* What is it? + Highlights + Who it's for + Roles */}
      {(course.whatIsIt || course.whoIsItFor?.length || course.roles?.length) && (
        <section className="section-pad pt-0">
          <div className="container-max grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {course.whatIsIt && (
                <RevealOnScroll>
                  <div className="glass rounded-2xl p-8 border border-navy-900/5">
                    <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">What is {course.name}?</h2>
                    <p className="text-navy-900/70 leading-relaxed text-base mb-6">{course.whatIsIt}</p>
                    
                    {course.whyItMatters && (
                      <div className="bg-teal-50/80 border border-teal-500/20 rounded-xl p-5 mt-4">
                        <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1 flex items-center gap-2">
                          <Target size={14} className="text-teal-600" /> Why It Matters
                        </h4>
                        <p className="text-navy-900/80 text-sm leading-relaxed font-medium">{course.whyItMatters}</p>
                      </div>
                    )}
                  </div>
                </RevealOnScroll>
              )}

              {course.roles?.length > 0 && (
                <RevealOnScroll delay={0.1}>
                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-lg font-semibold text-navy-900 mb-5 flex items-center gap-2">
                      <Briefcase size={18} className="text-teal-600" />
                      Role & Responsibilities of a {course.name.match(/\(([^)]+)\)/)?.[1] || "Certified Coder"}
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {course.roles.map((role) => (
                        <li key={role} className="flex items-start gap-3 text-navy-900/80 text-sm glass rounded-xl p-3">
                          <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" /> {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              )}
            </div>

            {course.whoIsItFor?.length > 0 && (
              <RevealOnScroll delay={0.15}>
                <div className="bg-gradient-to-b from-teal-50 to-white border border-teal-500/20 rounded-2xl p-8 h-full shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                      <Users size={20} className="text-teal-600" /> Who is this for?
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {course.whoIsItFor.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-navy-900/80 text-sm">
                          <span className="h-2 w-2 rounded-full bg-teal-500 shrink-0 mt-1.5" /> {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 pt-6 border-t border-teal-500/15">
                    <div className="text-xs text-navy-900/50 mb-2 font-medium uppercase tracking-wider">Admissions Guidance</div>
                    <a
                      href={`tel:${(course.phone || '+91 91764 43331').replace(/[^0-9+]/g, '')}`}
                      className="text-teal-700 font-bold text-sm flex items-center gap-2 hover:underline"
                    >
                      <PhoneCall size={14} /> Call {course.phone || "+91 91764 43331"}
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </section>
      )}

      {/* Training details + Exam overview */}
      {(course.batchOptions?.length > 0 || course.examOverview) && (
        <section className="section-pad pt-0">
          <div className="container-max grid md:grid-cols-2 gap-8">
            {course.batchOptions?.length > 0 && (
              <RevealOnScroll>
                <div className="glass rounded-2xl p-8 h-full">
                  <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                    <CalendarDays size={20} className="text-teal-600" /> Training Details
                  </h3>
                  <div className="flex flex-col gap-4">
                    {course.batchOptions.map((batch) => (
                      <div key={batch.label} className="flex flex-col gap-1 border-b border-navy-900/10 pb-4 last:border-0 last:pb-0">
                        <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">{batch.label}</span>
                        {batch.schedule.includes("+91") ? (
                          <a href={`tel:${batch.schedule.replace(/[^0-9+]/g, '')}`} className="text-navy-900 font-bold text-base hover:text-teal-600 transition-colors flex items-center gap-2">
                            <PhoneCall size={16} className="text-teal-600" /> {batch.schedule}
                          </a>
                        ) : (
                          <span className="text-navy-900 font-medium text-sm">{batch.schedule}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {course.examOverview && (
              <RevealOnScroll delay={0.1}>
                <div className="glass rounded-2xl p-8 h-full bg-gradient-to-br from-white to-teal-50/30 border border-teal-500/15">
                  <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                    <FileCheck2 size={20} className="text-teal-600" /> {course.name.split("(")[0].trim()} Exam Overview
                  </h3>
                  <div className="flex flex-col gap-4">
                    {[
                      ["Exam Duration", course.examOverview.duration],
                      ["Questions Format", course.examOverview.format],
                      ["Pass Requirement", course.examOverview.passRequirement],
                      ["Language", course.examOverview.language],
                      ["Allowed Code Books", course.examOverview.codeBooks || "AAPC Official Guidelines"]
                    ].filter(([, v]) => v).map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between border-b border-navy-900/10 pb-3.5 last:border-0 last:pb-0">
                        <span className="text-sm text-navy-900/60 font-medium">{label}</span>
                        <span className="text-sm font-bold text-navy-900 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </section>
      )}

      {/* Why train with us */}
      <section className="section-pad pt-0">
        <div className="container-max">
          <SectionHeading
            eyebrow="Why Thoughtflows"
            title={`Why Take ${course.name.split("(")[0].trim()} Training From Thoughtflows?`}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseList.map((item, i) => {
              const IconComp = item.icon || Award;
              return (
                <RevealOnScroll key={item.title} delay={(i % 3) * 0.08}>
                  <div className="glass rounded-2xl p-6 h-full flex flex-col gap-3 border border-navy-900/5 hover:border-teal-500/30 transition-all">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-navy-500/20 flex items-center justify-center text-teal-600 font-bold">
                      <IconComp size={20} />
                    </div>
                    <h3 className="text-base font-bold text-navy-900">{item.title}</h3>
                    <p className="text-navy-900/65 text-sm leading-relaxed">{item.description || item.text}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placement Services Comparison (Before vs After CPC Training) */}
      {course.placementServices && (
        <section className="section-pad pt-0">
          <div className="container-max">
            <SectionHeading
              eyebrow="Career Transformation"
              title={course.placementServices.title || "Placement Services"}
            />
            <p className="text-center text-navy-900/60 text-base -mt-6 mb-10 max-w-2xl mx-auto">
              {course.placementServices.subtitle || "Comparison of career trajectory before and after completing CPC certification training"}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before CPC */}
              <RevealOnScroll>
                <div className="glass rounded-2xl p-8 border border-red-500/20 bg-red-50/10 h-full">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-200">
                    <div className="h-10 w-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                      <XCircle size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-navy-900">Before CPC Training</h3>
                      <span className="text-xs text-red-600 font-medium">Non-certified / Entry Level</span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {course.placementServices.before.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-navy-900/70 text-sm">
                        <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>

              {/* After CPC */}
              <RevealOnScroll delay={0.1}>
                <div className="glass rounded-2xl p-8 border border-teal-500/40 bg-teal-50/20 h-full shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-teal-500 text-navy-950 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow">
                    Proven Impact
                  </div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-teal-200">
                    <div className="h-10 w-10 rounded-xl bg-teal-500 text-navy-950 flex items-center justify-center font-bold">
                      <CheckCircle2 size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-navy-900">After CPC Training</h3>
                      <span className="text-xs text-teal-700 font-semibold">CPC Certified Specialist</span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {course.placementServices.after.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-navy-900/85 font-medium text-sm">
                        <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      )}

      {/* Course features table */}
      {course.features?.length > 0 && (
        <section className="section-pad pt-0">
          <div className="container-max">
            <SectionHeading eyebrow="Format" title="Course Features" />
            <div className="glass rounded-2xl overflow-hidden">
              {course.features.map((feature, i) => (
                <RevealOnScroll key={feature.title} delay={i * 0.06}>
                  <div
                    className={`flex flex-col md:flex-row gap-2 md:gap-8 p-6 md:p-8 ${
                      i % 2 === 1 ? "bg-navy-900/[0.02]" : ""
                    } ${i !== course.features.length - 1 ? "border-b border-navy-900/10" : ""}`}
                  >
                    <span className="md:w-56 shrink-0 text-teal-600 font-semibold text-sm flex items-center gap-2">
                      <Sparkles size={14} /> {feature.title}
                    </span>
                    <p className="text-navy-900/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Training modules / curriculum */}
      {course.curriculum?.length > 0 && (
        <section className="section-pad pt-0">
          <div className="container-max">
            <SectionHeading eyebrow="Curriculum" title={`${course.name.split("(")[0].trim()} Training Modules`} />
            <div className="grid md:grid-cols-2 gap-6">
              {course.curriculum.map((module, i) => (
                <RevealOnScroll key={module.title} delay={(i % 2) * 0.1}>
                  <div className="glass rounded-2xl p-7 h-full border border-navy-900/5 hover:border-teal-500/20 transition-all">
                    <h3 className="text-navy-900 font-bold text-lg mb-4 flex items-center gap-3">
                      <span className="h-8 w-8 shrink-0 rounded-full bg-teal-500 text-navy-950 text-sm font-bold flex items-center justify-center shadow">
                        {i + 1}
                      </span>
                      {module.title}
                    </h3>
                    {module.topics?.length > 0 && (
                      <ul className="flex flex-col gap-2.5 pl-11">
                        {module.topics.map((topic) => (
                          <li key={topic} className="text-navy-900/70 text-sm leading-relaxed list-disc">
                            {topic}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills + Career opportunities */}
      <section className="section-pad pt-0">
        <div className="container-max grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-10">
            {course.skills?.length > 0 && (
              <RevealOnScroll>
                <div className="glass rounded-2xl p-8">
                  <h2 className="text-xl font-bold text-navy-900 mb-5 flex items-center gap-2">
                    <GraduationCap size={20} className="text-teal-600" /> Skills You'll Gain
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2.5 text-navy-900/80 text-sm glass rounded-xl p-3 font-medium">
                        <CheckCircle2 size={16} className="text-teal-600 shrink-0" /> {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>

          {course.careerOpportunities?.length > 0 && (
            <RevealOnScroll delay={0.15}>
              <div className="glass rounded-2xl p-8 h-fit sticky top-28 flex flex-col gap-5 border border-teal-500/20 shadow-md">
                <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                  <Briefcase size={20} className="text-teal-600" /> Career Opportunities
                </h2>
                <ul className="flex flex-col gap-3">
                  {course.careerOpportunities.map((role) => (
                    <li key={role} className="text-navy-900/75 text-sm font-medium border-b border-navy-900/10 pb-3 last:border-0 flex items-center justify-between">
                      <span>{role}</span>
                      <ArrowRight size={14} className="text-teal-600" />
                    </li>
                  ))}
                </ul>
                <MagneticButton as={Link} to="/contact" className="w-full justify-center mt-2">
                  Enroll Now <ArrowRight size={16} />
                </MagneticButton>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      {/* FAQs */}
      {course.faqs?.length > 0 && (
        <section className="section-pad pt-0">
          <div className="container-max max-w-3xl">
            <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" />
            <FaqAccordion items={course.faqs} />
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

