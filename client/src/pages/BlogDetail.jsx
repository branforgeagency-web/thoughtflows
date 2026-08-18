import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, Tag, Share2, ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import MagneticButton from "../components/MagneticButton";
import CTASection from "../components/sections/CTASection";
import NotFound from "./NotFound";
import { BLOG_POSTS, getBlogBySlug } from "../data/blogs";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  const relatedPosts = BLOG_POSTS.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Header Banner */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-[#072432] pt-32 pb-20 text-white relative overflow-hidden">
        <div className="container-max px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-6 relative z-10 text-left">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 hover:text-teal-200 transition mb-2"
          >
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#16ADBA] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-white/60 text-xs flex items-center gap-1">
              <Calendar size={13} />
              {post.date}
            </span>
            <span className="text-white/60 text-xs">•</span>
            <span className="text-teal-300 text-xs font-semibold flex items-center gap-1">
              <Clock size={13} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white tracking-tight">
            {post.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <div className="h-10 w-10 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 font-extrabold text-sm">
              <User size={18} />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">{post.author}</p>
              <p className="text-xs text-white/60">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content */}
      <section className="py-12 md:py-16">
        <div className="container-max px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto space-y-10">
          {/* Cover Image */}
          <RevealOnScroll>
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 h-[320px] sm:h-[420px]">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </RevealOnScroll>

          {/* Article Text */}
          <RevealOnScroll>
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 text-left space-y-6 text-navy-900 leading-relaxed text-base md:text-lg">
              <div className="font-semibold text-slate-600 text-lg border-l-4 border-[#16ADBA] pl-4 italic bg-slate-50 py-3 rounded-r-xl">
                {post.excerpt}
              </div>

              <div className="space-y-6 text-slate-800 whitespace-pre-line font-sans text-base md:text-lg">
                {post.content}
              </div>

              {/* Tags */}
              <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-2">
                  <Tag size={14} /> TAGS:
                </span>
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Related Posts */}
          <div className="space-y-6 pt-6 text-left">
            <h3 className="text-2xl font-extrabold text-navy-900">Related Insights & Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blogs/${r.slug}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-md hover:shadow-xl transition-all space-y-3 group block"
                >
                  <span className="text-[10px] font-extrabold uppercase text-[#16ADBA] bg-teal-50 px-2.5 py-0.5 rounded-full">
                    {r.category}
                  </span>
                  <h4 className="font-extrabold text-navy-900 text-sm group-hover:text-[#16ADBA] transition-colors line-clamp-2">
                    {r.title}
                  </h4>
                  <span className="text-xs font-bold text-teal-600 inline-flex items-center gap-1 pt-2">
                    Read Post <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
