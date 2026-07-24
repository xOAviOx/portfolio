import { site } from "@/content/site.config";
import { Section } from "@/components/Section";
import { RichText } from "@/components/RichText";
import { SocialLinks } from "@/components/SocialLinks";

export function Contact() {
  const { contact } = site;

  return (
    <Section id="contact" label={contact.label}>
      <div className="max-w-prose">
        <p className="font-serif text-[1.6rem] leading-[1.2] tracking-tight sm:text-[2.1rem]">
          {contact.headline}
        </p>

        <p className="prose-body mt-5">
          <RichText value={contact.description} />
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={contact.cta.href}
            className="btn btn-primary"
            {...(/^https?:\/\//.test(contact.cta.href)
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
          >
            {contact.cta.label}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="font-mono text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {contact.email}
          </a>
        </div>

        <div className="mt-9">
          <SocialLinks iconSize={18} />
        </div>
      </div>
    </Section>
  );
}
