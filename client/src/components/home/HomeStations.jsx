import { Link } from "react-router-dom";
import { BRANCHES } from "../../data/branches";
import { Chapter, ChapterHeader, Accent, Reveal, ArrowButton, useCarousel, trackClass, card } from "./cinematic";

/**
 * Chapter 05 — branches as stations on the line, continuing the hero's train
 * story. Data comes from data/branches.js (not hardcoded here).
 */
export default function HomeStations({ branches = BRANCHES }) {
  const [track, scroll] = useCarousel();

  return (
    <Chapter id="branches" labelledBy="branches-heading" glow="right">
      <ChapterHeader
        chapter={5}
        eyebrow="Find Your Station"
        headingId="branches-heading"
        title={
          <>
            Find your nearest <Accent>Thoughtflows academy</Accent>
          </>
        }
        lead="From flagship campuses to regional centers, every branch delivers the same industry-focused curriculum and placement support."
        aside={
          <div className="flex items-center gap-3">
            <ArrowButton dir={-1} label="Previous branches" onClick={() => scroll(-1)} />
            <ArrowButton dir={1} label="Next branches" onClick={() => scroll(1)} />
          </div>
        }
      />

      <ol ref={track} className={`mt-8 ${trackClass}`}>
        {branches.map((b, i) => (
          <Reveal as="li" key={b.slug || b.id || b.name} delay={Math.min(i, 5) * 80} y={40} className="w-[78vw] max-w-[300px] shrink-0 snap-start sm:w-[280px]">
            <article className={`${card} group flex h-full flex-col overflow-hidden`}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={b.heroImage || b.img}
                  alt={`${b.name} branch`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#063B7A] shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#12BFD1] shadow-[0_0_0_3px_rgba(18,191,209,0.25)]" aria-hidden="true" />
                  Station {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-extrabold uppercase !text-[#0A2540]">{b.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0E8FA0]">{b.city}</p>
                {b.address && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#6B7C8F]">{b.address}</p>}
                <div className="mt-auto flex items-center gap-5 pt-5 font-display text-sm font-bold">
                  <Link to={`/branches/${b.slug}`} className="text-[#063B7A] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BFD1]">
                    View branch
                  </Link>
                  {b.gmapUrl && (
                    <a
                      href={b.gmapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6B7C8F] underline-offset-4 hover:text-[#063B7A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BFD1]"
                    >
                      Directions ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        <li className="w-[60vw] max-w-[240px] shrink-0 snap-start sm:w-[240px]">
          <Link
            to="/branches"
            className={`${card} flex h-full min-h-[320px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#063B7A] to-[#0B5FA8] p-6 text-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#12BFD1]/60`}
          >
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-[#7FE3EE]">All stations</span>
            <span className="font-display text-xl font-extrabold uppercase text-white">View every branch →</span>
          </Link>
        </li>
      </ol>
    </Chapter>
  );
}
