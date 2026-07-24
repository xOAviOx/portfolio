import { unstable_cache } from "next/cache";

export interface ContribDay {
  date: string;
  count: number;
  /** 0 (none) … 4 (highest) */
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContribData {
  weeks: ContribDay[][];
  total: number;
  /** True when the graph is the offline sample, not live API data. */
  isFallback: boolean;
}

const LEVEL_MAP: Record<string, ContribDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

/**
 * Deterministic offline sample — a fixed pattern seeded by day index, NOT
 * random. Used when there's no token / the username is a placeholder / the
 * request fails, so the section still looks right. The UI labels it as a sample.
 */
function buildFallback(): ContribData {
  const weeks: ContribDay[][] = [];
  const today = new Date();
  // 53 weeks back to today, Sunday-aligned.
  const start = new Date(today);
  start.setDate(start.getDate() - 52 * 7 - today.getDay());

  let i = 0;
  for (let w = 0; w < 53; w++) {
    const days: ContribDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      // Stable pseudo-value in [0,1) from the index — deterministic, no RNG.
      const s = Math.sin((i + 1) * 12.9898) * 43758.5453;
      const frac = s - Math.floor(s);
      const level: ContribDay["level"] =
        frac < 0.5 ? 0 : frac < 0.72 ? 1 : frac < 0.88 ? 2 : frac < 0.965 ? 3 : 4;
      days.push({
        date: date.toISOString().slice(0, 10),
        count: [0, 1, 3, 6, 11][level],
        level,
      });
      i++;
    }
    weeks.push(days);
  }
  return { weeks, total: 0, isFallback: true };
}

async function fetchContributions(username: string): Promise<ContribData> {
  const token = process.env.GITHUB_TOKEN;
  const looksValid = /^[a-z\d](?:[a-z\d-]{0,38})$/i.test(username);

  // No credentials or a placeholder username → skip the request, use the sample.
  if (!token || !looksValid) return buildFallback();

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: username } }),
      // unstable_cache owns the TTL; don't double-cache at the fetch layer.
      cache: "no-store",
    });

    if (!res.ok) return buildFallback();
    const json = await res.json();
    const cal =
      json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal?.weeks?.length) return buildFallback();

    const weeks: ContribDay[][] = cal.weeks.map(
      (w: { contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }) =>
        w.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVEL_MAP[day.contributionLevel] ?? 0,
        }))
    );

    return {
      weeks,
      total: cal.totalContributions ?? 0,
      isFallback: false,
    };
  } catch {
    return buildFallback();
  }
}

/**
 * Cached accessor. Wraps the GraphQL call in unstable_cache so the result is
 * reused across requests and revalidated on the configured interval (works
 * with ISR on Vercel). Falls back to the offline sample on any failure.
 */
export function getContributions(username: string, revalidate: number) {
  return unstable_cache(
    () => fetchContributions(username),
    ["github-contributions", username],
    { revalidate, tags: ["github-contributions"] }
  )();
}
