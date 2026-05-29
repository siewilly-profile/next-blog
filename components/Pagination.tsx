import Link from "next/link";
import { getVisiblePageNumbers } from "../lib/pagination";
import { buildQueryString } from "../lib/urls";

type PaginationProps = {
  totalPages: number;
  activePage: number;
  basePath: string;
  tag?: string | null;
  query?: string | null;
};

export default function Pagination({ totalPages, activePage, basePath, tag, query }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getVisiblePageNumbers(totalPages, activePage, 2);

  const buildPageUrl = (page: number) =>
    `${basePath}${buildQueryString({ page, tag: tag || undefined, q: query || undefined })}`;

  return (
    <nav className="pagination" aria-label="文章分頁">
      {activePage > 1 && (
        <Link className="pagination-link prev" href={buildPageUrl(activePage - 1)}>
          ← 上一頁
        </Link>
      )}

      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          );
        }

        return (
          <Link
            key={page}
            className={`pagination-link page-number ${page === activePage ? "active" : ""}`}
            href={buildPageUrl(page)}
          >
            {page}
          </Link>
        );
      })}

      {activePage < totalPages && (
        <Link className="pagination-link next" href={buildPageUrl(activePage + 1)}>
          下一頁 →
        </Link>
      )}
    </nav>
  );
}
