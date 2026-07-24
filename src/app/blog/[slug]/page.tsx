import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPost, getPostSlugs, formatDate } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx";
import { site } from "@/content/site.config";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${site.meta.url}/blog/${slug}`,
      publishedTime: post.date || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  return (
    <main id="main" className="px-6 py-16 sm:px-10">
      <Link
        href="/blog"
        className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
      >
        &larr; Writing
      </Link>

      <article className="mt-6">
        <header className="border-b border-line pb-7">
          <p className="section-label">
            {formatDate(post.date)}
            {post.readingMinutes ? ` · ${post.readingMinutes} min read` : ""}
          </p>
          <h1 className="mt-3 font-serif text-[2rem] leading-[1.1] tracking-tight sm:text-[2.6rem]">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-3 max-w-prose text-lg text-muted">{post.description}</p>
          )}
          {post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-wide text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="mt-8 max-w-prose">{content}</div>
      </article>
    </main>
  );
}
