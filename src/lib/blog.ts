import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parseFile(fileName: string): Post | null {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  if (data.published === false) return null;
  if (!data.title) return null;

  return {
    slug,
    title: String(data.title),
    description: data.description ? String(data.description) : "",
    date: data.date ? String(data.date) : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: readingMinutes(content),
    content,
  };
}

/** All published posts, newest first. Returns [] when the folder is empty. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parseFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map(({ content: _content, ...meta }) => meta);
}

export function getPost(slug: string): Post | null {
  if (!fs.existsSync(POSTS_DIR)) return null;
  for (const ext of [".mdx", ".md"]) {
    const file = `${slug}${ext}`;
    if (fs.existsSync(path.join(POSTS_DIR, file))) return parseFile(file);
  }
  return null;
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function formatDate(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
