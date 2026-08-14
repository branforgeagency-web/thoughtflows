import { Flame, Handshake, Target, ShieldCheck, RefreshCw, Palette } from "lucide-react";
import { motion } from "framer-motion";
import RevealOnScroll from "../RevealOnScroll";

const values = [
  {
    number: "01",
    icon: Flame,
    title: "Passion",
    text: "Driven by our passion for healthcare education, we strive to provide top-tier training, making Thoughtflows Medical Coding Academy the leading choice for aspiring medical coders.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80",
    badgeGradient: "from-teal-500 to-emerald-600"
  },
  {
    number: "02",
    icon: Handshake,
    title: "Loyalty",
    text: "We build lasting relationships with our trainees, fostering loyalty through our commitment to their professional growth and success in the medical coding field.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&q=80",
    badgeGradient: "from-sky-500 to-teal-600"
  },
  {
    number: "03",
    icon: Target,
    title: "Commitment",
    text: "We are fully committed to excellence in innovation, technology, and training, ensuring our trainees receive the highest standard of education and career development.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
    badgeGradient: "from-blue-500 to-teal-600"
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Responsibility",
    text: "We take full responsibility for our trainees' learning journey, continuously offering support, mentorship, and opportunities for career advancement in medical coding.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    badgeGradient: "from-teal-600 to-cyan-700"
  },
  {
    number: "05",
    icon: RefreshCw,
    title: "Consistency",
    text: "Our commitment to quality and continuous improvement ensures we maintain the trust of our students and industry partners, year after year.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
    badgeGradient: "from-emerald-500 to-teal-700"
  },
  {
    number: "06",
    icon: Palette,
    title: "Creativity",
    text: "Through creative teaching methods and dynamic learning modules, we simplify complex coding concepts, helping our trainees grasp and retain knowledge effectively.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80",
    badgeGradient: "from-teal-400 to-indigo-600"
  }
];

export default function CoreValues() {
  return (
    <section id="core-values" className="bg-[#FAF8F5] py-24 scroll-mt-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="container-max px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-block bg-teal-500/15 text-teal-700 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-teal-300/40">
            What Defines Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            Our Core Values
          </h2>
          <div className="h-1 w-24 bg-teal-500 mx-auto rounded-full" />
        </div>

        {/* Modern Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100/90 relative overflow-hidden flex flex-col justify-between h-full group hover:shadow-2xl hover:border-teal-400/40 transition-all duration-300"
              >
                {/* Subtle card backdrop gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Card Row: Avatar & Giant Index Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-slate-100 group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Floating Icon Badge */}
                      <div className={`absolute bottom-0 right-0 w-7 h-7 rounded-lg bg-gradient-to-br ${item.badgeGradient} text-white flex items-center justify-center shadow-md`}>
                        <item.icon size={14} />
                      </div>
                    </div>

                    {/* Giant Sleek Number */}
                    <span className="text-4xl font-extrabold text-teal-600/20 group-hover:text-teal-600/40 transition-colors tracking-tight">
                      {item.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-extrabold text-navy-900 mb-3 group-hover:text-teal-600 transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-navy-900/75 text-sm sm:text-base leading-relaxed font-normal mb-6">
                    {item.text}
                  </p>
                </div>

                {/* Bottom Animated Line Accent */}
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-teal-500 w-12 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
