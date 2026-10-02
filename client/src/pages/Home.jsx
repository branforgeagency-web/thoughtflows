import { useNavigate } from "react-router-dom";
import ThoughtflowsMedicalCodingHero from "@/components/ui/thoughtflows-medical-coding-hero";
import JourneyIntroSection from "../components/sections/JourneyIntroSection";
import HomeAbout from "../components/home/HomeAbout";
import HomePrograms from "../components/home/HomePrograms";
import HomeImpact from "../components/home/HomeImpact";
import HomeStations from "../components/home/HomeStations";
import HomeWhy from "../components/home/HomeWhy";
import HomeStories from "../components/home/HomeStories";
import HomeFaq from "../components/home/HomeFaq";
import HomeBoarding from "../components/home/HomeBoarding";
import StoryProgress from "../components/home/StoryProgress";
import { homeFaqs } from "../config/pageFaqs";
import { BRANCHES } from "../data/branches";

// Metro door video — self-hosted and re-encoded (every frame a keyframe) for smooth scroll scrubbing.
const METRO_DOORS_VIDEO = "/videos/metro-doors-1280.mp4";
const METRO_DOORS_VIDEO_MOBILE = "/videos/metro-doors-854.mp4";
const METRO_DOORS_POSTER = "/videos/metro-doors-poster.jpg";

// Branch data flows in from the site's data layer — never hardcoded in the hero.
const heroBranches = BRANCHES.map((b) => ({ name: b.name, city: b.city }));

/**
 * Homepage — told as one continuous story. After the cinematic hero, nine
 * numbered chapters share one seamless light canvas, one header layout,
 * soft shadows and the hero's blur-to-focus reveals (components/home/cinematic.jsx).
 * The original light sections in components/sections/ are untouched and
 * still used by the other pages.
 */
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[linear-gradient(180deg,#F8FCFD_0%,#F3F9FC_30%,#F8FCFD_55%,#EEF6FB_80%,#F8FCFD_100%)]">
      <ThoughtflowsMedicalCodingHero
        videoSrc={METRO_DOORS_VIDEO}
        mobileVideoSrc={METRO_DOORS_VIDEO_MOBILE}
        videoPosterSrc={METRO_DOORS_POSTER}
        branches={heroBranches}
        branchCount={15}
        onNavigate={navigate}
        nextSectionId="journey"
      />
      <JourneyIntroSection id="journey" />
      <HomeAbout />
      <HomePrograms />
      <HomeImpact />
      <HomeStations />
      <HomeWhy />
      <HomeStories />
      <HomeFaq items={homeFaqs} />
      <HomeBoarding />
      <StoryProgress />
    </div>
  );
}
