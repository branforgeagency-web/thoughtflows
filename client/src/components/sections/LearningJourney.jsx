import { BookOpen, FlaskConical, Award, Briefcase, Rocket } from "lucide-react";
import SectionHeading from "../SectionHeading";
import RevealOnScroll from "../RevealOnScroll";

const steps = [
  { icon: BookOpen, title: "Learn", text: "Master anatomy, medical terminology, and coding systems through structured, instructor-led sessions." },
  { icon: FlaskConical, title: "Practice", text: "Apply your knowledge on real clinical charts and coding scenarios under expert supervision." },
  { icon: Award, title: "Get Certified", text: "Sit for AAPC/AHIMA-aligned certification exams with dedicated exam-readiness coaching." },
  { icon: Briefcase, title: "Get Placed", text: "Access our hiring network of 500+ partners through mock interviews and direct placement drives." },
  { icon: Rocket, title: "Build Your Career", text: "Grow from coder to auditor, QA specialist, or team lead with continued mentorship." }
];

export default function LearningJourney() {
  return (
    <section className="section-pad bg-slate-50 relative overflow-hidden">
      <div className="container-max">
        <SectionHeading
          eyebrow="Learning Experience"
          title="An immersive journey from student to professional"
          subtitle="Every stage is designed to build on the last — so by the time you're job hunting, you've already done the hard part."
        />

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <RevealOnScroll key={step.title} delay={i * 0.12}>
                <div className="relative flex flex-col items-center text-center gap-4">
                  <div className="relative h-20 w-20 rounded-full glass-strong flex items-center justify-center text-teal-600 shadow-glow z-10">
                    <step.icon size={28} />
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-teal-500 text-ink-950 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-navy-900">{step.title}</h3>
                  <p className="text-navy-900/50 text-xs leading-relaxed max-w-[200px]">{step.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
