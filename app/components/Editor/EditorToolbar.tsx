"use client";

import { type Editor } from "@tiptap/react";
import { useState } from "react";
import LinkInput from "./LinkInput";

interface ToolbarProps {
  editor: Editor | null;
  onImageUpload: () => void;
}

interface ToolbarButton {
  label: string;
  icon: string;
  action: () => void;
  isActive?: boolean;
}

export default function EditorToolbar({ editor, onImageUpload }: ToolbarProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);

  if (!editor) return null;

  const handleLinkApply = (url: string) => {
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setShowLinkInput(false);
  };

  const groups: ToolbarButton[][] = [
    // Text style
    [
      {
        label: "Bold",
        icon: "B",
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive("bold"),
      },
      {
        label: "Italic",
        icon: "I",
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
      },
      {
        label: "Underline",
        icon: "U",
        action: () => editor.chain().focus().toggleUnderline().run(),
        isActive: editor.isActive("underline"),
      },
      {
        label: "Strikethrough",
        icon: "S̶",
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: editor.isActive("strike"),
      },
      {
        label: "Code",
        icon: "<>",
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: editor.isActive("code"),
      },
    ],
    // Headings
    [
      {
        label: "Heading 1",
        icon: "H1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: editor.isActive("heading", { level: 1 }),
      },
      {
        label: "Heading 2",
        icon: "H2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor.isActive("heading", { level: 2 }),
      },
      {
        label: "Heading 3",
        icon: "H3",
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: editor.isActive("heading", { level: 3 }),
      },
    ],
    // Alignment
    [
      {
        label: "Align Left",
        icon: "≡",
        action: () => editor.chain().focus().setTextAlign("left").run(),
        isActive: editor.isActive({ textAlign: "left" }),
      },
      {
        label: "Align Center",
        icon: "≡̈",
        action: () => editor.chain().focus().setTextAlign("center").run(),
        isActive: editor.isActive({ textAlign: "center" }),
      },
      {
        label: "Align Right",
        icon: "≡̃",
        action: () => editor.chain().focus().setTextAlign("right").run(),
        isActive: editor.isActive({ textAlign: "right" }),
      },
    ],
    // Lists & blocks
    [
      {
        label: "Bullet List",
        icon: "•",
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
      },
      {
        label: "Ordered List",
        icon: "1.",
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
      },
      {
        label: "Blockquote",
        icon: "❝",
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: editor.isActive("blockquote"),
      },
      {
        label: "Code Block",
        icon: "{ }",
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: editor.isActive("codeBlock"),
      },
    ],
    // Media & misc
    [
      {
        label: "Horizontal Rule",
        icon: "—",
        action: () => editor.chain().focus().setHorizontalRule().run(),
      },
      {
        label: "Image",
        icon: "🖼",
        action: onImageUpload,
      },
    ],
    // Undo / Redo
    [
      {
        label: "Undo",
        icon: "↩",
        action: () => editor.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: "↪",
        action: () => editor.chain().focus().redo().run(),
      },
    ],
  ];

  return (
    <div
      className="sticky top-0 z-20 flex flex-wrap gap-1 border-b px-3 py-2"
      style={{
        borderColor: "var(--color-border-muted)",
        backgroundColor: "var(--color-bg-secondary)",
        position: "sticky",
        top: "61px",
        zIndex: 30,
      }}
    >
      {groups.map((group, gi) => (
        <div key={gi} className="flex items-center gap-0.5">
          {group.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={btn.action}
              title={btn.label}
              className="flex h-8 min-w-8 items-center justify-center rounded px-1.5 text-xs font-semibold transition-colors duration-150 cursor-pointer"
              style={{
                fontFamily: "var(--font-sans)",
                backgroundColor: btn.isActive ? "var(--color-accent-primary)" : "transparent",
                color: btn.isActive ? "#ffffff" : "var(--color-text-secondary)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                if (!btn.isActive) {
                  e.currentTarget.style.backgroundColor = "var(--color-bg-main)";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!btn.isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }
              }}
            >
              {btn.icon}
            </button>
          ))}
          {gi < groups.length - 1 && (
            <span
              className="mx-1 h-5 w-px"
              style={{ backgroundColor: "var(--color-border-muted)" }}
            />
          )}
        </div>
      ))}

      <span
        className="mx-1 h-5 w-px"
        style={{ backgroundColor: "var(--color-border-muted)" }}
      />

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowLinkInput(!showLinkInput)}
          title="Link"
          className="flex h-8 min-w-8 items-center justify-center rounded px-1.5 text-xs font-semibold transition-colors duration-150 cursor-pointer"
          style={{
            fontFamily: "var(--font-sans)",
            backgroundColor: (editor.isActive("link") || showLinkInput) ? "var(--color-accent-primary)" : "transparent",
            color: (editor.isActive("link") || showLinkInput) ? "#ffffff" : "var(--color-text-secondary)",
            border: "none",
          }}
          onMouseEnter={(e) => {
            if (!(editor.isActive("link") || showLinkInput)) {
              e.currentTarget.style.backgroundColor = "var(--color-bg-main)";
              e.currentTarget.style.color = "var(--color-text-primary)";
            }
          }}
          onMouseLeave={(e) => {
            if (!(editor.isActive("link") || showLinkInput)) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--color-text-secondary)";
            }
          }}
        >
          🔗
        </button>
        {showLinkInput && (
          <LinkInput
            initialValue={editor.getAttributes("link").href || ""}
            onApply={handleLinkApply}
            onCancel={() => setShowLinkInput(false)}
          />
        )}
      </div>
    </div>
  );
}
