"use client";

import React, { useState } from "react";
import { Bold, Italic, Heading, Link as LinkIcon, Image as ImageIcon, List, Quote, Code, Eye, Edit3 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  const insertTag = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("blog-editor-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = `${prefix}${selectedText || "text"}${suffix}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);
  };

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 border-b border-zinc-800 bg-zinc-900/60">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertTag("## ")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Heading 2"
          >
            <Heading className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("**", "**")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("*", "*")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("[Link Title](", ")")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("![Alt Text](", ")")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("- ")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("> ")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("```tsx\n", "\n```")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
        >
          {isPreview ? (
            <>
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" /> Preview
            </>
          )}
        </button>
      </div>

      {/* Editor Body */}
      {isPreview ? (
        <div className="p-4 min-h-75 text-sm text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
          {value || <span className="text-zinc-600 italic">Nothing to preview...</span>}
        </div>
      ) : (
        <Textarea
          id="blog-editor-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={14}
          placeholder="Write your article content using Markdown formatting (headings, code blocks, lists, links)..."
          className="border-0 focus:ring-0 font-mono text-xs leading-relaxed rounded-none p-4"
        />
      )}
    </div>
  );
}
