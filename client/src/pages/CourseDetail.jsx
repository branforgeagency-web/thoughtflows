import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Monitor,
  IndianRupee,
  ArrowRight,
  Briefcase,
  CalendarDays,
  FileCheck2,
  Users
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

const COURSE_IMAGES = {
  "cpc-certification": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  "ccs-certification": "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  "hcc-risk-adjustment": "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
  "medical-billing-denial-management": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  "medical-coding-foundation": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
  "advanced-em-surgery-coding": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
};

function getCourseImage(course) {
  if (!course) return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80";
  if (course.image && !course.image.includes("picsum")) return course.image;
  if (COURSE_IMAGES[course.slug]) return COURSE_IMAGES[course.slug];
  return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80";
}

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

  const rawCourse = apiCourse || (loading ? null : buildFallbackCourse(slug));
  const course = rawCourse ? { ...rawCourse, image: getCourseImage(rawCourse) } : null;

  if (loading && !course) return <LoadingSpinner label="Loading course..." />;
  if (error && !course) return <ErrorState message={error} onRetry={refetch} />;
  if (!course) return null;

  return (
    <>
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid-glow pointer-events-none" />
        <div className="container-max px-6 md:px-10 lg:px-20 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <div className="flex flex-col gap-5">
              <span className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">{course.format}</span>
              <h1 className="text-3xl md:text-5xl font-bold text-navy-900 leading-tight">{course.name}</h1>
              <p className="text-navy-900/60 text-lg">{course.tagline}</p>
              <div className="flex flex-wrap gap-4 text-sm text-navy-900/50 mt-2">
                <span className="flex items-center gap-2 glass rounded-full px-4 py-2"><Clock size={14} /> {course.duration}</span>
                <span className="flex items-center gap-2 glass rounded-full px-4 py-2"><Monitor size={14} /> {course.format}</span>
                <span className="flex items-center gap-2 glass rounded-full px-4 py-2"><IndianRupee size={14} /> {course.fee}</span>
              </div>
              <MagneticButton as={Link} to="/contact" className="mt-4 self-start">
                Enroll Now <ArrowRight size={18} />
              </MagneticButton>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <div className="rounded-3xl overflow-hidden glass-strong p-2 shadow-2xl">
              <img src={getCourseImage(course)} alt={course.name} className="rounded-2xl w-full h-[360px] object-cover" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* What is it? + Who it's for + Roles */}
      {(course.whatIsIt || course.whoIsItFor?.length || course.roles?.length) && (
        <section className="section-pad pt-0">
          <div className="container-max grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {course.whatIsIt && (
                <RevealOnScroll>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">What is {course.name}?</h2>
                    <p className="text-navy-900/60 leading-relaxed">{course.whatIsIt}</p>
                  </div>
                </RevealOnScroll>
              )}

              {course.roles?.length > 0 && (
                <RevealOnScroll delay={0.1}>
                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-lg font-semibold text-navy-900 mb-5">
                      Role of a {course.name.match(/\(([^)]+)\)/)?.[1] || "Certified Coder"}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {course.roles.map((role) => (
                        <li key={role} className="flex items-start gap-3 text-navy-900/70 text-sm">
                          <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" /> {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              )}
            </div>

            {course.whoIsItFor?.length > 0 && (
              <RevealOnScroll delay={0.15}>
                <div className="bg-teal-50 border border-teal-500/15 rounded-2xl p-8 h-fit">
                  <h3 className="text-lg font-semibold text-navy-900 mb-5 flex items-center gap-2">
                    <Users size={18} className="text-teal-600" /> Who is this for?
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {course.whoIsItFor.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-navy-900/70 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" /> {point}
                      </li>
                    ))}
                  </ul>
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
                  <h3 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
                    <CalendarDays size={18} className="text-teal-600" /> Training Details
                  </h3>
                  <div className="flex flex-col gap-4">
                    {course.batchOptions.map((batch) => (
                      <div key={batch.label} className="flex flex-col gap-1 border-b border-navy-900/10 pb-4 last:border-0 last:pb-0">
                        <span className="text-sm font-medium text-navy-900">{batch.label}</span>
                        <span className="text-navy-900/50 text-sm">{batch.schedule}</span>
                      </div>
                    ))}
                    <div className="flex flex-col gap-1 pt-1">
                      <span className="text-sm font-medium text-navy-900">Duration</span>
                      <span className="text-navy-900/50 text-sm">{course.duration}</span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {course.examOverview && (
              <RevealOnScroll delay={0.1}>
                <div className="glass rounded-2xl p-8 h-full">
                  <h3 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
                    <FileCheck2 size={18} className="text-teal-600" /> Exam Overview
                  </h3>
                  <div className="flex flex-col gap-4">
                    {[
                      ["Duration", course.examOverview.duration],
                      ["Format", course.examOverview.format],
                      ["Pass Requirement", course.examOverview.passRequirement],
                      ["Language", course.examOverview.language]
                    ].filter(([, v]) => v).map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between border-b border-navy-900/10 pb-4 last:border-0 last:pb-0">
                        <span className="text-sm text-navy-900/50">{label}</span>
                        <span className="text-sm font-medium text-navy-900 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </section>
      )}

      {/* Why train with us — shared institutional reasons */}
      <section className="section-pad pt-0">
        <div className="container-max">
          <SectionHeading
            eyebrow="Why Thoughtflows"
            title={`Why take ${course.name.split("(")[0].trim()} training from Thoughtflows?`}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsItems.map((item, i) => (
              <RevealOnScroll key={item.title} delay={(i % 3) * 0.08}>
                <div className="glass rounded-2xl p-6 h-full flex flex-col gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-navy-500/20 flex items-center justify-center text-teal-600">
                    <item.icon size={18} />
                  </div>
                  <h3 className="text-base font-semibold text-navy-900">{item.title}</h3>
                  <p className="text-navy-900/60 text-sm leading-relaxed">{item.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

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
                    <span className="md:w-56 shrink-0 text-teal-600 font-semibold text-sm">{feature.title}</span>
                    <p className="text-navy-900/60 text-sm leading-relaxed">{feature.description}</p>
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
                  <div className="glass rounded-2xl p-7 h-full">
                    <h3 className="text-navy-900 font-semibold mb-4 flex items-center gap-3">
                      <span className="h-7 w-7 shrink-0 rounded-full bg-teal-500 text-ink-950 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      {module.title}
                    </h3>
                    {module.topics?.length > 0 && (
                      <ul className="flex flex-col gap-2 pl-10">
                        {module.topics.map((topic) => (
                          <li key={topic} className="text-navy-900/60 text-sm leading-relaxed list-disc">
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
                  <h2 className="text-xl font-semibold text-navy-900 mb-5">Skills You'll Gain</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-navy-900/70 text-sm">
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
              <div className="glass rounded-2xl p-8 h-fit sticky top-28 flex flex-col gap-5">
                <h2 className="text-lg font-semibold text-navy-900 flex items-center gap-2">
                  <Briefcase size={18} className="text-teal-600" /> Career Opportunities
                </h2>
                <ul className="flex flex-col gap-3">
                  {course.careerOpportunities.map((role) => (
                    <li key={role} className="text-navy-900/60 text-sm border-b border-navy-900/10 pb-3 last:border-0">
                      {role}
                    </li>
                  ))}
                </ul>
                <MagneticButton as={Link} to="/contact" className="w-full justify-center">
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
