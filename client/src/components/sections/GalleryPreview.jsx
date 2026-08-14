import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import SectionHeading from "../SectionHeading";
import RevealOnScroll from "../RevealOnScroll";
import MagneticButton from "../MagneticButton";
import LoadingSpinner from "../LoadingSpinner";
import useFetch from "../../hooks/useFetch";

export default function GalleryPreview() {
  const { data: items, loading } = useFetch("/gallery");

  if (loading) return <LoadingSpinner label="Loading gallery..." />;

  return (
    <section className="section-pad bg-white relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Gallery"
          title="Life inside Thoughtflows"
          subtitle="Classrooms, workshops, certifications, and the moments that shape every coder's journey."
        />

        {items && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[200px]">
            {items.slice(0, 8).map((item, i) => (
              <RevealOnScroll
                key={item._id}
                delay={(i % 4) * 0.06}
                className={i === 0 ? "col-span-2 row-span-2" : ""}
              >
                <div className="relative group rounded-2xl overflow-hidden h-full">
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <p className="text-navy-900 text-sm font-medium">{item.title}</p>
                  </div>
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-ink-950/30">
                      <Play className="text-navy-900" size={28} />
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-14">
          <MagneticButton as={Link} to="/gallery" variant="outline">
            View Full Gallery <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
