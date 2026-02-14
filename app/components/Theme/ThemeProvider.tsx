"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// ── External store helpers ──────────────────────────────

let listeners: Array<() => void> = [];

function emitChange() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
  return stored ?? "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function setTheme(next: Theme) {
  localStorage.setItem("theme", next);
  document.documentElement.setAttribute("data-theme", next);
  emitChange();
}

// ── Component ───────────────────────────────────────────

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep data-theme attribute in sync and update favicon
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    // Update favicon dynamically
    const favicons = document.querySelectorAll('link[rel~="icon"]');
    favicons.forEach((f, i) => {
      const favicon = f as HTMLLinkElement;
      if (i === 0) {
        favicon.href = theme === "dark" ? "/icon-dark.svg" : "/icon-light.svg";
        // Remove media attribute to override system preference once the theme is explicitly set
        favicon.removeAttribute("media");
      } else {
        // Remove other icon tags (like the system-match ones) to prevent conflicts
        favicon.remove();
      }
    });
  }, [theme]);

  // Listen for OS preference changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        emitChange();
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.add("theme-transition");
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 350);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
