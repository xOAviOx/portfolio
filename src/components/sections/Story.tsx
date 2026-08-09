import type { CSSProperties } from "react";
import { site } from "@/content/site.config";
import { Section } from "@/components/Section";
import { RichText } from "@/components/RichText";
import { FileIcon } from "@/components/icons";

export function Story() {
  const { story } = site;
  if (story.paragraphs.length === 0) return null;

  return (
    <Section id="about" label={story.label}>
      <div className="max-w-prose space-y-4">
        {story.paragraphs.map((paragraph, i) => (
          <p
            key={i}
            data-reveal
            className="prose-body"
            style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
          >
            <RichText value={paragraph} />
          </p>
        ))}
      </div>

      {story.resume && (
        <a
          href={story.resume.href}
          data-reveal
          className="btn btn-ghost mt-8"
          {...(story.resume.external
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          <FileIcon width={16} height={16} />
          {story.resume.label}
        </a>
      )}
    </Section>
  );
}
