import { Chapter, Eyebrow, Heading, Accent, Lead, Reveal, Parallax, PrimaryButton, GhostButton } from "./cinematic";

/**
 * Chapter 09 — the story closes where it began: at the metro doors.
 * Copy from the original CTASection.
 */
export default function HomeBoarding() {
  return (
    <Chapter id="boarding" labelledBy="boarding-heading" glow="center" className="!pb-14 sm:!pb-20">
      <Reveal y={48} scale={0.98}>
        <div className="relative grid overflow-hidden rounded-[2.5rem] bg-white shadow-[0_2px_6px_rgba(6,59,122,0.05),0_40px_90px_-40px_rgba(6,59,122,0.45)] lg:grid-cols-2">
          <div className="relative p-8 sm:p-12 lg:p-16">
            <Eyebrow chapter={9}>Your Next Step</Eyebrow>
            <p className="mt-6 font-display text-lg font-medium text-[#4A5D73] sm:text-xl">Sign up for a</p>
            <Heading id="boarding-heading" className="mt-2">
              Free trial lesson <Accent>by Zoom</Accent>
            </Heading>
            <Lead className="mt-5 max-w-md">The doors are open. Take your first step into a medical coding career with Thoughtflows.</Lead>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton to="/contact">Register Now</PrimaryButton>
              <GhostButton to="/courses">Explore Courses</GhostButton>
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
            <Parallax strength={30} className="absolute -inset-y-10 inset-x-0">
              <img src="/videos/metro-doors-poster.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-[#06213F]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/0 lg:to-transparent" />
            <img
              src="/thoughtflows-logo-light-720.png"
              alt=""
              width={720}
              height={165}
              loading="lazy"
              className="absolute bottom-8 right-8 h-auto w-40 drop-shadow-[0_4px_18px_rgba(3,11,23,0.6)] sm:w-52"
            />
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}
