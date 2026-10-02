import { Link } from "react-router-dom";
import RevealOnScroll from "../RevealOnScroll";

export default function CTASection() {
  return (
    <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
      <div className="container-max px-6 sm:px-8 lg:px-12 relative z-10">
        <RevealOnScroll>
          {/* Simple Sleek Horizontal Banner Strip matching user reference screenshot */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#063B7A] via-[#084893] to-[#12BFD1] px-6 sm:px-10 lg:px-14 py-8 sm:py-10 lg:py-12 shadow-xl shadow-[#063B7A]/20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left border border-white/10">
            
            {/* Diagonal Dark Color Overlay (matching reference screenshot) */}
            <div className="absolute top-0 right-0 bottom-0 w-full md:w-3/5 bg-gradient-to-l from-[#041E3F]/70 via-[#063B7A]/40 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#12BFD1]/30 blur-[90px] rounded-full pointer-events-none" />

            {/* Left / Center-Left Text Content */}
            <div className="relative z-10 space-y-1">
              <div className="text-white/90 text-lg sm:text-xl font-medium tracking-wide font-display">
                Sign Up For a
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
                Free Trial Lesson by Zoom
              </h2>
            </div>

            {/* Right Action Button */}
            <div className="relative z-10 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#12BFD1] hover:bg-white text-white hover:text-[#063B7A] font-black text-base sm:text-lg transition-all duration-300 shadow-lg shadow-[#12BFD1]/30 hover:shadow-2xl border-2 border-white/90"
              >
                Register Now
              </Link>
            </div>

          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}



