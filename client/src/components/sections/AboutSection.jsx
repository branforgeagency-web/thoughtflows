import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Target, Eye, Award, Lightbulb, HeartHandshake, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import RevealOnScroll from "../RevealOnScroll";
import StatsCounter from "../StatsCounter";
import useFetch from "../../hooks/useFetch";

const fallbackStats = [
  { label: "Students Placed", value: "5000+" },
  { label: "Hiring Partners", value: "500+" },
  { label: "Branches Pan-India", value: "15" },
  { label: "Placement Rate", value: "95%" },
  { label: "Expert Trainers", value: "50+" },
  { label: "Years of Excellence", value: "10+" }
];

const foundingFacts = [
  { label: "Founded", value: "2016" },
  { label: "Branches Nationwide", value: "12" },
  { label: "Coders Trained", value: "35,000+" }
];

const founders = [
  {
    name: "Mr. BalaMurali",
    role: "Founder & MD",
    image: "/founders/balamurali.jpg",
    bio: "Visionary leader driving Thoughtflows' strategic expansion, institutional partnerships, and medical coding excellence nationwide since 2016."
  },
  {
    name: "Ms. Banumathy",
    role: "Founder & CEO",
    image: "/founders/banumathy.png",
    bio: "Pioneer in healthcare education and student mentorship, empowering over 35,000+ coders toward AAPC & AHIMA certification success."
  }
];

const corePrinciples = [
  { icon: Award, label: "Quality in Training" },
  { icon: Lightbulb, label: "Innovation in Methodologies" },
  { icon: HeartHandshake, label: "Building Trust in Trainees" },
  { icon: Trophy, label: "Giving 100% Result" }
];

// Playful Brush Stroke / Scribble Underline SVG using existing Teal brand color
function ScribbleUnderline() {
  return (
    <motion.svg
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="w-48 sm:w-64 h-4 text-teal-500 mx-auto mt-2"
      viewBox="0 0 250 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 14C35 4 85 17 125 7C165 -3 215 15 247 9"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M12 17C48 9 98 18 138 11C178 4 220 16 240 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </motion.svg>
  );
}

