"use client";

interface BlogPreviewProps {
  title: string;
  content: string;
}

export default function BlogPreview({ title, content }: BlogPreviewProps) {
  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{
        borderColor: "var(--color-border-muted)",
        backgroundColor: "var(--color-bg-main)",
      }}
    >
      <div
        className="border-b px-4 py-2"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          borderColor: "var(--color-border-muted)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{
            color: "var(--color-ui-muted)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Preview
        </p>
      </div>
      <div className="px-6 py-6">
        {title && (
          <h1
            className="mb-6 text-3xl font-bold"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-text-primary)",
            }}
          >
            {title}
          </h1>
        )}
        <div
          className="blog-preview-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
