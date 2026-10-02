import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Linkedin, Youtube, Facebook, ChevronRight } from "lucide-react";

const linksColumn = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Blog", to: "/blogs" },
  { label: "Our team", to: "/about#team" },
  { label: "Placements", to: "/placements" },
  { label: "Contact", to: "/contact" }
];

const aapcCourses = [
  { label: "CPC", slug: "cpc-certification" },
  { label: "CIC", slug: "cic-certification" },
  { label: "CPMA", slug: "cpma-certification" },
  { label: "COC", slug: "coc-certification" },
  { label: "CRC", slug: "crc-certification" },
  { label: "CPB", slug: "cpb-certification" },
  { label: "CEDC", slug: "cedc-certification" },
  { label: "CEMC", slug: "cemc-certification" },
  { label: "CDEO", slug: "cdeo-certification" },
  { label: "CDEI", slug: "cdei-certification" },
  { label: "CPPM", slug: "cppm-certification" }
];

const specialityCourses = [
  { label: "Surgery", slug: "surgery-specialty-coding" },
  { label: "ED", slug: "ed-specialty-coding" },
  { label: "EM", slug: "em-specialty-coding" },
  { label: "Radiology", slug: "radiology-specialty-coding" },
  { label: "Anesthesia", slug: "anesthesia-specialty-coding" },
  { label: "IP DRG", slug: "ip-drg-coding" },
  { label: "HCC", slug: "hcc-risk-adjustment" },
  { label: "IVR", slug: "ivr-specialty-coding" },
  { label: "CDI", slug: "cdi-specialty-coding" }
];

const ahimaCourses = [
  { label: "CCS", slug: "ccs-certification" },
  { label: "CCS-P", slug: "ccs-p-certification" },
  { label: "RHIA", slug: "rhia-certification" },
  { label: "RHIT", slug: "rhit-certification" }
];

