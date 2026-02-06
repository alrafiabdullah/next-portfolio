"use client";

import { useEffect, useState } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(theme === "dark" || (!theme && prefersDark));
  }, []);

  const bg = isDark ? "#1a1a2e" : "#f9f8f6";
  const textPrimary = isDark ? "#e4e4e7" : "#2e2e2e";
  const textSecondary = isDark ? "#a1a1aa" : "#555555";
  const accent = isDark ? "#60a5fa" : "#2f5d8a";

  return (
    <html lang="en" data-theme={isDark ? "dark" : "light"}>
      <body
        style={{
          backgroundColor: bg,
          color: textPrimary,
          fontFamily: "'Source Serif 4', Georgia, Cambria, 'Times New Roman', serif",
          transition: "background-color 0.3s ease, color 0.3s ease",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <main
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "6rem",
              fontWeight: 700,
              color: accent,
              lineHeight: 1,
            }}
          >
            500
          </p>
          <h1
            style={{
              marginTop: "1rem",
              fontSize: "1.875rem",
              fontWeight: 600,
              fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              marginTop: "0.5rem",
              maxWidth: "28rem",
              color: textSecondary,
            }}
          >
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "2rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              fontWeight: 500,
              backgroundColor: accent,
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
