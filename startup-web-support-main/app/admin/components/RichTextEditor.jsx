"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { useRef, useState } from "react";
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
} from "lucide-react";

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
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
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

  if (!editor) return null;

  // Image upload
  const addImage = async (file) => {
    try {
      const res = await CommonServices.uploadImage(file);
      if (res?.url) {
        editor.chain().focus().setImage({ src: res.url }).run();
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

  // Layout Helpers
  const insertTwoColumnLayout = () => {
    // Inserts a 2-column layout block (Left: Image/Media, Right: Text)
    editor
      .chain()
      .focus()
      .insertContent(`
        <table class="layout-table" data-layout="columns" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
          <tbody>
            <tr>
              <td style="width: 50%; vertical-align: top; padding: 10px;">
                <p><strong>Left Side (Image / Visual)</strong></p>
                <p>Click image icon to insert photo here...</p>
              </td>
              <td style="width: 50%; vertical-align: top; padding: 10px;">
                <p><strong>Right Side (Text Content)</strong></p>
                <p>Write your detailed text and bullet points here...</p>
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

  // Font size / Paragraph selector
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
              onClick={insertTwoColumnLayout}
            >
              + 2-Col Layout
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
          className="text-xs font-medium px-2 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary-brand-color"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>

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

          {/* 2-Column Left Image / Right Text Layout Button */}
          <button
            type="button"
            onClick={insertTwoColumnLayout}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-white dark:bg-zinc-700 text-primary-brand-color border border-primary-brand-color/30 hover:bg-primary-brand-color/10 shadow-xs"
            title="Insert 2-Column Layout (Left image / Right text)"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>2-Column Layout</span>
          </button>

          {/* Standard Table Button */}
          <button
            type="button"
            onClick={insertStandardTable}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>

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
