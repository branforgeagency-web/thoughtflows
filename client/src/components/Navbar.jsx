import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import MagneticButton from "./MagneticButton";

const courseMegaMenuData = [
  {
    category: "AAPC",
    items: [
      { name: "CPC", slug: "cpc-certification" },
      { name: "CIC", slug: "cic-certification" },
      { name: "COC", slug: "coc-certification" },
      { name: "CPMA", slug: "cpma-certification" },
      { name: "CRC", slug: "hcc-risk-adjustment" },
      { name: "CPB", slug: "medical-billing-denial-management" },
      { name: "CEDC", slug: "cedc-certification" },
      { name: "CEMC", slug: "advanced-em-surgery-coding" },
      { name: "CDEO", slug: "cdeo-certification" },
      { name: "CDEI", slug: "cdei-certification" },
      { name: "CPPM", slug: "cppm-certification" }
    ]
  },
  {
    category: "SPECIALTY TRAINING",
    items: [
      { name: "SURGERY", slug: "advanced-em-surgery-coding" },
      { name: "ED", slug: "ed-coding" },
      { name: "EM", slug: "advanced-em-surgery-coding" },
      { name: "RADIOLOGY", slug: "radiology-coding" },
      { name: "ANESTHESIA", slug: "anesthesia-coding" },
      { name: "IP DRG", slug: "ccs-certification" },
      { name: "HCC", slug: "hcc-risk-adjustment" },
      { name: "IVR", slug: "ivr-coding" },
      { name: "CDI", slug: "cdi-coding" }
    ]
  },
  {
    category: "AHIMA",
    items: [
      { name: "CCS", slug: "ccs-certification" },
      { name: "CCS-P", slug: "ccs-p-certification" },
      { name: "RHIA", slug: "rhia-certification" },
      { name: "RHIT", slug: "rhit-certification" }
    ]
  },
  {
    category: "HIMAA",
    items: [
      { name: "CCC", slug: "ccc-certification" },
      { name: "HIM", slug: "him-certification" }
    ]
  }
];

