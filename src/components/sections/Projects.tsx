import Image from "next/image";
import { site, type Project } from "@/content/site.config";
import { Section } from "@/components/Section";
import { ArrowUpRight, GithubIcon } from "@/components/icons";

function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-wide text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-1">
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          className="icon-btn"
          aria-label={`${project.title} source code`}
          title="Source"
          target="_blank"
          rel="noreferrer noopener"
        >
          <GithubIcon width={16} height={16} />
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          className="icon-btn"
          aria-label={`${project.title} live site`}
          title="Live"
          target="_blank"
          rel="noreferrer noopener"
        >
          <ArrowUpRight width={16} height={16} />
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const primaryHref = project.liveUrl ?? project.repoUrl;
  const featured = project.featured;

  return (
    <article
      className={`group mb-4 flex break-inside-avoid flex-col overflow-hidden rounded-[16px] border border-line bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] ${
        featured ? "sm:flex-row [column-span:_all]" : ""
      }`}
    >
      {project.image && (
        <div
          className={`relative overflow-hidden bg-surface-2 ${
            featured ? "aspect-[16/10] sm:aspect-auto sm:w-1/2" : "aspect-[16/10] w-full"
          }`}
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes={featured ? "(max-width: 640px) 100vw, 368px" : "(max-width: 640px) 100vw, 360px"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className={`flex flex-1 flex-col p-5 ${featured ? "sm:justify-center" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg leading-tight">
            {primaryHref ? (
              <a
                href={primaryHref}
                className="transition-colors hover:text-accent"
                target="_blank"
                rel="noreferrer noopener"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <ProjectLinks project={project} />
        </div>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
          {project.description}
        </p>
        <TagList tags={project.tags} />
      </div>
    </article>
  );
}

export function Projects() {
  const { projects } = site;
  if (projects.items.length === 0) return null;

  return (
    <Section id="work" label={projects.label} description={projects.description}>
      <div className="sm:columns-2 [column-gap:1rem]">
        {projects.items.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
