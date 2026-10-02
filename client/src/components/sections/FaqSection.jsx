import { useState } from "react";
import { Sparkles } from "lucide-react";
import FaqAccordion from "../FaqAccordion";
import RevealOnScroll from "../RevealOnScroll";

/**
 * Modern Clean FAQ Section
 */
export default function FaqSection({
  id = "faq-section",
  eyebrow = "GOT QUESTIONS?",
  title = "Frequently Asked Questions",
  subtitle = "Find quick answers to common questions about our medical coding programs, certifications, placements, and campus centers.",
  items = [],
  className = ""
}) {
  const [activeCategory] = useState("All");

  if (!items || items.length === 0) return null;

  // Filter items if they have category tags or show all
  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory || true);

  return (
    <section id={id} className={`py-16 md:py-24 bg-gradient-to-b from-[#F8FCFD] via-white to-[#F8FCFD] relative overflow-hidden ${className}`}>
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#12BFD1]/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#063B7A]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container-max px-6 sm:px-8 lg:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12BFD1]/10 text-[#063B7A] text-xs font-extrabold tracking-widest uppercase font-display border border-[#12BFD1]/30">
            <Sparkles size={13} className="text-[#12BFD1]" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#063B7A] tracking-tight leading-tight font-display">
            {title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>

        {/* Centered Single Column FAQ Accordion */}
        <div className="max-w-4xl mx-auto w-full">
          <RevealOnScroll>
            <FaqAccordion items={filteredItems} />
          </RevealOnScroll>
        </div>

      </div>
    </section>
  );
}

