import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Calendar, User, ArrowRight, BookOpen, Sparkles, Tag } from "lucide-react";
import PageHeader from "./PageHeader";
import RevealOnScroll from "../components/RevealOnScroll";
import FaqSection from "../components/sections/FaqSection";
import CTASection from "../components/sections/CTASection";
import { BLOG_POSTS } from "../data/blogs";
import { blogsFaqs } from "../config/pageFaqs";

const categories = ["All", "CPC Exam Tips", "Career Guidance", "RCM Careers", "Specialty Coding"];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((b) => b.featured) || BLOG_POSTS[0];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <PageHeader
        eyebrow="INSIGHTS & GUIDES"
        title="Medical Coding Knowledge Hub"
        subtitle="Expert insights, AAPC/AHIMA exam preparation guides, salary benchmarks, and clinical coding tutorials."
      />

      <section className="section-pad pt-0">
        <div className="container-max space-y-12">
          {/* Controls Bar: Search & Category Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#16ADBA] text-white shadow-lg shadow-teal-500/25 scale-105"
                      : "bg-white text-navy-900/70 hover:bg-slate-100 hover:text-navy-900 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles & topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-navy-900 focus:outline-none focus:border-[#16ADBA] shadow-inner transition"
              />
            </div>
          </div>

          {/* Featured Post Card (Only shown when no search query and 'All' category selected) */}
          {activeCategory === "All" && searchQuery === "" && featuredPost && (
            <RevealOnScroll>
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 grid lg:grid-cols-12 gap-0 group hover:shadow-2xl transition-all duration-500">
                <div className="lg:col-span-6 relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#16ADBA] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                    Featured Article
                  </div>
                </div>

                <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4 text-left">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#16ADBA]">
                      {featuredPost.category}
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 leading-snug group-hover:text-[#16ADBA] transition-colors">
                      <Link to={`/blogs/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h2>

                    <p className="text-navy-900/70 text-sm md:text-base leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-semibold text-navy-900">
                        <User size={14} className="text-[#16ADBA]" />
                        {featuredPost.author.split(",")[0]}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <Link
                      to={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 font-extrabold text-[#16ADBA] hover:translate-x-1 transition-transform"
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Grid of Articles */}
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-navy-900 text-left">
              {activeCategory === "All" ? "All Articles" : `${activeCategory} Articles`} ({filteredPosts.length})
            </h3>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200/80">
                <BookOpen size={40} className="mx-auto text-slate-400 mb-3" />
                <h4 className="text-lg font-bold text-navy-900">No articles found</h4>
                <p className="text-sm text-slate-500 mt-1">Try adjusting your search term or category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post, i) => (
                    <RevealOnScroll key={post.slug} delay={(i % 3) * 0.08}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 group flex flex-col justify-between h-full hover:shadow-2xl hover:border-teal-400/40 transition-all duration-300 text-left"
                      >
                        {/* Post Image */}
                        <div className="relative h-48 overflow-hidden bg-slate-900">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                          />
                          <span className="absolute top-3 right-3 bg-navy-950/80 backdrop-blur-md text-teal-300 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/20">
                            {post.category}
                          </span>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h4 className="font-extrabold text-navy-900 text-lg leading-snug group-hover:text-[#16ADBA] transition-colors line-clamp-2">
                              <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
                            </h4>
                            <p className="text-xs text-navy-900/65 leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-auto">
                            <span className="flex items-center gap-1 font-medium">
                              <Calendar size={13} />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1 font-medium text-teal-700">
                              <Clock size={13} />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </RevealOnScroll>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>

      <FaqSection items={blogsFaqs} />
      <CTASection />
    </>
  );
}
