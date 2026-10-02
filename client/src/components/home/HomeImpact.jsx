import { Chapter, ChapterHeader, Accent, Reveal, Parallax, CountUp, card, photoShadow } from "./cinematic";

const STATS = [
  { value: "35,000+", label: "Students trained" },
  { value: "95%", label: "Placement rate" },
  { value: "15", label: "Branches pan-India" },
  { value: "49+", label: "Certification modules" },
];

/** Chapter 04 — academy numbers (same figures as the original ImpactStats). */
export default function HomeImpact() {
  return (
    <Chapter id="impact" labelledBy="impact-heading" glow="left">
      <ChapterHeader
        chapter={4}
        eyebrow="Proof in Numbers"
        headingId="impact-heading"
        title={
          <>
            Build your future in <Accent>medical coding</Accent>
          </>
        }
        lead="Industry-oriented training, AAPC & AHIMA certification programs, real-time practice, and dedicated placement support to launch a successful healthcare career."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <Reveal delay={100} y={48} className="lg:col-span-5">
          <div className={`relative h-full min-h-[280px] overflow-hidden rounded-3xl bg-[#063B7A] ${photoShadow}`}>
            <Parallax strength={30} className="absolute -inset-y-10 inset-x-0">
              <img src="/placements-horizontal.jpg" alt="Thoughtflows students celebrating placements" loading="lazy" className="h-full w-full object-cover" />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-[#06213F]/85 via-[#06213F]/10 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-display text-lg font-extrabold leading-snug text-white sm:text-xl">
              Every number is a learner who took the first step.
            </p>
          </div>
        </Reveal>

        <dl className="grid grid-cols-2 gap-6 lg:col-span-7">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={160 + i * 110} y={36} className={`${card} flex flex-col justify-between p-7 sm:p-9`}>
              <dt className="order-2 mt-4 font-display text-[11px] font-bold uppercase tracking-[0.26em] text-[#6B7C8F] sm:text-xs">{s.label}</dt>
              <dd className="order-1 bg-gradient-to-br from-[#063B7A] to-[#12BFD1] bg-clip-text font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold leading-none tracking-[-0.02em] text-transparent">
                <CountUp value={s.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </Chapter>
  );
}
