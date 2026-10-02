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
    "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-sm md:text-base tracking-wide transition-all duration-300 select-none cursor-pointer";
  const variants = {
    primary: "bg-gradient-to-r from-[#063B7A] via-[#0B4F9C] to-[#12BFD1] text-white font-extrabold shadow-lg shadow-[#063B7A]/20 hover:shadow-xl hover:shadow-[#12BFD1]/30",
    cyan: "bg-gradient-to-r from-[#12BFD1] to-[#0EA2B2] hover:from-[#0EA2B2] hover:to-[#0B8A98] text-white font-extrabold shadow-lg shadow-[#12BFD1]/25 hover:shadow-xl hover:shadow-[#12BFD1]/40",
    secondary: "bg-white text-[#063B7A] font-extrabold border border-[#12BFD1]/30 hover:bg-[#E7F9FB] shadow-sm",
    outline: "border border-[#063B7A]/30 text-[#063B7A] font-extrabold hover:border-[#12BFD1] hover:text-[#12BFD1] hover:bg-[#E7F9FB]/50"
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
