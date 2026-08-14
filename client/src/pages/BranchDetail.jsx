import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Users,
  CalendarDays,
  ArrowRight,
  ExternalLink,
  Star,
  Award,
  Sparkles,
  BookOpen,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Send
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import RevealOnScroll from "../components/RevealOnScroll";
import MagneticButton from "../components/MagneticButton";
import CTASection from "../components/sections/CTASection";
import useFetch from "../hooks/useFetch";
import { BRANCHES } from "../data/branches";

function splitCity(city) {
  const [cityPart, statePart] = (city || "").split(",").map((s) => s.trim());
  return { cityPart: cityPart || city || "", statePart: statePart || "" };
}

function getFallbackBranch(slug) {
  const match = BRANCHES.find(
    (b) =>
      b.id === slug ||
      b.slug === slug ||
      b.name.toLowerCase() === slug.replace(/-/g, " ").toLowerCase()
  );
  if (match) {
    return {
      ...match,
      heroImage: match.heroImage || match.img,
      phone: match.phone || "+91 98765 43210",
      email: match.email || "info@thoughtflows.in",
      courses: [
        { _id: "cpc", name: "Certified Professional Coder (CPC)", slug: "cpc-certification" },
        { _id: "ccs", name: "Certified Coding Specialist (CCS)", slug: "ccs-certification" },
        { _id: "hcc", name: "HCC Risk Adjustment Coding", slug: "hcc-risk-adjustment" },
        { _id: "billing", name: "Medical Billing & Denial Management", slug: "medical-billing-denial-management" }
      ],
      facilities: [
        "Air-Conditioned Classrooms",
        "Practice Lab with Live Charts",
        "High-Speed WiFi Campus",
        "Free Study Material & LMS Access",
        "Mock Interview Rooms"
      ],
      batches: [
        { course: "CPC Certification", timing: "9:00 AM - 11:00 AM", mode: "Classroom / Online", startDate: "Next Monday", seatsLeft: 4 },
        { course: "CCS Inpatient Coding", timing: "11:30 AM - 1:30 PM", mode: "Classroom", startDate: "Upcoming Batch", seatsLeft: 6 }
      ],
      images: match.gallery?.map((g) => g.url) || [match.img]
    };
  }
  return null;
}

