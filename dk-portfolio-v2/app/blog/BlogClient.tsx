"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar, Search, Filter } from "lucide-react";
import { BlogPost } from "@/lib/blog-data";
import { SplitText } from "@/components/ui/fancy-components";
import { TiltCard } from "@/components/ui/TiltCard";

interface BlogClientProps {
  posts: BlogPost[];
}

const CATEGORIES = [
  { id: "all", label: "All Articles" },
  { id: "research", label: "Research" },
  { id: "pentest", label: "Pen Testing" },
  { id: "ctf", label: "CTF Write-ups" },
  { id: "cloud", label: "Cloud Security" },
  { id: "ai", label: "AI Security" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogClient({ posts }: BlogClientProps) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const featured = posts.find((p) => p.featured);
  const filtered = posts.filter((p) => {
    const matchCat = filter === "all" || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Page header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="section-eyebrow justify-center mb-4">Research & Insights</motion.div>
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                <SplitText text="Cybersecurity " className="inline-block" delay={0.05} />
                <span className="text-gradient-cyan">Blog</span>
              </h1>
            </motion.div>
            <motion.p variants={itemVariants} className="text-muted max-w-xl mx-auto leading-relaxed text-lg">
              Research papers, technical write-ups, CTF solutions, and cybersecurity insights from real-world engagements.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 relative z-10">
        {/* Featured Article */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            <div className="section-eyebrow mb-5">Featured Article</div>
            <Link href={`/blog/${featured.slug}`}>
              <TiltCard>
                <div className="glass-panel p-8 md:p-10 group h-full">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span
                      className="tag"
                      style={{ color: featured.categoryColor, background: `${featured.categoryColor}15`, border: `1px solid ${featured.categoryColor}30` }}
                    >
                      {featured.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <Calendar className="w-3 h-3" /> {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <Clock className="w-3 h-3" /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-snug">
                    {featured.title} <ArrowUpRight className="inline w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  <p className="text-muted leading-relaxed max-w-3xl mb-5 text-lg">{featured.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-muted shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>
        )}

        {/* Filters + Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-surface/30 p-4 rounded-2xl backdrop-blur-md border border-white/5">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === c.id ? "bg-primary text-[#02060D] shadow-[0_0_15px_rgba(0,229,255,0.4)]" : "bg-white/5 text-muted border border-white/10 hover:border-primary/40 hover:text-white"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2.5 bg-background/50 border border-white/10 rounded-xl text-sm text-white placeholder-muted/50 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.2)] w-full md:w-64 transition-all"
            />
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Link href={`/blog/${post.slug}`}>
                <div className="glass-panel p-6 flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="tag"
                      style={{ color: post.categoryColor, background: `${post.categoryColor}15`, border: `1px solid ${post.categoryColor}30` }}
                    >
                      {post.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-muted ml-auto">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-lg leading-snug mb-3 group-hover:text-primary transition-colors flex-grow">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-[10px] bg-white/5 border border-white/10 rounded text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-muted pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="text-primary flex items-center gap-1 font-medium opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                      Read Article <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-muted">
            <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted/50" />
            </div>
            <p className="text-lg">No articles found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
