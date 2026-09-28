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
import { useRef, useState, useEffect } from "react";
import CommonServices from "@/services/common.service";
import "../../editor.css";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
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
  Maximize2,
  Minimize2,
  Table as TableIcon,
  Columns,
  Palette,
  Highlighter,
  ChevronDown,
  Trash2,
  Plus,
  Type,
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

    let inlineStyle = "";
    if (align === "left") {
      inlineStyle = `float: left; margin: 0.5rem 1.5rem 1rem 0; width: ${width}; max-width: 100%; height: auto; border-radius: 0.5rem;`;
    } else if (align === "right") {
      inlineStyle = `float: right; margin: 0.5rem 0 1rem 1.5rem; width: ${width}; max-width: 100%; height: auto; border-radius: 0.5rem;`;
    } else if (align === "full") {
      inlineStyle = `display: block; width: 100%; max-width: 100%; height: auto; margin: 1.5rem auto; border-radius: 0.5rem; clear: both;`;
    } else {
      inlineStyle = `display: block; margin: 1.5rem auto; width: ${width}; max-width: 100%; height: auto; border-radius: 0.5rem; clear: both;`;
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
      const align = node.attrs["data-align"] || "center";
      container.className = `tiptap-image-container align-${align}`;

      const wrapper = document.createElement("div");
      wrapper.className = "tiptap-image-wrapper";
      wrapper.style.width = node.attrs.width || "50%";

      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || "";
      img.draggable = false;
      img.addEventListener("dragstart", (e) => e.preventDefault());

      const sizeBadge = document.createElement("span");
      sizeBadge.className = "image-size-badge";
      sizeBadge.textContent = node.attrs.width || "50%";

      const handleBR = document.createElement("div");
      handleBR.className = "image-resize-handle handle-br";
      handleBR.title = "Drag corner to resize width";

      const handleBL = document.createElement("div");
      handleBL.className = "image-resize-handle handle-bl";
      handleBL.title = "Drag corner to resize width";

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

      const updateQuickBar = (currAlign, currWidth) => {
        quickBar.innerHTML = "";

        const btnLeft = createBtn("⇦ Left", "Float Left (Text wraps around right side)", () => {
          const w = (currWidth === "100%" || !currWidth) ? "45%" : currWidth;
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { "data-align": "left", width: w }).run();
          }
        }, currAlign === "left");

        const btnCenter = createBtn("Center", "Center Image", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { "data-align": "center" }).run();
          }
        }, currAlign === "center");

        const btnRight = createBtn("Right ⇨", "Float Right (Text wraps around left side)", () => {
          const w = (currWidth === "100%" || !currWidth) ? "45%" : currWidth;
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { "data-align": "right", width: w }).run();
          }
        }, currAlign === "right");

        const sep1 = document.createElement("span");
        sep1.className = "opacity-40";
        sep1.textContent = "|";

        const btn25 = createBtn("25%", "Small (25%)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { width: "25%" }).run();
          }
        }, currWidth === "25%");

        const btn33 = createBtn("33%", "One-Third (33%)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { width: "33%" }).run();
          }
        }, currWidth === "33%");

        const btn50 = createBtn("50%", "Half (50%)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { width: "50%" }).run();
          }
        }, currWidth === "50%");

        const btn75 = createBtn("75%", "Three-Fourths (75%)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { width: "75%" }).run();
          }
        }, currWidth === "75%");

        const btn100 = createBtn("100%", "Full Width (100%)", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).updateAttributes("image", { width: "100%", "data-align": "center" }).run();
          }
        }, currWidth === "100%");

        const sep2 = document.createElement("span");
        sep2.className = "opacity-40";
        sep2.textContent = "|";

        const btnDel = createBtn("✕", "Delete Image", () => {
          const pos = typeof getPos === "function" ? getPos() : undefined;
          if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).deleteSelection().run();
          }
        }, false);
        btnDel.style.color = "#f87171";

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
        quickBar.appendChild(btnDel);
      };

      updateQuickBar(align, node.attrs.width || "50%");

      const initResize = (handle, dir) => {
        handle.addEventListener("mousedown", (e) => {
          e.preventDefault();
          e.stopPropagation();

          const startX = e.clientX;
          const startWidth = wrapper.offsetWidth;
          const editorEl = container.closest(".tiptap") || document.body;
          const editorWidth = editorEl.offsetWidth || 800;

          let finalPercent = wrapper.style.width || "50%";

          const onMouseMove = (moveEvent) => {
            const deltaX = dir === "br" ? (moveEvent.clientX - startX) : (startX - moveEvent.clientX);
            const newPx = Math.max(80, Math.min(editorWidth, startWidth + deltaX));
            const pct = Math.min(100, Math.max(15, Math.round((newPx / editorWidth) * 100)));
            finalPercent = `${pct}%`;
            wrapper.style.width = finalPercent;
            sizeBadge.textContent = finalPercent;
          };

          const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            const pos = typeof getPos === "function" ? getPos() : undefined;
            if (typeof pos === "number") {
              editor.chain().setNodeSelection(pos).updateAttributes("image", { width: finalPercent }).run();
            }
          };

          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        });
      };

      initResize(handleBR, "br");
      initResize(handleBL, "bl");

      wrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        const pos = typeof getPos === "function" ? getPos() : undefined;
        if (typeof pos === "number") {
          editor.chain().setNodeSelection(pos).run();
        }
      });

      wrapper.appendChild(img);
      wrapper.appendChild(sizeBadge);
      wrapper.appendChild(handleBR);
      wrapper.appendChild(handleBL);
      wrapper.appendChild(quickBar);
      container.appendChild(wrapper);

      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type.name !== "image") return false;
          img.src = updatedNode.attrs.src;
          img.alt = updatedNode.attrs.alt || "";
          const newWidth = updatedNode.attrs.width || "50%";
          const newAlign = updatedNode.attrs["data-align"] || "center";
          wrapper.style.width = newWidth;
          sizeBadge.textContent = newWidth;
          container.className = `tiptap-image-container align-${newAlign}`;
          updateQuickBar(newAlign, newWidth);
          return true;
        },
        selectNode: () => {
          wrapper.classList.add("is-selected");
        },
        deselectNode: () => {
          wrapper.classList.remove("is-selected");
        },
        stopEvent: (event) => {
          return quickBar.contains(event.target) || handleBR.contains(event.target) || handleBL.contains(event.target);
        },
        destroy: () => {},
      };
    };
  },
});