// Doodle Starburst SVG (Top-Left Accent)
function StarburstDoodle({ className = "w-10 h-10 text-teal-600" }) {
  return (
    <motion.svg
      animate={{ rotate: [0, 15, -15, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="20" y1="2" x2="20" y2="38" />
      <line x1="2" y1="20" x2="38" y2="20" />
      <line x1="7" y1="7" x2="33" y2="33" />
      <line x1="7" y1="33" x2="33" y2="7" />
    </motion.svg>
  );
}

// Doodle Loopy Scribble SVG (Bottom-Right Accent)
function LoopDoodle({ className = "w-24 h-12 text-navy-900" }) {
  return (
    <motion.svg
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={className}
      viewBox="0 0 100 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M5 25 Q20 5 30 25 T50 25 T70 25 T95 25" />
      <path d="M15 20 Q25 40 35 20 T55 20 T75 20" />
    </motion.svg>
  );
}

// Polygon / Hexagon Styled Image Frame with Soft Backdrop & Accents
function PolyFramedImage({ image, alt, alignRight = true }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: alignRight ? 1 : -1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative w-full max-w-md mx-auto py-6 group cursor-pointer"
    >
      {/* Soft Backdrop Container */}
      <div className="absolute inset-0 bg-teal-500/15 rounded-[40px] transform rotate-3 scale-95 transition-transform group-hover:rotate-1 duration-500 blur-[1px]" />
      
      {/* Main Image Mask Frame */}
      <div
        className="relative z-10 w-full aspect-[4/3] sm:aspect-square overflow-hidden shadow-2xl border-4 border-white bg-slate-200 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(22,173,186,0.25)]"
        style={{
          clipPath: alignRight
            ? "polygon(12% 0%, 100% 8%, 88% 100%, 0% 92%)"
            : "polygon(0% 8%, 88% 0%, 100% 92%, 12% 100%)",
          borderRadius: "24px"
        }}
      >
        <img src={image} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>

      {/* Hand-drawn Doodle SVGs */}
      <div className="absolute -top-2 -left-2 z-20">
        <StarburstDoodle className="w-10 h-10 text-teal-600" />
      </div>
      <div className="absolute top-2 -right-2 z-20 w-5 h-5 border-2 border-teal-500 rotate-12" />
      <div className="absolute -bottom-4 -right-4 z-20">
        <LoopDoodle className="w-20 h-10 text-navy-800/80" />
      </div>
    </motion.div>
  );
}

function VisionMissionSection() {
  const [activeTab, setActiveTab] = useState(null); // 'vision' | 'mission' | 'facilities' | null

  const cards = [
    {
      id: "vision",
      title: "Vision",
      summary:
        "To be Asia's top institution in medical coding, empowering individuals to excel and enhance healthcare through accuracy and innovation."
    },
    {
      id: "mission",
      title: "Mission",
      summary:
        "To deliver top-tier medical coding education that equips individuals with the skills to succeed in healthcare."
    },
    {
      id: "facilities",
      title: "Our Facilities",
      summary:
        "We provide modern classrooms, online learning tools, and hands-on training, along with mentorship and career support to ensure student success."
    }
  ];

  return (
    <section id="vision-mission" className="scroll-mt-28 my-4">
      {/* 3 Top Teal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => {
          const isSelected = activeTab === card.id;
          return (
            <motion.div
              key={card.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`bg-gradient-to-br from-[#16ADBA] to-[#0f8792] text-white p-7 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                isSelected ? "ring-4 ring-teal-300 shadow-2xl scale-[1.02]" : ""
              }`}
            >
              {/* Subtle glass reflection overlay */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight">{card.title}</h3>
                <p className="text-white/95 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {card.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab(isSelected ? null : card.id)}
                className="w-full py-3.5 px-6 rounded-full bg-white text-[#16ADBA] font-extrabold hover:bg-teal-50 transition-all shadow-md hover:shadow-lg cursor-pointer text-center text-sm sm:text-base transform active:scale-95"
              >
                {isSelected ? "Hide Details" : "Read More"}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Details Drawer */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="bg-[#EEECFF] text-navy-900 rounded-3xl p-8 sm:p-12 shadow-inner border border-purple-200/80 relative">
              {activeTab === "vision" && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center">
                    <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Vision</h3>
                    <div className="h-1 w-24 bg-[#16ADBA] mx-auto mt-2 rounded-full" />
                  </div>
                  <p className="text-navy-900/85 text-base sm:text-lg leading-relaxed text-justify sm:text-center font-normal">
                    To be Asia's leading institution in medical coding education, transforming the future of healthcare by empowering individuals with the knowledge, skills, and certifications needed to excel. We aim to cultivate a community of highly skilled, sought-after medical coders who play a pivotal role in ensuring the accuracy, efficiency, and innovation of healthcare systems, ultimately contributing to improved patient care and streamlined processes across the globe.
                  </p>
                </div>
              )}

              {activeTab === "mission" && (
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Mission</h3>
                    <div className="h-1 w-24 bg-[#16ADBA] mx-auto mt-2 rounded-full" />
                  </div>
                  <div className="space-y-4 text-navy-900/85 text-sm sm:text-base leading-relaxed font-normal">
                    <p>
                      <strong className="font-bold text-navy-900">Provide Expert Medical Coding Training:</strong> We deliver comprehensive, industry-focused training programs designed to equip individuals with the critical skills and knowledge needed for success in medical coding.
                    </p>
                    <p>
                      <strong className="font-bold text-navy-900">Promote Career Development:</strong> We foster a learning environment that nurtures both personal and professional growth, empowering students to advance their careers in the healthcare industry.
                    </p>
                    <p>
                      <strong className="font-bold text-navy-900">Bridge Education and Employment:</strong> Through strategic collaborations with healthcare organizations, we provide job placement opportunities and Internships, ensuring seamless transitions from education to employment.
                    </p>
                    <p>
                      <strong className="font-bold text-navy-900">Incorporate Innovation and Industry Best Practices:</strong> We continuously update our curriculum to reflect the latest coding techniques, technological advancements, and best practices, keeping our students ahead in the rapidly evolving medical coding field.
                    </p>
                    <p>
                      <strong className="font-bold text-navy-900">Uphold Ethical Medical Coding Standards:</strong> We emphasize the importance of ethical coding, accuracy, and compliance, ensuring our graduates are equipped to maintain integrity in their coding practices.
                    </p>
                    <p>
                      <strong className="font-bold text-navy-900">Foster a Collaborative Community:</strong> We create a supportive community through mentorship, networking, and continuous professional development, helping our students build valuable connections and resources.
                    </p>
                    <p>
                      <strong className="font-bold text-navy-900">Enhance Healthcare Outcomes:</strong> We are committed to improving healthcare efficiency and quality by producing highly skilled medical coders who play a vital role in the healthcare system's accuracy and effectiveness.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "facilities" && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Facilities</h3>
                    <div className="h-1 w-24 bg-[#16ADBA] mx-auto mt-2 rounded-full" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 text-navy-900/90 font-medium text-base sm:text-lg">
                    <div className="space-y-3">
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" /> Best training methodology and curriculum.</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" /> Expert Faculty.</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" /> 100% Placement assurance</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" /> Fully air conditioned institute</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" /> Well equipped classrooms</p>
                    </div>
                    <div className="space-y-3">
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" /> Modern Infrastructure</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" /> PPT oriented classes</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" /> Interactive sessions</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" /> Live chart training</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" /> Affordable training fee</p>
                    </div>
                  </div>
                  <p className="text-center font-bold text-navy-900 text-lg sm:text-xl pt-6 border-t border-purple-200/80">
                    Welcome to Thought Flows Medical Academy, where your aspirations become a reality!
                  </p>
                </div>
              )}

              {/* Red Close Button */}
              <div className="text-center mt-10">
                <button
                  type="button"
                  onClick={() => setActiveTab(null)}
                  className="bg-[#FF0000] hover:bg-red-700 text-white font-extrabold px-12 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer text-base transform active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function AboutHeroHeader() {
  return (
    <section className="relative bg-[#F8FCFD] text-[#063B7A] py-20 lg:py-28 overflow-hidden">
      {/* Background Medical Image & Ambient Gradients */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80"
          alt="Medical Coding & Healthcare Training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FCFD] via-[#F8FCFD]/80 to-transparent" />
      </div>

      <div className="container-max px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text & CTA Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#E7F9FB] text-[#12BFD1] font-extrabold text-xs md:text-sm uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#12BFD1]/30 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#12BFD1] animate-pulse" />
              <span>About Us</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#063B7A] leading-tight font-display"
            >
              Where Healthcare Knowledge Meets <span className="text-[#12BFD1] underline decoration-[#12BFD1]/40 underline-offset-8">Career Success</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#6B7C8F] text-base md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              From classroom training to hospital chart practice, our students enjoy interactive, hands-on lessons and are empowered to excel in AAPC &amp; AHIMA medical coding certifications.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#preparing-success"
                className="inline-flex items-center gap-2.5 bg-[#063B7A] hover:bg-[#0B4F9C] text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-base"
              >
                <span>See More</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="/courses"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E7F9FB] text-[#063B7A] font-extrabold px-7 py-3.5 rounded-full border border-[#12BFD1]/30 transition-all duration-300 transform hover:-translate-y-1 text-base shadow-sm"
              >
                <span>Explore Programs</span>
              </a>
            </motion.div>

            {/* Floating Quick Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-left"
            >
              {[
                { label: "Coders Trained", value: "35,000+" },
                { label: "Branches Nationwide", value: "12+" },
                { label: "Placement Rate", value: "95%" }
              ].map((badge) => (
                <div key={badge.label} className="bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-extrabold text-teal-400">{badge.value}</div>
                  <div className="text-[10px] sm:text-xs text-slate-300 font-medium uppercase tracking-wider mt-0.5">{badge.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 rounded-[40px] bg-[#12BFD1]/20 blur-3xl pointer-events-none" />

            {/* Main Visual Showcase Image */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Healthcare Students Learning"
                className="w-full h-[340px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            </div>

            {/* Floating Glassmorphism Badge 1 (Top Left) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 z-20 bg-white/95 backdrop-blur-md text-navy-900 p-4 rounded-2xl shadow-xl border border-white/40 hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-600 flex items-center justify-center font-bold">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-navy-900">AAPC & AHIMA</p>
                <p className="text-[10px] text-navy-900/60 font-semibold uppercase">Certified Training</p>
              </div>
            </motion.div>

            {/* Floating Glassmorphism Badge 2 (Bottom Right) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 z-20 bg-white/95 backdrop-blur-md text-navy-900 p-4 rounded-2xl shadow-xl border border-white/40 hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold shadow-md">
                <Trophy size={20} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-navy-900">100% Placement</p>
                <p className="text-[10px] text-navy-900/60 font-semibold uppercase">Career Support</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function WhoWeAreAndEmpowerSection() {
  return (
    <div className="bg-[#FAF8F5] text-navy-900 overflow-hidden">
      {/* Main Section Header */}
      <section id="preparing-success" className="pt-20 pb-6 scroll-mt-28 text-center border-t border-slate-200/60">
        <div className="container-max px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Preparing Students to Achieve Success
          </h2>
          <ScribbleUnderline />
        </div>
      </section>

      {/* Who We Are & We Empower Feature Blocks */}
      <section id="who-we-are" className="py-12 scroll-mt-28">
        <div className="container-max px-6 space-y-24">
          
          {/* Item 1: Who We Are */}
          <RevealOnScroll>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-block">
                  <h3 className="text-2xl sm:text-4xl font-bold text-navy-900">
                    Developing Confident and Successful Learners
                  </h3>
                  <div className="h-1 w-24 bg-teal-500 rounded-full mt-2" />
                </div>
                <p className="text-navy-900/70 text-base md:text-lg leading-relaxed">
                  Founded in 2016 by Mr. Balamurali and Ms. Banumathy, Thoughtflows is the result of the vision and dedication of two enterprising individuals. Recognizing the growing demand for skilled professionals in medical coding, we established an academy providing exceptional training to individuals seeking to excel in healthcare.
                </p>
                <p className="text-navy-900/70 text-base md:text-lg leading-relaxed">
                  From humble beginnings with one branch and a single trainee, Thoughtflows now operates twelve branches across India. With a proven track record, we have trained over 35,000+ individuals, empowering them with the skills required to thrive.
                </p>
                
                {/* Founding stats badges */}
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-200">
                  {foundingFacts.map((fact) => (
                    <motion.div
                      key={fact.label}
                      whileHover={{ scale: 1.05 }}
                      className="p-3 bg-white rounded-xl shadow-sm border border-slate-100/80 transition-shadow hover:shadow-md"
                    >
                      <div className="text-2xl md:text-3xl font-extrabold text-teal-600">{fact.value}</div>
                      <div className="text-xs text-navy-900/60 uppercase font-semibold mt-0.5">{fact.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <a
                    href="#we-empower"
                    className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all group"
                  >
                    <span>View More</span>
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={14} />
                    </span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <PolyFramedImage
                  image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Confident Learners"
                  alignRight={true}
                />
              </div>
            </div>
          </RevealOnScroll>

          {/* Founders Block inside Who We Are */}
          <RevealOnScroll>
            <div className="pt-6 border-t border-slate-200/80">
              <div className="text-center mb-10">
                <h4 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
                  Leadership & Founders
                </h4>
                <div className="h-1 w-20 bg-teal-500 mx-auto mt-2 rounded-full" />
              </div>

              {/* 2 Founders Cards Grid */}
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {founders.map((person) => (
                  <motion.div
                    key={person.name}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 250, damping: 20 }}
                    className="group bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col items-center text-center hover:shadow-2xl hover:border-teal-300/40 transition-all duration-300"
                  >
                    {/* Image Box with Angled Teal Ribbon Banner */}
                    <div className="relative rounded-2xl overflow-hidden shadow-md mb-5 w-full h-64 sm:h-72 bg-slate-100">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
                      />

                      {/* Angled Banner Ribbon for Founder Name */}
                      <div className="absolute bottom-0 inset-x-0 bg-teal-500 text-white py-2.5 px-4 transform -skew-y-2 translate-y-2 shadow-md">
                        <h5 className="font-extrabold text-base sm:text-lg tracking-wide uppercase leading-tight transform skew-y-2">
                          {person.name}
                        </h5>
                      </div>
                    </div>

                    {/* Role & Bio */}
                    <span className="inline-block bg-teal-50 text-teal-700 text-xs font-extrabold uppercase tracking-wider px-4 py-1 rounded-full mb-3 border border-teal-200/50">
                      {person.role}
                    </span>
                    <p className="text-navy-900/70 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
                      {person.bio}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Item 2: We Empower */}
          <RevealOnScroll>
            <div id="we-empower" className="grid lg:grid-cols-12 gap-12 items-center scroll-mt-28">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <PolyFramedImage
                  image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                  alt="Classroom Experience"
                  alignRight={false}
                />
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="inline-block">
                  <h3 className="text-2xl sm:text-4xl font-bold text-navy-900">
                    Enjoy Learning with a Unique Classroom Experience
                  </h3>
                  <div className="h-1 w-24 bg-teal-500 rounded-full mt-2" />
                </div>
                <p className="text-navy-900/70 text-base md:text-lg leading-relaxed">
                  Thoughtflows Medical Coding Academy is dedicated to empowering individuals at all stages of their coding careers. Whether you are a novice starting out or a seasoned professional enhancing your skills, we provide tailored programs to suit your specific goals.
                </p>
                <p className="text-navy-900/70 text-base md:text-lg leading-relaxed">
                  Our comprehensive training, practical hospital chart practice, and dedicated placement cell equip students with real-world expertise and opportunities to secure top healthcare roles nationwide.
                </p>

                {/* Core principles icons grid */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {corePrinciples.map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-slate-100/90 transition-shadow hover:shadow-md"
                    >
                      <span className="w-10 h-10 shrink-0 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                        <item.icon size={20} />
                      </span>
                      <span className="text-navy-900 font-semibold text-sm">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <a
                    href="#our-motto"
                    className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all group"
                  >
                    <span>View More</span>
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={14} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </section>
    </div>
  );
}

export function VisionMissionSectionStandalone() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Vision, Mission & Facilities Section */}
      <section className="py-16 sm:py-20">
        <div className="container-max px-6">
          <RevealOnScroll>
            <VisionMissionSection />
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-14 bg-white border-y border-slate-200/80">
        <div className="container-max px-6">
          <StatsCounter stats={fallbackStats} />
        </div>
      </section>
    </div>
  );
}

export default function AboutSection() {
  return (
    <>
      <WhoWeAreAndEmpowerSection />
      <VisionMissionSectionStandalone />
    </>
  );
}
