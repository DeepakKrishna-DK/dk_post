import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS } from "@/lib/blog-data";
import { ArrowLeft, Calendar, Clock, Tag, Users, ArrowUpRight, BookOpen, FileText } from "lucide-react";

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Deepak P S`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#7A93B2] hover:text-[#00E5FF] transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase font-mono"
              style={{ color: post.categoryColor, background: `${post.categoryColor}15`, border: `1px solid ${post.categoryColor}30` }}
            >
              {post.categoryLabel}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#7A93B2]">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#7A93B2]">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">{post.title}</h1>
          <p className="text-[#7A93B2] text-lg leading-relaxed mb-6">{post.excerpt}</p>

          {/* Contributors */}
          {post.contributors && post.contributors.length > 0 && (
            <div className="flex flex-col gap-3 mt-8 mb-4 p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                <Users className="w-4 h-4 text-[#00E5FF]" />
                Contributors
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {post.contributors.map((c, i) => {
                  const ContributorContent = (
                    <>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#00FF66]/20 flex items-center justify-center text-[#00E5FF] font-bold text-sm border border-white/10 shrink-0 group-hover:border-[#00E5FF]/50 transition-colors">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium group-hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                          {c.name}
                          {c.link && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </div>
                        {c.role && <div className="text-[11px] text-[#7A93B2] uppercase tracking-wider mt-0.5">{c.role}</div>}
                      </div>
                    </>
                  );

                  return c.link ? (
                    <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group cursor-pointer">
                      {ContributorContent}
                    </a>
                  ) : (
                    <div key={i} className="flex items-center gap-3 group">
                      {ContributorContent}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-white/7">
          <Tag className="w-4 h-4 text-[#7A93B2]" />
          {post.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-[#7A93B2]">
              {t}
            </span>
          ))}
        </div>

        {/* Article body placeholder */}
        <div className="prose prose-invert max-w-none mt-16">
          <div className="card p-12 md:p-16 text-center space-y-6 border border-white/10 bg-[#02060D]/50 backdrop-blur-xl">
            <div className="flex justify-center mb-4">
              {post.externalLink ? (
                <div className="w-20 h-20 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                  <BookOpen className="w-10 h-10 text-[#00E5FF]" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,255,102,0.2)]">
                  <FileText className="w-10 h-10 text-[#00FF66]" />
                </div>
              )}
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
              {post.externalLink ? "Published in External Volume" : "Full Article Coming Soon"}
            </h2>
            <p className="text-[#7A93B2] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {post.statusMessage || `The full content for ${post.title} is being finalized. Check back soon.`}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8 pt-4">
              {post.externalLink && (
                <a href={post.externalLink} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex text-base py-3 px-8">
                  View Publication <ArrowUpRight className="w-5 h-5 ml-1.5" />
                </a>
              )}
              <Link href="/blog" className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold text-base hover:bg-white/10 transition-colors">
                ← Back to Articles
              </Link>
            </div>
          </div>
        </div>

        {/* Related posts */}
        <div className="mt-16">
          <h3 className="text-lg font-bold text-white mb-6">Related Articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {POSTS.filter((p) => p.slug !== slug).slice(0, 2).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <div className="card-hover p-5 group">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase font-mono mb-3"
                    style={{ color: p.categoryColor, background: `${p.categoryColor}15` }}
                  >
                    {p.categoryLabel}
                  </span>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#00E5FF] transition-colors leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#7A93B2] mt-2">{p.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
