import { Link } from "react-router-dom";
import { programsData } from "../sections/CoursesPreview";
import { Chapter, ChapterHeader, Accent, Reveal, GhostButton, ArrowButton, useCarousel, trackClass, photoShadow, Arrow } from "./cinematic";

/** Chapter 03 — programs (same course data as CoursesPreview). */
export default function HomePrograms() {
  const [track, scroll] = useCarousel();

  return (
    <Chapter id="programs" labelledBy="programs-heading" glow="right">
      <ChapterHeader
        chapter={3}
        eyebrow="Choose Your Path"
        headingId="programs-heading"
        title={
          <>
            Your path to success in <Accent>medical coding</Accent>
          </>
        }
        lead="Certification and specialty programs, available online and in classroom batches."
        aside={
          <div className="flex items-center gap-3">
            <ArrowButton dir={-1} label="Previous programs" onClick={() => scroll(-1)} />
            <ArrowButton dir={1} label="Next programs" onClick={() => scroll(1)} />
          </div>
        }
      />

      <ul ref={track} className={`mt-8 ${trackClass}`}>
        {programsData.map((p, i) => (
          <Reveal as="li" key={p.id} delay={Math.min(i, 4) * 90} y={40} className="w-[78vw] max-w-[320px] shrink-0 snap-start sm:w-[300px]">
            <Link
              to={`/courses/${p.slug}`}
              className={`group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-[#063B7A] p-6 ${photoShadow} transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-2 hover:shadow-[0_34px_70px_-28px_rgba(6,59,122,0.6)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#12BFD1]/60`}
            >
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,33,63,0)_0%,rgba(6,33,63,0.3)_45%,rgba(6,33,63,0.92)_100%)]" />
              <div className="absolute inset-x-6 top-6 flex items-center justify-between">
                <span className="rounded-full bg-white px-3 py-1 font-display text-[11px] font-bold tracking-[0.2em] text-[#063B7A] shadow-sm">{p.tag}</span>
                <span className="rounded-full bg-white/90 px-3 py-1 font-display text-xs font-semibold text-[#063B7A] shadow-sm">{p.duration}</span>
              </div>
              <div className="relative">
                <h3 className="font-display text-xl font-extrabold uppercase leading-tight !text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-white/80">{p.methodDetails}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold text-white">
                  View program <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <GhostButton to="/courses">View all courses</GhostButton>
      </Reveal>
    </Chapter>
  );
}
