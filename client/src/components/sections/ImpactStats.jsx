import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Presentation, Award, Laptop, MapPin } from "lucide-react";
import RevealOnScroll from "../RevealOnScroll";
import useFetch from "../../hooks/useFetch";

function AnimatedNumber({ value }) {
  const numeric = parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;
  const suffix = String(value).replace(/[\d,]/g, "");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, numeric]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

const STAT_CONFIGS = [
  { key: "training", defaultLabel: "Training", defaultValue: "35,000+", color: "text-[#facc15]", icon: Presentation },
  { key: "placement", defaultLabel: "Placement", defaultValue: "25,000+", color: "text-[#ec4899]", icon: Award },
  { key: "courses", defaultLabel: "Courses", defaultValue: "49+", color: "text-[#38bdf8]", icon: Laptop },
  { key: "branches", defaultLabel: "Branches", defaultValue: "12+", color: "text-[#2dd4bf]", icon: MapPin }
];

export default function ImpactStats() {
  const { data: apiStats } = useFetch("/placement-stats");

  const displayItems = STAT_CONFIGS.map((config) => {
    const match = apiStats?.find?.((s) => s.label?.toLowerCase?.().includes(config.key));
    return {
      value: match?.value || config.defaultValue,
      label: match?.label || config.defaultLabel,
      color: config.color,
      Icon: config.icon
    };
  });

  return (
    <section className="relative overflow-hidden bg-[#071220] py-20 md:py-28 px-6 md:px-10 lg:px-20">
      {/* Dark gradient background with subtle curved glow highlights */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 75% 50%, rgba(22,173,186,0.14), transparent 70%), linear-gradient(135deg, #09182b 0%, #050d18 100%)"
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 0%, transparent 40%)"
        }}
      />

      <div className="container-max relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column: Eyebrow and Headline */}
        <RevealOnScroll>
          <div>
            <span className="text-white/60 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
              THOUGHTFLOWS ACADEMY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] max-w-lg">
              Your Path to Success in Medical Coding
            </h2>
          </div>
        </RevealOnScroll>

        {/* Right Column: 2x2 Stat Grid with distinct colors and icons */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-12 sm:gap-y-14 text-center">
          {displayItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center"
            >
              <span className={`text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight mb-3 ${item.color}`}>
                <AnimatedNumber value={item.value} />
              </span>

              <item.Icon className="w-9 h-9 sm:w-10 sm:h-10 text-white/85 mb-2 shrink-0 stroke-[1.6]" />

              <span className="text-white font-medium text-base sm:text-lg md:text-xl tracking-wide">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
