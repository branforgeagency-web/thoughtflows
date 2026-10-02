import { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, Award } from "lucide-react";
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
    <section className="px-6 md:px-10 lg:px-20 py-16 md:py-24 bg-[#F8FCFD] relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#12BFD1]/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#A1E7F0]/30 blur-[130px] pointer-events-none" />

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="Student Success Stories"
          title="Hear from Our Certified Graduates"
          subtitle="From career-switchers to fresh graduates — hear how Thoughtflows transformed their career trajectories."
        />

        <RevealOnScroll>
          <div className="relative max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col items-center text-center gap-6 shadow-[0_20px_50px_-10px_rgba(6,59,122,0.08)] border border-[#12BFD1]/20">
            
            {/* Watermark Quote Icon */}
            <div className="h-16 w-16 rounded-2xl bg-[#E7F9FB] text-[#12BFD1] flex items-center justify-center shadow-inner mb-2 border border-[#12BFD1]/30">
              <Quote size={32} />
            </div>

            <p className="text-xl md:text-2xl text-[#063B7A] font-bold leading-relaxed max-w-2xl font-display">
              "{t.quote}"
            </p>

            <div className="flex gap-1.5">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-[#12BFD1] text-[#12BFD1]" />
              ))}
            </div>

            <div className="flex items-center gap-4 mt-2">
              <img src={t.photo} alt={t.name} className="h-14 w-14 rounded-2xl object-cover border-2 border-[#12BFD1] shadow-md" />
              <div className="text-left">
                <p className="font-extrabold text-base text-[#063B7A]">{t.name}</p>
                <p className="text-[#6B7C8F] text-xs font-semibold">{t.role} {t.company ? `• ${t.company}` : ""}</p>
              </div>
            </div>

            {(t.beforeRole || t.afterRole) && (
              <div className="flex items-center gap-3 text-xs md:text-sm text-[#063B7A] bg-[#E7F9FB] border border-[#12BFD1]/25 rounded-full px-5 py-2.5 mt-2 font-bold shadow-sm">
                <span className="text-[#6B7C8F]">{t.beforeRole}</span>
                <ChevronRight size={16} className="text-[#12BFD1]" />
                <span className="text-[#12BFD1] font-extrabold">{t.afterRole}</span>
              </div>
            )}

            <div className="flex items-center gap-5 mt-6">
              <button onClick={prev} aria-label="Previous testimonial" className="h-11 w-11 rounded-full bg-white border border-[#12BFD1]/30 text-[#063B7A] flex items-center justify-center hover:bg-[#E7F9FB] hover:text-[#12BFD1] transition shadow-sm cursor-pointer">
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${i === index ? "w-8 bg-[#12BFD1]" : "w-2 bg-[#063B7A]/20"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button onClick={next} aria-label="Next testimonial" className="h-11 w-11 rounded-full bg-white border border-[#12BFD1]/30 text-[#063B7A] flex items-center justify-center hover:bg-[#E7F9FB] hover:text-[#12BFD1] transition shadow-sm cursor-pointer">
                <ChevronRight size={20} />
              </button>
            </div>

          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

