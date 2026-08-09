import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/blog";
import { ArrowUpRight } from "./icons";

/** A single blog row, shared by the home Writing section and the /blog list. */
export function PostRow({ post }: { post: PostMeta }) {
  return (
    <li data-reveal>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-center justify-between gap-5 py-5"
      >
        <div className="min-w-0">
          <h3 className="font-serif text-[1.15rem] leading-snug transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-faint">
            {formatDate(post.date)}
            {post.readingMinutes ? ` · ${post.readingMinutes} min read` : ""}
          </p>
        </div>
        <span className="btn btn-ghost shrink-0 text-[0.82rem]">
          Open
          <ArrowUpRight
            width={14}
            height={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
    </li>
  );
}
