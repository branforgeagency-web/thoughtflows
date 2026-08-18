import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Course from "../models/Course.js";
import Branch from "../models/Branch.js";
import Trainer from "../models/Trainer.js";
import Testimonial from "../models/Testimonial.js";
import GalleryItem from "../models/GalleryItem.js";
import PlacementStat from "../models/PlacementStat.js";
import Admin from "../models/Admin.js";

const img = (seed, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Shared across every course detail page — the "why train with us" case is
// institutional, not course-specific (see WhyChooseUs.jsx), so it isn't
// duplicated per document. The four-row "Course Features" table below is
// close to constant across programs too, with only light wording tweaks.
const standardFeatures = (courseName) => [
  {
    title: "Live Interactive Classes",
    description: `Real-time, instructor-led sessions for ${courseName} — ask questions, work live charts, and get immediate feedback instead of pre-recorded lectures.`
  },
  {
    title: "Practice Exams",
    description: "Full-length and topic-wise mock exams modeled on the real certification format, with detailed score review after every attempt."
  },
  {
    title: "Self-Study Materials",
    description: "Downloadable code books, quick-reference charts, and LMS access so you can revise anytime, on any device."
  },
  {
    title: "Interview Preparation",
    description: "Mock interviews, resume reviews, and placement-cell support once you're certification-ready."
  }
];

const standardBatches = [
  { label: "Weekday", schedule: "Monday to Friday, 9:00 AM - 11:00 AM" },
  { label: "Weekend", schedule: "Saturday & Sunday, 10:00 AM - 1:00 PM" }
];

const courseData = [
  {
    name: "Certified Professional Coder (CPC)",
    slug: "cpc-certification",
    eyebrow: "INDIA'S LEADING ONLINE & OFFLINE the thought flows",
    tagline: "Certified Professional Coder (CPC) certification is the gold standard for medical coding. It validates your ability to accurately assign CPT, ICD-10-CM, and HCPCS Level II codes for physician and outpatient claims.",
    duration: "2-3 Months",
    format: "Online & Offline",
    description:
      "A comprehensive program covering CPT, ICD-10-CM, and HCPCS Level II coding systems, built to prepare you for the AAPC CPC certification exam and real-world claims coding.",
    whatIsIt:
      "Certified Professional Coder (CPC) certification is the gold standard for medical coding. It validates your ability to accurately assign CPT, ICD-10-CM, and HCPCS Level II codes for physician and outpatient claims — the exact skill set clinics, hospitals, and healthcare RCM organizations hire for worldwide.",
    whyItMatters:
      "Medical coders review medical documentation and translate healthcare services into standardized code sets. Certified coders ensure billing accuracy, compliance, and swift claims reimbursement across outpatient centers and hospitals.",
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
    highlights: [
      "High Job Demand",
      "Flexible Work Models",
      "Globally Recognized Certification"
    ],
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
    features: standardFeatures("CPC"),
    skills: ["CPT Coding", "ICD-10-CM", "HCPCS Level II", "Medical Terminology", "Anatomy & Physiology", "Chart Auditing", "Claims Compliance", "Denial Management"],
    careerOpportunities: ["Medical Coder", "CPC Certified Coder", "Senior Coding Specialist", "Medical Coding Auditor", "Claims Analyst", "Billing & Coding Team Lead"],
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
    ],
    fee: "₹45,000",
    phone: "+91 91764 43331",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    featured: true,
    order: 1
  },
  {
    name: "Certified Coding Specialist (CCS)",
    slug: "ccs-certification",
    tagline: "Advanced inpatient & outpatient facility coding",
    duration: "4 Months",
    format: "Classroom + Live Online",
    description:
      "Deep-dive training in inpatient and outpatient facility coding, DRG assignment, and AHIMA CCS exam preparation for coders aiming at hospital and facility roles.",
    whatIsIt:
      "The Certified Coding Specialist (CCS) credential, issued by AHIMA, validates advanced, hospital-grade coding skills across both inpatient and outpatient facility records. It's the certification employers look for when hiring for hospital coding, DRG validation, and HIM department roles.",
    whoIsItFor: [
      "Coders with foundational or CPC-level experience going deeper",
      "Life science or nursing graduates targeting hospital coding roles",
      "Coding professionals aiming for facility/inpatient specialization",
      "Anyone preparing specifically for the AHIMA CCS exam"
    ],
    roles: [
      "Assigning ICD-10-CM/PCS codes for inpatient hospital stays",
      "Coding outpatient facility encounters accurately",
      "Validating DRG (Diagnosis-Related Group) assignment",
      "Supporting HIM departments with compliance and chart audits"
    ],
    batchOptions: standardBatches,
    examOverview: { duration: "4 Hours", format: "Multiple Choice + Medical Record Scenarios", passRequirement: "Scaled score of 300+", language: "English" },
    features: standardFeatures("CCS"),
    skills: ["Inpatient Coding", "DRG Assignment", "Outpatient Facility Coding", "ICD-10-PCS", "Compliance Auditing"],
    careerOpportunities: ["Inpatient Coder", "DRG Validator", "Facility Coding Specialist", "HIM Analyst"],
    curriculum: [
      { title: "Inpatient Coding Fundamentals", topics: ["Inpatient documentation review", "Principal vs. secondary diagnosis selection", "Present-on-admission (POA) indicators"] },
      { title: "ICD-10-PCS Procedure Coding", topics: ["ICD-10-PCS structure & code building", "Root operations by body system", "Device, approach & qualifier selection"] },
      { title: "DRG Assignment & Validation", topics: ["MS-DRG grouping logic", "Sequencing rules that affect DRG", "Auditing DRGs for accuracy"] },
      { title: "Outpatient Facility Coding", topics: ["Outpatient CPT/HCPCS for facility claims", "Ambulatory Payment Classifications (APCs)", "Emergency department facility coding"] },
      { title: "Compliance & Quality Review", topics: ["CMS & payer facility guidelines", "Chart audit techniques", "Denial prevention for facility claims"] },
      { title: "Mock Tests & Case Studies", topics: ["Full-length CCS-style mock exams", "Real inpatient & outpatient chart practice", "Timed scenario-based practice"] }
    ],
    faqs: [
      { question: "Do I need CPC certification before starting CCS?", answer: "It's not mandatory, but coders with foundational coding knowledge (CPC or equivalent) typically progress faster through the inpatient/DRG modules." },
      { question: "What is the duration of the CCS program?", answer: "4 months, covering inpatient, outpatient, DRG, and compliance modules with hands-on chart practice throughout." },
      { question: "What is the format of the AHIMA CCS exam?", answer: "A 4-hour exam combining multiple-choice questions with medical record coding scenarios you code directly." },
      { question: "Are classes available on weekends?", answer: "Yes, we run both weekday and weekend batches, in classroom and live online formats." },
      { question: "Does Thoughtflows help with placement after CCS?", answer: "Yes, our placement cell connects CCS-certified coders with hospital and facility coding roles across our hiring partner network." }
    ],
    fee: "₹55,000",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    featured: true,
    order: 2
  },
  {
    name: "Risk Adjustment Coding (HCC)",
    slug: "hcc-risk-adjustment",
    tagline: "High-demand specialty for payer-side coding careers",
    duration: "6 Weeks",
    format: "Live Online",
    description:
      "Specialized training in Hierarchical Condition Category (HCC) coding and risk adjustment models used by health plans and value-based care organizations.",
    whatIsIt:
      "HCC (Hierarchical Condition Category) coding drives risk-adjustment payment models used by Medicare Advantage and value-based care payers. This program trains you to identify and code chronic conditions accurately from clinical documentation — a specialty in high demand on the payer side of the industry.",
    whoIsItFor: [
      "Certified coders (CPC/CCS) wanting a high-demand specialty",
      "Coders interested in payer-side, not just provider-side, roles",
      "Professionals targeting risk adjustment or chart audit careers",
      "Anyone wanting a fast, focused 6-week specialization"
    ],
    roles: [
      "Reviewing charts for chronic condition documentation",
      "Assigning accurate HCC codes for risk adjustment",
      "Auditing RAF (Risk Adjustment Factor) score accuracy",
      "Flagging under- or over-coded conditions for compliance"
    ],
    batchOptions: [
      { label: "Weekday", schedule: "Monday to Friday, 6:00 PM - 8:00 PM (Live Online)" },
      { label: "Weekend", schedule: "Saturday & Sunday, 10:00 AM - 1:00 PM (Live Online)" }
    ],
    examOverview: { duration: "2 Hours", format: "Chart-based Coding Assessment", passRequirement: "75% or higher", language: "English" },
    features: standardFeatures("HCC Risk Adjustment"),
    skills: ["HCC Coding", "Risk Adjustment Models", "Chart Auditing", "RAF Score Accuracy"],
    careerOpportunities: ["Risk Adjustment Coder", "HCC Auditor", "Payer-side Coding Analyst"],
    curriculum: [
      { title: "Risk Adjustment Fundamentals", topics: ["How CMS-HCC & value-based payment models work", "Risk Adjustment Factor (RAF) score basics"] },
      { title: "HCC Chart Review", topics: ["Identifying chronic conditions in documentation", "MEAT criteria (Monitor, Evaluate, Assess, Treat)"] },
      { title: "HCC Coding & Mapping", topics: ["ICD-10-CM to HCC category mapping", "Common HCC coding pitfalls"] },
      { title: "Compliance & Auditing", topics: ["Payer audit expectations", "Documenting suspect vs. confirmed conditions"] },
      { title: "Mock Assessments", topics: ["Real chart practice sets", "Timed risk-adjustment coding tests"] }
    ],
    faqs: [
      { question: "Do I need prior coding certification for this course?", answer: "A CPC, CCS, or equivalent coding background is strongly recommended since this is a specialty add-on, not a foundation course." },
      { question: "How long is the HCC program?", answer: "6 weeks, delivered live online with focused, chart-heavy practice." },
      { question: "What kind of roles does this open up?", answer: "Payer-side and value-based care organizations hire HCC coders as risk adjustment coders, auditors, and coding analysts." },
      { question: "Is this course available in classroom format?", answer: "Currently HCC is offered live online only, to keep batches small and instructor time focused." }
    ],
    fee: "₹28,000",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    featured: false,
    order: 3
  },
  {
    name: "Medical Billing & Denial Management",
    slug: "medical-billing-denial-management",
    tagline: "Master the revenue cycle end-to-end",
    duration: "2 Months",
    format: "Classroom + Live Online",
    description:
      "Covers the complete revenue cycle process including charge entry, claims submission, denial analysis, and appeals to build billing and RCM career readiness.",
    whatIsIt:
      "This program covers the medical billing side of healthcare revenue cycle management — from charge entry and claims submission through denial analysis and appeals. It's built for anyone who wants to work in RCM, AR calling, or denial management rather than coding itself.",
    whoIsItFor: [
      "Graduates interested in the business/RCM side of healthcare",
      "Coders wanting to add billing skills to their profile",
      "Professionals targeting AR calling or RCM analyst roles",
      "Anyone comfortable with process-driven, payer-facing work"
    ],
    roles: [
      "Submitting and tracking insurance claims",
      "Analyzing and resolving claim denials",
      "Filing timely appeals with payers",
      "Reporting on revenue cycle KPIs"
    ],
    batchOptions: standardBatches,
    examOverview: { duration: "2 Hours", format: "Scenario-based Written Assessment", passRequirement: "70% or higher", language: "English" },
    features: standardFeatures("Medical Billing & Denial Management"),
    skills: ["Revenue Cycle Management", "Denial Analysis", "Claims Submission", "Payer Guidelines", "Appeals Process"],
    careerOpportunities: ["Medical Biller", "RCM Analyst", "Denial Management Specialist", "AR Caller"],
    curriculum: [
      { title: "Revenue Cycle Fundamentals", topics: ["End-to-end RCM workflow", "Charge entry & claims lifecycle"] },
      { title: "Claims Submission", topics: ["Clean claim requirements", "Clearinghouse & payer submission process"] },
      { title: "Denial Analysis", topics: ["Common denial reason codes", "Root-cause analysis techniques"] },
      { title: "Appeals & Follow-up", topics: ["Writing effective appeal letters", "AR follow-up strategies"] },
      { title: "Payer Guidelines", topics: ["Medicare, Medicaid & commercial payer rules", "Prior authorization basics"] },
      { title: "Mock Practice", topics: ["Real claim/denial scenarios", "Timed assessments"] }
    ],
    faqs: [
      { question: "Is this course only for billing, not coding?", answer: "Correct — this program focuses on billing, claims, and denial management. Pair it with our CPC course if you also want coding skills." },
      { question: "How long does the program take?", answer: "2 months, covering the full revenue cycle from charge entry to appeals." },
      { question: "What roles can I apply for after this?", answer: "Medical biller, RCM analyst, denial management specialist, and AR caller roles across healthcare BPOs and RCM companies." },
      { question: "Do you provide placement support for billing roles too?", answer: "Yes, our placement cell supports billing and RCM career tracks the same way it supports coding certifications." }
    ],
    fee: "₹32,000",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    featured: false,
    order: 4
  },
  {
    name: "Medical Coding Foundation Program",
    slug: "medical-coding-foundation",
    tagline: "The ideal starting point for freshers & life science graduates",
    duration: "6 Weeks",
    format: "Classroom + Live Online",
    description:
      "A beginner-friendly foundation in anatomy, physiology, medical terminology, and coding basics designed for freshers entering the healthcare BPO and coding industry.",
    whatIsIt:
      "The Foundation Program builds the anatomy, physiology, medical terminology, and basic coding knowledge you need before attempting a certification like CPC. It's designed for complete beginners who want a confident, well-paced start rather than jumping straight into exam prep.",
    whoIsItFor: [
      "Fresh graduates with no prior healthcare or coding background",
      "12th-standard science students exploring coding careers",
      "Career-changers testing the field before committing to CPC",
      "Anyone who wants anatomy & terminology fundamentals first"
    ],
    roles: [
      "Assisting senior coders with basic chart preparation",
      "Learning documentation review under supervision",
      "Building toward a trainee coder or coding associate role",
      "Preparing for a certification program (e.g. CPC) next"
    ],
    batchOptions: standardBatches,
    examOverview: { duration: "1.5 Hours", format: "Multiple Choice Assessment", passRequirement: "60% or higher", language: "English" },
    features: standardFeatures("the Foundation Program"),
    skills: ["Medical Terminology", "Human Anatomy", "Basic ICD-10-CM", "Healthcare Documentation"],
    careerOpportunities: ["Trainee Medical Coder", "Coding Associate", "Documentation Specialist"],
    curriculum: [
      { title: "Medical Terminology Basics", topics: ["Word roots, prefixes & suffixes", "Building & breaking down medical terms"] },
      { title: "Human Anatomy & Physiology", topics: ["Major body systems overview", "How systems relate to coding categories"] },
      { title: "Healthcare Documentation", topics: ["Reading physician notes & charts", "Common documentation formats"] },
      { title: "Coding Basics", topics: ["Intro to ICD-10-CM structure", "Intro to CPT & HCPCS concepts"] },
      { title: "Readiness Assessment", topics: ["Practice quizzes by topic", "Mock assessment & feedback"] }
    ],
    faqs: [
      { question: "Do I need any healthcare background to join?", answer: "No — this program assumes zero prior knowledge and starts from anatomy and terminology basics." },
      { question: "Should I do this before or instead of CPC?", answer: "Before. Foundation is a 6-week on-ramp; most students move directly into CPC training after completing it." },
      { question: "Is this program enough to get a coding job?", answer: "It prepares you for entry-level, supervised roles. For independent coding roles, we recommend continuing into a certification program like CPC." },
      { question: "How long is the Foundation Program?", answer: "6 weeks, available in both classroom and live online formats." }
    ],
    fee: "₹18,000",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    featured: false,
    order: 5
  },
  {
    name: "Advanced E/M & Surgery Coding",
    slug: "advanced-em-surgery-coding",
    tagline: "Specialty-level coding for experienced coders",
    duration: "6 Weeks",
    format: "Live Online",
    description:
      "An advanced module for practicing coders looking to specialize in Evaluation & Management and multi-specialty surgical coding with real chart practice.",
    whatIsIt:
      "This advanced program is built for coders who already hold a base certification and want to specialize in two of the highest-value, highest-complexity coding areas: Evaluation & Management (E/M) and multi-specialty surgical coding. Expect dense, chart-heavy practice rather than introductory theory.",
    whoIsItFor: [
      "Certified coders (CPC or equivalent) with active experience",
      "Coders wanting to move into specialty or senior coding roles",
      "Coding auditors needing deeper E/M and surgical expertise",
      "Anyone preparing to train or audit others in these areas"
    ],
    roles: [
      "Coding complex E/M encounters across specialties",
      "Assigning accurate multi-specialty surgical codes",
      "Applying modifiers correctly in high-scrutiny claims",
      "Auditing specialty charts for compliance and accuracy"
    ],
    batchOptions: [
      { label: "Weekday", schedule: "Monday to Friday, 7:00 PM - 9:00 PM (Live Online)" },
      { label: "Weekend", schedule: "Saturday & Sunday, 11:00 AM - 2:00 PM (Live Online)" }
    ],
    examOverview: { duration: "2 Hours", format: "Chart-based Coding Assessment", passRequirement: "75% or higher", language: "English" },
    features: standardFeatures("Advanced E/M & Surgery Coding"),
    skills: ["E/M Coding", "Surgical Coding", "Modifiers", "Specialty Chart Audits"],
    careerOpportunities: ["Senior Medical Coder", "Specialty Coding Auditor", "Coding Trainer"],
    curriculum: [
      { title: "Advanced E/M Coding", topics: ["2021+ E/M guideline changes", "Medical decision-making (MDM) scoring", "E/M coding across specialties"] },
      { title: "Surgical Package Coding", topics: ["Global surgical package rules", "Multi-specialty surgical procedures", "Bundling & unbundling issues"] },
      { title: "Modifier Mastery", topics: ["High-risk modifiers (25, 59, 51, etc.)", "Modifier selection by scenario"] },
      { title: "Specialty Chart Audits", topics: ["Auditing orthopedic, cardiology & GI charts", "Identifying under/over-coding patterns"] },
      { title: "Mock Practice", topics: ["Real specialty chart sets", "Timed advanced coding assessments"] }
    ],
    faqs: [
      { question: "Is this course for coding beginners?", answer: "No — this is an advanced specialization for coders who already hold a certification like CPC and have some hands-on experience." },
      { question: "What makes this different from the base CPC course?", answer: "CPC covers E/M and surgery at an introductory level. This program goes deep into complex, real-world scenarios across multiple specialties." },
      { question: "How long is the program?", answer: "6 weeks, delivered live online with intensive chart-based practice." },
      { question: "What roles does this prepare me for?", answer: "Senior medical coder, specialty coding auditor, and coding trainer roles that require deeper E/M and surgical expertise." }
    ],
    fee: "₹30,000",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    featured: false,
    order: 6
  }
];

