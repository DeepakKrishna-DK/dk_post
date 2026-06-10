import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, Users, ArrowUpRight, BookOpen, FileText, Share2 } from "lucide-react";
import PageWrapper from "@/components/ui/PageWrapper";
import ShareModal from "@/components/ui/ShareModal";
import { getPostSlugs, getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.mdx?$/, "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const siteUrl = "https://dk-portfolio.vercel.app";

  return {
    title: `${post.meta.title} | Deepak P S - Research & Insights`,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.meta.date,
      authors: ["Deepak P S"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.excerpt,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = getPostBySlug(slug);
  if (!postData) notFound();

  const post = postData.meta;
  // Create share URL
  const shareUrl = `https://dk-portfolio.vercel.app/blog/${slug}`;

  return (
    <PageWrapper>
      <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#7A93B2] hover:text-[#00E5FF] transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Research & Insights
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
            
            {/* Share Modal */}
            <ShareModal title={post.title} url={shareUrl} />
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

        {/* Article Body */}
        <div className="prose prose-invert prose-cyan max-w-none mt-16 prose-p:text-[#94A3B8] prose-headings:text-white prose-a:text-[#00E5FF] hover:prose-a:text-[#00FF66] prose-strong:text-white prose-code:text-[#00FF66] prose-code:bg-[#00FF66]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#02060D] prose-pre:border prose-pre:border-white/10">
          <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          
          {post.externalLink && (
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
              <a href={post.externalLink} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex text-base py-3 px-8">
                View Full Publication <ArrowUpRight className="w-5 h-5 ml-1.5" />
              </a>
            </div>
          )}
        </div>

        {/* Related posts */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <h3 className="text-lg font-bold text-white mb-6">Related Articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {allPosts.filter((p) => p.slug !== slug).slice(0, 2).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <div className="card-hover p-5 group h-full">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase font-mono mb-3"
                    style={{ color: p.meta.categoryColor, background: `${p.meta.categoryColor}15` }}
                  >
                    {p.meta.categoryLabel}
                  </span>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#00E5FF] transition-colors leading-snug">
                    {p.meta.title}
                  </h4>
                  <p className="text-xs text-[#7A93B2] mt-2">{p.meta.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
    </PageWrapper>
  );
}
