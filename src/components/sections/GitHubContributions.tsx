import type { CSSProperties } from "react";
import { site } from "@/content/site.config";
import { Section } from "@/components/Section";
import { getContributions, type ContribDay } from "@/lib/github";

const CELL = 11;
const GAP = 3;

const LEVEL_BG = [
  "color-mix(in srgb, var(--ink) 7%, var(--surface))",
  "color-mix(in srgb, var(--accent) 28%, var(--surface))",
  "color-mix(in srgb, var(--accent) 50%, var(--surface))",
  "color-mix(in srgb, var(--accent) 74%, var(--surface))",
  "var(--accent)",
] as const;

function cellStyle(level: ContribDay["level"]) {
  return {
    width: CELL,
    height: CELL,
    borderRadius: 2,
    backgroundColor: LEVEL_BG[level],
  };
}

function monthShort(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", { month: "short" });
}

export async function GitHubContributions() {
  const { github } = site;
  const data = await getContributions(github.username, github.revalidateSeconds);

  // One label at the first week of each new month.
  let last = "";
  const monthLabels = data.weeks.map((week) => {
    const first = week[0]?.date;
    if (!first) return "";
    const m = monthShort(first);
    if (m !== last) {
      last = m;
      return m;
    }
    return "";
  });

  const summary = data.isFallback
    ? "Sample contribution graph"
    : `${data.total.toLocaleString()} contributions in the last year`;

  return (
    <Section
      id="github"
      label={github.label}
      labelAside={
        <span className="font-mono text-[0.72rem] tracking-wide text-muted">
          @{github.username}
        </span>
      }
    >
      <div className="overflow-x-auto pb-1">
        <div
          data-reveal
          style={{ ["--reveal-y"]: "0px" } as CSSProperties}
          className="inline-flex min-w-max flex-col"
          role="img"
          aria-label={
            data.isFallback
              ? "Sample GitHub contribution graph (add a token to show live data)"
              : `GitHub contribution graph: ${summary}`
          }
        >
          {/* Month labels */}
          <div className="mb-1.5 flex font-mono text-[0.62rem] text-muted" style={{ gap: GAP }}>
            {monthLabels.map((m, i) => (
              <div key={i} style={{ width: CELL }} className="whitespace-nowrap">
                {m}
              </div>
            ))}
          </div>

          {/* Week columns */}
          <div className="flex" style={{ gap: GAP }}>
            {data.weeks.map((week, wi) => (
              <div
                key={wi}
                className="gh-col flex flex-col"
                style={{ gap: GAP, ["--col-delay"]: `${wi * 11}ms` } as CSSProperties}
              >
                {week.map((day) => (
                  <span
                    key={day.date}
                    style={cellStyle(day.level)}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Total + legend */}
      <div
        data-reveal
        className="mt-4 flex flex-wrap items-center justify-between gap-3"
      >
        <p className="text-sm text-muted">
          {summary}
          {data.isFallback && (
            <span className="ml-2 font-mono text-[0.68rem] uppercase tracking-wide text-faint">
              — set GITHUB_TOKEN for live data
            </span>
          )}
        </p>
        <div className="flex items-center gap-1.5 font-mono text-[0.68rem] text-muted">
          <span>Less</span>
          {LEVEL_BG.map((_, i) => (
            <span key={i} style={cellStyle(i as ContribDay["level"])} />
          ))}
          <span>More</span>
        </div>
      </div>
    </Section>
  );
}
