"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
import { TextStyle, FontFamily, FontSize } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { useRef, useState, useEffect, useCallback } from "react";
import CommonServices from "@/services/common.service";
import { COMMON_COLORS, COMMON_HIGHLIGHTS } from "@/constants";
import "../../editor.css";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  RemoveFormatting,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo2,
  Redo2,
  Image as ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  Columns,
  Palette,
  Highlighter,
  ChevronDown,
  Trash2,
  Plus,
  Type,
  Check,
  RotateCcw,
  Eye,
} from "lucide-react";

export const FONT_FAMILIES = [
  { label: "Default Font", value: "" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Merriweather", value: "Merriweather, serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Arial", value: "Arial, Helvetica, sans-serif" },
  { label: "JetBrains Mono", value: "'JetBrains Mono', monospace" },
  { label: "Fira Code", value: "'Fira Code', monospace" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
  { label: "Caveat (Handwriting)", value: "Caveat, cursive" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
];

export const FONT_SIZES = [
  { label: "Font Size", value: "" },
  { label: "12px", value: "12px" },
  { label: "14px", value: "14px" },
  { label: "16px (Normal)", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "28px", value: "28px" },
  { label: "32px", value: "32px" },
  { label: "36px", value: "36px" },
  { label: "48px", value: "48px" },
];

const CustomImage = Image.extend({
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "50%",
        parseHTML: (element) => {
          return (
            element.style.width ||
            element.getAttribute("width") ||
            (element.getAttribute("data-width") ? `${element.getAttribute("data-width")}` : "50%")
          );
        },
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            width: attributes.width,
            "data-width": attributes.width,
          };
        },
      },
      height: {
        default: "auto",
        parseHTML: (element) => {
          return (
            element.style.height ||
            element.getAttribute("height") ||
            (element.getAttribute("data-height") ? `${element.getAttribute("data-height")}` : "auto")
          );
        },
        renderHTML: (attributes) => {
          if (!attributes.height || attributes.height === "auto") return {};
          return {
            height: attributes.height,
            "data-height": attributes.height,
          };
        },
      },
      "data-align": {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") || "center",
        renderHTML: (attributes) => {
          const align = attributes["data-align"] || "center";
          return {
            "data-align": align,
            class: `align-${align}`,
          };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const align = HTMLAttributes["data-align"] || "center";
    const width = HTMLAttributes.width || "50%";
    const height = HTMLAttributes.height && HTMLAttributes.height !== "auto" ? HTMLAttributes.height : "auto";
    const objectFit = height !== "auto" ? "object-fit: cover;" : "";

    let inlineStyle = "";
    if (align === "left") {
      inlineStyle = `float: left; margin: 0.5rem 1.5rem 1rem 0; width: ${width}; max-width: 100%; height: ${height}; ${objectFit} border-radius: 0.5rem;`;
    } else if (align === "right") {
      inlineStyle = `float: right; margin: 0.5rem 0 1rem 1.5rem; width: ${width}; max-width: 100%; height: ${height}; ${objectFit} border-radius: 0.5rem;`;
    } else if (align === "full") {
      inlineStyle = `display: block; width: 100%; max-width: 100%; height: ${height}; ${objectFit} margin: 1.5rem auto; border-radius: 0.5rem; clear: both;`;
    } else {
      inlineStyle = `display: block; margin: 1.5rem auto; width: ${width}; max-width: 100%; height: ${height}; ${objectFit} border-radius: 0.5rem; clear: both;`;
    }

    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        style: inlineStyle,
      }),
    ];
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement("div");
      const wrapper = document.createElement("div");
      wrapper.className = "tiptap-image-wrapper";
      wrapper.style.width = "100%";
      wrapper.style.position = "relative";
      wrapper.style.display = "block";
      wrapper.setAttribute("data-drag-handle", "true");

      let currentAlign = node.attrs["data-align"] || "center";
      let currentWidth = node.attrs.width || "50%";
      let currentHeight = node.attrs.height || "auto";

      const applyContainerStyles = (currAlign, currWidth) => {
        const isFull = currAlign === "full";
        const w = isFull ? "100%" : (currWidth || "50%");

        container.className = `tiptap-image-container align-${currAlign}`;
        container.style.width = w;
        container.style.maxWidth = "100%";
        container.style.boxSizing = "border-box";

        if (currAlign === "left") {
          container.style.float = "left";
          container.style.margin = "0.5rem 1.5rem 1rem 0";
          container.style.clear = "none";
          container.style.display = "block";
        } else if (currAlign === "right") {
          container.style.float = "right";
          container.style.margin = "0.5rem 0 1rem 1.5rem";
          container.style.clear = "none";
          container.style.display = "block";
        } else {
          // center or full
          container.style.float = "none";
          container.style.margin = "1.5rem auto";
          container.style.clear = "both";
          container.style.display = "block";
        }
      };

      applyContainerStyles(currentAlign, currentWidth);

      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || "";
      img.style.width = "100%";
      img.style.height = currentHeight && currentHeight !== "auto" ? currentHeight : "auto";
      if (currentHeight && currentHeight !== "auto") {
        img.style.objectFit = "cover";
      }
      img.style.display = "block";
      img.style.borderRadius = "0.5rem";

      const dragBadge = document.createElement("div");
      dragBadge.className = "image-drag-handle";
      dragBadge.setAttribute("data-drag-handle", "true");
      dragBadge.title = "Click & drag to move image between text";
      dragBadge.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="5" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="5" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="19" r="1.5"/></svg><span>Move</span>`;

      const sizeBadge = document.createElement("span");
      sizeBadge.className = "image-size-badge";

      const updateSizeBadge = (w, h) => {
        if (h && h !== "auto") {
          sizeBadge.textContent = `${w} × ${h}`;
        } else {
          sizeBadge.textContent = w;
        }
      };
      updateSizeBadge(currentWidth, currentHeight);

      const quickBar = document.createElement("div");
      quickBar.className = "image-quick-bar";

      const createBtn = (text, title, onClick, isActive) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = text;
        btn.title = title;
        if (isActive) btn.classList.add("is-active");
        btn.addEventListener("mousedown", (e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        });
        return btn;
      };

      const updateQuickBar = (currAlign, currWidth, currHeight) => {
        quickBar.innerHTML = "";

        const btnDrag = document.createElement("button");
        btnDrag.type = "button";
        btnDrag.className = "image-drag-btn";
        btnDrag.setAttribute("data-drag-handle", "true");
        btnDrag.title = "Hold & drag to move image between text";
        btnDrag.textContent = "⠿ Move";
        btnDrag.style.cursor = "grab";
        btnDrag.addEventListener("mousedown", (e) => {
          e.stopPropagation();
        });

        const btnLeft = createBtn("⇦ Left (Wrap)", "Float Left (Text wraps around right side)", () => {
          const w = (currWidth === "100%" || !currWidth) ? "45%" : currWidth;
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { "data-align": "left", width: w }).run();
          }
        }, currAlign === "left");

        const btnCenter = createBtn("Center (Break)", "Center Image (Text stays above & below)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { "data-align": "center" }).run();
          }
        }, currAlign === "center");

        const btnRight = createBtn("Right (Wrap) ⇨", "Float Right (Text wraps around left side)", () => {
          const w = (currWidth === "100%" || !currWidth) ? "45%" : currWidth;
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { "data-align": "right", width: w }).run();
          }
        }, currAlign === "right");

        const sep0 = document.createElement("span");
        sep0.className = "opacity-40";
        sep0.textContent = "|";

        const sep1 = document.createElement("span");
        sep1.className = "opacity-40";
        sep1.textContent = "|";

        const btn25 = createBtn("25%", "Small (25%)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { width: "25%", height: "auto" }).run();
          }
        }, currWidth === "25%");

        const btn33 = createBtn("33%", "One-Third (33%)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { width: "33%", height: "auto" }).run();
          }
        }, currWidth === "33%");

        const btn50 = createBtn("50%", "Half (50%)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { width: "50%", height: "auto" }).run();
          }
        }, currWidth === "50%");

        const btn75 = createBtn("75%", "Three-Fourths (75%)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { width: "75%", height: "auto" }).run();
          }
        }, currWidth === "75%");

        const btn100 = createBtn("100%", "Full Width (100%)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { width: "100%", height: "auto", "data-align": "center" }).run();
          }
        }, currWidth === "100%");

        const sep2 = document.createElement("span");
        sep2.className = "opacity-40";
        sep2.textContent = "|";

        const btnAutoH = createBtn("Auto H", "Reset height to natural aspect ratio", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { height: "auto" }).run();
          }
        }, !currHeight || currHeight === "auto");

        const sep3 = document.createElement("span");
        sep3.className = "opacity-40";
        sep3.textContent = "|";

        const btnDel = createBtn("✕", "Delete Image", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).deleteSelection().run();
          }
        }, false);
        btnDel.style.color = "#f87171";

        quickBar.appendChild(btnDrag);
        quickBar.appendChild(sep0);
        quickBar.appendChild(btnLeft);
        quickBar.appendChild(btnCenter);
        quickBar.appendChild(btnRight);
        quickBar.appendChild(sep1);
        quickBar.appendChild(btn25);
        quickBar.appendChild(btn33);
        quickBar.appendChild(btn50);
        quickBar.appendChild(btn75);
        quickBar.appendChild(btn100);
        quickBar.appendChild(sep2);
        quickBar.appendChild(btnAutoH);
        quickBar.appendChild(sep3);
        quickBar.appendChild(btnDel);
      };

      updateQuickBar(currentAlign, currentWidth, currentHeight);

      // Define 8 resize handles for all 4 corners and 4 edges
      const RESIZE_HANDLES = [
        { dir: "nw", className: "handle-nw", title: "Drag corner to scale image", cursor: "nwse-resize" },
        { dir: "n",  className: "handle-n",  title: "Drag top edge to adjust height", cursor: "ns-resize" },
        { dir: "ne", className: "handle-ne", title: "Drag corner to scale image", cursor: "nesw-resize" },
        { dir: "e",  className: "handle-e",  title: "Drag right edge to adjust width", cursor: "ew-resize" },
        { dir: "se", className: "handle-se", title: "Drag corner to scale image", cursor: "nwse-resize" },
        { dir: "s",  className: "handle-s",  title: "Drag bottom edge to adjust height", cursor: "ns-resize" },
        { dir: "sw", className: "handle-sw", title: "Drag corner to scale image", cursor: "nesw-resize" },
        { dir: "w",  className: "handle-w",  title: "Drag left edge to adjust width", cursor: "ew-resize" },
      ];

      const handleElements = RESIZE_HANDLES.map((cfg) => {
        const handle = document.createElement("div");
        handle.className = `image-resize-handle ${cfg.className}`;
        handle.title = cfg.title;

        handle.addEventListener("mousedown", (e) => {
          e.preventDefault();
          e.stopPropagation();

          const startX = e.clientX;
          const startY = e.clientY;
          const startWidth = container.offsetWidth;
          const startHeight = img.offsetHeight || container.offsetHeight || 200;
          const editorEl = container.closest(".tiptap") || document.body;
          const editorWidth = editorEl.offsetWidth || 800;

          const prevUserSelect = document.body.style.userSelect;
          const prevCursor = document.body.style.cursor;
          document.body.style.userSelect = "none";
          document.body.style.cursor = cfg.cursor;

          wrapper.classList.add("is-resizing");

          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number" && !wrapper.classList.contains("is-selected")) {
            editor.chain().setNodeSelection(pos).run();
          }

          let finalPercent = container.style.width || currentWidth || "50%";
          let finalHeight = currentHeight || "auto";

          const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            const dir = cfg.dir;

            // 1. VERTICAL ONLY HANDLES (n, s) -> Adjust Height in direction dragged
            if (dir === "s") {
              const newHeight = Math.max(60, Math.round(startHeight + deltaY));
              finalHeight = `${newHeight}px`;
              img.style.height = finalHeight;
              img.style.objectFit = "cover";
              updateSizeBadge(finalPercent, finalHeight);
              return;
            } else if (dir === "n") {
              const newHeight = Math.max(60, Math.round(startHeight - deltaY));
              finalHeight = `${newHeight}px`;
              img.style.height = finalHeight;
              img.style.objectFit = "cover";
              updateSizeBadge(finalPercent, finalHeight);
              return;
            }

            // 2. HORIZONTAL ONLY HANDLES (e, w) -> Adjust Width in direction dragged
            if (dir === "e" || dir === "w") {
              const dw = dir === "e" ? deltaX : -deltaX;
              const alignFactor = (currentAlign === "center") ? 2 : 1;
              const newPx = Math.max(80, Math.min(editorWidth, startWidth + (dw * alignFactor)));
              const pct = Math.min(100, Math.max(10, Math.round((newPx / editorWidth) * 100)));
              finalPercent = `${pct}%`;
              container.style.width = finalPercent;
              updateSizeBadge(finalPercent, finalHeight);
              return;
            }

            // 3. CORNER HANDLES (nw, ne, se, sw) -> Scale proportionally in direction dragged
            let dw = 0;
            let dh = 0;
            if (dir === "se") {
              dw = deltaX;
              dh = deltaY;
            } else if (dir === "sw") {
              dw = -deltaX;
              dh = deltaY;
            } else if (dir === "ne") {
              dw = deltaX;
              dh = -deltaY;
            } else if (dir === "nw") {
              dw = -deltaX;
              dh = -deltaY;
            }

            const alignFactor = (currentAlign === "center") ? 2 : 1;
            const scaleX = (startWidth + (dw * alignFactor)) / startWidth;
            const scaleY = (startHeight + dh) / startHeight;
            const scale = Math.max(0.1, (scaleX + scaleY) / 2);

            const newWidthPx = Math.max(80, Math.min(editorWidth, Math.round(startWidth * scale)));
            const pct = Math.min(100, Math.max(10, Math.round((newWidthPx / editorWidth) * 100)));
            finalPercent = `${pct}%`;
            container.style.width = finalPercent;

            if (finalHeight !== "auto") {
              const newHeightPx = Math.max(60, Math.round(startHeight * scale));
              finalHeight = `${newHeightPx}px`;
              img.style.height = finalHeight;
              img.style.objectFit = "cover";
            } else {
              img.style.height = "auto";
            }

            updateSizeBadge(finalPercent, finalHeight);
          };

          const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            document.body.style.userSelect = prevUserSelect;
            document.body.style.cursor = prevCursor;
            wrapper.classList.remove("is-resizing");

            const currentPos = typeof getPos === "function" ? getPos() : undefined;
            if (typeof currentPos === "number") {
              const targetAlign = (currentAlign === "full" && finalPercent !== "100%") ? "center" : currentAlign;
              currentAlign = targetAlign;
              currentWidth = finalPercent;
              currentHeight = finalHeight;
              editor
                .chain()
                .setNodeSelection(currentPos)
                .updateAttributes("image", {
                  width: finalPercent,
                  height: finalHeight,
                  "data-align": targetAlign,
                })
                .run();
            }
          };

          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        });

        return handle;
      });

      wrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        const pos = typeof getPos === "function" ? getPos() : undefined;
        if (typeof pos === "number") {
          editor.chain().setNodeSelection(pos).run();
        }
      });

      wrapper.appendChild(img);
      wrapper.appendChild(dragBadge);
      wrapper.appendChild(sizeBadge);
      handleElements.forEach((h) => wrapper.appendChild(h));
      wrapper.appendChild(quickBar);
      container.appendChild(wrapper);

      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type.name !== "image") return false;
          img.src = updatedNode.attrs.src;
          img.alt = updatedNode.attrs.alt || "";
          const newWidth = updatedNode.attrs.width || "50%";
          const newHeight = updatedNode.attrs.height || "auto";
          const newAlign = updatedNode.attrs["data-align"] || "center";
          currentAlign = newAlign;
          currentWidth = newWidth;
          currentHeight = newHeight;
          applyContainerStyles(newAlign, newWidth);
          img.style.height = newHeight && newHeight !== "auto" ? newHeight : "auto";
          if (newHeight && newHeight !== "auto") {
            img.style.objectFit = "cover";
          } else {
            img.style.objectFit = "";
          }
          updateSizeBadge(newWidth, newHeight);
          updateQuickBar(newAlign, newWidth, newHeight);
          return true;
        },
        selectNode: () => {
          wrapper.classList.add("is-selected");
        },
        deselectNode: () => {
          wrapper.classList.remove("is-selected");
        },
        stopEvent: (event) => {
          if (event.type === "dragstart" || event.type === "drag") {
            return false;
          }
          return (
            (quickBar.contains(event.target) && !event.target?.closest("[data-drag-handle]")) ||
            event.target?.classList?.contains("image-resize-handle") ||
            handleElements.some((h) => h.contains(event.target))
          );
        },
        destroy: () => {},
      };
    };
  },
});

const CustomTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "layout-table",
        parseHTML: (element) => element.getAttribute("class") || "layout-table",
        renderHTML: (attributes) => ({
          class: attributes.class || "layout-table",
        }),
      },
      "data-layout": {
        default: "columns",
        parseHTML: (element) => element.getAttribute("data-layout") || "columns",
        renderHTML: (attributes) => ({
          "data-layout": attributes["data-layout"] || "columns",
        }),
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => (attributes.style ? { style: attributes.style } : {}),
      },
    };
  },
});

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => (attributes.class ? { class: attributes.class } : {}),
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => (attributes.style ? { style: attributes.style } : {}),
      },
    };
  },
});

/**
 * Strips stubborn foreign font-family, color, background-color, and external classes
 * from pasted HTML so pasted content conforms to blog typography and remains freely editable.
 */
function cleanPastedHTML(html) {
  if (!html || typeof html !== "string") return html;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove scripts, styles, meta, noscript, iframes
    doc
      .querySelectorAll("script, style, meta, link, noscript, iframe")
      .forEach((el) => el.remove());

    const allElements = Array.from(doc.body.querySelectorAll("*"));
    for (const el of allElements) {
      // Remove arbitrary external classes from internet / Word
      if (el.className && !el.className.includes("layout-table")) {
        el.removeAttribute("class");
      }

      // Clean inline styles
      if (el.hasAttribute("style")) {
        const style = el.style;
        style.removeProperty("font-family");
        style.removeProperty("font-size");
        style.removeProperty("color");
        style.removeProperty("background");
        style.removeProperty("background-color");
        style.removeProperty("line-height");
        style.removeProperty("letter-spacing");
        style.removeProperty("word-spacing");

        // Remove any mso-* properties from Microsoft Word
        Array.from(style).forEach((prop) => {
          if (
            prop.startsWith("mso-") ||
            prop.includes("font") ||
            prop.includes("color")
          ) {
            style.removeProperty(prop);
          }
        });

        const remaining = el.getAttribute("style")?.trim();
        if (!remaining || remaining === "" || remaining === ";") {
          el.removeAttribute("style");
        }
      }

      // Convert <font> tags to plain contents
      if (el.tagName === "FONT") {
        el.replaceWith(...Array.from(el.childNodes));
      }
      // Unwrap empty span tags with no attributes
      else if (el.tagName === "SPAN" && el.attributes.length === 0) {
        el.replaceWith(...Array.from(el.childNodes));
      }
    }

    return doc.body.innerHTML;
  } catch (err) {
    console.error("Error cleaning pasted HTML:", err);
    return html;
  }
}

export default function RichTextEditor({ value, onChange, onPreview }) {
  useEffect(() => {
    const linkId = "tiptap-google-fonts";
    if (typeof document !== "undefined" && !document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Dancing+Script:wght@500;700&family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Lato:wght@300;400;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const fileInputRef = useRef(null);
  const colorInputRef = useRef(null);
  const highlightInputRef = useRef(null);
  const colorPopoverRef = useRef(null);
  const highlightPopoverRef = useRef(null);
  const savedSelectionRef = useRef(null);
  const updateActiveStylesRef = useRef(null);

  const [showColorPopover, setShowColorPopover] = useState(false);
  const [showHighlightPopover, setShowHighlightPopover] = useState(false);
  const [customColorInput, setCustomColorInput] = useState("");
  const [customHighlightInput, setCustomHighlightInput] = useState("");

  const [activeStyles, setActiveStyles] = useState({
    fontFamily: "",
    fontSize: "16px",
  });

  // Close color popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (colorPopoverRef.current && !colorPopoverRef.current.contains(e.target)) {
        setShowColorPopover(false);
      }
      if (highlightPopoverRef.current && !highlightPopoverRef.current.contains(e.target)) {
        setShowHighlightPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    editorProps: {
      transformPastedHTML(html) {
        return cleanPastedHTML(html);
      },
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      savedSelectionRef.current = { from, to };
      updateActiveStylesRef.current?.();
    },
    onTransaction: () => {
      updateActiveStylesRef.current?.();
    },
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        dropcursor: {
          color: "#029bd2",
          width: 3,
        },
      }),
      Heading.configure({ levels: [1, 2, 3, 4] }),
      Blockquote,
      CodeBlock,
      Underline,
      TextStyle,
      FontFamily,
      FontSize,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-sky-600 underline cursor-pointer",
        },
      }),
      CustomImage,
      CustomTable.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      CustomTableCell,
    ],
    content: value || "<p>Start writing your blog content here...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  // Image upload
  const addImage = async (file) => {
    try {
      const res = await CommonServices.uploadImage(file);
      if (res?.url) {
        editor
          .chain()
          .focus()
          .setImage({
            src: res.url,
            width: "50%",
            "data-align": "center",
          })
          .run();
      }
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const handleLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // Section Layout Helpers
  const insertTextImageLayout = () => {
    // Text on Left (55%), Image on Right (45%)
    editor
      .chain()
      .focus()
      .insertContent(`
        <table class="layout-table layout-text-image" data-layout="columns" style="border: none !important; border-collapse: collapse; width: 100%; margin: 1.75rem 0;">
          <tbody>
            <tr style="border: none !important;">
              <td style="border: none !important; outline: none !important; width: 55%; vertical-align: middle; padding: 12px 20px 12px 0;">
                <h3 style="margin-top: 0;">Heading / Feature Title</h3>
                <p>Write your detailed text, insights, or story here. Readers can easily absorb the key details on this side alongside the visual.</p>
                <ul>
                  <li>Key highlight or point one</li>
                  <li>Key highlight or point two</li>
                </ul>
              </td>
              <td style="border: none !important; outline: none !important; width: 45%; vertical-align: middle; padding: 12px 0 12px 20px; text-align: center;">
                <p><strong>Right Side (Image)</strong></p>
                <p><em>Click the image icon to upload or place your picture here...</em></p>
              </td>
            </tr>
          </tbody>
        </table>
        <p></p>
      `)
      .run();
  };

  const insertImageTextLayout = () => {
    // Image on Left (45%), Text on Right (55%)
    editor
      .chain()
      .focus()
      .insertContent(`
        <table class="layout-table layout-image-text" data-layout="columns" style="border: none !important; border-collapse: collapse; width: 100%; margin: 1.75rem 0;">
          <tbody>
            <tr style="border: none !important;">
              <td style="border: none !important; outline: none !important; width: 45%; vertical-align: middle; padding: 12px 20px 12px 0; text-align: center;">
                <p><strong>Left Side (Image)</strong></p>
                <p><em>Click the image icon to upload or place your picture here...</em></p>
              </td>
              <td style="border: none !important; outline: none !important; width: 55%; vertical-align: middle; padding: 12px 0 12px 20px;">
                <h3 style="margin-top: 0;">Heading / Feature Title</h3>
                <p>Describe your image, product screenshot, or design details right here. This gives a beautiful balanced presentation.</p>
                <p>Continue with supporting paragraphs and points.</p>
              </td>
            </tr>
          </tbody>
        </table>
        <p></p>
      `)
      .run();
  };

  const insertTwoColumnLayout = () => {
    // Inserts a 2-column layout block (50/50)
    editor
      .chain()
      .focus()
      .insertContent(`
        <table class="layout-table" data-layout="columns" style="border: none !important; border-collapse: collapse; width: 100%; margin: 1.5rem 0;">
          <tbody>
            <tr style="border: none !important;">
              <td style="border: none !important; outline: none !important; width: 50%; vertical-align: top; padding: 10px;">
                <p><strong>Left Column</strong></p>
                <p>Write your left column content, points, or comparisons here...</p>
              </td>
              <td style="border: none !important; outline: none !important; width: 50%; vertical-align: top; padding: 10px;">
                <p><strong>Right Column</strong></p>
                <p>Write your right column content, points, or comparisons here...</p>
              </td>
            </tr>
          </tbody>
        </table>
        <p></p>
      `)
      .run();
  };

  const insertStandardTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  // Image float alignment helper (Left, Center, Right, Full)
  const setImageAlignment = (align) => {
    const currentWidth = editor.getAttributes("image").width;
    const updates = { "data-align": align };
    if ((align === "left" || align === "right") && (!currentWidth || currentWidth === "100%" || currentWidth === "auto")) {
      updates.width = "45%";
    }
    editor.chain().focus().updateAttributes("image", updates).run();
  };

  const setImageWidth = (width) => {
    editor.chain().focus().updateAttributes("image", { width }).run();
  };

  // Heading / Paragraph selector
  const currentBlockType = () => {
    if (!editor) return "p";
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    return "p";
  };

  const handleHeadingChange = (e) => {
    if (!editor) return;
    const val = e.target.value;
    if (val === "p") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(val.replace("h", ""), 10);
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  // Helper to apply marks while preserving user text selection if native controls lose focus
  const applyWithSelection = (actionFn) => {
    if (!editor) return;
    const chain = editor.chain().focus();
    if (savedSelectionRef.current) {
      chain.setTextSelection(savedSelectionRef.current);
    }
    actionFn(chain);
    chain.run();
  };

  const handleSelectTextColor = (colorVal) => {
    applyWithSelection((chain) => {
      chain.setColor(colorVal);
    });
    setCustomColorInput(colorVal);
  };

  const handleClearTextColor = () => {
    applyWithSelection((chain) => {
      chain.unsetColor();
    });
    setCustomColorInput("");
  };

  const handleSelectHighlight = (colorVal) => {
    applyWithSelection((chain) => {
      chain.setHighlight({ color: colorVal });
    });
    setCustomHighlightInput(colorVal);
  };

  const handleClearHighlight = () => {
    applyWithSelection((chain) => {
      chain.unsetHighlight();
    });
    setCustomHighlightInput("");
  };

  // Detect active font family and font size anywhere in the editor (marks, DOM inline styles, computed styles)
  const getActiveFontInfo = useCallback(() => {
    if (!editor) return { fontSize: "16px", fontFamily: "" };

    let detectedFontSize = "";
    let detectedFontFamily = "";

    // 1. TipTap mark attributes from current selection
    const textStyleAttrs = editor.getAttributes("textStyle") || {};
    if (textStyleAttrs.fontSize) detectedFontSize = textStyleAttrs.fontSize;
    if (textStyleAttrs.fontFamily) detectedFontFamily = textStyleAttrs.fontFamily;

    // 2. If empty selection or boundary stripped mark, check ProseMirror resolved positions
    try {
      const { $from, empty } = editor.state.selection;
      if ((!detectedFontSize || !detectedFontFamily) && empty) {
        const mark =
          $from.marks().find((m) => m.type.name === "textStyle") ||
          $from.nodeBefore?.marks?.find((m) => m.type.name === "textStyle") ||
          $from.nodeAfter?.marks?.find((m) => m.type.name === "textStyle");

        if (mark?.attrs) {
          if (!detectedFontSize && mark.attrs.fontSize) detectedFontSize = mark.attrs.fontSize;
          if (!detectedFontFamily && mark.attrs.fontFamily) detectedFontFamily = mark.attrs.fontFamily;
        }
      }
    } catch {
      // ignore
    }

    // 3. Fallback to DOM element (inline style or computed style)
    if (typeof window !== "undefined" && editor.view) {
      let domEl = null;
      try {
        const domResult = editor.view.domAtPos(editor.state.selection.from);
        if (domResult?.node) {
          domEl =
            domResult.node.nodeType === Node.TEXT_NODE
              ? domResult.node.parentElement
              : domResult.node;
        }
      } catch {
        // ignore
      }

      if (!domEl) {
        const sel = window.getSelection();
        if (sel?.anchorNode && editor.view.dom?.contains(sel.anchorNode)) {
          domEl =
            sel.anchorNode.nodeType === Node.TEXT_NODE
              ? sel.anchorNode.parentElement
              : sel.anchorNode;
        }
      }

      if (domEl) {
        // Check inline styles first up the DOM hierarchy within the editor
        let curr = domEl;
        while (curr && curr !== editor.view.dom) {
          if (!detectedFontSize && curr.style?.fontSize) {
            detectedFontSize = curr.style.fontSize;
          }
          if (!detectedFontFamily && curr.style?.fontFamily) {
            detectedFontFamily = curr.style.fontFamily;
          }
          if (detectedFontSize && detectedFontFamily) break;
          curr = curr.parentElement;
        }

        // If still not detected, inspect computed styles
        try {
          const computed = window.getComputedStyle(domEl);
          if (!detectedFontSize && computed?.fontSize) {
            detectedFontSize = computed.fontSize;
          }
          if (!detectedFontFamily && computed?.fontFamily) {
            detectedFontFamily = computed.fontFamily;
          }
        } catch {
          // ignore
        }
      }
    }

    // 4. Normalize font size (e.g., "20px", "20" -> "20px")
    if (detectedFontSize) {
      const num = parseFloat(detectedFontSize);
      if (!isNaN(num) && num > 0) {
        detectedFontSize = `${Math.round(num)}px`;
      }
    }

    // 5. Normalize font family (match against FONT_FAMILIES)
    if (detectedFontFamily) {
      const cleanRaw = detectedFontFamily.toLowerCase().replace(/['" ]/g, "");
      const match = FONT_FAMILIES.find((f) => {
        if (!f.value) return false;
        const cleanVal = f.value.toLowerCase().replace(/['" ]/g, "");
        return (
          cleanVal === cleanRaw ||
          cleanRaw.includes(cleanVal.split(",")[0]) ||
          cleanVal.includes(cleanRaw.split(",")[0])
        );
      });
      if (match) {
        detectedFontFamily = match.value;
      }
    }

    return {
      fontSize: detectedFontSize || "16px",
      fontFamily: detectedFontFamily || "",
    };
  }, [editor]);

  const updateActiveStyles = useCallback(() => {
    if (!editor) return;
    const fontInfo = getActiveFontInfo();
    setActiveStyles((prev) => {
      if (
        prev.fontSize === fontInfo.fontSize &&
        prev.fontFamily === fontInfo.fontFamily
      ) {
        return prev;
      }
      return {
        fontSize: fontInfo.fontSize,
        fontFamily: fontInfo.fontFamily,
      };
    });
  }, [editor, getActiveFontInfo]);

  useEffect(() => {
    updateActiveStylesRef.current = updateActiveStyles;
  }, [updateActiveStyles]);

  useEffect(() => {
    if (!editor) return;
    const handleUpdate = () => {
      updateActiveStyles();
    };
    editor.on("selectionUpdate", handleUpdate);
    editor.on("transaction", handleUpdate);
    editor.on("focus", handleUpdate);
    updateActiveStyles();
    return () => {
      editor.off("selectionUpdate", handleUpdate);
      editor.off("transaction", handleUpdate);
      editor.off("focus", handleUpdate);
    };
  }, [editor, updateActiveStyles]);

  // Font family selector
  const currentFontFamily = () => {
    return activeStyles.fontFamily || getActiveFontInfo().fontFamily || "";
  };

  const applyFontFamily = (val) => {
    applyWithSelection((chain) => {
      if (!val) {
        chain.unsetFontFamily();
      } else {
        const { empty } = editor.state.selection;
        if (empty) {
          if (editor.isActive("textStyle")) {
            chain.extendMarkRange("textStyle").setFontFamily(val);
          } else {
            const $pos = editor.state.selection.$from;
            const text = $pos.parent.textBetween(
              0,
              $pos.parent.content.size,
              undefined,
              "\ufffc"
            );
            const parentOffset = $pos.parentOffset;
            let start = parentOffset;
            let end = parentOffset;
            while (start > 0 && /\S/.test(text[start - 1])) start--;
            while (end < text.length && /\S/.test(text[end])) end++;
            if (end > start) {
              const fromWord = $pos.start() + start;
              const toWord = $pos.start() + end;
              chain.setTextSelection({ from: fromWord, to: toWord }).setFontFamily(val);
            } else {
              chain.setFontFamily(val);
            }
          }
        } else {
          chain.setFontFamily(val);
        }
      }
    });
    setActiveStyles((prev) => ({ ...prev, fontFamily: val }));
  };

  const handleFontFamilyChange = (e) => {
    const val = e.target.value;
    applyFontFamily(val);
  };

  // Font size selector
  const currentFontSize = () => {
    return activeStyles.fontSize || getActiveFontInfo().fontSize || "16px";
  };

  const applyFontSize = (val) => {
    applyWithSelection((chain) => {
      if (!val) {
        chain.unsetFontSize();
      } else {
        const { empty } = editor.state.selection;
        if (empty) {
          if (editor.isActive("textStyle")) {
            chain.extendMarkRange("textStyle").setFontSize(val);
          } else {
            const $pos = editor.state.selection.$from;
            const text = $pos.parent.textBetween(
              0,
              $pos.parent.content.size,
              undefined,
              "\ufffc"
            );
            const parentOffset = $pos.parentOffset;
            let start = parentOffset;
            let end = parentOffset;
            while (start > 0 && /\S/.test(text[start - 1])) start--;
            while (end < text.length && /\S/.test(text[end])) end++;
            if (end > start) {
              const fromWord = $pos.start() + start;
              const toWord = $pos.start() + end;
              chain.setTextSelection({ from: fromWord, to: toWord }).setFontSize(val);
            } else {
              chain.setFontSize(val);
            }
          }
        } else {
          chain.setFontSize(val);
        }
      }
    });
    setActiveStyles((prev) => ({ ...prev, fontSize: val || "16px" }));
  };

  const handleFontSizeChange = (e) => {
    const val = e.target.value;
    applyFontSize(val);
  };

  const PRESET_NUMS = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48];

  const handleDecreaseFontSize = () => {
    const current = currentFontSize();
    const num = parseInt(current.replace("px", ""), 10) || 16;
    const prevPreset = [...PRESET_NUMS].reverse().find((s) => s < num);
    const newNum = prevPreset !== undefined ? prevPreset : Math.max(10, num - 2);
    applyFontSize(`${newNum}px`);
  };

  const handleIncreaseFontSize = () => {
    const current = currentFontSize();
    const num = parseInt(current.replace("px", ""), 10) || 16;
    const nextPreset = PRESET_NUMS.find((s) => s > num);
    const newNum = nextPreset !== undefined ? nextPreset : Math.min(72, num + 2);
    applyFontSize(`${newNum}px`);
  };

  // Clear all formatting (styles, fonts, colors, and blocks) from current selection
  const handleClearFormatting = () => {
    applyWithSelection((chain) => {
      chain
        .unsetAllMarks()
        .unsetFontFamily()
        .unsetFontSize()
        .unsetColor()
        .unsetHighlight()
        .clearNodes();
    });
    setActiveStyles({
      fontSize: "16px",
      fontFamily: "",
    });
  };

  // Available font size and family options (dynamically including active value if custom)
  const availableFontSizes = (() => {
    const list = [...FONT_SIZES];
    const active = currentFontSize();
    if (active && !list.some((s) => s.value === active)) {
      list.splice(1, 0, { label: active, value: active });
    }
    return list;
  })();

  const availableFontFamilies = (() => {
    const list = [...FONT_FAMILIES];
    const active = currentFontFamily();
    if (active && !list.some((f) => f.value === active)) {
      list.splice(1, 0, {
        label: active.split(",")[0].replace(/['"]/g, ""),
        value: active,
      });
    }
    return list;
  })();

  if (!editor) return null;

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all bg-white dark:bg-zinc-900 relative shadow-sm">
      {/* Top Menu Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            Blog Editor
          </span>
          <span className="hidden sm:inline text-zinc-400">|</span>
          <div className="hidden sm:flex items-center gap-3">
            <span
              className="cursor-pointer hover:text-primary-brand-color transition"
              onClick={() => editor.chain().focus().undo().run()}
            >
              Undo
            </span>
            <span
              className="cursor-pointer hover:text-primary-brand-color transition"
              onClick={() => editor.chain().focus().redo().run()}
            >
              Redo
            </span>
            <span
              className="cursor-pointer hover:text-red-500 transition"
              onClick={handleClearFormatting}
              title="Clear all foreign styles, fonts & colors from selected text"
            >
              Clear Styles
            </span>
            <span
              className="cursor-pointer hover:text-primary-brand-color transition"
              onClick={insertTextImageLayout}
              title="Insert side-by-side section: Text Left + Image Right"
            >
              + Text & Image
            </span>
            <span
              className="cursor-pointer hover:text-primary-brand-color transition"
              onClick={insertImageTextLayout}
              title="Insert side-by-side section: Image Left + Text Right"
            >
              + Image & Text
            </span>
            <span
              className="cursor-pointer hover:text-primary-brand-color transition"
              onClick={insertTwoColumnLayout}
              title="Insert 2 equal text columns"
            >
              + 2-Col
            </span>
            <span
              className="cursor-pointer hover:text-primary-brand-color transition"
              onClick={insertStandardTable}
            >
              + Table
            </span>
          </div>
        </div>

        {onPreview && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onPreview}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-bold text-[#029bd2] bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900 border border-sky-200 dark:border-sky-800 transition-colors cursor-pointer"
            title="Live Preview Blog"
          >
            <Eye className="w-3.5 h-3.5 text-[#029bd2]" />
            <span>Preview</span>
          </button>
        )}
      </div>

      {/* Main Toolbar */}
      <div className="p-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-wrap items-center gap-1.5">
        {/* History */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/70 rounded-md p-0.5">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700 disabled:opacity-30 text-zinc-700 dark:text-zinc-200"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700 disabled:opacity-30 text-zinc-700 dark:text-zinc-200"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

        {/* Heading / Paragraph Selector */}
        <select
          value={currentBlockType()}
          onChange={handleHeadingChange}
          className="text-xs font-medium px-2 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary-brand-color cursor-pointer"
          title="Text Format"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>

        <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

        {/* Font Family & Size Selectors */}
        <div className="flex items-center gap-1.5">
          <select
            value={currentFontFamily()}
            onChange={handleFontFamilyChange}
            aria-label="Font Family"
            title="Font Family (Select text/words to apply font)"
            className="text-xs font-medium px-2 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary-brand-color cursor-pointer max-w-[135px]"
          >
            {availableFontFamilies.map((font) => (
              <option
                key={font.label}
                value={font.value}
                style={{ fontFamily: font.value || "inherit" }}
              >
                {font.label}
              </option>
            ))}
          </select>

          <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 overflow-hidden shadow-none">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleDecreaseFontSize}
              title="Decrease Font Size"
              className="px-2 py-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-primary-brand-color transition border-r border-zinc-200 dark:border-zinc-700"
            >
              A-
            </button>
            <select
              value={currentFontSize()}
              onChange={handleFontSizeChange}
              aria-label="Font Size"
              title="Font Size (Select text/words to apply size)"
              className="text-xs font-medium px-2 py-1.5 bg-transparent text-zinc-700 dark:text-zinc-200 focus:outline-none cursor-pointer w-[92px]"
            >
              {availableFontSizes.map((size) => (
                <option key={size.label} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleIncreaseFontSize}
              title="Increase Font Size"
              className="px-2 py-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-primary-brand-color transition border-l border-zinc-200 dark:border-zinc-700"
            >
              A+
            </button>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

        {/* Inline formatting: Bold, Italic, Underline, Strike, Clear Formatting */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/70 rounded-md p-0.5">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded transition ${
              editor.isActive("bold")
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded transition ${
              editor.isActive("italic")
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded transition ${
              editor.isActive("underline")
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded transition ${
              editor.isActive("strike")
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <div className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-0.5" />
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClearFormatting}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-red-600 transition"
            title="Clear Formatting (Remove foreign fonts, colors, and styles from selection)"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>
        </div>

        {/* Text Color & Highlight Controls */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/70 rounded-md p-0.5 gap-1 relative z-20">
          {/* Text Color Popover */}
          <div className="relative" ref={colorPopoverRef}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setShowColorPopover((prev) => !prev);
                setShowHighlightPopover(false);
              }}
              className={`flex items-center gap-1 px-1.5 py-1 rounded transition text-zinc-700 dark:text-zinc-200 cursor-pointer ${
                showColorPopover
                  ? "bg-white dark:bg-zinc-700 shadow-xs"
                  : "hover:bg-white dark:hover:bg-zinc-700"
              }`}
              title="Text Color (Pick from 12 common colors or custom color)"
            >
              <div className="flex flex-col items-center justify-center">
                <Palette className="w-4 h-4" />
                <span
                  className="w-3.5 h-1 rounded-full mt-0.5"
                  style={{
                    backgroundColor:
                      editor.getAttributes("textStyle")?.color || "#111827",
                  }}
                />
              </div>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {/* Popover Card */}
            {showColorPopover && (
              <div
                className="absolute left-0 top-full mt-1.5 z-50 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl w-64 space-y-3"
                onMouseDown={(e) => e.stopPropagation()}
              >
                {/* Popover Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-primary-brand-color" />
                    Text Color
                  </span>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      handleClearTextColor();
                      setShowColorPopover(false);
                    }}
                    className="text-[11px] font-medium text-zinc-500 hover:text-rose-500 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Reset to default text color"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                {/* 12 Most Common Color Boxes */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    12 Common Colors
                  </span>
                  <div className="grid grid-cols-6 gap-1.5">
                    {COMMON_COLORS.map((col) => {
                      const isActive =
                        editor.getAttributes("textStyle")?.color?.toLowerCase() ===
                        col.value.toLowerCase();
                      return (
                        <button
                          key={col.value}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            handleSelectTextColor(col.value);
                            setShowColorPopover(false);
                          }}
                          className={`w-7 h-7 rounded-lg border transition-transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center relative ${
                            isActive
                              ? "ring-2 ring-primary-brand-color ring-offset-1 border-white shadow-xs"
                              : "border-black/10 dark:border-white/10 hover:shadow-xs"
                          }`}
                          style={{ backgroundColor: col.value }}
                          title={`${col.label} (${col.value})`}
                        >
                          {isActive && (
                            <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Color Selector (Current color select) */}
                <div className="space-y-1.5 pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Custom Color
                  </span>
                  <div className="flex items-center gap-2">
                    <label
                      className="relative w-8 h-8 rounded-lg border border-zinc-300 dark:border-zinc-700 overflow-hidden cursor-pointer shadow-xs flex items-center justify-center shrink-0 hover:opacity-90"
                      title="Open Color Wheel / Palette"
                    >
                      <input
                        type="color"
                        ref={colorInputRef}
                        value={
                          editor.getAttributes("textStyle")?.color ||
                          customColorInput ||
                          "#111827"
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomColorInput(val);
                          handleSelectTextColor(val);
                        }}
                        className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer opacity-0"
                      />
                      <span
                        className="w-full h-full"
                        style={{
                          backgroundColor:
                            customColorInput ||
                            editor.getAttributes("textStyle")?.color ||
                            "#111827",
                        }}
                      />
                    </label>

                    <input
                      type="text"
                      value={customColorInput}
                      placeholder={
                        editor.getAttributes("textStyle")?.color || "#111827"
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomColorInput(val);
                        if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
                          handleSelectTextColor(val);
                        }
                      }}
                      className="h-8 text-xs font-mono uppercase px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex-1 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary-brand-color"
                    />

                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        if (customColorInput) {
                          handleSelectTextColor(
                            customColorInput.startsWith("#")
                              ? customColorInput
                              : `#${customColorInput}`
                          );
                        }
                        setShowColorPopover(false);
                      }}
                      className="h-8 px-2.5 rounded-lg bg-primary-brand-color text-white text-xs font-medium hover:opacity-90 transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Highlight Color Popover */}
          <div className="relative" ref={highlightPopoverRef}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setShowHighlightPopover((prev) => !prev);
                setShowColorPopover(false);
              }}
              className={`flex items-center gap-1 px-1.5 py-1 rounded transition text-zinc-700 dark:text-zinc-200 cursor-pointer ${
                showHighlightPopover
                  ? "bg-white dark:bg-zinc-700 shadow-xs"
                  : "hover:bg-white dark:hover:bg-zinc-700"
              }`}
              title="Highlight Background Color"
            >
              <div className="flex flex-col items-center justify-center">
                <Highlighter className="w-4 h-4" />
                <span
                  className="w-3.5 h-1 rounded-full mt-0.5"
                  style={{
                    backgroundColor:
                      editor.getAttributes("highlight")?.color || "#fef08a",
                  }}
                />
              </div>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {/* Popover Card */}
            {showHighlightPopover && (
              <div
                className="absolute left-0 top-full mt-1.5 z-50 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl w-60 space-y-3"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Highlighter className="w-3.5 h-3.5 text-amber-500" />
                    Highlight Color
                  </span>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      handleClearHighlight();
                      setShowHighlightPopover(false);
                    }}
                    className="text-[11px] font-medium text-zinc-500 hover:text-rose-500 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Remove Highlight"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Clear
                  </button>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Quick Highlights
                  </span>
                  <div className="grid grid-cols-6 gap-1.5">
                    {COMMON_HIGHLIGHTS.map((hl) => {
                      const isActive =
                        editor.getAttributes("highlight")?.color?.toLowerCase() ===
                        hl.value.toLowerCase();
                      return (
                        <button
                          key={hl.value}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            handleSelectHighlight(hl.value);
                            setShowHighlightPopover(false);
                          }}
                          className={`w-7 h-7 rounded-lg border transition-transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center relative ${
                            isActive
                              ? "ring-2 ring-primary-brand-color ring-offset-1 border-white shadow-xs"
                              : "border-black/10 dark:border-white/10 hover:shadow-xs"
                          }`}
                          style={{ backgroundColor: hl.value }}
                          title={`${hl.label} (${hl.value})`}
                        >
                          {isActive && (
                            <Check className="w-3.5 h-3.5 text-zinc-800 drop-shadow-sm" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Custom Highlight
                  </span>
                  <div className="flex items-center gap-2">
                    <label
                      className="relative w-8 h-8 rounded-lg border border-zinc-300 dark:border-zinc-700 overflow-hidden cursor-pointer shadow-xs flex items-center justify-center shrink-0 hover:opacity-90"
                      title="Open Color Wheel"
                    >
                      <input
                        type="color"
                        ref={highlightInputRef}
                        defaultValue="#fef08a"
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomHighlightInput(val);
                          handleSelectHighlight(val);
                        }}
                        className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer opacity-0"
                      />
                      <span
                        className="w-full h-full"
                        style={{
                          backgroundColor:
                            customHighlightInput ||
                            editor.getAttributes("highlight")?.color ||
                            "#fef08a",
                        }}
                      />
                    </label>

                    <input
                      type="text"
                      value={customHighlightInput}
                      placeholder="#fef08a"
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomHighlightInput(val);
                        if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
                          handleSelectHighlight(val);
                        }
                      }}
                      className="h-8 text-xs font-mono uppercase px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex-1 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary-brand-color"
                    />

                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        if (customHighlightInput) {
                          handleSelectHighlight(
                            customHighlightInput.startsWith("#")
                              ? customHighlightInput
                              : `#${customHighlightInput}`
                          );
                        }
                        setShowHighlightPopover(false);
                      }}
                      className="h-8 px-2.5 rounded-lg bg-primary-brand-color text-white text-xs font-medium hover:opacity-90 transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

        {/* Alignment */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/70 rounded-md p-0.5">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-1.5 rounded transition ${
              editor.isActive({ textAlign: "left" })
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-1.5 rounded transition ${
              editor.isActive({ textAlign: "center" })
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-1.5 rounded transition ${
              editor.isActive({ textAlign: "right" })
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={`p-1.5 rounded transition ${
              editor.isActive({ textAlign: "justify" })
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Justify"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
        </div>

        <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

        {/* Lists & Quotes */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/70 rounded-md p-0.5">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded transition ${
              editor.isActive("bulletList")
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded transition ${
              editor.isActive("orderedList")
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded transition ${
              editor.isActive("blockquote")
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded transition ${
              editor.isActive("codeBlock")
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

        {/* Media, Links & Layout Columns */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/70 rounded-md p-0.5 gap-1">
          <button
            type="button"
            onClick={handleLink}
            className={`p-1.5 rounded transition ${
              editor.isActive("link")
                ? "bg-primary-brand-color text-white"
                : "hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            title="Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) addImage(file);
            }}
            accept="image/*"
            className="hidden"
          />

          {/* Section Layouts Dropdown */}
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val === "text-image") insertTextImageLayout();
              else if (val === "image-text") insertImageTextLayout();
              else if (val === "two-col") insertTwoColumnLayout();
              else if (val === "table") insertStandardTable();
              e.target.value = "";
            }}
            defaultValue=""
            className="text-xs font-medium px-2 py-1 rounded bg-white dark:bg-zinc-800 text-primary-brand-color border border-primary-brand-color/40 hover:bg-primary-brand-color/10 shadow-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-brand-color"
            title="Insert Pre-made Section Layouts"
          >
            <option value="" disabled>
              + Section Layout
            </option>
            <option value="text-image">📖 Text Left + Image Right</option>
            <option value="image-text">🖼️ Image Left + Text Right</option>
            <option value="two-col">⚖️ 2 Equal Columns (50/50)</option>
            <option value="table">📊 Table (3x3)</option>
          </select>

          {/* Quick Table Button */}
          <button
            type="button"
            onClick={insertStandardTable}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            title="Insert Standard Table"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Image Controls (Shown when an image is selected) */}
        {editor.isActive("image") && (
          <div className="flex items-center gap-1.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-md p-1 ml-auto text-xs flex-wrap">
            <span className="text-[11px] font-semibold text-sky-800 dark:text-sky-300 mr-0.5 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5" /> Image:
            </span>

            {/* Alignments */}
            <div className="flex items-center gap-0.5 bg-white dark:bg-zinc-800 p-0.5 rounded border border-zinc-200 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => setImageAlignment("left")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  editor.getAttributes("image")["data-align"] === "left"
                    ? "bg-primary-brand-color text-white"
                    : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
                title="Float Left (Text wraps around right side)"
              >
                Left
              </button>
              <button
                type="button"
                onClick={() => setImageAlignment("center")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  editor.getAttributes("image")["data-align"] === "center" ||
                  !editor.getAttributes("image")["data-align"]
                    ? "bg-primary-brand-color text-white"
                    : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
                title="Center Image"
              >
                Center
              </button>
              <button
                type="button"
                onClick={() => setImageAlignment("right")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  editor.getAttributes("image")["data-align"] === "right"
                    ? "bg-primary-brand-color text-white"
                    : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
                title="Float Right (Text wraps around left side)"
              >
                Right
              </button>
              <button
                type="button"
                onClick={() => setImageAlignment("full")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  editor.getAttributes("image")["data-align"] === "full"
                    ? "bg-primary-brand-color text-white"
                    : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
                title="Full Width"
              >
                Full
              </button>
            </div>

            {/* Sizes */}
            <div className="flex items-center gap-0.5 bg-white dark:bg-zinc-800 p-0.5 rounded border border-zinc-200 dark:border-zinc-700">
              {["25%", "33%", "50%", "75%", "100%"].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setImageWidth(sz)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                    editor.getAttributes("image").width === sz
                      ? "bg-primary-brand-color text-white"
                      : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  }`}
                  title={`Set width to ${sz}`}
                >
                  {sz}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => editor.chain().focus().deleteSelection().run()}
              className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded ml-0.5"
              title="Remove image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Table Controls (Shown when cursor is inside a table) */}
        {editor.isActive("table") && (
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-1 ml-auto text-xs">
            <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 mr-1">
              Table:
            </span>
            <button
              type="button"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 rounded border text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100"
              title="Add Column"
            >
              + Col
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().addRowAfter().run()}
              className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 rounded border text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100"
              title="Add Row"
            >
              + Row
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteColumn().run()}
              className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 rounded border text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100"
              title="Delete Column"
            >
              - Col
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteRow().run()}
              className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 rounded border text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100"
              title="Delete Row"
            >
              - Row
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              title="Delete entire table/layout"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Live Preview Button in Editor Toolbox */}
        {onPreview && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#029bd2] bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900 border border-sky-200 dark:border-sky-800 shadow-xs cursor-pointer transition-all active:scale-95 ml-auto"
            title="Preview how blog will look when published"
          >
            <Eye className="w-4 h-4 text-[#029bd2]" />
            <span>Preview</span>
          </button>
        )}
      </div>

      {/* Editor Content Area */}
      <div className="min-h-[300px] max-h-[600px] overflow-y-auto p-4 admin-scrollbar">
        <EditorContent editor={editor} className="tiptap prose max-w-none focus:outline-none" />
      </div>
    </div>
  );
}
