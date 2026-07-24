import { site, type SocialPlatform } from "@/content/site.config";
import { SocialIcon } from "./icons";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/**
 * The icon row of social links, driven entirely by site.socials.
 * `exclude` lets a placement drop platforms (e.g. the hero omits email,
 * which lives in the contact section).
 */
export function SocialLinks({
  exclude = [],
  iconSize = 17,
}: {
  exclude?: SocialPlatform[];
  iconSize?: number;
}) {
  const items = site.socials.filter((s) => !exclude.includes(s.platform));
  if (items.length === 0) return null;

  return (
    <ul className="flex items-center gap-2">
      {items.map((s) => (
        <li key={s.platform}>
          <a
            href={s.href}
            className="icon-btn"
            aria-label={s.label}
            title={s.label}
            {...(isExternal(s.href)
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
          >
            <SocialIcon platform={s.platform} width={iconSize} height={iconSize} />
          </a>
        </li>
      ))}
    </ul>
  );
}
