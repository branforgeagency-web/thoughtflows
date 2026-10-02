import { useState } from "react";
import { Plus, Minus, CheckCircle2, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Modern Elevated Accordion for FAQ lists with interactive accent borders,
 * custom plus/minus toggle badges, and smooth expand/collapse physics.
 */
export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!items?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <motion.div
            key={item.question}
            initial={false}
            animate={{ scale: open ? 1.01 : 1 }}
            transition={{ duration: 0.2 }}
            className={`rounded-2xl overflow-hidden transition-all duration-300 border ${
              open
                ? "bg-gradient-to-r from-[#E7F9FB] via-white to-white border-[#12BFD1]/40 border-l-4 border-l-[#12BFD1] shadow-xl shadow-[#12BFD1]/10"
                : "bg-white hover:bg-[#F8FCFD] border-slate-200/80 hover:border-[#12BFD1]/30 shadow-xs hover:shadow-md"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer outline-none group"
              aria-expanded={open}
            >
              <div className="flex items-center gap-3">
                <span className={`p-1.5 rounded-lg shrink-0 transition-colors ${open ? "bg-[#12BFD1] text-white" : "bg-slate-100 text-[#063B7A] group-hover:bg-[#E7F9FB] group-hover:text-[#12BFD1]"}`}>
                  <HelpCircle size={16} />
                </span>
                <span className={`text-base md:text-lg font-extrabold font-display leading-snug transition-colors ${open ? "text-[#063B7A]" : "text-[#063B7A] group-hover:text-[#12BFD1]"}`}>
                  {item.question}
                </span>
              </div>

              {/* Custom Plus / Minus Toggle Badge */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs ${
                  open
                    ? "bg-[#12BFD1] text-white rotate-180 shadow-md shadow-[#12BFD1]/30"
                    : "bg-slate-100 group-hover:bg-[#12BFD1]/15 text-[#063B7A] group-hover:text-[#12BFD1]"
                }`}
              >
                {open ? <Minus size={18} /> : <Plus size={18} />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 border-t border-[#12BFD1]/15 mx-6 space-y-3">
                    <p className="text-sm md:text-base text-[#063B7A]/80 leading-relaxed font-medium">
                      {item.answer}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12BFD1]/10 text-[#12BFD1] text-xs font-bold">
                        <CheckCircle2 size={13} />
                        Verified AAPC &amp; AHIMA Guidance
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
