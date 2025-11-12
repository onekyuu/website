import { useMemo } from "react";

export interface Heading {
  id: string;
  level: number;
  text: string;
}

interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
}

function extractTextFromNode(node: TiptapNode): string {
  if (node.text) {
    return node.text;
  }
  if (node.content) {
    return node.content.map(extractTextFromNode).join("");
  }
  return "";
}

function extractHeadingsFromNodes(
  nodes: TiptapNode[],
  headings: Heading[] = []
): Heading[] {
  nodes.forEach((node) => {
    if (node.type === "heading" && node.attrs?.level) {
      const text = extractTextFromNode(node);
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
        .replace(/(^-|-$)/g, "");

      headings.push({
        id,
        level: node.attrs.level as number,
        text,
      });
    }

    if (node.content) {
      extractHeadingsFromNodes(node.content, headings);
    }
  });

  return headings;
}

export function useTiptapHeadings(content: string | object): Heading[] {
  return useMemo(() => {
    if (!content) return [];

    try {
      let parsed: { type: string; content?: TiptapNode[] };

      if (typeof content === "string") {
        parsed = JSON.parse(content);
      } else {
        parsed = content as { type: string; content?: TiptapNode[] };
      }

      if (!parsed.content) return [];

      return extractHeadingsFromNodes(parsed.content);
    } catch (error) {
      console.error("Failed to parse Tiptap content:", error);
      return [];
    }
  }, [content]);
}
