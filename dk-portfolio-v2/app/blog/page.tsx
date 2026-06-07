import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Deepak P S — Cybersecurity Research & Insights",
  description: "Research papers, technical write-ups, CTF solutions, and cybersecurity insights from real-world engagements.",
};

export default function BlogPage() {
  return <BlogClient />;
}
