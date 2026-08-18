import SectionHeading from "../SectionHeading";
import FaqAccordion from "../FaqAccordion";
import RevealOnScroll from "../RevealOnScroll";

/**
 * Reusable FAQ Section for landing pages.
 */
export default function FaqSection({
  id = "faq-section",
  eyebrow = "GOT QUESTIONS?",
  title = "Frequently Asked Questions",
  subtitle = "Find quick answers to common questions about our medical coding programs, certifications, placements, and campus centers.",
  items = [],
  className = ""
}) {
  if (!items || items.length === 0) return null;

  return (
    <section id={id} className={`py-16 md:py-24 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 relative overflow-hidden ${className}`}>
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-max px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto relative z-10 space-y-8 md:space-y-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
        />

        <RevealOnScroll delay={0.1}>
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/80">
            <FaqAccordion items={items} />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
