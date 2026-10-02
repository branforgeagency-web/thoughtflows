import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AboutHeroHeader,
  WhoWeAreAndEmpowerSection,
  VisionMissionSectionStandalone
} from "../components/sections/AboutSection";
import OurMotto from "../components/sections/OurMotto";
import CoreValues from "../components/sections/CoreValues";
import FaqSection from "../components/sections/FaqSection";
import CTASection from "../components/sections/CTASection";
import { aboutFaqs } from "../config/pageFaqs";

function AboutNavSubBar() {
  const [activeTab, setActiveTab] = useState("who-we-are");

  const navItems = [
    { id: "who-we-are", label: "Who We Are" },
    { id: "we-empower", label: "We Empower" },
    { id: "our-motto", label: "Our Motto" },
    { id: "vision-mission", label: "Vision-Mission" },
    { id: "core-values", label: "Our Core Values" }
  ];

  const scrollToSection = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#16ADBA]/95 backdrop-blur-md text-white py-4 md:py-4.5 shadow-lg sticky top-[72px] z-30 border-b border-white/10">
      <div className="container-max px-6 sm:px-8 lg:px-12 flex flex-wrap justify-between md:justify-around items-center gap-4">
        {navItems.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="flex flex-col items-center group cursor-pointer outline-none relative py-1"
            >
              <span className={`text-white font-bold text-base md:text-lg tracking-wide transition-colors ${isSelected ? "text-white opacity-100" : "opacity-80 hover:opacity-100"}`}>
                {item.label}
              </span>
              
              {/* Active Indicator Underline Motion */}
              {isSelected ? (
                <motion.span
                  layoutId="navActiveLine"
                  className="h-1 w-12 bg-white rounded-full mt-1 shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              ) : (
                <span className="h-1 w-0 bg-white/40 rounded-full mt-1 transition-all duration-300 group-hover:w-8" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <AboutHeroHeader />
      <AboutNavSubBar />
      <WhoWeAreAndEmpowerSection />
      <OurMotto />
      <VisionMissionSectionStandalone />
      <CoreValues />
      <FaqSection items={aboutFaqs} />
      <CTASection />
    </>
  );
}
