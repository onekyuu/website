"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { cn } from "@/lib/utils";
import Heading from "@tiptap/extension-heading";

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
      StarterKit.configure({
        heading: false,
      }),
      Heading.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            id: {
              default: null,
              rendered: false,
            },
          };
        },

        renderHTML({ node, HTMLAttributes }) {
          const hasLevel = this.options.levels.includes(node.attrs.level);
          const level = hasLevel ? node.attrs.level : this.options.levels[0];

          const text = node.textContent;
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return [
            `h${level}`,
            {
              ...HTMLAttributes,
              id,
              class: cn(HTMLAttributes.class, "scroll-mt-24"),
            },
            0,
          ];
        },
      }).configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] hover:underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg my-4 max-w-full h-auto",
        },
      }),
    ],
    content: parsedContent,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "prose dark:prose-invert max-w-none focus:outline-none",
          // title styles
          "[&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:lg:text-5xl [&_h1]:font-bold [&_h1]:text-[var(--color-primary-900)] [&_h1]:dark:text-[var(--color-primary-50)] [&_h1]:mt-8 [&_h1]:mb-4",
          "[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:lg:text-4xl [&_h2]:font-bold [&_h2]:text-[var(--color-primary-900)] [&_h2]:dark:text-[var(--color-primary-50)] [&_h2]:mt-6 [&_h2]:mb-3",
          "[&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:lg:text-3xl [&_h3]:font-semibold [&_h3]:text-[var(--color-primary-900)] [&_h3]:dark:text-[var(--color-primary-50)] [&_h3]:mt-5 [&_h3]:mb-2",
          "[&_h4]:text-lg [&_h4]:md:text-xl [&_h4]:lg:text-2xl [&_h4]:font-semibold [&_h4]:text-[var(--color-primary-900)] [&_h4]:dark:text-[var(--color-primary-50)] [&_h4]:mt-4 [&_h4]:mb-2",
          // paragraph styles
          "[&_p]:text-base [&_p]:md:text-lg [&_p]:text-[var(--color-gray-700)] [&_p]:dark:text-[var(--color-gray-300)] [&_p]:leading-relaxed [&_p]:my-4",
          // unlordered list styles
          "[&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:list-none [&_ul]:pl-0",
          // ordered list styles - using CSS counter
          "[&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:list-none [&_ol]:pl-0",
          // unordered list item styles
          "[&_ul>li]:relative [&_ul>li]:pl-6 [&_ul>li]:text-base [&_ul>li]:md:text-lg [&_ul>li]:text-[var(--color-gray-700)] [&_ul>li]:dark:text-[var(--color-gray-300)]",
          "[&_ul>li]:before:content-['•'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:font-bold [&_ul>li]:before:text-[var(--color-primary-700)] [&_ul>li]:before:dark:text-[var(--color-primary-400)]",
          // ordered list item styles
          "[&_ol>li]:relative [&_ol>li]:pl-6 [&_ol>li]:text-base [&_ol>li]:md:text-lg [&_ol>li]:text-[var(--color-gray-700)] [&_ol>li]:dark:text-[var(--color-gray-300)]",
          // nested lists
          "[&_ul_ul]:mt-2 [&_ul_ul]:mb-0",
          "[&_ol_ol]:mt-2 [&_ol_ol]:mb-0",
          "[&_ul_ul>li]:before:content-['◦'] [&_ul_ul>li]:before:text-sm",
          "[&_ul_ul_ul>li]:before:content-['▪'] [&_ul_ul_ul>li]:before:text-xs",
          // blockquote styles
          "[&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-primary-700)] [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-[var(--color-gray-700)] [&_blockquote]:dark:text-[var(--color-gray-300)]",
          // inline code styles
          "[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:bg-[var(--color-gray-200)] [&_code]:dark:bg-[var(--color-gray-800)] [&_code]:text-[var(--color-primary-600)] [&_code]:dark:text-[var(--color-primary-400)] [&_code]:rounded [&_code]:text-sm [&_code]:font-mono",
          // code block styles
          "[&_pre]:bg-[var(--color-gray-100)] [&_pre]:dark:bg-[var(--color-gray-900)] [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:my-4 [&_pre]:overflow-x-auto",
          "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[var(--color-gray-900)] [&_pre_code]:dark:text-[var(--color-gray-100)]",
          // link styles
          "[&_a]:text-[var(--color-primary-600)] [&_a]:dark:text-[var(--color-primary-400)] [&_a]:hover:underline",
          // divider styles
          "[&_hr]:my-8 [&_hr]:border-[var(--color-gray-300)] [&_hr]:dark:border-[var(--color-gray-700)]",
          // table styles
          "[&_table]:w-full [&_table]:border-collapse [&_table]:my-4",
          "[&_th]:border [&_th]:border-[var(--color-gray-300)] [&_th]:dark:border-[var(--color-gray-700)] [&_th]:px-4 [&_th]:py-2 [&_th]:bg-[var(--color-gray-100)] [&_th]:dark:bg-[var(--color-gray-800)] [&_th]:font-semibold [&_th]:text-left",
          "[&_td]:border [&_td]:border-[var(--color-gray-300)] [&_td]:dark:border-[var(--color-gray-700)] [&_td]:px-4 [&_td]:py-2",
          className
        ),
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
      <div className={cn("prose dark:prose-invert max-w-none", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        /* 有序列表计数器 */
        .prose ol {
          counter-reset: item;
        }

        .prose ol > li {
          counter-increment: item;
        }

        .prose ol > li::before {
          content: counter(item) ".";
          position: absolute;
          left: 0;
          color: var(--color-primary-600);
          font-weight: 600;
        }

        .dark .prose ol > li::before {
          color: var(--color-primary-400);
        }

        /* 嵌套有序列表 */
        .prose ol ol {
          counter-reset: item;
        }

        .prose ol ol > li::before {
          content: counter(item, lower-alpha) ".";
        }

        .prose ol ol ol > li::before {
          content: counter(item, lower-roman) ".";
        }
      `}</style>
      <EditorContent editor={editor} />
    </>
  );
};