// South India zone branch list — matches the current homepage design/content
// (Ameerpet is the flagship). Update this list from the admin dashboard's
// Branches resource once real per-branch addresses/phones are available.
const cityData = [
  { city: "Ameerpet", state: "Telangana", flagship: true },
  { city: "Dilsukhnagar", state: "Telangana" },
  { city: "Gandhipuram", state: "Tamil Nadu" },
  { city: "Hopes", state: "Tamil Nadu" },
  { city: "Kochi", state: "Kerala" },
  { city: "Salem", state: "Tamil Nadu" },
  { city: "Saravanampatti", state: "Tamil Nadu" },
  { city: "Tirupati", state: "Andhra Pradesh" },
  { city: "Trichy", state: "Tamil Nadu" },
  { city: "Trivandrum", state: "Kerala" },
  { city: "Vizag", state: "Andhra Pradesh" }
];

const facilitiesPool = [
  "Air-Conditioned Classrooms",
  "Practice Lab with Live Charts",
  "High-Speed WiFi Campus",
  "Digital Library & E-Resources",
  "Mock Interview Rooms",
  "Career Counselling Desk",
  "On-site Cafeteria",
  "Free Study Material & LMS Access"
];

const trainerFirstNames = ["Ananya", "Rahul", "Priya", "Karthik", "Sneha", "Arjun", "Divya", "Vikram", "Meera", "Suresh", "Lakshmi", "Rohan"];
const trainerLastNames = ["Rao", "Nair", "Reddy", "Iyer", "Menon", "Sharma", "Pillai", "Krishnan", "Varma", "Suresh"];
const designations = ["Senior Medical Coding Trainer", "Lead Faculty - Inpatient Coding", "HCC & Risk Adjustment Trainer", "Placement & Soft Skills Trainer", "Anatomy & Physiology Faculty"];
const expertiseSets = [
  ["CPC", "ICD-10-CM", "CPT"],
  ["Inpatient Coding", "DRG", "ICD-10-PCS"],
  ["HCC", "Risk Adjustment"],
  ["Medical Billing", "Denial Management"],
  ["Anatomy", "Physiology", "Medical Terminology"]
];

