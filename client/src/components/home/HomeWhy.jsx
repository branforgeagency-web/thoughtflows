import { Link } from "react-router-dom";
import { whyChooseUsItems } from "../../config/whyChooseUsItems";
import { Chapter, ChapterHeader, Accent, Reveal, Parallax, CountUp, card, photoShadow } from "./cinematic";

const RESULTS = [
  { value: "30,000+", label: "Placements", img: "/placements-horizontal.jpg", to: "/placements" },
  { value: "35,000+", label: "Students trained", img: "/trained-horizontal.jpg", to: "/success-stories" },
];

/** Chapter 06 — why Thoughtflows + placements & results (same content as WhyChooseUs). */
export default function HomeWhy() {
  return (
    <Chapter id="why" labelledBy="why-heading" glow="left">
      <ChapterHeader
        chapter={6}
        eyebrow="Why Learners Choose Us"
        headingId="why-heading"
        title={
          <>
            Why choose <Accent>Thoughtflows?</Accent>
          </>
        }
        lead="Empowering healthcare coders with hands-on hospital chart practice, expert mentorship, and a 100% committed placement cell."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <ol className="space-y-5 lg:col-span-7">
          {whyChooseUsItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.id} delay={i * 90} y={28}>
                <Link to={item.link} className={`${card} group flex gap-5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BFD1] sm:p-7`}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E7F9FB] text-[#0E8FA0] shadow-[inset_0_0_0_1px_rgba(18,191,209,0.25)] transition-colors duration-500 group-hover:bg-[#063B7A] group-hover:text-white">
                    {Icon ? <Icon size={22} aria-hidden="true" /> : String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-lg font-bold leading-snug text-[#0A2540]">{item.title}</span>
                      <span className="font-display text-xs font-bold tracking-[0.2em] text-[#B5C4D3]">{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-[#4A5D73] sm:text-[15px]">{item.text}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ol>

        <div className="grid gap-6 sm:grid-cols-2 lg:sticky lg:top-28 lg:col-span-5 lg:grid-cols-1 lg:self-start">
          {RESULTS.map((r, i) => (
            <Reveal key={r.label} delay={150 + i * 130} y={40}>
              <Link
                to={r.to}
                className={`group relative flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-3xl bg-[#063B7A] p-7 ${photoShadow} transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-28px_rgba(6,59,122,0.6)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#12BFD1]/60`}
              >
                <Parallax strength={22} className="absolute -inset-y-8 inset-x-0">
                  <img src={r.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-t from-[#06213F]/95 via-[#06213F]/35 to-transparent" />
                <span className="relative font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-none text-white">
                  <CountUp value={r.value} />
                </span>
                <span className="relative mt-2 font-display text-[11px] font-bold uppercase tracking-[0.28em] text-[#7FE3EE]">{r.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
