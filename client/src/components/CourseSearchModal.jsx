import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, MapPin, ArrowRight, Sparkles } from "lucide-react";

const searchableItems = [
  // AAPC Courses
  { name: "CPC - Certified Professional Coder", type: "Course", category: "AAPC", slug: "/courses/cpc-certification" },
  { name: "CIC - Certified Inpatient Coder", type: "Course", category: "AAPC", slug: "/courses/cic-certification" },
  { name: "COC - Certified Outpatient Coder", type: "Course", category: "AAPC", slug: "/courses/coc-certification" },
  { name: "CPMA - Certified Professional Medical Auditor", type: "Course", category: "AAPC", slug: "/courses/cpma-certification" },
  { name: "CRC - Risk Adjustment Coding", type: "Course", category: "AAPC", slug: "/courses/hcc-risk-adjustment" },
  { name: "CPB - Certified Professional Biller", type: "Course", category: "AAPC", slug: "/courses/medical-billing-denial-management" },
  { name: "CEDC - Emergency Department Coding", type: "Course", category: "AAPC", slug: "/courses/cedc-certification" },
  { name: "CEMC - Evaluation & Management Coding", type: "Course", category: "AAPC", slug: "/courses/advanced-em-surgery-coding" },
  
  // Specialty Courses
  { name: "Surgery Coding", type: "Specialty", category: "Training", slug: "/courses/advanced-em-surgery-coding" },
  { name: "ED - Emergency Department", type: "Specialty", category: "Training", slug: "/courses/ed-coding" },
  { name: "Radiology Coding", type: "Specialty", category: "Training", slug: "/courses/radiology-coding" },
  { name: "Anesthesia Coding", type: "Specialty", category: "Training", slug: "/courses/anesthesia-coding" },
  { name: "IVR Coding", type: "Specialty", category: "Training", slug: "/courses/ivr-coding" },
  { name: "CDI - Clinical Documentation", type: "Specialty", category: "Training", slug: "/courses/cdi-coding" },

  // AHIMA Courses
  { name: "CCS - Certified Coding Specialist", type: "Course", category: "AHIMA", slug: "/courses/ccs-certification" },
  { name: "CCS-P - Certified Coding Specialist Physician", type: "Course", category: "AHIMA", slug: "/courses/ccs-p-certification" },
  { name: "RHIA - Registered Health Info Admin", type: "Course", category: "AHIMA", slug: "/courses/rhia-certification" },
  { name: "RHIT - Registered Health Info Tech", type: "Course", category: "AHIMA", slug: "/courses/rhit-certification" },

  // Branches
  { name: "Coimbatore - Gandhipuram", type: "Branch", category: "Campus", slug: "/branches/gandhipuram-coimbatore" },
  { name: "Coimbatore - Hope College", type: "Branch", category: "Campus", slug: "/branches/hope-college-coimbatore" },
  { name: "Coimbatore - Saravanampatti", type: "Branch", category: "Campus", slug: "/branches/saravanampatti-coimbatore" },
  { name: "Kerala - Kochi", type: "Branch", category: "Campus", slug: "/branches/kochi" },
  { name: "Kerala - Trivandrum", type: "Branch", category: "Campus", slug: "/branches/trivandrum" },
  { name: "Hyderabad - Ameerpet", type: "Branch", category: "Campus", slug: "/branches/ameerpet-hyderabad" },
  { name: "Hyderabad - Dilsukhnagar", type: "Branch", category: "Campus", slug: "/branches/dilsukhnagar-hyderabad" },
  { name: "Tirupati Campus", type: "Branch", category: "Campus", slug: "/branches/tirupathi" },
  { name: "Trichy Campus", type: "Branch", category: "Campus", slug: "/branches/trichy" },
  { name: "Salem Campus", type: "Branch", category: "Campus", slug: "/branches/salem" },
  { name: "Vizag Campus", type: "Branch", category: "Campus", slug: "/branches/vizag" }
];

export default function CourseSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const results = query.trim() === ""
    ? searchableItems.slice(0, 6)
    : searchableItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#063B7A]/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#12BFD1]/20 overflow-hidden z-10"
          >
            {/* Search Input Header */}
            <div className="relative flex items-center px-5 py-4 border-b border-slate-100 bg-[#F8FCFD]">
              <Search className="w-5 h-5 text-[#12BFD1] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, certifications, branches..."
                className="w-full pl-3 pr-10 text-base font-semibold text-[#063B7A] placeholder-slate-400 bg-transparent outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors shrink-0"
              >
                <kbd className="text-xs font-bold px-1.5 py-0.5 bg-white rounded shadow-sm">ESC</kbd>
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#12BFD1]" />
                {query ? "Search Results" : "Popular Searches"}
              </div>

              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={item.name}
                    to={item.slug}
                    onClick={onClose}
                    className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-[#E7F9FB] border border-transparent hover:border-[#12BFD1]/30 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${item.type === "Branch" ? "bg-amber-50 text-amber-600" : "bg-[#12BFD1]/10 text-[#12BFD1]"}`}>
                        {item.type === "Branch" ? <MapPin size={18} /> : <BookOpen size={18} />}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#063B7A] group-hover:text-[#12BFD1] transition-colors">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {item.category} • {item.type}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-[#12BFD1] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))
              ) : (
                <div className="text-center py-10 text-slate-500">
                  No matches found for &quot;<span className="font-bold text-[#063B7A]">{query}</span>&quot;
                </div>
              )}
            </div>

            {/* Footer tip */}
            <div className="px-5 py-3 bg-[#F8FCFD] border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-xs text-[10px] font-bold text-[#063B7A]">Ctrl+K</kbd> to search anytime</span>
              <span className="text-[#12BFD1] font-bold">Thoughtflows Academy</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
