import { motion } from "framer-motion";

/**
 * Wraps children in a scroll-triggered reveal animation.
 * `delay` staggers sibling elements; `y` controls travel distance.
 */
export default function RevealOnScroll({ children, delay = 0, y = 32, className = "", once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
