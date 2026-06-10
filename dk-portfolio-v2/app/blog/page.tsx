import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Deepak P S — Cybersecurity Research & Insights",
  description: "Research papers, technical write-ups, CTF solutions, and cybersecurity insights from real-world engagements.",
};

import PageWrapper from "@/components/ui/PageWrapper";
import { getAllPosts } from "@/lib/mdx";

export default function BlogPage() {
  const postsData = getAllPosts();
  const posts = postsData.map(p => ({ ...p.meta, slug: p.slug }));

  return (
    <PageWrapper>
      <BlogClient posts={posts} />
    </PageWrapper>
  );
}
