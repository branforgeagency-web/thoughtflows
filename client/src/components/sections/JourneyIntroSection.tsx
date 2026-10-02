import * as React from "react";
import { Chapter, ChapterHeader, Accent, Reveal, card } from "../home/cinematic";

/**
 * Chapter 01 — the story begins right where the cinematic hero ends.
 */

interface Pillar {
  step: string;
  title: string;
  body: string;
}

export interface JourneyIntroSectionProps {
  id?: string;
  pillars?: Pillar[];
  className?: string;
}

const DEFAULT_PILLARS: Pillar[] = [
  {
    step: "01",
    title: "Learn from industry-focused trainers",
    body: "Build a strong foundation in anatomy, medical terminology and coding guidelines in a structured classroom setting.",
  },
  {
    step: "02",
    title: "Prepare for professional certifications",
    body: "Work through certification-oriented practice designed around CPC and other medical coding credentials.",
  },
  {
    step: "03",
    title: "Develop healthcare career skills",
    body: "Apply what you learn to real-world coding scenarios and get ready for your next step in the healthcare industry.",
  },
];

export default function JourneyIntroSection({ id = "journey", pillars = DEFAULT_PILLARS, className = "" }: JourneyIntroSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <div className="relative">
      {/* Soft hand-off from the dark hero into the light story */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#040F20] via-[#040F20]/30 to-transparent sm:h-20" />
      <Chapter id={id} labelledBy={headingId} glow="center" className={`!pt-20 sm:!pt-24 ${className}`}>
        <ChapterHeader
          chapter={1}
          eyebrow="The Journey Begins"
          headingId={headingId}
          title={
            <>
              Your journey into medical coding <Accent>starts here</Accent>
            </>
          }
          lead="Learn from industry-focused trainers, prepare for professional certifications, and develop the skills needed to build a career in the healthcare industry."
        />

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.step} delay={150 + i * 130} className="h-full">
              <div className={`${card} group relative h-full overflow-hidden p-8`}>
                <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E7F9FB] font-display text-sm font-extrabold text-[#0E8FA0] shadow-[inset_0_0_0_1px_rgba(18,191,209,0.25)]">
                  {p.step}
                </span>
                <h3 className="relative mt-6 font-display text-lg font-bold leading-snug !text-[#0A2540] sm:text-xl">{p.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-[#4A5D73] sm:text-[15px]">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Chapter>
    </div>
  );
}
