import { useEffect, useState } from "react";

export const usePagination = (page: number, total: number) => {
  const [currentPage, setCurrentPage] = useState(page);
  const [pageList, setPageList] = useState<number[]>([1, 2, 3, 4, 5]);

  const maxPages = Math.ceil(total / 10);
  useEffect(() => {
    let pageList: number[] = [];

    if (currentPage <= 3) pageList = [1, 2, 3, 4, 5];

    if (currentPage > 3)
      pageList = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];

    pageList = pageList.filter((n) => n <= maxPages);

    setPageList(pageList);
  }, [currentPage]);

  return [currentPage, setCurrentPage, pageList];
};
