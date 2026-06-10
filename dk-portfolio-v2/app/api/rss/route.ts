import { getAllPosts } from "@/lib/mdx";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPosts();
  // Using the domain from your share URL
  const siteUrl = "https://dk-portfolio.vercel.app";

  const feedItems = posts.map((post) => {
    // Attempt to parse the date, fallback to current date if it fails
    const pubDate = new Date(post.meta.date).toUTCString();

    return `
      <item>
        <title><![CDATA[${post.meta.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid>${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${pubDate !== "Invalid Date" ? pubDate : new Date().toUTCString()}</pubDate>
        <description><![CDATA[${post.meta.excerpt}]]></description>
      </item>
    `;
  }).join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Deepak P S - Research & Insights</title>
        <link>${siteUrl}/blog</link>
        <description>Latest cybersecurity research and insights from Deepak P S.</description>
        ${feedItems}
      </channel>
    </rss>
  `;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
