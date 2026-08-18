import { Star, ChevronRight } from "lucide-react";
import PageHeader from "./PageHeader";
import RevealOnScroll from "../components/RevealOnScroll";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import FaqSection from "../components/sections/FaqSection";
import CTASection from "../components/sections/CTASection";
import useFetch from "../hooks/useFetch";
import { successStoriesFaqs } from "../config/pageFaqs";

export default function SuccessStories() {
  const { data: testimonials, loading, error, refetch } = useFetch("/testimonials");

  return (
    <>
      <PageHeader
        eyebrow="Student Success"
        title="5000+ career journeys. Every one different, every one real."
        subtitle="From career-switchers to fresh graduates — these are the transformations behind our 95% placement rate."
      />

      <section className="section-pad pt-0">
        <div className="container-max">
          {loading && <LoadingSpinner label="Loading stories..." />}
          {error && <ErrorState message={error} onRetry={refetch} />}

          {testimonials && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <RevealOnScroll key={t._id} delay={(i % 3) * 0.1}>
                  <div className="glass rounded-2xl p-7 h-full flex flex-col gap-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-400/30 hover:shadow-glow">
                    <div className="flex items-center gap-3">
                      <img src={t.photo} alt={t.name} className="h-12 w-12 rounded-full object-cover border-2 border-teal-400/30" />
                      <div>
                        <p className="text-navy-900 font-medium text-sm">{t.name}</p>
                        <p className="text-navy-900/40 text-xs">{t.role} {t.company && `• ${t.company}`}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                        <Star key={idx} size={13} className="fill-teal-400 text-teal-600" />
                      ))}
                    </div>
                    <p className="text-navy-900/60 text-sm leading-relaxed flex-1">"{t.quote}"</p>
                    {(t.beforeRole || t.afterRole) && (
                      <div className="flex items-center gap-2 text-xs text-navy-900/50 glass rounded-full px-4 py-2 w-fit">
                        <span>{t.beforeRole}</span>
                        <ChevronRight size={12} className="text-teal-600" />
                        <span className="text-teal-600 font-medium">{t.afterRole}</span>
                      </div>
                    )}
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      <FaqSection items={successStoriesFaqs} />
      <CTASection />
    </>
  );
}
