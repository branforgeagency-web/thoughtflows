import RevealOnScroll from "./RevealOnScroll";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <RevealOnScroll>
      <div className={`flex flex-col gap-4 max-w-3xl ${alignment} mb-10 md:mb-12`}>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-teal-600 text-xs md:text-sm font-semibold uppercase">
            <span className="h-px w-8 bg-teal-400" />
            <span className="tracking-[0.2em] mr-[-0.2em]">{eyebrow}</span>
            <span className="h-px w-8 bg-teal-400" />
          </span>
        )}
        <h2 className="text-3xl md:text-5xl font-bold text-navy-900 leading-tight">{title}</h2>
        {subtitle && <p className="text-navy-900/60 text-base md:text-lg leading-relaxed">{subtitle}</p>}
      </div>
    </RevealOnScroll>
  );
}
