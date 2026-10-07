import { Link } from "react-router-dom";
import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel";
import { BRANCHES } from "../../data/branches";
import { Chapter, ChapterHeader, Accent, Reveal, Arrow } from "./cinematic";

/**
 * Chapter 05 — branches as stations on the line, continuing the hero's train
 * story: each branch is a polaroid pegged to a sagging string. Data comes
 * from data/branches.js (not hardcoded here).
 */
export default function HomeStations({ branches = BRANCHES }) {
  const slides = branches.map((b, i) => ({
    image: b.heroImage || b.img,
    title: b.name,
    subtitle: b.city,
    caption: b.address,
    alt: `${b.name} branch`,
    tag: `Station ${String(i + 1).padStart(2, "0")}`,
    branch: b,
  }));

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
          <Link
            to="/branches"
            className="inline-flex items-center gap-2 font-display text-sm font-bold text-[#063B7A] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BFD1]"
          >
            View every branch <Arrow />
          </Link>
        }
      />

      <Reveal delay={120} y={40} className="-mx-4 mt-6 sm:-mx-8 lg:-mx-12">
        <PolaroidLineCarousel
          slides={slides}
          ariaLabel="Thoughtflows branches"
          renderActions={({ branch: b }) => (
            <>
              <Link
                to={`/branches/${b.slug}`}
                className="font-display text-sm font-bold text-[#063B7A] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BFD1]"
              >
                View branch
              </Link>
              {b.gmapUrl && (
                <a
                  href={b.gmapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm font-bold text-[#6B7C8F] underline-offset-4 hover:text-[#063B7A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12BFD1]"
                >
                  Directions ↗
                </a>
              )}
            </>
          )}
        />
      </Reveal>
    </Chapter>
  );
}
