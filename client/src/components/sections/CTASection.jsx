import { Link } from "react-router-dom";
import { ArrowRight, Video, CheckCircle2, PhoneCall, Sparkles, Users, Calendar } from "lucide-react";
import MagneticButton from "../MagneticButton";
import RevealOnScroll from "../RevealOnScroll";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container-max px-6 sm:px-10 lg:px-16">
        <RevealOnScroll>
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-navy-950 via-[#072432] to-navy-900 p-8 sm:p-12 md:p-16 lg:p-20 text-white shadow-2xl border border-teal-400/20">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

            {/* Subtle Grid Lines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Content Column */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-teal-400/10 border border-teal-400/30 text-teal-300 font-extrabold text-xs uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
                  </span>
                  <span>FREE LIVE ZOOM TRIAL CLASS</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.15] text-white tracking-tight">
                  Experience Our Live Class <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-teal-400 bg-clip-text text-transparent">
                    Before You Enroll
                  </span>
                </h2>

                <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
                  Join 35,000+ certified coders who trained with Thoughtflows and built rewarding careers in healthcare RCM. Attend a live trial lesson hosted by AAPC-certified master faculty — 100% free with no obligation.
                </p>

                {/* Feature Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Live Interactive Q&A",
                    "AAPC & AHIMA Certified Faculty",
                    "Real Hospital Chart Case Studies",
                    "100% Placement Support"
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-sm font-semibold text-teal-100/90">
                      <CheckCircle2 size={18} className="text-teal-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <MagneticButton as={Link} to="/contact" className="!py-4 !px-8 text-base font-extrabold shadow-lg shadow-teal-500/25">
                    Register For Free Trial <ArrowRight size={18} />
                  </MagneticButton>

                  <a
                    href="tel:+919176443331"
                    className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm px-6 py-4 rounded-full border border-white/20 backdrop-blur-md transition-all duration-300"
                  >
                    <PhoneCall size={16} className="text-teal-400" />
                    <span>+91 91764 43331</span>
                  </a>
                </div>
              </div>

              {/* Right Visual Card Column */}
              <div className="lg:col-span-5 relative">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                        <Video size={20} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white text-base">Next Trial Session</h4>
                        <p className="text-xs text-teal-300/80 font-medium">Online Zoom Classroom</p>
                      </div>
                    </div>
                    <span className="bg-teal-500/20 text-teal-300 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-teal-400/30">
                      FREE DEMO
                    </span>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-3 text-sm text-white/90 font-medium">
                      <Calendar size={16} className="text-teal-400 shrink-0" />
                      <span>Daily Batches (10:00 AM & 6:00 PM)</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-white/90 font-medium">
                      <Users size={16} className="text-teal-400 shrink-0" />
                      <span>Limited Seats Per Live Demo</span>
                    </div>
                  </div>

                  {/* Highlights Box */}
                  <div className="bg-navy-950/60 rounded-2xl p-4 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <Sparkles size={14} />
                      <span>What You'll Learn in Demo:</span>
                    </div>
                    <ul className="text-xs text-white/70 space-y-1.5 list-disc list-inside">
                      <li>Medical coding career roadmap & salaries</li>
                      <li>Live CPT & ICD-10 chart coding demo</li>
                      <li>AAPC certification exam strategy</li>
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className="w-full bg-[#16ADBA] hover:bg-teal-500 text-navy-950 font-black py-3.5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-teal-500/30"
                  >
                    <span>Reserve Your Seat Now</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
