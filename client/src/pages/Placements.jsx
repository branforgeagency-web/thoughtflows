import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle2, ArrowRight, Building2, Sparkles, Award, Send, Search, Briefcase } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import CTASection from "../components/sections/CTASection";

const placedCandidates = [
  {
    name: "MAREBOINA SURYA",
    company: "Optum",
    role: "CPC Medical Coder",
    year: "2024",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "PALLE BHAVANI",
    company: "CorroHealth",
    role: "CCS Coding Specialist",
    year: "2024",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "S. SWETHA",
    company: "Access Healthcare",
    role: "Medical Billing Analyst",
    year: "2024",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "VIMALA ESTHER",
    company: "GeBBS Healthcare",
    role: "HCC Risk Coder",
    year: "2024",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "DIPALI BODKHE",
    company: "Omega Healthcare",
    role: "CPC Certified Coder",
    year: "2024",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "GOLLA SOWJANYA",
    company: "Cognizant",
    role: "Healthcare Executive",
    year: "2024",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "D. RAJU",
    company: "AGS Health",
    role: "Surgical Coder",
    year: "2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "ANTO JASMIN JAMILA",
    company: "Episource",
    role: "HCC Chart Auditor",
    year: "2024",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "ABINUNCINI",
    company: "Optum",
    role: "Inpatient Coder",
    year: "2024",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "ARUMUGAM",
    company: "Vee Technologies",
    role: "CPC Medical Coder",
    year: "2024",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "VARSHALINI V",
    company: "Visionary RCM",
    role: "Revenue Analyst",
    year: "2024",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "VIJAY KUMAR",
    company: "Omega Healthcare",
    role: "CCS Specialist",
    year: "2024",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
  }
];

const hiringCompanies = [
  { name: "Optum", category: "MNC BPO" },
  { name: "CorroHealth", category: "RCM Global" },
  { name: "GeBBS Healthcare", category: "Hospital Coding" },
  { name: "Access Healthcare", category: "RCM Solutions" },
  { name: "Omega Healthcare", category: "Clinical BPO" },
  { name: "Cognizant", category: "Healthcare Tech" },
  { name: "AGS Health", category: "Revenue Cycle" },
  { name: "Episource", category: "Risk Adjustment" },
  { name: "Vee Technologies", category: "Medical Coding" },
  { name: "Visionary RCM", category: "Payer & Provider" },
  { name: "KGIS", category: "Healthcare IT" },
  { name: "A3 Healthcare", category: "Audit & Compliance" }
];

