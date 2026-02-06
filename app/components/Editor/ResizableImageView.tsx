"use client";

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useCallback, useRef, useState } from "react";

export default function ResizableImageView({
  node,
  updateAttributes,
  selected,
}: NodeViewProps) {
  const { src, alt, width, caption } = node.attrs;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, direction: "left" | "right") => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);

      const startX = e.clientX;
      const startWidth = containerRef.current?.offsetWidth ?? width ?? 400;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX;
        const newWidth = Math.max(
          100,
          direction === "right" ? startWidth + delta : startWidth - delta
        );
        updateAttributes({ width: Math.round(newWidth) });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [width, updateAttributes]
  );

  return (
    <NodeViewWrapper
      className="resizable-image-wrapper"
      data-drag-handle
    >
      <figure
        ref={containerRef}
        className={`resizable-image-figure ${selected ? "selected" : ""}`}
        style={{ width: width ? `${width}px` : "100%" }}
      >
        {/* Left resize handle */}
        <div
          className="resize-handle resize-handle-left"
          onMouseDown={(e) => handleMouseDown(e, "left")}
          role="separator"
          aria-orientation="vertical"
          tabIndex={0}
        />

        <img
          src={src}
          alt={alt || "Abdullah Al Rafi's blog image"}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            cursor: isResizing ? "col-resize" : "default",
          }}
          draggable={false}
        />

        {/* Right resize handle */}
        <div
          className="resize-handle resize-handle-right"
          onMouseDown={(e) => handleMouseDown(e, "right")}
          role="separator"
          aria-orientation="vertical"
          tabIndex={0}
        />

        {/* Caption input */}
        <figcaption
          className="image-caption"
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Add a caption..."
          onBlur={(e) =>
            updateAttributes({ caption: e.currentTarget.textContent || null })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.currentTarget.blur();
            }
          }}
        >
          {caption || ""}
        </figcaption>
      </figure>
    </NodeViewWrapper>
  );
}
