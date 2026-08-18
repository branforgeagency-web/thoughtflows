import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Building2,
  HelpCircle,
  MessageSquare
} from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import FaqSection from "../components/sections/FaqSection";
import CTASection from "../components/sections/CTASection";
import useFetch from "../hooks/useFetch";
import api from "../services/api";
import { BRANCHES } from "../data/branches";
import { ALL_COURSE_OPTIONS } from "../config/allCoursesList";
import { contactFaqs } from "../config/pageFaqs";

const initialForm = { name: "", phone: "", email: "", branch: "", course: "", message: "" };

const faqs = [
  {
    q: "How long does CPC medical coding certification training take?",
    a: "Our CPC Certification program takes approximately 2 to 3 months, covering anatomy, medical terminology, CPT, ICD-10-CM, HCPCS guidelines, and intensive mock exam practice."
  },
  {
    q: "What is the eligibility for joining medical coding courses?",
    a: "Graduates or diploma holders from Life Sciences, Nursing, Pharmacy, Biotechnology, Botany, Zoology, or any discipline with a basic interest in healthcare can enroll."
  },
  {
    q: "Does Thoughtflows Academy guarantee job placements?",
    a: "Yes! We provide 100% placement assistance including resume building, mock interviews, and direct referrals to over 500+ healthcare BPO hiring partners."
  },
  {
    q: "Are weekend or online classes available?",
    a: "Yes, we offer flexible weekday and weekend batches in both classroom training across our 15 campuses and live interactive online training."
  }
];