export default function Placements() {
  const [selectedCompany, setSelectedCompany] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", course: "cpc-certification", branch: "gandhipuram-coimbatore" });

  const filteredCandidates = placedCandidates.filter((c) => {
    const matchesCompany = selectedCompany === "ALL" || c.company === selectedCompany;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.company.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCompany && matchesSearch;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] text-navy-900 overflow-hidden min-h-screen">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO BANNER WITH WATERMARK                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-36 pb-20 bg-gradient-to-r from-navy-950 via-[#0b3347] to-teal-900 text-white overflow-hidden">
        {/* Background Watermark Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden">
          <span className="text-[120px] sm:text-[180px] lg:text-[220px] font-black uppercase tracking-widest text-white whitespace-nowrap">
            PLACEMENT SUCCESS
          </span>
        </div>

        <div className="container-max px-6 sm:px-10 lg:px-16 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-teal-400/30">
            <Sparkles size={14} className="text-teal-400" /> 100% Placement Record
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Placement <span className="text-[#16ADBA]">Success</span>
          </h1>

          <p className="text-teal-200 text-lg sm:text-2xl font-semibold max-w-2xl mx-auto">
            Building Global Careers for Future Coders
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs font-bold text-teal-200">
            <span className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/15">
              ✓ 25,000+ Students Placed
            </span>
            <span className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/15">
              ✓ 500+ Hiring Corporate Partners
            </span>
            <span className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/15">
              ✓ Dedicated Mock Interview Cell
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. SUB-HEADING INTRO BLOCK                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-white text-center border-b border-slate-200/60">
        <div className="container-max px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#16ADBA] tracking-tight">
            Success Stories of Students Placed in Top Companies
          </h2>

          <p className="text-navy-900/75 text-base sm:text-lg leading-relaxed font-normal">
            At Thoughtflows Medical Coding Academy, our strong placement support, practical healthcare training, and mock interview preparations ensure hundreds of students secure positions in top healthcare companies across India. Explore our placed candidates and see where you can be next.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. OUR PLACED STUDENTS DIRECTORY                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20">
        <div className="container-max px-6 sm:px-10 lg:px-16 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
              Our Placed Students
            </h2>
            <div className="h-1 w-24 bg-[#16ADBA] mx-auto rounded-full" />

            {/* Filter Pills for Hiring Companies */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                "ALL", "Optum", "CorroHealth", "Access Healthcare", "GeBBS Healthcare", "Omega Healthcare", "Cognizant", "AGS Health", "Episource"
              ].map((comp) => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => setSelectedCompany(comp)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    selectedCompany === comp
                      ? "bg-[#16ADBA] text-white shadow-lg shadow-teal-500/25 scale-105"
                      : "bg-white text-navy-900/70 hover:bg-slate-100 hover:text-navy-900 border border-slate-200"
                  }`}
                >
                  {comp === "ALL" ? "All Companies" : comp}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCandidates.map((c, i) => (
                <RevealOnScroll key={c.name} delay={(i % 4) * 0.06}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100/90 group flex flex-col justify-between hover:shadow-2xl hover:border-teal-400/40 transition-all duration-300 h-full"
                  >
                    {/* Background Watermark PLACED */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none font-black text-4xl text-navy-900 rotate-45">
                      PLACED PLACED
                    </div>

                    {/* Student Photo Header */}
                    <div className="relative h-64 overflow-hidden bg-slate-900">
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
                      
                      <span className="absolute top-3 right-3 bg-[#16ADBA] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                        2024 PLACED
                      </span>
                    </div>

                    {/* Student Details */}
                    <div className="p-6 text-center space-y-3 relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-extrabold text-navy-900 text-lg tracking-tight leading-snug group-hover:text-[#16ADBA] transition-colors">
                          {c.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          {c.role}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex flex-col items-center gap-1">
                        <span className="text-[11px] font-extrabold text-[#16ADBA] uppercase tracking-wider">
                          Placed At
                        </span>
                        <span className="inline-block bg-slate-50 border border-slate-200 text-navy-900 font-extrabold text-xs px-4 py-1.5 rounded-full shadow-sm group-hover:border-teal-400 transition-colors">
                          {c.company}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. PREVIOUS YEAR PLACEMENTS                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-white border-t border-b border-slate-200/60">
        <div className="container-max px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Previous Year Placements
            </h2>
            <p className="text-navy-900/60 text-sm font-medium">Proven track record across recent academic years.</p>
            <div className="h-1 w-20 bg-[#16ADBA] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { year: "2024", placed: "5,200+ PLACED", rate: "98% Success Rate" },
              { year: "2023", placed: "4,800+ PLACED", rate: "97% Success Rate" },
              { year: "2022", placed: "4,100+ PLACED", rate: "96% Success Rate" }
            ].map((y, i) => (
              <RevealOnScroll key={y.year} delay={i * 0.1}>
                <div className="bg-slate-50 rounded-3xl p-8 shadow-xl border border-slate-200/80 hover:shadow-2xl hover:border-teal-400/40 hover:-translate-y-1 transition-all text-center space-y-3">
                  <div className="text-4xl font-black text-navy-900">{y.year}</div>
                  <div className="text-xs font-extrabold text-[#16ADBA] tracking-widest uppercase">{y.placed}</div>
                  <div className="text-[11px] font-bold text-slate-500">{y.rate}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. WHERE DO OUR STUDENTS WORK? (HIRING PARTNERS)                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20">
        <div className="container-max px-6 sm:px-10 lg:px-16 text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Where Do Our Students Work?
            </h2>
            <p className="text-navy-900/60 text-sm font-medium">Direct hiring corporate connections with premier healthcare MNCs & RCM firms.</p>
            <div className="h-1 w-20 bg-[#16ADBA] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {hiringCompanies.map((comp, i) => (
              <RevealOnScroll key={comp.name} delay={(i % 6) * 0.05}>
                <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 flex flex-col items-center justify-center text-center gap-1 hover:shadow-xl hover:border-teal-400/40 hover:-translate-y-1 transition-all h-24">
                  <span className="font-extrabold text-navy-900 text-sm">{comp.name}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{comp.category}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. JOIN OUR MEDICAL CODING TRAINING FORM                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <div className="container-max px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-teal-500/10 rounded-3xl border border-amber-200/60 overflow-hidden shadow-2xl grid lg:grid-cols-12 gap-0">
            
            {/* Form Left Side */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="space-y-2 border-b border-amber-200/40 pb-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
                  Join our Medical Coding Training
                </h2>
                <p className="text-xs font-extrabold text-amber-700 tracking-widest uppercase">
                  WITH 100% PLACEMENT SUPPORT AND CERTIFICATION GUARANTEE.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 size={40} className="text-[#16ADBA] mx-auto" />
                  <h3 className="text-xl font-extrabold text-navy-900">Thank You for Enrolling!</h3>
                  <p className="text-navy-900/70 text-sm">
                    Our placement counsellor will call you shortly with course details and batch timings.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full bg-white border border-amber-200/80 rounded-2xl px-4 py-3.5 text-sm text-navy-900 placeholder:text-navy-900/40 focus:border-[#16ADBA] outline-none shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter valid mobile number"
                      className="w-full bg-white border border-amber-200/80 rounded-2xl px-4 py-3.5 text-sm text-navy-900 placeholder:text-navy-900/40 focus:border-[#16ADBA] outline-none shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter Your Email Id"
                      className="w-full bg-white border border-amber-200/80 rounded-2xl px-4 py-3.5 text-sm text-navy-900 placeholder:text-navy-900/40 focus:border-[#16ADBA] outline-none shadow-sm transition-all"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Select Course</label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full bg-white border border-amber-200/80 rounded-2xl px-4 py-3.5 text-sm text-navy-900 focus:border-[#16ADBA] outline-none shadow-sm transition-all cursor-pointer"
                      >
                        <option value="cpc-certification">CPC Certification</option>
                        <option value="ccs-certification">CCS Certification</option>
                        <option value="hcc-risk-adjustment">HCC Risk Adjustment</option>
                        <option value="medical-billing-denial-management">Medical Billing</option>
                        <option value="medical-coding-foundation">Foundation Program</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Select Branch</label>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full bg-white border border-amber-200/80 rounded-2xl px-4 py-3.5 text-sm text-navy-900 focus:border-[#16ADBA] outline-none shadow-sm transition-all cursor-pointer"
                      >
                        <option value="gandhipuram-coimbatore">Gandhipuram, Coimbatore</option>
                        <option value="hope-college-coimbatore">Hope College, Coimbatore</option>
                        <option value="saravanampatti-coimbatore">Saravanampatti, Coimbatore</option>
                        <option value="ameerpet-hyderabad">Ameerpet, Hyderabad</option>
                        <option value="dilsukhnagar-hyderabad">Dilsukhnagar, Hyderabad</option>
                        <option value="trichy">Trichy</option>
                        <option value="salem">Salem</option>
                        <option value="kochi">Kochi</option>
                        <option value="trivandrum">Trivandrum</option>
                        <option value="vizag">Vizag</option>
                        <option value="tirupathi">Tirupathi</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#16ADBA] hover:bg-teal-600 text-white font-extrabold px-9 py-4 rounded-2xl shadow-xl shadow-teal-500/25 transition-all cursor-pointer inline-flex items-center justify-center gap-2 text-base mt-2"
                  >
                    <Send size={18} />
                    <span>Submit Now</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Side Photo */}
            <div className="lg:col-span-5 relative bg-slate-900 min-h-[360px]">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Medical Coder Training"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