const himaaCourses = [
  { label: "CCC", slug: "ccc-certification" },
  { label: "HIM", slug: "him-certification" }
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#041E3F] via-[#063B7A] to-[#0A52A3] text-white overflow-hidden py-16 md:py-20 border-t border-[#12BFD1]/30 shadow-2xl">
      {/* Top glowing cyan gradient line accent */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#12BFD1] to-transparent opacity-90 pointer-events-none" />

      {/* Top ambient luminous cyan glow highlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[260px] pointer-events-none opacity-35"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(18,191,209,0.45), transparent 75%)"
        }}
      />
      <div className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full bg-[#12BFD1]/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-10 w-80 h-80 rounded-full bg-[#12BFD1]/15 blur-[120px] pointer-events-none" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-30" />

      <div className="container-max px-6 sm:px-8 lg:px-12 relative z-10 flex flex-wrap justify-between items-start gap-x-8 gap-y-12">
        {/* Brand & Intro Column */}
        <div className="w-full lg:w-auto max-w-sm flex flex-col gap-4">
          <Link to="/" className="inline-block self-start hover:opacity-90 transition-opacity">
            <img src="/thoughtflows-banner.png" alt="Thoughtflows Medical Coding Academy" className="h-10 md:h-12 w-auto object-contain" />
          </Link>
          <p className="text-white/85 text-sm md:text-base leading-relaxed font-normal">
            Enroll at Thoughtflows Medical Coding Academy for top-notch medical coding training. Comprehensive education and real hospital chart practice, ensuring students become proficient, certified coders.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-3.5 py-1.5 rounded-full self-start shadow-sm backdrop-blur-md">
            <span>⭐ AAPC &amp; AHIMA Authorized Academy</span>
          </div>
        </div>

        {/* LINKS Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-white font-extrabold text-sm md:text-base tracking-wider uppercase whitespace-nowrap font-display">LINKS</h4>
            <span className="block h-1 w-8 bg-[#12BFD1] rounded-full mt-1.5" />
          </div>
          <ul className="flex flex-col gap-2.5 text-sm md:text-base text-white/90 font-medium">
            {linksColumn.map((link) => (
              <li key={link.label} className="whitespace-nowrap">
                <Link to={link.to} className="group inline-flex items-center gap-1 hover:text-[#12BFD1] hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#12BFD1] shrink-0" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* AAPC Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-white font-extrabold text-sm md:text-base tracking-wider uppercase whitespace-nowrap font-display">AAPC</h4>
            <span className="block h-1 w-8 bg-[#12BFD1] rounded-full mt-1.5" />
          </div>
          <ul className="flex flex-col gap-2 text-sm md:text-base text-white/90 font-medium">
            {aapcCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-[#12BFD1] hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#12BFD1] shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Speciality Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-white font-extrabold text-sm md:text-base tracking-wider uppercase whitespace-nowrap font-display">SPECIALITY</h4>
            <span className="block h-1 w-8 bg-[#12BFD1] rounded-full mt-1.5" />
          </div>
          <ul className="flex flex-col gap-2 text-sm md:text-base text-white/90 font-medium">
            {specialityCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-[#12BFD1] hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#12BFD1] shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* AHIMA Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-white font-extrabold text-sm md:text-base tracking-wider uppercase whitespace-nowrap font-display">AHIMA</h4>
            <span className="block h-1 w-8 bg-[#12BFD1] rounded-full mt-1.5" />
          </div>
          <ul className="flex flex-col gap-2 text-sm md:text-base text-white/90 font-medium">
            {ahimaCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-[#12BFD1] hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#12BFD1] shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* HIMAA Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-white font-extrabold text-sm md:text-base tracking-wider uppercase whitespace-nowrap font-display">HIMAA</h4>
            <span className="block h-1 w-8 bg-[#12BFD1] rounded-full mt-1.5" />
          </div>
          <ul className="flex flex-col gap-2 text-sm md:text-base text-white/90 font-medium">
            {himaaCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-[#12BFD1] hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#12BFD1] shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="shrink-0 min-w-[220px]">
          <div className="mb-4">
            <h4 className="text-white font-extrabold text-sm md:text-base tracking-wider uppercase whitespace-nowrap font-display">CONTACT</h4>
            <span className="block h-1 w-8 bg-[#12BFD1] rounded-full mt-1.5" />
          </div>
          <div className="flex flex-col gap-3 text-sm md:text-base font-medium">
            <a href="tel:+919384576852" className="flex items-center gap-3 text-white hover:text-[#12BFD1] transition-all group whitespace-nowrap bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl border border-white/15 shadow-sm backdrop-blur-md">
              <span className="h-9 w-9 rounded-xl bg-[#12BFD1] text-white flex items-center justify-center transition-all shadow-sm shrink-0">
                <Phone size={16} />
              </span>
              <span className="font-extrabold text-white text-sm">+91-9384576852</span>
            </a>
            <a href="mailto:info@thoughtflows.in" className="flex items-center gap-3 text-white hover:text-[#12BFD1] transition-all group whitespace-nowrap bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl border border-white/15 shadow-sm backdrop-blur-md">
              <span className="h-9 w-9 rounded-xl bg-[#12BFD1] text-white flex items-center justify-center transition-all shadow-sm shrink-0">
                <Mail size={16} />
              </span>
              <span className="font-extrabold text-white text-sm">info@thoughtflows.in</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5 mt-5">
            {[
              { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
              { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
              { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
              { href: "https://youtube.com", Icon: Youtube, label: "YouTube" }
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-10 w-10 rounded-xl bg-white/10 hover:bg-[#12BFD1] text-white flex items-center justify-center hover:scale-110 shadow-sm hover:shadow-lg transition-all duration-300 border border-white/15 backdrop-blur-md"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 mt-14 pt-6">
        <div className="container-max px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-white/75">
          <p>© {CURRENT_YEAR} Thoughtflows Medical Coding Academy. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-[#12BFD1] font-bold">India's No.1 Medical Coding Academy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

