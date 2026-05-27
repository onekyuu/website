"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";

interface TiptapContentProps {
  content: string | object;
  className?: string;
}

export const TiptapContent: React.FC<TiptapContentProps> = ({
  content,
  className,
}) => {
  const parsedContent = React.useMemo(() => {
    if (!content) return null;
    if (typeof content === "string") {
      try {
        return JSON.parse(content);
      } catch {
        return content;
      }
    }
    return content;
  }, [content]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            id: { default: null, rendered: false },
          };
        },
        renderHTML({ node, HTMLAttributes }) {
          const hasLevel = this.options.levels.includes(node.attrs.level);
          const level = hasLevel ? node.attrs.level : this.options.levels[0];
          const id = node.textContent
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
            .replace(/(^-|-$)/g, "");
          return [`h${level}`, { ...HTMLAttributes, id, class: "scroll-mt-24" }, 0];
        },
      }).configure({ levels: [1, 2, 3, 4, 5, 6] }),
      TiptapLink.configure({ openOnClick: false }),
      TiptapImage,
    ],
    content: parsedContent,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn("tiptap-content focus:outline-none", className),
      },
    },
  });

  useEffect(() => {
    if (editor && parsedContent) {
      editor.commands.setContent(parsedContent);
    }
  }, [editor, parsedContent]);

  if (!editor) {
    return (
      <div className="flex flex-col gap-4">
        {[3, 4, 1, 4, 1, 3, 4].map((lines, i) => (
          <div key={i} className={cn("h-5 rounded-none bg-site-paper-2", i % 3 === 2 && "w-3/4")} />
        ))}
      </div>
    );
  }

  return <EditorContent editor={editor} />;
};
