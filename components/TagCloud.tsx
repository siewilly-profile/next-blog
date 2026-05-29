import Link from "next/link";
import { TagCount } from "../lib/tags";

type TagCloudProps = {
  tags: TagCount[];
  activeTag?: string | null;
  basePath: string;
};

export default function TagCloud({ tags, activeTag, basePath }: TagCloudProps) {
  if (tags.length === 0) {
    return <p style={{ color: "var(--ink-light)", fontSize: "14px" }}>暫無標籤</p>;
  }

  return (
    <div className="tags-cloud">
      {tags.map((item) => {
        const isActive = activeTag === item.tag;
        return (
          <Link
            key={item.tag}
            href={`${basePath}?tag=${encodeURIComponent(item.tag)}`}
            className={`tag ${isActive ? "active" : ""}`}
          >
            {item.tag} ({item.count})
          </Link>
        );
      })}
    </div>
  );
}