export default function BranchDetail() {
  const { slug } = useParams();
  const { data: apiBranch, loading, error, refetch } = useFetch(`/branches/slug/${slug}`, { deps: [slug] });
  const formRef = useRef(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", course: "cpc-certification", message: "" });

  // Scroll to top and reset form when switching between branch pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    setFormSubmitted(false);
  }, [slug]);

  const rawBranch = apiBranch || (loading ? null : getFallbackBranch(slug));
  const branch = rawBranch
    ? {
        ...rawBranch,
        heroImage: rawBranch.heroImage || rawBranch.img,
        images: rawBranch.images || rawBranch.gallery?.map((g) => g.url) || [rawBranch.img]
      }
    : null;

  if (loading && !branch) return <LoadingSpinner label="Loading branch details..." />;
  if (error && !branch) return <ErrorState message={error} onRetry={refetch} />;
  if (!branch) return null;

  const { cityPart } = splitCity(branch.city);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div key={slug} className="bg-white text-navy-900 overflow-hidden">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO HEADER BANNER                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-sky-50 via-[#f0f9fa] to-teal-50/60 border-b border-slate-200/60 overflow-hidden">
        <div className="container-max px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 bg-teal-500/15 text-teal-700 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-teal-300/40">
                <Sparkles size={14} className="text-teal-600" />
                <span>Medical Coding Academy in {branch.name}</span>
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Medical Coding Academy in <span className="text-[#16ADBA] underline decoration-teal-400/40 underline-offset-8">{branch.name}</span>
              </h1>

              <p className="text-navy-900/75 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Are you passionate about launching a career in Medical Coding? Look no further! Thoughtflows Medical Coding Academy in {cityPart} is your trusted gateway to industry certification and top healthcare job placements.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="bg-[#16ADBA] hover:bg-teal-600 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer text-base"
                >
                  Inquire Now
                </button>
                <a
                  href="#courses-section"
                  className="bg-white hover:bg-slate-50 text-navy-900 font-extrabold px-7 py-3.5 rounded-full border border-slate-200 shadow-sm transition-all text-base"
                >
                  View Programs
                </a>
              </div>
            </div>

            {/* Right Hero Team Photo / Campus Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src={branch.heroImage}
                  alt={`Thoughtflows Academy ${branch.name}`}
                  className="w-full h-[320px] sm:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs text-teal-300 font-bold uppercase tracking-wider flex items-center gap-1">
                    <MapPin size={12} /> {branch.city}
                  </span>
                  <p className="font-extrabold text-lg">{branch.name} Campus</p>
                </div>
              </div>
            </div>

          </div>

          {/* Stat Counter Strip below Hero */}
          <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#16ADBA]">35,000+</div>
              <div className="text-xs sm:text-sm font-bold text-navy-900/60 uppercase tracking-wider mt-1">Trained</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#16ADBA]">25,000+</div>
              <div className="text-xs sm:text-sm font-bold text-navy-900/60 uppercase tracking-wider mt-1">Placed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#16ADBA]">49+</div>
              <div className="text-xs sm:text-sm font-bold text-navy-900/60 uppercase tracking-wider mt-1">Courses</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#16ADBA]">12+</div>
              <div className="text-xs sm:text-sm font-bold text-navy-900/60 uppercase tracking-wider mt-1">Branches</div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. CITY'S TRUSTED MEDICAL CODING INSTITUTE                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-white">
        <div className="container-max px-6">
          <RevealOnScroll key={`trusted-${slug}`}>
            <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
              
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
                  {cityPart}'s Trusted Medical Coding Institute
                </h2>
                <div className="h-1 w-20 bg-[#16ADBA] rounded-full" />
                
                <p className="text-navy-900/75 text-base sm:text-lg leading-relaxed">
                  Thoughtflows Medical Coding Academy in {branch.name} is a leading institute specializing in expert medical coding training. We provide high-quality, comprehensive education to help individuals acquire the skills necessary for a rewarding career in healthcare.
                </p>
                <p className="text-navy-900/75 text-base sm:text-lg leading-relaxed">
                  With experienced faculty, hands-on hospital chart practice, and 100% placement support, we prepare students for AAPC CPC & AHIMA CCS certification success across {cityPart} and nationwide.
                </p>

                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-extrabold px-7 py-3 rounded-full transition-all text-sm cursor-pointer"
                >
                  <span>Know More</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                    alt={`${cityPart} Trusted Institute`}
                    className="w-full h-[360px] object-cover"
                  />
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. ENROLL FOR A BRIGHT FUTURE BANNER                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-12 bg-white">
        <div className="container-max px-6 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#16ADBA] to-teal-600 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enroll for a Bright Future
            </h2>

            <p className="text-white/95 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
              At Thoughtflows Medical Coding Academy in {branch.name}, we nurture and transform your aspirations into a successful healthcare career. Master coding guidelines, clinical documentation, and pass official AAPC & AHIMA certification exams with our expert guidance.
            </p>

            <div>
              <button
                type="button"
                onClick={scrollToForm}
                className="bg-white text-[#16ADBA] hover:bg-teal-50 font-extrabold px-10 py-3.5 rounded-full shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer text-base"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. TEST YOURSELF / ONLINE EXAMS CAROUSEL                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="container-max px-6 max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <span className="inline-block bg-teal-500/15 text-teal-700 font-extrabold text-xs uppercase tracking-widest px-4 py-1 rounded-full">
              Test Yourself
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Online Exams & Practice Mocks
            </h2>
            <div className="h-1 w-20 bg-[#16ADBA] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "CPC Mock Exam", tag: "PREV", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80" },
              { title: "CCS Inpatient Exam", tag: "CURRENT", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=500&q=80" },
              { title: "HCC Audit Assessment", tag: "NEXT", image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=500&q=80" }
            ].map((exam, i) => (
              <RevealOnScroll key={`exam-${slug}-${exam.title}`} delay={i * 0.1}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={exam.image}
                      alt={exam.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute bottom-3 left-3 bg-[#16ADBA] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {exam.tag}
                    </span>
                  </div>

                  <div className="p-6 text-center space-y-3">
                    <h3 className="text-xl font-extrabold text-navy-900">{exam.title}</h3>
                    <p className="text-navy-900/60 text-xs leading-relaxed">
                      Timed full-length exam practice modeled after official certification guidelines.
                    </p>
                    <button
                      type="button"
                      onClick={scrollToForm}
                      className="text-xs font-extrabold text-[#16ADBA] hover:underline"
                    >
                      Start Mock Test &rarr;
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. WHAT SETS THOUGHTFLOWS APART? (6 FEATURE CARDS GRID)            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-24 bg-white">
        <div className="container-max px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
              What Sets Thoughtflows Apart?
            </h2>
            <div className="h-1 w-24 bg-[#16ADBA] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Elevate Your Skills",
                text: "Master medical coding with our in-depth curriculum and practical hospital chart practice designed to boost accuracy and clinical confidence.",
                bgColor: "bg-[#16ADBA] text-white"
              },
              {
                title: "Dedicated Faculty at Our Academy",
                text: "Our certified medical coding faculty in " + branch.name + " bring over 10+ years of active healthcare BPO experience directly into your training.",
                bgColor: "bg-navy-900 text-white"
              },
              {
                title: "Explore the Curriculum",
                text: "Comprehensive curriculum covering CPT, ICD-10-CM, HCPCS Level II, E/M rules, and specialty surgical guidelines.",
                bgColor: "bg-[#16ADBA] text-white"
              },
              {
                title: "Affordable Medical Coding Courses",
                text: "Transparent fee structure with flexible installment plans, providing exceptional value for career-oriented students.",
                bgColor: "bg-navy-900 text-white"
              },
              {
                title: "Job-Oriented Medical Coding Training",
                text: "100% placement support with resume optimization, mock interviews, and direct referrals to 500+ hiring partners.",
                bgColor: "bg-[#16ADBA] text-white"
              },
              {
                title: "Convenient and Flexible Class Schedules",
                text: "Weekday and weekend batches available in both classroom training at " + branch.name + " and live online interactive formats.",
                bgColor: "bg-navy-900 text-white"
              }
            ].map((card, i) => (
              <RevealOnScroll key={`apart-${slug}-${card.title}`} delay={i * 0.08}>
                <div className={`${card.bgColor} rounded-3xl p-8 shadow-xl h-full flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-300`}>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold leading-snug tracking-tight">{card.title}</h3>
                    <p className="text-sm opacity-90 leading-relaxed font-normal">{card.text}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10 mt-6">
                    <span className="text-xs font-extrabold uppercase tracking-wider opacity-75">
                      {branch.name} Campus
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. TRENDS, CERTIFICATIONS & CASE STUDIES                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="container-max px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Card: Stay Updated */}
            <div className="lg:col-span-5 bg-[#16ADBA] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <span className="bg-white/20 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">Curriculum Updates</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">Stay Updated with the Latest Trends</h3>
                <p className="text-white/95 text-sm sm:text-base leading-relaxed font-normal">
                  We keep our curriculum continuously updated with the latest annual ICD-10-CM and CPT guideline revisions, ensuring our students at {branch.name} enter the workforce fully compliant.
                </p>
              </div>
              <div className="pt-6 border-t border-white/20 mt-6">
                <button type="button" onClick={scrollToForm} className="text-xs font-extrabold uppercase underline">
                  Ask About Course Syllabus &rarr;
                </button>
              </div>
            </div>

            {/* Right Cards: Certifications & Case Studies */}
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 space-y-3">
                <h3 className="text-2xl font-extrabold text-navy-900">Industry-Recognized Certifications</h3>
                <p className="text-navy-900/75 text-sm sm:text-base leading-relaxed font-normal">
                  Prepare with confidence for AAPC CPC, AHIMA CCS, and specialty certifications recognized by leading healthcare organizations worldwide.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 space-y-3">
                <h3 className="text-2xl font-extrabold text-navy-900">Real-World Case Studies</h3>
                <p className="text-navy-900/75 text-sm sm:text-base leading-relaxed font-normal">
                  Gain practical experience coding anonymized real-world hospital charts, surgical operation reports, and outpatient clinical records.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. OUR TESTIMONIALS (STUDENT SUCCESS STORIES)                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-24 bg-white">
        <div className="container-max px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="inline-block bg-teal-500/15 text-teal-700 font-extrabold text-xs uppercase tracking-widest px-4 py-1 rounded-full">
              Our Testimonials
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
              Hear from Our Successful Candidates
            </h2>
            <div className="h-1 w-24 bg-[#16ADBA] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Smyth Raj",
                role: "CPC Certified Coder",
                quote: "Joining Thoughtflows Academy in " + branch.name + " was the best career decision I made. The faculty guided me through every coding guideline, and I cleared my CPC exam on the first attempt with 88%!",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "Priya Sundaram",
                role: "CCS Specialist",
                quote: "The live hospital chart practice at " + branch.name + " gave me immense confidence. Within two weeks of completing my course, I was placed at a top healthcare MNC!",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
              }
            ].map((item) => (
              <RevealOnScroll key={`testi-${slug}-${item.name}`}>
                <div className="bg-[#f0f9fa] rounded-3xl p-8 shadow-xl border border-teal-100 space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-navy-900/80 text-sm sm:text-base leading-relaxed italic font-normal">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-teal-200/60">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#16ADBA]" />
                    <div>
                      <h4 className="font-extrabold text-navy-900 text-base">{item.name}</h4>
                      <p className="text-xs text-[#16ADBA] font-bold">{item.role}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. BRANCH ADDRESS, MAP & INQUIRY FORM                             */}
      {/* ------------------------------------------------------------------ */}
      <section ref={formRef} id="inquiry-form" className="py-20 bg-[#FAF8F5] border-t border-slate-200">
        <div className="container-max px-6 max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Visit Our {branch.name} Campus or Enquire Online
            </h2>
            <div className="h-1 w-20 bg-[#16ADBA] mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Location Details & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 space-y-5">
                <h3 className="text-xl font-extrabold text-navy-900">{branch.name} Branch Details</h3>
                
                <div className="space-y-4 text-sm text-navy-900/80">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#16ADBA] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-extrabold text-navy-900 mb-0.5">Address</strong>
                      <span>{branch.address}</span>
                    </div>
                  </div>

                  {branch.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-[#16ADBA] shrink-0" />
                      <div>
                        <strong className="block font-extrabold text-navy-900 mb-0.5">Phone</strong>
                        <span>{branch.phone}</span>
                      </div>
                    </div>
                  )}

                  {branch.gmapUrl && (
                    <div className="pt-2">
                      <a
                        href={branch.gmapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#16ADBA] hover:bg-teal-600 text-white font-extrabold px-6 py-2.5 rounded-full text-xs transition shadow-md"
                      >
                        <ExternalLink size={14} /> Open in Google Maps
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {branch.mapEmbedUrl && (
                <div className="bg-white rounded-3xl p-3 shadow-xl border border-slate-100 overflow-hidden">
                  <iframe
                    title={`${branch.name} map`}
                    src={branch.mapEmbedUrl}
                    className="w-full h-64 rounded-2xl border-0"
                    loading="lazy"
                  />
                </div>
              )}
            </div>

            {/* Right Column: Admission Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100">
              <h3 className="text-2xl font-extrabold text-navy-900 mb-2">Admission Enquiry — {branch.name}</h3>
              <p className="text-navy-900/60 text-sm mb-6">
                Fill out the form below and our {branch.name} admissions counsellor will get in touch with batch schedules and fee details.
              </p>

              {formSubmitted ? (
                <div className="p-8 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 size={40} className="text-[#16ADBA] mx-auto" />
                  <h4 className="text-xl font-extrabold text-navy-900">Thank You!</h4>
                  <p className="text-navy-900/70 text-sm">
                    Your inquiry for {branch.name} branch has been received. Our team will call you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:bg-white focus:border-[#16ADBA] outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:bg-white focus:border-[#16ADBA] outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:bg-white focus:border-[#16ADBA] outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase mb-1">Select Course *</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:bg-white focus:border-[#16ADBA] outline-none transition cursor-pointer"
                    >
                      <option value="cpc-certification">Certified Professional Coder (CPC)</option>
                      <option value="ccs-certification">Certified Coding Specialist (CCS)</option>
                      <option value="hcc-risk-adjustment">HCC Risk Adjustment Coding</option>
                      <option value="medical-billing-denial-management">Medical Billing & Denial Management</option>
                      <option value="medical-coding-foundation">Medical Coding Foundation Program</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase mb-1">Your Message (Optional)</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ask about batch timings, fees, or course details..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:bg-white focus:border-[#16ADBA] outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#16ADBA] hover:bg-teal-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-teal-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 text-base"
                  >
                    <Send size={18} />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
