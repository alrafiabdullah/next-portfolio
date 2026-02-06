"use client";

import { useEffect, useState } from "react";
import { getTags, type Tag } from "@/app/services/tagService";

interface TagSelectorProps {
  selected: number[];
  onChange: (tagIds: number[]) => void;
}

export default function TagSelector({ selected, onChange }: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTags()
      .then(setTags)
      .catch(() => setTags([]))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id: number) => {
    onChange(
      selected.includes(id)
        ? selected.filter((t) => t !== id)
        : [...selected, id]
    );
  };

  if (loading) {
    return (
      <div className="mb-4 flex gap-2">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-7 w-20 animate-pulse rounded-full"
            style={{ backgroundColor: "var(--color-bg-secondary)" }}
          />
        ))}
      </div>
    );
  }

  if (tags.length === 0) return null;

  return (
    <div className="mb-4">
      <p
        className="mb-2 text-xs font-semibold uppercase tracking-widest"
        style={{
          color: "var(--color-ui-muted)",
          fontFamily: "var(--font-sans)",
        }}
      >
        Tags
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selected.includes(tag.id);
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggle(tag.id)}
              className="rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "var(--font-sans)",
                backgroundColor: isSelected
                  ? "var(--color-accent-primary)"
                  : "var(--color-bg-secondary)",
                color: isSelected
                  ? "#ffffff"
                  : "var(--color-text-secondary)",
                border: `1px solid ${
                  isSelected
                    ? "var(--color-accent-primary)"
                    : "var(--color-border-muted)"
                }`,
              }}
            >
              {tag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