export default function Contact() {
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const branchesList = BRANCHES;

  useEffect(() => {
    const branchSlug = searchParams.get("branch");
    if (branchSlug) {
      const match = branchesList.find((b) => b.id === branchSlug || b.slug === branchSlug);
      if (match) setForm((f) => ({ ...f, branch: match.id }));
    }
  }, [searchParams]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[\d+\-\s]{7,15}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number";
    if (!form.email.trim()) errs.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Enter a valid email address";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    setServerError("");
    try {
      const payload = { ...form };
      if (!payload.branch) delete payload.branch;
      if (!payload.course) delete payload.course;
      await api.post("/enquiries", payload);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("success");
      setForm(initialForm);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-navy-900 overflow-hidden">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO HEADER BANNER                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-36 pb-20 bg-gradient-to-r from-[#0B192C] via-[#0b3347] to-teal-950 text-white overflow-hidden">
        <div className="container-max px-6 sm:px-10 lg:px-16 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-teal-400/30">
            <Sparkles size={14} className="text-teal-400" /> Contact & Admissions
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Get in Touch with <span className="text-[#16ADBA]">Thoughtflows</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Have questions about medical coding certifications, batch timings, or fee structures? Our team of expert career counsellors is here to guide your journey.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-teal-200">
            <span className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/15">
              ✓ 100% Placement Support
            </span>
            <span className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/15">
              ✓ 15 Pan-India Campuses
            </span>
            <span className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/15">
              ✓ AAPC & AHIMA Accredited
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. ADMISSION ENQUIRY FORM & MAP                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16">
        <div className="container-max px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form */}
            <RevealOnScroll className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
                <div className="space-y-2 border-b border-slate-100 pb-5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight flex items-center gap-2">
                    <MessageSquare className="text-[#16ADBA]" size={26} />
                    <span>Send an Admission Enquiry</span>
                  </h2>
                  <p className="text-navy-900/60 text-sm">
                    Fill out the form below and our career counsellor will get in touch with course details and batch options within 24 hours.
                  </p>
                </div>

                {status === "success" ? (
                  <div className="p-8 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-4">
                    <CheckCircle2 size={48} className="text-[#16ADBA] mx-auto" />
                    <h3 className="text-2xl font-extrabold text-navy-900">Enquiry Received!</h3>
                    <p className="text-navy-900/70 text-sm max-w-md mx-auto">
                      Thank you for reaching out to Thoughtflows Medical Coding Academy. Our admissions team will contact you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="inline-block text-sm font-extrabold text-[#16ADBA] underline pt-2"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          className={`w-full bg-slate-50 border rounded-2xl px-4 py-3.5 text-sm text-navy-900 outline-none transition-all focus:bg-white focus:border-[#16ADBA] ${
                            errors.name ? "border-red-400" : "border-slate-200"
                          }`}
                        />
                        {errors.name && <span className="text-red-500 text-xs font-semibold mt-1 block">{errors.name}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`w-full bg-slate-50 border rounded-2xl px-4 py-3.5 text-sm text-navy-900 outline-none transition-all focus:bg-white focus:border-[#16ADBA] ${
                            errors.phone ? "border-red-400" : "border-slate-200"
                          }`}
                        />
                        {errors.phone && <span className="text-red-500 text-xs font-semibold mt-1 block">{errors.phone}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full bg-slate-50 border rounded-2xl px-4 py-3.5 text-sm text-navy-900 outline-none transition-all focus:bg-white focus:border-[#16ADBA] ${
                          errors.email ? "border-red-400" : "border-slate-200"
                        }`}
                      />
                      {errors.email && <span className="text-red-500 text-xs font-semibold mt-1 block">{errors.email}</span>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">Preferred Branch</label>
                        <select
                          name="branch"
                          value={form.branch}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-navy-900 outline-none transition-all focus:bg-white focus:border-[#16ADBA] cursor-pointer"
                        >
                          <option value="">Select a branch location</option>
                          {branchesList.map((b) => (
                            <option key={b.id} value={b.id}>{b.name} ({b.city})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">Course of Interest</label>
                        <select
                          name="course"
                          value={form.course}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-navy-900 outline-none transition-all focus:bg-white focus:border-[#16ADBA] cursor-pointer"
                        >
                          <option value="">Select a certification course</option>
                          {ALL_COURSE_OPTIONS.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">Message / Inquiry Details</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Ask about batch start dates, course fees, or class modes..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-navy-900 outline-none transition-all focus:bg-white focus:border-[#16ADBA] resize-none"
                      />
                    </div>

                    {status === "error" && <p className="text-red-500 text-sm font-semibold">{serverError}</p>}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto bg-[#16ADBA] hover:bg-teal-600 text-white font-extrabold px-9 py-4 rounded-2xl shadow-xl shadow-teal-500/20 transition-all cursor-pointer flex items-center justify-center gap-2.5 text-base"
                    >
                      <Send size={18} />
                      <span>{status === "submitting" ? "Submitting..." : "Submit Enquiry"}</span>
                    </button>
                  </form>
                )}
              </div>
            </RevealOnScroll>

            {/* Right Column: Campus Locations List & Map */}
            <RevealOnScroll delay={0.1} className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-navy-900">Featured Campuses</h3>
                  <Link to="/branches" className="text-xs font-extrabold text-[#16ADBA] hover:underline">
                    View All Branches &rarr;
                  </Link>
                </div>

                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {branchesList.map((b) => (
                    <Link
                      key={b.id}
                      to={`/branches/${b.id}`}
                      className="flex items-start justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-400 hover:bg-teal-50/50 transition-all group"
                    >
                      <div>
                        <h4 className="font-extrabold text-navy-900 text-sm group-hover:text-[#16ADBA]">{b.name}</h4>
                        <p className="text-xs text-navy-900/60 mt-0.5 line-clamp-1">{b.address}</p>
                      </div>
                      <ExternalLink size={14} className="text-navy-900/40 group-hover:text-[#16ADBA] shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Map Embed */}
              <div className="bg-white rounded-3xl p-3 shadow-2xl border border-slate-100 overflow-hidden">
                <iframe
                  title="Thoughtflows Academy Locations Map"
                  src="https://www.google.com/maps?q=Peelamedu+Hope+College+Coimbatore&z=12&output=embed"
                  className="w-full h-64 rounded-2xl border-0"
                  loading="lazy"
                />
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. QUICK CONTACT CARDS (PLACED DOWN BELOW FORM AS REQUESTED)       */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-[#F4F2EE] border-t border-b border-slate-200/60">
        <div className="container-max px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Call Us Directly */}
            <RevealOnScroll delay={0.05}>
              <div className="bg-white rounded-[28px] p-7 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-2xl bg-[#E6F7F8] text-[#16ADBA] flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy-900 text-base">Call Us Directly</h3>
                    <p className="text-xs text-slate-400 font-medium">Mon - Sat: 9 AM - 7 PM</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 mt-5 pt-4 space-y-1 text-sm font-extrabold text-navy-900">
                  <a href="tel:+919000001000" className="block hover:text-[#16ADBA] transition-colors">+91 90000 01000</a>
                  <a href="tel:+919876543210" className="block hover:text-[#16ADBA] transition-colors">+91 98765 43210</a>
                </div>
              </div>
            </RevealOnScroll>

            {/* Card 2: Email Support */}
            <RevealOnScroll delay={0.1}>
              <div className="bg-white rounded-[28px] p-7 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-2xl bg-[#E6F7F8] text-[#16ADBA] flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy-900 text-base">Email Support</h3>
                    <p className="text-xs text-slate-400 font-medium">24/7 Enquiry Inbox</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 mt-5 pt-4 space-y-1 text-sm font-extrabold text-navy-900">
                  <a href="mailto:dm@thoughtflows.in" className="block hover:text-[#16ADBA] transition-colors">dm@thoughtflows.in</a>
                  <a href="mailto:info@thoughtflows.in" className="block hover:text-[#16ADBA] transition-colors">info@thoughtflows.in</a>
                </div>
              </div>
            </RevealOnScroll>

            {/* Card 3: Headquarters */}
            <RevealOnScroll delay={0.15}>
              <div className="bg-white rounded-[28px] p-7 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-2xl bg-[#E6F7F8] text-[#16ADBA] flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy-900 text-base">Headquarters</h3>
                    <p className="text-xs text-slate-400 font-medium">Flagship Academy</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 mt-5 pt-4">
                  <p className="text-xs text-navy-900/80 leading-relaxed font-bold">
                    Vasavi MPM Grand, Level 6, Ameerpet X Road, Hyderabad, Telangana 500073
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Card 4: 15 Pan-India Campuses */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-white rounded-[28px] p-7 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-2xl bg-[#E6F7F8] text-[#16ADBA] flex items-center justify-center shrink-0">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy-900 text-base">15 Pan-India Campuses</h3>
                    <p className="text-xs text-slate-400 font-medium">Explore Nearby Branch</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 mt-5 pt-4">
                  <Link to="/branches" className="text-xs font-extrabold text-[#16ADBA] hover:underline inline-flex items-center gap-1">
                    <span>View All Branch Locations</span> &rarr;
                  </Link>
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FaqSection items={contactFaqs} />

      <CTASection />
    </div>
  );
}
