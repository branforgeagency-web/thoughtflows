import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative pt-40 pb-20 bg-hero-gradient overflow-hidden">
      <div className="absolute inset-0 bg-grid-glow pointer-events-none" />
      {/* Background soft cyan glow highlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#12BFD1]/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#A1E7F0]/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="container-max px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-teal-600 text-xs md:text-sm font-semibold uppercase mb-4">
              <span className="h-px w-8 bg-teal-400" /> <span className="tracking-[0.2em]">{eyebrow}</span>
            </span>
          )}
          <h1 className="text-4xl md:text-6xl font-bold text-navy-900 leading-tight">{title}</h1>
          {subtitle && <p className="text-navy-900/60 text-base md:text-lg mt-5 max-w-2xl">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}
