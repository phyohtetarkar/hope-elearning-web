import { useEffect, useState } from "react";

interface HeadingType {
  id: string;
  content?: string | null;
}
export default function ContentHeadings({ html }: { html?: string }) {
  const [headings, setHeadings] = useState<HeadingType[]>([]);

  useEffect(() => {
    try {
      if (!html) {
        return;
      }

      var root = document.createElement("div");
      root.innerHTML = html.trim();

      const list: HeadingType[] = [];
      root.querySelectorAll("h1, h2, h3, h4").forEach((el) => {
        if (!el.textContent) {
          return;
        }

        const id = el.id
          ? el.id
          : el.textContent.replaceAll(/\s+/g, "-").toLowerCase();

        list.push({ id: id, content: el.textContent });
      });

      setHeadings(list);
    } catch (error) {
      console.error(error);
    }
  }, [html]);

  if (!html) {
    return null;
  }

  return (
    <ol className="list-decimal">
      {headings.map((h, i) => {
        return (
          <li
            key={i}
            className="text-muted-foreground hover:text-foreground text-sm mb-1"
          >
            <a href={`#${h.id}`}>{h.content}</a>
          </li>
        );
      })}
    </ol>
  );
}
