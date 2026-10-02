import { useState } from "react";
import { Chapter, ChapterHeader, Accent, Reveal, Parallax, GhostButton, photoShadow } from "./cinematic";

const YOUTUBE_ID = "Ph1XztrKgms";

/** Chapter 02 — who we are + academy film (copy from the original WelcomeSection). */
export default function HomeAbout() {
  const [playing, setPlaying] = useState(false);

  return (
    <Chapter id="welcome" labelledBy="welcome-heading" glow="left">
      <ChapterHeader
        chapter={2}
        eyebrow="Where It Starts"
        headingId="welcome-heading"
        title={
          <>
            Training that leads to <Accent>real careers</Accent>
          </>
        }
        lead="We train/create innovative and engaging programs leading to employment, development, and advancement in the largest and fastest growing fields within healthcare IT industry."
        aside={<GhostButton to="/about">More about us</GhostButton>}
      />

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal delay={120} y={48} className="lg:col-span-7">
          <div className={`relative aspect-video overflow-hidden rounded-[2rem] bg-[#063B7A] ${photoShadow}`}>
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title="Thoughtflows Academy Overview Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#12BFD1]"
                aria-label="Play video: Thoughtflows Academy Overview"
              >
                <Parallax strength={24} className="absolute -inset-y-8 inset-x-0">
                  <img
                    src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </Parallax>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,33,63,0.05)_0%,rgba(6,33,63,0.2)_50%,rgba(6,33,63,0.85)_100%)]" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="relative flex h-20 w-20 items-center justify-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/40 motion-reduce:animate-none" />
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#063B7A] shadow-[0_12px_40px_rgba(6,33,63,0.45)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                      <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.5v13l11-6.5z" />
                      </svg>
                    </span>
                  </span>
                </span>
                <span className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                  <span className="block font-display text-[10px] font-bold uppercase tracking-[0.3em] text-[#7FE3EE]">Watch</span>
                  <span className="mt-1 block font-display text-lg font-extrabold text-white sm:text-2xl">Inside Thoughtflows Academy</span>
                </span>
              </button>
            )}
          </div>
        </Reveal>

        <div className="space-y-5 lg:col-span-5">
          <Reveal delay={200}>
            <p className="text-[15px] leading-relaxed text-[#4A5D73] sm:text-base">
              So, we are absolutely 100% committed to healthcare IT training standards and provide the best infrastructure with
              well-equipped class room and lab facilities.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <blockquote className="rounded-3xl bg-white p-6 font-display text-base font-bold leading-relaxed text-[#0A2540] shadow-[0_1px_2px_rgba(6,59,122,0.04),0_18px_44px_-24px_rgba(6,59,122,0.22)] sm:p-7 sm:text-lg">
              <span aria-hidden="true" className="mb-2 block font-display text-4xl leading-none text-[#12BFD1]">
                “
              </span>
              Everything we update is tied to support and empower learners by focusing on their career progression and future.
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Chapter>
  );
}
