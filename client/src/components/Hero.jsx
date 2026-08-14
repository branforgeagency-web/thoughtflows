import { Link } from "react-router-dom";
import { Sparkles, Network, Award } from "lucide-react";
import HeroBackground from "./HeroBackground";
import RevealOnScroll from "./RevealOnScroll";
import MagneticButton from "./MagneticButton";

const usps = [
  { icon: Sparkles, label: "Get Personalized Learning Approach" },
  { icon: Network, label: "Robust Industry Connections for Placement" },
  { icon: Award, label: "9+ Years of Experience" }
];

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end">
      <HeroBackground />

      {/* <div className="relative container-max px-6 md:px-10 lg:px-20 pb-24 md:pb-28">
        <RevealOnScroll>
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tight leading-tight max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
            Welcome to
            <br />
            World Class Training in Medical Coding
          </h1>
          <p className="mt-5 text-white/80 text-base md:text-lg max-w-xl">
            India's No. 1 medical coding academy — hands-on training, expert faculty, and a placement cell that
            works until you're hired.
          </p>
          <div className="mt-8">
            <MagneticButton as={Link} to="/courses">
              Explore Courses
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div> */}

      <RevealOnScroll delay={0.15} className="relative border-t border-white/10 bg-navy-950/40 backdrop-blur-md">
        <div className="container-max px-6 md:px-10 lg:px-20 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {usps.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="h-9 w-9 shrink-0 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <item.icon size={16} />
              </span>
              <span className="text-white/90 text-xs md:text-sm font-medium leading-snug">{item.label}</span>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
