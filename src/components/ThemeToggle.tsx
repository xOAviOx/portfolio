"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

type Theme = "light" | "dark";

/**
 * Theme toggle. The initial theme is set before paint by the inline script in
 * layout.tsx (no flash), so here we only read the current value on mount and
 * flip it. Rendering a stable button avoids hydration mismatch.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode / storage blocked — theme still applies for this session */
    }
    setTheme(next);
  }

  const nextLabel = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-btn"
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
    >
      {/* Before mount, default (dark) shows the moon — matches the pre-paint default. */}
      {mounted && theme === "light" ? (
        <SunIcon width={17} height={17} />
      ) : (
        <MoonIcon width={17} height={17} />
      )}
    </button>
  );
}
