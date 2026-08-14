import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Linkedin, Instagram, X, MessageSquarePlus } from "lucide-react";

export default function FloatingQuickActions() {
  const [isOpen, setIsOpen] = useState(true);

  const actions = [
    {
      id: "whatsapp",
      label: "Chat on WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/919000001000?text=Hi%20Thoughtflows%20Academy%2C%20I%20want%20to%20know%20more%20about%20medical%20coding%20courses.",
      color: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30",
      pulse: true
    },
    {
      id: "call",
      label: "Call Admissions",
      icon: Phone,
      href: "tel:+919000001000",
      color: "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/30"
    },
    {
      id: "linkedin",
      label: "Follow on LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/thoughtflows",
      color: "bg-[#0A66C2] hover:bg-blue-700 text-white shadow-blue-500/30"
    },
    {
      id: "instagram",
      label: "Follow on Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/thoughtflows_academy",
      color: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-rose-500/30"
    }
  ];

  return (
    <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center">
      
      {/* Expand/Collapse Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 w-9 h-9 rounded-full bg-white text-navy-900 shadow-md border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-transform active:scale-95"
        aria-label="Toggle Quick Links"
      >
        <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.2 }}>
          {isOpen ? <X size={16} /> : <MessageSquarePlus size={16} className="text-[#16ADBA]" />}
        </motion.div>
      </button>

      {/* Floating Action Buttons Vertical Glass Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-xl rounded-full p-2 border border-slate-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col items-center gap-3.5"
          >
            {actions.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="relative group flex items-center">
                  
                  {/* Hover Tooltip (Slides in from the left) */}
                  <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 pointer-events-none translate-x-2 group-hover:translate-x-0 transition-all duration-200 bg-navy-950 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap z-50 flex items-center gap-1.5">
                    <span>{act.label}</span>
                    <div className="w-2 h-2 bg-navy-950 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Pulsing Ring for WhatsApp */}
                  {act.pulse && (
                    <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping pointer-events-none" />
                  )}

                  {/* Circular Floating Button */}
                  <motion.a
                    href={act.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.18, x: -3 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-shadow relative z-10 cursor-pointer ${act.color}`}
                    aria-label={act.label}
                  >
                    <Icon size={20} className="stroke-[2.2]" />
                  </motion.a>

                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
