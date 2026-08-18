import { useState, useMemo } from "react";
import { Play, X } from "lucide-react";
import PageHeader from "./PageHeader";
import RevealOnScroll from "../components/RevealOnScroll";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import FaqSection from "../components/sections/FaqSection";
import CTASection from "../components/sections/CTASection";
import useFetch from "../hooks/useFetch";
import { galleryFaqs } from "../config/pageFaqs";

const categories = ["All", "classrooms", "students", "trainers", "events", "workshops", "branches", "certifications"];

export default function Gallery() {
  const { data: items, loading, error, refetch } = useFetch("/gallery");
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(() => {
    if (!items) return [];
    return active === "All" ? items : items.filter((i) => i.category === active);
  }, [items, active]);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from the Thoughtflows journey"
        subtitle="Classrooms, workshops, certifications, and everything in between — across all 15 branches."
      />

      <section className="section-pad pt-0">
        <div className="container-max">
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-xs font-medium capitalize transition ${
                  active === cat ? "bg-teal-500 text-ink-950" : "glass text-navy-900/60 hover:text-navy-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading && <LoadingSpinner label="Loading gallery..." />}
          {error && <ErrorState message={error} onRetry={refetch} />}

          {items && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filtered.map((item, i) => (
                <RevealOnScroll key={item._id} delay={(i % 4) * 0.06}>
                  <button
                    onClick={() => setLightbox(item)}
                    className="relative group rounded-2xl overflow-hidden h-48 md:h-56 w-full block"
                  >
                    <img src={item.url} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                      <p className="text-navy-900 text-xs font-medium text-left">{item.title}</p>
                    </div>
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-ink-950/30">
                        <Play className="text-navy-900" size={24} />
                      </div>
                    )}
                  </button>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      <FaqSection items={galleryFaqs} />
      <CTASection />

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-ink-950/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-navy-900/60 hover:text-navy-900" onClick={() => setLightbox(null)}>
            <X size={28} />
          </button>
          <img src={lightbox.url} alt={lightbox.title} className="max-h-[85vh] max-w-full rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
