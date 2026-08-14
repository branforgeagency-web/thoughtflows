import { Link } from "react-router-dom";
import { FileText, Users, MessagesSquare, Network, Compass, ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import RevealOnScroll from "../RevealOnScroll";
import MagneticButton from "../MagneticButton";

const items = [
  { icon: FileText, title: "Resume Building", text: "Professionally crafted, ATS-friendly resumes tailored to medical coding roles." },
  { icon: Users, title: "Mock Interviews", text: "Multiple rounds of practice interviews with real feedback from industry professionals." },
  { icon: MessagesSquare, title: "Interview Preparation", text: "Coding-specific technical rounds, HR rounds, and communication coaching." },
  { icon: Network, title: "Industry Connections", text: "Direct access to our network of 500+ hiring partners in the healthcare BPO space." },
  { icon: Compass, title: "Career Guidance", text: "Personalized mapping of your strengths to the right coding specialty and employer." }
];

export default function PlacementSection() {
  return (
    <section className="section-pad bg-white relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Placement & Career"
          title="We don't stop teaching until you're hired"
          subtitle="Our placement cell works alongside every batch from day one — because a certificate without a career isn't the outcome we're building toward."
          align="left"
        />

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="grid sm:grid-cols-2 gap-5">
            {items.map((item, i) => (
              <RevealOnScroll key={item.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 h-full flex flex-col gap-3 transition-all duration-500 hover:-translate-y-1 hover:border-teal-400/30">
                  <div className="h-10 w-10 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-600">
                    <item.icon size={18} />
                  </div>
                  <h3 className="text-sm font-semibold text-navy-900">{item.title}</h3>
                  <p className="text-navy-900/50 text-xs leading-relaxed">{item.text}</p>
                </div>
              </RevealOnScroll>
            ))}
            <RevealOnScroll delay={0.4}>
              <div className="rounded-2xl p-6 h-full flex flex-col justify-center gap-4 bg-gradient-to-br from-teal-500/20 to-navy-500/20 border border-teal-400/20">
                <p className="text-3xl font-bold text-gradient">95%</p>
                <p className="text-navy-900/70 text-sm">Placement rate across every branch and every batch since inception.</p>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.2}>
            <div className="relative rounded-3xl overflow-hidden glass-strong p-2">
              <img
                src="https://picsum.photos/seed/placement-hero/900/700"
                alt="Placement support session"
                className="rounded-2xl w-full h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-navy-900 font-semibold">Ready to start?</p>
                  <p className="text-navy-900/50 text-xs">Talk to a career counsellor today.</p>
                </div>
                <MagneticButton as={Link} to="/contact" className="!px-5 !py-3 text-xs">
                  Get Guidance <ArrowRight size={14} />
                </MagneticButton>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
