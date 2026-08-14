import { GraduationCap, CalendarClock, ShieldCheck, FlaskConical, BookOpenCheck } from "lucide-react";

/**
 * Shared "why train with us" reasons. Institutional, not course-specific,
 * so this single source is reused by the homepage WhyChooseUs section and
 * every course detail page instead of being duplicated per document.
 */
export const whyChooseUsItems = [
  {
    id: "training",
    icon: GraduationCap,
    title: "Industry-Leading Medical Coding Training",
    text: "Thoughtflows Medical Coding Academy offers expert-led training across all coding specialties, ensuring you gain the latest skills and knowledge for a successful healthcare career.",
    link: "/courses"
  },
  {
    id: "learning",
    icon: CalendarClock,
    title: "Flexible Learning Options",
    text: "We provide both online and offline classes with various batch timings, allowing you to pursue certification at your convenience, whether you're a student or a working professional.",
    link: "/about"
  },
  {
    id: "placement",
    icon: ShieldCheck,
    title: "Guaranteed Job Placement & Career Support",
    text: "With 100% job placement assistance, personalized career coaching, and interview prep, Thoughtflows helps you secure a job quickly after certification.",
    link: "/placements"
  },
  {
    id: "experience",
    icon: FlaskConical,
    title: "Hands-On Real-World Coding Experience",
    text: "Gain practical experience through case studies, coding exercises, and mock exams to bridge the gap between theory and real-world application.",
    link: "/courses"
  },
  {
    id: "curriculum",
    icon: BookOpenCheck,
    title: "Updated, Industry-Approved Curriculum",
    text: "Our curriculum is regularly updated to align with the latest coding standards and guidelines, ensuring you're well-prepared for certification exams and your career in healthcare.",
    link: "/courses"
  }
];
