export function getVisiblePageNumbers(
  totalPages: number,
  activePage: number,
  siblingCount = 2
): Array<number | "..."> {
  const numbers: Array<number | "..."> = [];
  const start = Math.max(2, activePage - siblingCount);
  const end = Math.min(totalPages - 1, activePage + siblingCount);

  numbers.push(1);

  if (start > 2) {
    numbers.push("...");
  }

  for (let i = start; i <= end; i += 1) {
    numbers.push(i);
  }

  if (end < totalPages - 1) {
    numbers.push("...");
  }

  if (totalPages > 1) {
    numbers.push(totalPages);
  }

  return numbers;
}
