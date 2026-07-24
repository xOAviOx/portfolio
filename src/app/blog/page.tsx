import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/content/site.config";
import { getAllPosts } from "@/lib/blog";
import { PostRow } from "@/components/PostRow";

export const metadata: Metadata = {
  title: "Writing",
  description: site.blog.description || `Writing by ${site.meta.name}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main id="main" className="px-6 py-16 sm:px-10">
      <Link
        href="/"
        className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
      >
        &larr; Home
      </Link>

      <h1 className="mt-6 font-serif text-[2.25rem] leading-tight tracking-tight">
        {site.blog.label}
      </h1>
      {site.blog.description && (
        <p className="mt-2 max-w-prose text-muted">{site.blog.description}</p>
      )}

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">No posts yet — check back soon.</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ul>
      )}
    </main>
  );
}