export default function RichTextEditor({ value, onChange }) {
  const fileInputRef = useRef(null);
  const colorInputRef = useRef(null);
  const highlightInputRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
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
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
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

  if (!editor) return null;

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
        <table class="layout-table layout-text-image" data-layout="columns" style="width: 100%; border-collapse: collapse; margin: 1.75rem 0;">
          <tbody>
            <tr>
              <td style="width: 55%; vertical-align: middle; padding: 12px 20px 12px 0;">
                <h3 style="margin-top: 0;">Heading / Feature Title</h3>
                <p>Write your detailed text, insights, or story here. Readers can easily absorb the key details on this side alongside the visual.</p>
                <ul>
                  <li>Key highlight or point one</li>
                  <li>Key highlight or point two</li>
                </ul>
              </td>
              <td style="width: 45%; vertical-align: middle; padding: 12px 0 12px 20px; text-align: center;">
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
        <table class="layout-table layout-image-text" data-layout="columns" style="width: 100%; border-collapse: collapse; margin: 1.75rem 0;">
          <tbody>
            <tr>
              <td style="width: 45%; vertical-align: middle; padding: 12px 20px 12px 0; text-align: center;">
                <p><strong>Left Side (Image)</strong></p>
                <p><em>Click the image icon to upload or place your picture here...</em></p>
              </td>
              <td style="width: 55%; vertical-align: middle; padding: 12px 0 12px 20px;">
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
        <table class="layout-table" data-layout="columns" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
          <tbody>
            <tr>
              <td style="width: 50%; vertical-align: top; padding: 10px;">
                <p><strong>Left Column</strong></p>
                <p>Write your left column content, points, or comparisons here...</p>
              </td>
              <td style="width: 50%; vertical-align: top; padding: 10px;">
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
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    return "p";
  };

  const handleHeadingChange = (e) => {
    const val = e.target.value;
    if (val === "p") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(val.replace("h", ""), 10);
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  // Font family selector for specific selection/words
  const currentFontFamily = () => {
    const raw = editor.getAttributes("textStyle").fontFamily;
    if (!raw) return "";
    const cleanRaw = raw.toLowerCase().replace(/['" ]/g, "");
    const match = FONT_FAMILIES.find(
      (f) => f.value && f.value.toLowerCase().replace(/['" ]/g, "") === cleanRaw
    );
    return match ? match.value : raw;
  };

  const handleFontFamilyChange = (e) => {
    const val = e.target.value;
    if (!val) {
      editor.chain().focus().unsetFontFamily().run();
    } else {
      editor.chain().focus().setFontFamily(val).run();
    }
  };

  // Font size selector for specific selection/words
  const currentFontSize = () => {
    return editor.getAttributes("textStyle").fontSize || "";
  };

  const handleFontSizeChange = (e) => {
    const val = e.target.value;
    if (!val) {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(val).run();
    }
  };

  return (
    <div
      className={`border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all bg-white dark:bg-zinc-900 ${
        isFullscreen
          ? "fixed inset-0 z-50 rounded-none w-screen h-screen flex flex-col p-4 bg-white dark:bg-zinc-900"
          : "relative shadow-sm"
      }`}
    >
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

        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300 hover:text-primary-brand-color text-xs p-1 rounded transition"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Editor"}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5" /> Exit Fullscreen
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
            </>
          )}
        </button>
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
            {FONT_FAMILIES.map((font) => (
              <option
                key={font.label}
                value={font.value}
                style={{ fontFamily: font.value || "inherit" }}
              >
                {font.label}
              </option>
            ))}
          </select>

          <select
            value={currentFontSize()}
            onChange={handleFontSizeChange}
            aria-label="Font Size"
            title="Font Size (Select text/words to apply size)"
            className="text-xs font-medium px-2 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary-brand-color cursor-pointer w-[95px]"
          >
            {FONT_SIZES.map((size) => (
              <option key={size.label} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>

        <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

        {/* Inline formatting: Bold, Italic, Underline, Strike */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/70 rounded-md p-0.5">
          <button
            type="button"
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
        </div>

        {/* Text Color & Highlight */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/70 rounded-md p-0.5 gap-1">
          <label
            className="flex items-center p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700 cursor-pointer text-zinc-700 dark:text-zinc-200"
            title="Text Color"
          >
            <Palette className="w-4 h-4 mr-0.5" />
            <input
              type="color"
              ref={colorInputRef}
              onChange={(e) =>
                editor.chain().focus().setColor(e.target.value).run()
              }
              className="w-3.5 h-3.5 p-0 border-0 rounded cursor-pointer bg-transparent"
            />
          </label>

          <label
            className="flex items-center p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700 cursor-pointer text-zinc-700 dark:text-zinc-200"
            title="Highlight Color"
          >
            <Highlighter className="w-4 h-4 mr-0.5" />
            <input
              type="color"
              ref={highlightInputRef}
              defaultValue="#fef08a"
              onChange={(e) =>
                editor
                  .chain()
                  .focus()
                  .setHighlight({ color: e.target.value })
                  .run()
              }
              className="w-3.5 h-3.5 p-0 border-0 rounded cursor-pointer bg-transparent"
            />
          </label>
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
      </div>

      {/* Editor Content Area */}
      <div
        className={`${
          isFullscreen
            ? "flex-1 overflow-y-auto p-6 max-w-5xl mx-auto w-full admin-scrollbar"
            : "min-h-[300px] max-h-[600px] overflow-y-auto p-4 admin-scrollbar"
        }`}
      >
        <EditorContent editor={editor} className="tiptap prose max-w-none focus:outline-none" />
      </div>
    </div>
  );
}
