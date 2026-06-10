import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, Users, ArrowUpRight, BookOpen, FileText, Share2 } from "lucide-react";
import PageWrapper from "@/components/ui/PageWrapper";
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
  const content = postData.content;
  const allPosts = getAllPosts();
  
  // Create share URL
  const shareUrl = `https://dk-portfolio.vercel.app/blog/${slug}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

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
            
            {/* Share Buttons */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[#7A93B2] text-xs font-semibold mr-1">Share:</span>
              <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" title="Share on X (Twitter)" className="inline-flex items-center justify-center w-7 h-7 bg-white/5 text-[#7A93B2] border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 3.974H5.078z"/></svg>
              </a>
              <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn" className="inline-flex items-center justify-center w-7 h-7 bg-white/5 text-[#7A93B2] border border-white/10 rounded-full hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
              </a>
              <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" title="Share on Facebook" className="inline-flex items-center justify-center w-7 h-7 bg-white/5 text-[#7A93B2] border border-white/10 rounded-full hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
              </a>
            </div>
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
