import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Button that subtly follows the cursor within its bounds ("magnetic" hover),
 * used for primary CTAs across the site.
 */
export default function MagneticButton({ children, as = "button", className = "", variant = "primary", ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-sm md:text-base tracking-wide transition-shadow duration-300 select-none";
  const variants = {
    primary: "bg-gradient-to-r from-teal-500 to-teal-600 text-ink-950 shadow-glow hover:shadow-glow-lg",
    secondary: "glass text-navy-900 hover:bg-navy-900/5",
    outline: "border border-teal-500/40 text-teal-600 hover:bg-teal-500/10"
  };

  // motion.<tag> only works for plain DOM tag strings (button, a, div...).
  // Custom components (e.g. React Router's Link) must go through motion.create().
  const Component = useMemo(() => (typeof as === "string" ? motion[as] : motion.create(as)), [as]);

  return (
    <Component
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
