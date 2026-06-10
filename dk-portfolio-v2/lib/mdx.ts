import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './blog-data'; // Ensure we use the same type or export a new one

const POSTS_PATH = path.join(process.cwd(), 'content', 'blog');

export const getPostSlugs = () => {
  if (!fs.existsSync(POSTS_PATH)) return [];
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
};

export const getPostBySlug = (slug: string) => {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug: realSlug,
    meta: data as BlogPost,
    content,
  };
};

export const getAllPosts = () => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => post !== null)
    // Sort posts by date in descending order
    .sort((post1, post2) => (new Date(post1.meta.date) > new Date(post2.meta.date) ? -1 : 1));
  
  return posts;
};