async function run() {
  await connectDB();

  console.log("Clearing existing collections...");
  await Promise.all([
    Course.deleteMany(),
    Branch.deleteMany(),
    Trainer.deleteMany(),
    Testimonial.deleteMany(),
    GalleryItem.deleteMany(),
    PlacementStat.deleteMany(),
    Admin.deleteMany()
  ]);

  console.log("Seeding courses...");
  const courses = await Course.insertMany(courseData);

  console.log("Seeding trainers...");
  const trainers = [];
  for (let i = 0; i < 18; i++) {
    const first = trainerFirstNames[i % trainerFirstNames.length];
    const last = trainerLastNames[(i * 3) % trainerLastNames.length];
    trainers.push({
      name: `${first} ${last}`,
      designation: designations[i % designations.length],
      bio: `${first} brings hands-on industry experience in medical coding and a passion for mentoring students from classroom to certification.`,
      image: img(`trainer-${i}`, 400, 400),
      expertise: expertiseSets[i % expertiseSets.length],
      experienceYears: 4 + (i % 10),
      order: i
    });
  }
  const savedTrainers = await Trainer.insertMany(trainers);

  console.log("Seeding branches...");
  const branches = [];
  for (let i = 0; i < cityData.length; i++) {
    const c = cityData[i];
    const slug = c.city.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
    const branchTrainers = [
      savedTrainers[i % savedTrainers.length]._id,
      savedTrainers[(i + 1) % savedTrainers.length]._id,
      savedTrainers[(i + 2) % savedTrainers.length]._id
    ];
    const branchCourses = courses.slice(0, 3 + (i % courses.length >= 3 ? 3 : courses.length)).map((c2) => c2._id);

    branches.push({
      name: `Thoughtflows ${c.city}${c.flagship ? " (Flagship Campus)" : ""}`,
      slug,
      city: c.city,
      state: c.state,
      address: `${100 + i}, Coding Park Road, ${c.city}, ${c.state} - ${560000 + i * 11}`,
      phone: `+91 90000 0${(1000 + i * 37).toString().slice(-4)}`,
      email: `${slug}@thoughtflows.in`,
      images: [img(`branch-${slug}-1`), img(`branch-${slug}-2`), img(`branch-${slug}-3`)],
      heroImage: img(`branch-hero-${slug}`, 1600, 900),
      courses: branchCourses.length ? branchCourses : courses.slice(0, 3).map((c2) => c2._id),
      trainers: branchTrainers,
      facilities: facilitiesPool.slice(0, 5 + (i % 3)),
      batches: [
        { course: "CPC Certification", timing: "Mon-Fri, 9:00 AM - 11:00 AM", startDate: "01 Sep 2026", mode: "Classroom", seatsLeft: 6 + (i % 5) },
        { course: "CCS Certification", timing: "Mon-Fri, 6:00 PM - 8:00 PM", startDate: "08 Sep 2026", mode: "Classroom + Online", seatsLeft: 4 + (i % 6) },
        { course: "HCC Risk Adjustment", timing: "Sat-Sun, 10:00 AM - 1:00 PM", startDate: "15 Sep 2026", mode: "Live Online", seatsLeft: 10 }
      ],
      mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(c.city + ", " + c.state)}&output=embed`,
      isFlagship: !!c.flagship,
      order: i
    });
  }
  await Branch.insertMany(branches);

  console.log("Seeding testimonials...");
  const testimonialData = [
    { name: "Sowmya Reddy", role: "Medical Coder", company: "Optum", quote: "Thoughtflows took me from a biology graduate with zero coding knowledge to a certified CPC coder placed at Optum in just 4 months. The mentors genuinely care about your growth.", beforeRole: "Fresh Biology Graduate", afterRole: "Certified Medical Coder, Optum", rating: 5, photo: img("student-1", 300, 300), featured: true },
    { name: "Abhishek Menon", role: "Inpatient Coder", company: "Cognizant", quote: "The practical, chart-based training made all the difference. I walked into my CCS exam confident and walked out certified.", beforeRole: "BPO Executive", afterRole: "Inpatient Coder, Cognizant", rating: 5, photo: img("student-2", 300, 300), featured: true },
    { name: "Fathima Noor", role: "HCC Risk Analyst", company: "UnitedHealth Group", quote: "The placement team didn't just help me get a job — they helped me find the right one. Mock interviews were a game changer.", beforeRole: "Nursing Graduate", afterRole: "Risk Adjustment Analyst, UHG", rating: 5, photo: img("student-3", 300, 300), featured: true },
    { name: "Rohit Deshmukh", role: "Coding QA Specialist", company: "Access Healthcare", quote: "Every trainer at Thoughtflows has real industry experience — that's rare, and it shows in how they teach.", beforeRole: "Pharmacy Graduate", afterRole: "QA Specialist, Access Healthcare", rating: 4, photo: img("student-4", 300, 300), featured: false },
    { name: "Divya Prakash", role: "Medical Biller", company: "R1 RCM", quote: "I joined with a lot of doubt about switching careers at 29. Today I'm earning more, and doing work I actually enjoy.", beforeRole: "Career Break, Homemaker", afterRole: "Medical Biller, R1 RCM", rating: 5, photo: img("student-5", 300, 300), featured: true },
    { name: "Naveen Kumar", role: "Senior Medical Coder", company: "Omega Healthcare", quote: "The curriculum stays current with real payer guidelines, not outdated textbook material. That's why I recommend Thoughtflows to every junior coder I meet.", beforeRole: "Junior Coder", afterRole: "Senior Coder, Omega Healthcare", rating: 5, photo: img("student-6", 300, 300), featured: false }
  ];
  await Testimonial.insertMany(testimonialData);

  console.log("Seeding gallery...");
  const galleryData = [
    { title: "Live Coding Practice Lab", category: "classrooms", url: img("gallery-classroom-1", 1000, 700) },
    { title: "Interactive Classroom Session", category: "classrooms", url: img("gallery-classroom-2", 1000, 700) },
    { title: "Batch of Certified Coders", category: "students", url: img("gallery-students-1", 1000, 700) },
    { title: "Students at Orientation Day", category: "students", url: img("gallery-students-2", 1000, 700) },
    { title: "Faculty Team", category: "trainers", url: img("gallery-trainers-1", 1000, 700) },
    { title: "Trainer-led Chart Audit Session", category: "trainers", url: img("gallery-trainers-2", 1000, 700) },
    { title: "Annual Coders' Meet", category: "events", url: img("gallery-events-1", 1000, 700) },
    { title: "Certification Day Celebration", category: "events", url: img("gallery-events-2", 1000, 700) },
    { title: "HCC Coding Workshop", category: "workshops", url: img("gallery-workshops-1", 1000, 700) },
    { title: "Industry Expert Guest Session", category: "workshops", url: img("gallery-workshops-2", 1000, 700) },
    { title: "Hyderabad Flagship Campus", category: "branches", url: img("gallery-branches-1", 1000, 700) },
    { title: "Chennai Branch Interiors", category: "branches", url: img("gallery-branches-2", 1000, 700) },
    { title: "CPC Certification Handover", category: "certifications", url: img("gallery-cert-1", 1000, 700) },
    { title: "CCS Certification Wall of Fame", category: "certifications", url: img("gallery-cert-2", 1000, 700) }
  ];
  await GalleryItem.insertMany(galleryData);

  console.log("Seeding placement stats...");
  const statsData = [
    { label: "Training", value: "35,000+", icon: "GraduationCap", order: 1 },
    { label: "Placement", value: "25,000+", icon: "Users", order: 2 },
    { label: "Courses", value: "49+", icon: "BookOpen", order: 3 },
    { label: "Branches", value: "12+", icon: "MapPin", order: 4 },
    { label: "Hiring Partners", value: "500+", icon: "Briefcase", order: 5 },
    { label: "Years of Excellence", value: "9+", icon: "Award", order: 6 }
  ];
  await PlacementStat.insertMany(statsData);

  console.log("Seeding admin account...");
  await Admin.create({
    name: "Thoughtflows Admin",
    email: process.env.ADMIN_SEED_EMAIL || "admin@thoughtflows.in",
    password: process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!",
    role: "superadmin"
  });

  console.log("Seed complete.");
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
