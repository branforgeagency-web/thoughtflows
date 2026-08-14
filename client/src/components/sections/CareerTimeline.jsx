import { GraduationCap, BookOpenCheck, Award, UserCheck, Briefcase, Stethoscope } from "lucide-react";
import SectionHeading from "../SectionHeading";
import RevealOnScroll from "../RevealOnScroll";

const stages = [
  { icon: GraduationCap, title: "Student", text: "You enroll — any background, from life sciences to career switchers." },
  { icon: BookOpenCheck, title: "Training", text: "Structured learning across anatomy, terminology, and coding systems." },
  { icon: Award, title: "Certification", text: "AAPC/AHIMA-aligned exam prep and certification attempt." },
  { icon: UserCheck, title: "Interview", text: "Mock rounds, resume polish, and real interviews with hiring partners." },
  { icon: Briefcase, title: "Placement", text: "Offer in hand — inpatient, outpatient, risk adjustment, or billing roles." },
  { icon: Stethoscope, title: "Coding Professional", text: "A certified career in one of healthcare's fastest-growing fields." }
];

export default function CareerTimeline() {
  return (
    <section className="section-pad bg-slate-50 relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Medical Coding Career Path"
          title="Your path from student to certified professional"
          subtitle="A clear, proven trajectory — thousands of Thoughtflows graduates have walked this exact path into the healthcare coding industry."
        />

        <div className="relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-teal-500/30 to-transparent" />
          <div className="flex flex-col gap-8 md:gap-4">
            {stages.map((stage, i) => (
              <RevealOnScroll key={stage.title} delay={i * 0.1}>
                <div className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex-1 w-full">
                    <div className={`glass rounded-2xl p-6 max-w-md ${i % 2 === 1 ? "md:ml-auto" : ""}`}>
                      <h3 className="text-navy-900 font-semibold mb-1">{stage.title}</h3>
                      <p className="text-navy-900/50 text-sm leading-relaxed">{stage.text}</p>
                    </div>
                  </div>
                  <div className="relative shrink-0 h-14 w-14 rounded-full glass-strong flex items-center justify-center text-teal-600 shadow-glow z-10">
                    <stage.icon size={22} />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
