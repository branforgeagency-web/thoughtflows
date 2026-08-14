import { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import RevealOnScroll from "../RevealOnScroll";
import LoadingSpinner from "../LoadingSpinner";
import ErrorState from "../ErrorState";
import useFetch from "../../hooks/useFetch";

export default function TestimonialsSection() {
  const { data: testimonials, loading, error, refetch } = useFetch("/testimonials");
  const [index, setIndex] = useState(0);

  if (loading) return <LoadingSpinner label="Loading stories..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!testimonials || testimonials.length === 0) return null;

  const t = testimonials[index % testimonials.length];
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="px-6 md:px-10 lg:px-20 py-10 md:py-14 bg-slate-50 relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Our Testimonials"
          title="Hear from Our Successful Candidates"
          subtitle="From career-switchers to fresh graduates — hear how Thoughtflows changed their trajectory."
        />

        <RevealOnScroll>
          <div className="relative max-w-4xl mx-auto glass-strong rounded-3xl p-8 md:p-14 flex flex-col items-center text-center gap-6">
            <Quote className="text-teal-600/40" size={48} />
            <p className="text-lg md:text-2xl text-navy-900/90 font-medium leading-relaxed max-w-2xl">
              "{t.quote}"
            </p>
            <div className="flex gap-1">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-teal-400 text-teal-600" />
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <img src={t.photo} alt={t.name} className="h-14 w-14 rounded-full object-cover border-2 border-teal-400/40" />
              <div className="text-left">
                <p className="font-semibold text-navy-900">{t.name}</p>
                <p className="text-navy-900/50 text-sm">{t.role} {t.company ? `• ${t.company}` : ""}</p>
              </div>
            </div>
            {(t.beforeRole || t.afterRole) && (
              <div className="flex items-center gap-3 text-xs md:text-sm text-navy-900/50 glass rounded-full px-5 py-2 mt-2">
                <span>{t.beforeRole}</span>
                <ChevronRight size={14} className="text-teal-600" />
                <span className="text-teal-600 font-medium">{t.afterRole}</span>
              </div>
            )}

            <div className="flex items-center gap-4 mt-4">
              <button onClick={prev} aria-label="Previous testimonial" className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-navy-900/5 transition">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-teal-500" : "w-1.5 bg-navy-900/15"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} aria-label="Next testimonial" className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-navy-900/5 transition">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
