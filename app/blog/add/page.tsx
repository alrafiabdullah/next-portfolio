"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import BlogEditor from "@/app/components/Editor/BlogEditor";
import BlogPreview from "@/app/components/Editor/BlogPreview";
import TagSelector from "@/app/components/Editor/TagSelector";
import { createBlog, type BlogIsDraft } from "@/app/services/blogService";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [jsonContent, setJsonContent] = useState<object>({});
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [saving, setSaving] = useState<boolean>(false);

  const handleSave = async (isDraft: BlogIsDraft) => {
    if (!title.trim() || !htmlContent.trim()) {
      toast.error("Please add a title and content.");
      return;
    }

    if (selectedTags.length === 0) {
      toast.error("Please select at least one tag.");
      return;
    }

    setSaving(true);
    try {
      await createBlog({
        title,
        content_html: htmlContent,
        content_json: jsonContent,
        is_draft: isDraft,
        tags: selectedTags,
      });
      toast.success(isDraft ? "Draft saved!" : "Blog published!");
    } catch {
      toast.error(`Failed to ${isDraft ? "save draft" : "publish"}.`);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { key: "write" as const, label: "Write" },
    { key: "preview" as const, label: "Preview" },
  ];

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-8">
      {/* Title input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog title..."
        className="mb-6 w-full border-b-2 bg-transparent pb-2 text-3xl font-bold outline-none transition-colors duration-200"
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-text-primary)",
          borderColor: "var(--color-border-muted)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-accent-primary)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border-muted)";
        }}
      />

      {/* Tags */}
      <TagSelector selected={selectedTags} onChange={setSelectedTags} />

      {/* Tab switcher */}
      <div
        className="mb-4 flex gap-1 rounded-lg p-1"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className="rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: "var(--font-sans)",
              backgroundColor: activeTab === tab.key ? "var(--color-bg-main)" : "transparent",
              color:
                activeTab === tab.key ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              border: "none",
              boxShadow: activeTab === tab.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editor / Preview */}
      {activeTab === "write" ? (
        <BlogEditor
          content={htmlContent}
          onChange={(html, json) => {
            setHtmlContent(html);
            setJsonContent(json);
          }}
        />
      ) : (
        <BlogPreview title={title} content={htmlContent} />
      )}

      {/* Actions */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setActiveTab(activeTab === "write" ? "preview" : "write")}
          className="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
          style={{
            fontFamily: "var(--font-sans)",
            backgroundColor: "var(--color-bg-secondary)",
            color: "var(--color-text-secondary)",
            border: "1px solid var(--color-border-muted)",
          }}
        >
          {activeTab === "write" ? "Preview" : "Write"}
        </button>
        <button
          type="button"
          onClick={() => handleSave(true)}
          disabled={saving}
          className="btn-secondary !text-white"
          style={{
            opacity: saving ? 0.6 : 1,
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>
        <button
          type="button"
          onClick={() => handleSave(false)}
          disabled={saving}
          className="btn-primary !text-white"
          style={{
            opacity: saving ? 0.6 : 1,
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Publishing..." : "Publish"}
        </button>
      </div>
    </main>
  );
}