const branchMenuData = [
  {
    name: "Coimbatore",
    hasSub: true,
    branches: [
      { name: "Gandhipuram", slug: "gandhipuram-coimbatore" },
      { name: "Hope College", slug: "hope-college-coimbatore" },
      { name: "Saravanampatti", slug: "saravanampatti-coimbatore" }
    ]
  },
  {
    name: "Kerala",
    hasSub: true,
    branches: [
      { name: "Kochi", slug: "kochi" },
      { name: "Trivandrum", slug: "trivandrum" }
    ]
  },
  {
    name: "Hyderabad",
    hasSub: true,
    branches: [
      { name: "Ameerpet", slug: "ameerpet-hyderabad" },
      { name: "Dilsukhnagar", slug: "dilsukhnagar-hyderabad" }
    ]
  },
  { name: "Tirupati", hasSub: false, slug: "tirupathi" },
  { name: "Trichy", hasSub: false, slug: "trichy" },
  { name: "Salem", hasSub: false, slug: "salem" },
  { name: "Vizag", hasSub: false, slug: "vizag" }
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [coursesHovered, setCoursesHovered] = useState(false);
  const [branchesHovered, setBranchesHovered] = useState(false);
  const [activeCitySub, setActiveCitySub] = useState(null);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileBranchesOpen, setMobileBranchesOpen] = useState(false);
  const coursesRef = useRef(null);
  const branchesRef = useRef(null);

  const isCoursesActive = location.pathname.startsWith("/courses");
  const isBranchesActive = location.pathname.startsWith("/branches");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (coursesRef.current && !coursesRef.current.contains(e.target)) {
        setCoursesHovered(false);
      }
      if (branchesRef.current && !branchesRef.current.contains(e.target)) {
        setBranchesHovered(false);
        setActiveCitySub(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200/60"
          : "py-5 bg-gradient-to-b from-navy-950/75 via-navy-950/35 to-transparent"
      }`}
    >
      <nav className="container-max flex items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-sm hover:scale-105 transition-transform"
          onClick={() => setOpen(false)}
        >
          <img src="/logo.png" alt="Thoughtflows" className="h-9 md:h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-base font-extrabold tracking-wide transition-colors ${
                scrolled
                  ? isActive ? "text-teal-600" : "text-navy-900/80 hover:text-navy-900"
                  : isActive ? "text-teal-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-base font-extrabold tracking-wide transition-colors ${
                scrolled
                  ? isActive ? "text-teal-600" : "text-navy-900/80 hover:text-navy-900"
                  : isActive ? "text-teal-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              }`
            }
          >
            About us
          </NavLink>

          {/* COURSES MEGA DROPDOWN MENU */}
          <div
            ref={coursesRef}
            className="relative"
            onMouseEnter={() => setCoursesHovered(true)}
            onMouseLeave={() => setCoursesHovered(false)}
          >
            <button
              type="button"
              onClick={() => setCoursesHovered(!coursesHovered)}
              className={`text-base font-extrabold tracking-wide transition-colors inline-flex items-center gap-1.5 py-1 cursor-pointer outline-none ${
                scrolled
                  ? isCoursesActive || coursesHovered ? "text-teal-600" : "text-navy-900/80 hover:text-navy-900"
                  : isCoursesActive || coursesHovered ? "text-teal-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              }`}
            >
              <span>Courses</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${coursesHovered ? "rotate-180 text-teal-500" : ""}`} />
            </button>

            {/* Solid White Mega Dropdown Popup Panel */}
            <AnimatePresence>
              {coursesHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 w-[720px] lg:w-[800px]"
                >
                  <div className="bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] p-7 border border-slate-100 grid grid-cols-4 gap-7 text-navy-900">
                    {courseMegaMenuData.map((cat) => (
                      <div key={cat.category} className="flex flex-col">
                        <div className="border-b-2 border-[#16ADBA] pb-2 font-bold text-xs uppercase tracking-wider text-navy-900 mb-3.5">
                          {cat.category}
                        </div>
                        <div className="space-y-2 flex-1">
                          {cat.items.map((item) => (
                            <Link
                              key={item.name}
                              to={`/courses/${item.slug}`}
                              onClick={() => setCoursesHovered(false)}
                              className="block text-xs font-semibold text-slate-700 hover:text-[#16ADBA] hover:translate-x-1 transition-all py-1 tracking-wide"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BRANCHES DROPDOWN MENU */}
          <div
            ref={branchesRef}
            className="relative"
            onMouseEnter={() => setBranchesHovered(true)}
            onMouseLeave={() => {
              setBranchesHovered(false);
              setActiveCitySub(null);
            }}
          >
            <button
              type="button"
              onClick={() => setBranchesHovered(!branchesHovered)}
              className={`text-base font-extrabold tracking-wide transition-colors inline-flex items-center gap-1.5 py-1 cursor-pointer outline-none ${
                scrolled
                  ? isBranchesActive || branchesHovered ? "text-teal-600" : "text-navy-900/80 hover:text-navy-900"
                  : isBranchesActive || branchesHovered ? "text-teal-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              }`}
            >
              <span>Branches</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${branchesHovered ? "rotate-180 text-teal-500" : ""}`} />
            </button>

            {/* Main Branches Dropdown Popup */}
            <AnimatePresence>
              {branchesHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 top-full pt-2 z-50 min-w-[220px]"
                >
                  <div className="bg-white rounded-2xl shadow-2xl p-2.5 border border-slate-100 space-y-1 relative">
                    {branchMenuData.map((item) => (
                      <div
                        key={item.name}
                        className="relative"
                        onMouseEnter={() => setActiveCitySub(item.name)}
                      >
                        {item.hasSub ? (
                          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl text-navy-900 font-extrabold text-base hover:bg-teal-50 hover:text-teal-600 cursor-pointer transition-colors group">
                            <span>{item.name}</span>
                            <ChevronRight size={16} className="text-navy-900/50 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        ) : (
                          <Link
                            to={`/branches/${item.slug}`}
                            onClick={() => {
                              setBranchesHovered(false);
                              setActiveCitySub(null);
                            }}
                            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-navy-900 font-extrabold text-base hover:bg-teal-50 hover:text-teal-600 transition-colors"
                          >
                            <span>{item.name}</span>
                          </Link>
                        )}

                        {/* Flyout Submenu for Cities with multiple branches */}
                        <AnimatePresence>
                          {item.hasSub && activeCitySub === item.name && (
                            <motion.div
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-full top-0 ml-1.5 min-w-[210px] bg-white rounded-2xl shadow-2xl p-2.5 border border-slate-100 z-50 space-y-1"
                            >
                              <div className="px-3 py-1 text-[10px] font-extrabold uppercase text-teal-600 tracking-wider border-b border-slate-100 mb-1">
                                {item.name} Campuses
                              </div>
                              {item.branches.map((b) => (
                                <Link
                                  key={b.slug}
                                  to={`/branches/${b.slug}`}
                                  onClick={() => {
                                    setBranchesHovered(false);
                                    setActiveCitySub(null);
                                  }}
                                  className="block px-3.5 py-2 rounded-xl text-sm font-extrabold text-navy-900 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                                >
                                  {b.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to="/our-team"
            className={({ isActive }) =>
              `text-base font-extrabold tracking-wide transition-colors ${
                scrolled
                  ? isActive ? "text-teal-600" : "text-navy-900/80 hover:text-navy-900"
                  : isActive ? "text-teal-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              }`
            }
          >
            Our team
          </NavLink>

          <NavLink
            to="/placements"
            className={({ isActive }) =>
              `text-base font-extrabold tracking-wide transition-colors ${
                scrolled
                  ? isActive ? "text-teal-600" : "text-navy-900/80 hover:text-navy-900"
                  : isActive ? "text-teal-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              }`
            }
          >
            Placements
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-base font-extrabold tracking-wide transition-colors ${
                scrolled
                  ? isActive ? "text-teal-600" : "text-navy-900/80 hover:text-navy-900"
                  : isActive ? "text-teal-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              }`
            }
          >
            Contact us
          </NavLink>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <MagneticButton as={Link} to="/contact" className="!px-6 !py-3 text-sm font-extrabold">
            Enroll Now
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className={`lg:hidden p-2 transition-colors ${
            scrolled ? "text-navy-900" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          }`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden mt-3 mx-4 rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-3">
              <NavLink to="/" onClick={() => setOpen(false)} className="text-base font-extrabold text-navy-900 py-1">
                Home
              </NavLink>
              <NavLink to="/about" onClick={() => setOpen(false)} className="text-base font-extrabold text-navy-900 py-1">
                About us
              </NavLink>

              {/* Mobile Courses Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                  className="w-full flex items-center justify-between text-base font-extrabold text-navy-900 py-1 cursor-pointer"
                >
                  <span>Courses</span>
                  <ChevronDown size={18} className={`transition-transform ${mobileCoursesOpen ? "rotate-180 text-teal-600" : ""}`} />
                </button>

                {mobileCoursesOpen && (
                  <div className="pl-4 pt-2 space-y-3 border-l-2 border-teal-500 mt-2">
                    {courseMegaMenuData.map((cat) => (
                      <div key={cat.category} className="space-y-1">
                        <div className="text-xs font-extrabold uppercase text-teal-600 tracking-wider">
                          {cat.category}
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 pl-1">
                          {cat.items.map((item) => (
                            <Link
                              key={item.name}
                              to={`/courses/${item.slug}`}
                              onClick={() => setOpen(false)}
                              className="text-xs font-bold text-navy-900/80 py-1 hover:text-teal-600"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Branches Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setMobileBranchesOpen(!mobileBranchesOpen)}
                  className="w-full flex items-center justify-between text-base font-extrabold text-navy-900 py-1 cursor-pointer"
                >
                  <span>Branches</span>
                  <ChevronDown size={18} className={`transition-transform ${mobileBranchesOpen ? "rotate-180 text-teal-600" : ""}`} />
                </button>

                {mobileBranchesOpen && (
                  <div className="pl-4 pt-2 space-y-2 border-l-2 border-teal-500 mt-2">
                    {branchMenuData.map((item) => (
                      <div key={item.name} className="space-y-1">
                        {item.hasSub ? (
                          <div>
                            <div className="text-xs font-extrabold uppercase text-teal-600 tracking-wider mb-1 pt-1">
                              {item.name}
                            </div>
                            {item.branches.map((b) => (
                              <Link
                                key={b.slug}
                                to={`/branches/${b.slug}`}
                                onClick={() => setOpen(false)}
                                className="block text-sm font-bold text-navy-900/80 py-1 pl-2 hover:text-teal-600"
                              >
                                {b.name}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            to={`/branches/${item.slug}`}
                            onClick={() => setOpen(false)}
                            className="block text-sm font-bold text-navy-900/80 py-1 hover:text-teal-600"
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/our-team" onClick={() => setOpen(false)} className="text-base font-extrabold text-navy-900 py-1">
                Our team
              </NavLink>
              <NavLink to="/placements" onClick={() => setOpen(false)} className="text-base font-extrabold text-navy-900 py-1">
                Placements
              </NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)} className="text-base font-extrabold text-navy-900 py-1">
                Contact us
              </NavLink>

              <MagneticButton as={Link} to="/contact" onClick={() => setOpen(false)} className="mt-3 w-full justify-center">
                Enroll Now
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
