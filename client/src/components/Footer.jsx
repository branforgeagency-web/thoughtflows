import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Linkedin, Youtube, Facebook, ChevronRight } from "lucide-react";

const linksColumn = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Blog", to: "/blog" },
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

export default function Footer() {
  return (
    <footer className="relative bg-[#181427] text-white overflow-hidden py-12 md:py-14 border-t border-white/10">
      {/* Top ambient glow highlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[250px] pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(22,173,186,0.28), transparent 75%)"
        }}
      />

      <div className="container-max px-6 md:px-10 lg:px-16 relative z-10 flex flex-wrap justify-between items-start gap-x-6 gap-y-10">
        {/* Brand & Intro Column */}
        <div className="w-full lg:w-auto max-w-sm flex flex-col gap-4">
          <Link to="/" className="inline-block self-start hover:opacity-90 transition-opacity">
            <img src="/thoughtflows-banner.png" alt="Thoughtflows Medical Coding Academy" className="h-10 md:h-12 w-auto object-contain" />
          </Link>
          <p className="text-white/80 text-sm md:text-base leading-relaxed font-normal">
            Enroll at Thoughtflows Medical Coding Academy for top-notch medical coding training. Our courses are designed to provide comprehensive education and practical experience, ensuring students become proficient and certified medical coders.
          </p>
        </div>

        {/* LINKS Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-white font-bold text-base md:text-lg tracking-wider uppercase whitespace-nowrap">LINKS</h4>
            <span className="block h-1 w-8 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mt-1.5" />
          </div>
          <ul className="flex flex-col gap-2.5 text-sm md:text-base text-white/90 font-medium">
            {linksColumn.map((link) => (
              <li key={link.label} className="whitespace-nowrap">
                <Link to={link.to} className="group inline-flex items-center gap-1 hover:text-teal-300 hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* AAPC Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-white font-bold text-base md:text-lg tracking-wider uppercase whitespace-nowrap">AAPC</h4>
            <span className="block h-1 w-8 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mt-1.5" />
          </div>
          <ul className="flex flex-col gap-2 text-sm md:text-base text-white/90 font-medium">
            {aapcCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-teal-300 hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Speciality Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-white font-bold text-base md:text-lg tracking-wider uppercase whitespace-nowrap">SPECIALITY</h4>
            <span className="block h-1 w-8 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mt-1.5" />
          </div>
          <ul className="flex flex-col gap-2 text-sm md:text-base text-white/90 font-medium">
            {specialityCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-teal-300 hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* AHIMA Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-white font-bold text-base md:text-lg tracking-wider uppercase whitespace-nowrap">AHIMA</h4>
            <span className="block h-1 w-8 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mt-1.5" />
          </div>
          <ul className="flex flex-col gap-2 text-sm md:text-base text-white/90 font-medium">
            {ahimaCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-teal-300 hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* HIMAA Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-white font-bold text-base md:text-lg tracking-wider uppercase whitespace-nowrap">HIMAA</h4>
            <span className="block h-1 w-8 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mt-1.5" />
          </div>
          <ul className="flex flex-col gap-2 text-sm md:text-base text-white/90 font-medium">
            {himaaCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-teal-300 hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="shrink-0 min-w-[220px]">
          <div className="mb-4">
            <h4 className="text-white font-bold text-base md:text-lg tracking-wider uppercase whitespace-nowrap">CONTACT</h4>
            <span className="block h-1 w-8 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mt-1.5" />
          </div>
          <div className="flex flex-col gap-3.5 text-sm md:text-base font-medium">
            <a href="tel:+919384576852" className="flex items-center gap-3 hover:text-teal-300 transition-colors group whitespace-nowrap">
              <span className="h-9 w-9 rounded-lg bg-teal-500/25 text-teal-300 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors shadow-md shrink-0">
                <Phone size={16} />
              </span>
              <span className="font-semibold text-white group-hover:text-teal-300">+91-9384576852</span>
            </a>
            <a href="mailto:info@thoughtflows.in" className="flex items-center gap-3 hover:text-teal-300 transition-colors group whitespace-nowrap">
              <span className="h-9 w-9 rounded-lg bg-teal-500/25 text-teal-300 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors shadow-md shrink-0">
                <Mail size={16} />
              </span>
              <span className="font-semibold text-white group-hover:text-teal-300">info@thoughtflows.in</span>
            </a>
          </div>

          <div className="flex items-center gap-3 mt-4">
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
                className="h-9 w-9 rounded-lg bg-white/10 hover:bg-teal-500 text-white flex items-center justify-center hover:scale-110 hover:shadow-glow transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6">
        <div className="container-max px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm text-white/60">
          <p>© {new Date().getFullYear()} Thoughtflows Medical Coding Academy. All rights reserved.</p>
          <p className="text-teal-300 font-medium">India's No.1 Medical Coding Academy</p>
        </div>
      </div>
    </footer>
  );
}
