import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ResizableImageView from "./ResizableImageView";

export interface ResizableImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableImage: {
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: number;
        caption?: string;
      }) => ReturnType;
    };
  }
}

const ResizableImage = Node.create<ResizableImageOptions>({
  name: "image",

  addOptions() {
    return {
      inline: false,
      allowBase64: true,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: null },
      caption: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-type='resizable-image']",
        getAttrs: (node) => {
          const el = node as HTMLElement;
          const img = el.querySelector("img");
          const figcaption = el.querySelector("figcaption");
          return {
            src: img?.getAttribute("src"),
            alt: img?.getAttribute("alt"),
            title: img?.getAttribute("title"),
            width: img?.getAttribute("width") ? Number(img.getAttribute("width")) : null,
            caption: figcaption?.textContent || null,
          };
        },
      },
      {
        tag: "img[src]",
        getAttrs: (node) => {
          const el = node as HTMLElement;
          return {
            src: el.getAttribute("src"),
            alt: el.getAttribute("alt"),
            title: el.getAttribute("title"),
            width: el.getAttribute("width") ? Number(el.getAttribute("width")) : null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { caption, ...imgAttrs } = HTMLAttributes;
    const figureAttrs = { "data-type": "resizable-image" };

    if (caption) {
      return [
        "figure",
        mergeAttributes(figureAttrs),
        ["img", mergeAttributes(this.options.HTMLAttributes, imgAttrs)],
        ["figcaption", {}, caption],
      ];
    }

    return [
      "figure",
      mergeAttributes(figureAttrs),
      ["img", mergeAttributes(this.options.HTMLAttributes, imgAttrs)],
    ];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});

export default ResizableImage;
