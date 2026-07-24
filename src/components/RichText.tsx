import { Fragment } from "react";
import type { RichText as RichTextType } from "@/content/site.config";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/**
 * Renders a RichText array (a mix of plain strings and { text, href } link
 * segments) into inline content. Used by hero intro, story, and contact so
 * copy with inline accent links stays in the config, never in JSX.
 */
export function RichText({ value }: { value: RichTextType }) {
  return (
    <>
      {value.map((segment, i) => {
        if (typeof segment === "string") {
          return <Fragment key={i}>{segment}</Fragment>;
        }
        const external = isExternal(segment.href);
        return (
          <a
            key={i}
            href={segment.href}
            {...(external
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
          >
            {segment.text}
          </a>
        );
      })}
    </>
  );
}
