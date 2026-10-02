import RevealOnScroll from "./RevealOnScroll";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <RevealOnScroll>
      <div className={`flex flex-col gap-3.5 max-w-3xl ${alignment} mb-12 md:mb-16`}>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-[#12BFD1] text-xs md:text-sm font-extrabold uppercase tracking-widest">
            <span className="h-px w-8 bg-[#12BFD1]" />
            <span>{eyebrow}</span>
            {align === "center" && <span className="h-px w-8 bg-[#12BFD1]" />}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#063B7A] leading-[1.18] tracking-tight font-display">
          {title}
        </h2>
        {subtitle && <p className="text-[#6B7C8F] text-base md:text-lg leading-relaxed font-normal">{subtitle}</p>}
      </div>
    </RevealOnScroll>
  );
}

