import Link from "next/link";
import { site } from "@/content/site.config";
import { getAllPosts } from "@/lib/blog";
import { Section } from "@/components/Section";
import { PostRow } from "@/components/PostRow";
import { ArrowUpRight } from "@/components/icons";

/** Home Writing section. Self-hides entirely when there are no posts. */
export function Blog() {
  const posts = getAllPosts();
  if (posts.length === 0) return null;

  const shown = posts.slice(0, site.blog.maxInline);
  const hasMore = posts.length > shown.length;

  return (
    <Section
      id="writing"
      label={site.blog.label}
      description={site.blog.description}
      labelAside={
        hasMore ? (
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 font-mono text-[0.72rem] uppercase tracking-wide text-muted transition-colors hover:text-ink"
          >
            All writing
            <ArrowUpRight
              width={12}
              height={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        ) : null
      }
    >
      <ul className="divide-y divide-line border-y border-line">
        {shown.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </ul>
    </Section>
  );
}
