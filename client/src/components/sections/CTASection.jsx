import { Link } from "react-router-dom";
import { ArrowRight, Video } from "lucide-react";
import MagneticButton from "../MagneticButton";
import RevealOnScroll from "../RevealOnScroll";

export default function CTASection() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">
      <div className="container-max">
        <RevealOnScroll>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-800 via-ink-900 to-teal-900 p-12 md:p-20 text-center border border-teal-400/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-500/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative flex flex-col items-center gap-6 max-w-2xl mx-auto">
              <span className="h-12 w-12 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <Video size={20} />
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Sign Up For a Free Trial Lesson by Zoom
              </h2>
              <p className="text-white/60 text-base md:text-lg">
                Join 35,000+ certified coders who trained with Thoughtflows and built careers in the healthcare industry's fastest-growing field. See a live class before you enroll — no cost, no obligation.
              </p>
              <MagneticButton as={Link} to="/contact" className="mt-2">
                Register Now <ArrowRight size={18} />
              </MagneticButton>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
