import Hero from "../components/Hero";
import WelcomeSection from "../components/sections/WelcomeSection";
import CoursesPreview from "../components/sections/CoursesPreview";
import BranchesPreview from "../components/sections/BranchesPreview";
import ImpactStats from "../components/sections/ImpactStats";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import FaqSection from "../components/sections/FaqSection";
import CTASection from "../components/sections/CTASection";
import { homeFaqs } from "../config/pageFaqs";

export default function Home() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <CoursesPreview />
      <BranchesPreview />
      <ImpactStats />
      <WhyChooseUs />
      <TestimonialsSection />
      <FaqSection items={homeFaqs} />
      <CTASection />
    </>
  );
}
