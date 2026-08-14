import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../SectionHeading";

const mottoTabs = [
  {
    id: "quality",
    label: "Quality",
    title: (
      <>
        Top <span className="relative inline-block border-b-4 border-teal-400 pb-0.5">Quality</span> Training
      </>
    ),
    text: "We are committed to delivering top-quality training that combines theoretical knowledge with practical hands-on experience. Our curriculum is meticulously designed by industry experts, ensuring that our trainees are equipped with the latest industry practices and coding techniques. With modern facilities and a team of highly qualified instructors, we offer a dynamic learning environment designed to nurture growth, expertise, and success in the medical coding field.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "connections",
    label: "Connections",
    title: (
      <>
        Build Strong <span className="relative inline-block border-b-4 border-teal-400 pb-0.5">Industry Connections</span>
      </>
    ),
    text: "As a trainee at Thoughtflows Medical Coding Academy, you'll gain access to our extensive network of industry connections. We've forged strong partnerships with leading healthcare organizations, providing ample opportunities for job placements. We understand the importance of bridging the gap between education and employment, and we actively work towards helping our trainees secure rewarding positions in esteemed healthcare institutions.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "support",
    label: "Support",
    title: (
      <>
        <span className="relative inline-block border-b-4 border-teal-400 pb-0.5">Continuous Support</span>
      </>
    ),
    text: "Your journey with Thoughtflows Medical Coding Academy doesn't end at graduation. We offer lifelong mentorship, personalized career guidance, and exclusive access to our vibrant alumni community—empowering you with networking, professional growth, and continuous learning every step of the way.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "join-us",
    label: "Join us",
    title: (
      <>
        Join <span className="relative inline-block border-b-4 border-teal-400 pb-0.5">Our Community</span>
      </>
    ),
    text: "At Thought Flows, we are driven by our passion for empowering individuals and making a positive impact in the medical coding field. Join us on this transformative educational journey and unlock the doors to a rewarding and fulfilling career.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
  }
];

export default function OurMotto() {
  const [active, setActive] = useState(0);
  const current = mottoTabs[active];

  return (
    <section id="our-motto" className="section-pad bg-white py-16 sm:py-20 scroll-mt-28 border-b border-navy-900/5">
      <div className="container-max">
        <SectionHeading eyebrow="Our Motto" title="What drives everything we teach" />

        {/* Tab navigation pill bar */}
        <div className="bg-[#f0efff] p-2 rounded-full max-w-4xl mx-auto flex items-center justify-between shadow-inner mb-12 border border-purple-100/60 overflow-x-auto relative">
          {mottoTabs.map((tab, i) => {
            const isSelected = active === i;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(i)}
                className={`flex-1 min-w-[110px] text-center px-4 md:px-8 py-3 rounded-full text-base font-bold transition-colors duration-300 relative z-10 cursor-pointer ${
                  isSelected ? "text-navy-900" : "text-navy-900/70 hover:text-navy-900"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="mottoActivePill"
                    className="absolute inset-0 bg-white rounded-full border-2 border-slate-900 shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className={`relative z-10 ${isSelected ? "underline decoration-2 underline-offset-4" : "hover:underline decoration-2 underline-offset-4"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab content display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center"
          >
            {/* Left Image Card */}
            <div className="lg:col-span-5 relative group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 cursor-pointer"
              >
                <img
                  src={current.image}
                  alt={current.label}
                  className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </div>

            {/* Right Text Container */}
            <div className="lg:col-span-7 bg-[#f3f1ff] rounded-3xl p-8 md:p-12 shadow-sm border border-purple-100/80 flex flex-col justify-center min-h-[300px]">
              <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mb-5 leading-snug">
                {current.title}
              </h3>
              <p className="text-navy-900/80 text-base md:text-lg leading-relaxed font-normal">
                {current.text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
