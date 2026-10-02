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
    <footer className="relative isolate overflow-hidden rounded-t-[2.5rem] bg-[#040F20] py-16 text-white shadow-[0_-24px_60px_-30px_rgba(4,15,32,0.55)] sm:rounded-t-[3.5rem] md:py-20">
      {/* Same scene as the homepage hero: metro doors, navy grade, teal light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img src="/videos/metro-doors-poster.jpg" alt="" loading="lazy" className="h-full w-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,26,51,0.85)_0%,rgba(4,15,32,0.92)_55%,#040F20_100%)]" />
        <div className="absolute -top-32 left-1/2 h-[380px] w-[900px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[#12BFD1]/[0.14] blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#12BFD1]/10 blur-[110px]" />
      </div>

      <div className="container-max px-6 sm:px-8 lg:px-12 relative z-10 flex flex-wrap justify-between items-start gap-x-8 gap-y-12">
        {/* Brand & Intro Column */}
        <div className="w-full lg:w-auto max-w-sm flex flex-col gap-4">
          <Link to="/" className="inline-block self-start hover:opacity-90 transition-opacity">
            <img src="/thoughtflows-logo-light-720.png" width={720} height={165} alt="Thoughtflows Medical Coding Academy" className="h-auto w-[200px] md:w-[230px]" />
          </Link>
          <p className="text-white/65 text-sm md:text-base leading-relaxed font-normal">
            Enroll at Thoughtflows Medical Coding Academy for top-notch medical coding training. Comprehensive education and real hospital chart practice, ensuring students become proficient, certified coders.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/[0.07] text-white/90 text-xs font-bold px-3.5 py-1.5 rounded-full self-start shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <span>⭐ AAPC &amp; AHIMA Authorized Academy</span>
          </div>
        </div>

        {/* LINKS Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-[#7FE3EE] font-semibold text-[11px] md:text-xs tracking-[0.3em] uppercase whitespace-nowrap font-display">LINKS</h4>
                      </div>
          <ul className="flex flex-col gap-2.5 text-sm md:text-[15px] text-white/70 font-medium">
            {linksColumn.map((link) => (
              <li key={link.label} className="whitespace-nowrap">
                <Link to={link.to} className="group inline-flex items-center gap-1 hover:text-white hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#7FE3EE] shrink-0" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* AAPC Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-[#7FE3EE] font-semibold text-[11px] md:text-xs tracking-[0.3em] uppercase whitespace-nowrap font-display">AAPC</h4>
                      </div>
          <ul className="flex flex-col gap-2 text-sm md:text-[15px] text-white/70 font-medium">
            {aapcCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-white hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#7FE3EE] shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Speciality Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-[#7FE3EE] font-semibold text-[11px] md:text-xs tracking-[0.3em] uppercase whitespace-nowrap font-display">SPECIALITY</h4>
                      </div>
          <ul className="flex flex-col gap-2 text-sm md:text-[15px] text-white/70 font-medium">
            {specialityCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-white hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#7FE3EE] shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* AHIMA Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-[#7FE3EE] font-semibold text-[11px] md:text-xs tracking-[0.3em] uppercase whitespace-nowrap font-display">AHIMA</h4>
                      </div>
          <ul className="flex flex-col gap-2 text-sm md:text-[15px] text-white/70 font-medium">
            {ahimaCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-white hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#7FE3EE] shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* HIMAA Column */}
        <div className="shrink-0">
          <div className="mb-4">
            <h4 className="text-[#7FE3EE] font-semibold text-[11px] md:text-xs tracking-[0.3em] uppercase whitespace-nowrap font-display">HIMAA</h4>
                      </div>
          <ul className="flex flex-col gap-2 text-sm md:text-[15px] text-white/70 font-medium">
            {himaaCourses.map((c) => (
              <li key={c.label} className="whitespace-nowrap">
                <Link to={`/courses/${c.slug}`} className="group inline-flex items-center gap-1 hover:text-white hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#7FE3EE] shrink-0" />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="shrink-0 min-w-[220px]">
          <div className="mb-4">
            <h4 className="text-[#7FE3EE] font-semibold text-[11px] md:text-xs tracking-[0.3em] uppercase whitespace-nowrap font-display">CONTACT</h4>
                      </div>
          <div className="flex flex-col gap-3 text-sm md:text-base font-medium">
            <a href="tel:+919384576852" className="flex items-center gap-3 text-white transition-all group whitespace-nowrap bg-white/[0.06] hover:bg-white/[0.12] hover:-translate-y-0.5 p-2.5 rounded-2xl shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)] backdrop-blur-md">
              <span className="h-9 w-9 rounded-full bg-[#12BFD1]/90 text-white flex items-center justify-center transition-all shadow-sm shrink-0">
                <Phone size={16} />
              </span>
              <span className="font-extrabold text-white text-sm">+91-9384576852</span>
            </a>
            <a href="mailto:info@thoughtflows.in" className="flex items-center gap-3 text-white transition-all group whitespace-nowrap bg-white/[0.06] hover:bg-white/[0.12] hover:-translate-y-0.5 p-2.5 rounded-2xl shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)] backdrop-blur-md">
              <span className="h-9 w-9 rounded-full bg-[#12BFD1]/90 text-white flex items-center justify-center transition-all shadow-sm shrink-0">
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
                className="h-10 w-10 rounded-full bg-white/[0.07] hover:bg-white hover:text-[#063B7A] text-white flex items-center justify-center hover:-translate-y-0.5 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)] transition-all duration-300 backdrop-blur-md"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 pt-6">
        <div className="container-max px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-white/55">
          <p>© {CURRENT_YEAR} Thoughtflows Medical Coding Academy. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="font-display font-semibold uppercase tracking-[0.24em] text-[#7FE3EE]">India's No.1 Medical Coding Academy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

