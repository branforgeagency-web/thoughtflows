import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowRight, Search, ExternalLink, Building2, Sparkles } from "lucide-react";
import PageHeader from "./PageHeader";
import RevealOnScroll from "../components/RevealOnScroll";
import LoadingSpinner from "../components/LoadingSpinner";
import FaqSection from "../components/sections/FaqSection";
import CTASection from "../components/sections/CTASection";
import useFetch from "../hooks/useFetch";
import { BRANCHES } from "../data/branches";
import { branchesFaqs } from "../config/pageFaqs";

export default function Branches() {
  const { data: apiBranches, loading } = useFetch("/branches");
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  // Always use authoritative real BRANCHES dataset from homepage as primary source
  const allBranches = useMemo(() => {
    return BRANCHES.map((staticB) => {
      const apiMatch = apiBranches?.find(
        (a) => a.slug === staticB.id || a.slug === staticB.slug || a.name?.toLowerCase().includes(staticB.name.toLowerCase())
      );
      return {
        ...staticB,
        heroImage: staticB.img || staticB.heroImage,
        phone: apiMatch?.phone || staticB.phone || "+91 98765 43210",
        email: apiMatch?.email || staticB.email || "info@thoughtflows.in",
        isFlagship: staticB.name === "Ameerpet" || apiMatch?.isFlagship
      };
    });
  }, [apiBranches]);

  const citiesList = [
    { id: "all", label: "All Cities" },
    { id: "hyderabad", label: "Hyderabad" },
    { id: "coimbatore", label: "Coimbatore" },
    { id: "trichy", label: "Trichy" },
    { id: "salem", label: "Salem" },
    { id: "kochi", label: "Kochi" },
    { id: "trivandrum", label: "Trivandrum" },
    { id: "vizag", label: "Vizag" },
    { id: "tirupathi", label: "Tirupathi" }
  ];

  const filtered = useMemo(() => {
    return allBranches.filter((b) => {
      const matchesSearch = `${b.name} ${b.city} ${b.state || ""} ${b.address}`
        .toLowerCase()
        .includes(query.toLowerCase());
      
      const matchesCityFilter = selectedCity === "all" ? true : b.city?.toLowerCase().includes(selectedCity);
      return matchesSearch && matchesCityFilter;
    });
  }, [allBranches, query, selectedCity]);

  return (
    <>
      <PageHeader
        eyebrow="15 Branches Pan-India"
        title="A campus wherever your career needs one"
        subtitle="Every Thoughtflows branch delivers the same industry-aligned curriculum, expert trainers, and 100% placement support."
      />

      <section className="section-pad pt-0 bg-[#FAF8F5]">
        <div className="container-max px-6">
          
          {/* Search & City Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-900/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by branch name, city, or address..."
                className="w-full bg-white rounded-full pl-11 pr-4 py-3 text-sm text-navy-900 placeholder:text-navy-900/40 outline-none border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 shadow-sm transition-all"
              />
            </div>

            {/* City Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {citiesList.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCity(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    selectedCity === c.id
                      ? "bg-teal-500 text-white shadow-md"
                      : "bg-white text-navy-900/70 hover:bg-teal-50 hover:text-teal-600 border border-slate-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="py-10 text-center">
              <LoadingSpinner label="Loading branch campuses..." />
            </div>
          )}

          {/* Branch Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((branch, i) => (
              <RevealOnScroll key={branch.id || branch._id} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100/90 flex flex-col h-full hover:shadow-2xl hover:border-teal-400/40 transition-all duration-300"
                >
                  {/* Card Header Image Showcase */}
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={branch.img || branch.heroImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"}
                      alt={`${branch.name} Campus`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                      <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/20">
                        {branch.code || "CAMPUS"}
                      </span>
                      {branch.isFlagship && (
                        <span className="bg-teal-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles size={11} /> Flagship
                        </span>
                      )}
                    </div>

                    {/* Bottom Location Info */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-xs font-semibold text-teal-300 flex items-center gap-1.5">
                        <MapPin size={13} /> {branch.city}
                      </span>
                      <h3 className="font-extrabold text-xl leading-snug">{branch.name}</h3>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                    <div className="space-y-2">
                      <p className="text-navy-900/75 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {branch.address}
                      </p>
                      
                      {branch.phone && (
                        <p className="text-navy-900/60 text-xs font-semibold flex items-center gap-1.5 pt-1">
                          <Phone size={13} className="text-teal-600 shrink-0" /> {branch.phone}
                        </p>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                      {branch.gmapUrl ? (
                        <a
                          href={branch.gmapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-teal-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <span>Directions</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : <span />}

                      <Link
                        to={`/branches/${branch.id || branch.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-extrabold bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all group/btn"
                      >
                        <span>View Campus</span>
                        <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 mt-8">
              <Building2 size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-navy-900/60 text-base font-semibold">No branches match your search criteria.</p>
              <button
                type="button"
                onClick={() => { setQuery(""); setSelectedCity("all"); }}
                className="mt-3 text-teal-600 font-bold text-sm hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}

        </div>
      </section>

      <FaqSection items={branchesFaqs} />
      <CTASection />
    </>
  );
}
