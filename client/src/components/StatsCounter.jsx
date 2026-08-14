import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
      {display}
      {suffix}
    </span>
  );
}

export default function StatsCounter({ stats = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6, scale: 1.03 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className="glass rounded-2xl p-6 text-center flex flex-col gap-2 shadow-sm hover:shadow-xl border border-slate-100 transition-all cursor-pointer group"
        >
          <span className="text-3xl md:text-4xl font-display font-extrabold text-teal-600 group-hover:scale-105 transition-transform">
            <AnimatedNumber value={stat.value} />
          </span>
          <span className="text-xs md:text-sm font-semibold text-navy-900/70 tracking-wide">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
