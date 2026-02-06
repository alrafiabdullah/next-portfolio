"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "var(--color-bg-main, #f9f8f6)",
          color: "var(--color-text-primary, #2e2e2e)",
          fontFamily:
            "'Source Serif 4', Georgia, Cambria, 'Times New Roman', serif",
        }}
      >
        <main
          style={{
            display: "flex",
            minHeight: "100vh",
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
              color: "var(--color-accent-primary, #2f5d8a)",
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
              fontFamily:
                "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              marginTop: "0.5rem",
              maxWidth: "28rem",
              color: "var(--color-text-secondary, #555555)",
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
              backgroundColor: "var(--color-accent-primary, #2f5d8a)",
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
