import { Dispatch, SetStateAction, useEffect, useState } from "react";
import chevronLeft from "/icons/chevron_left.svg";
import chevronRight from "/icons/chevron_right.svg";

export default function PaginationSection({
  page,
  total,
  setPage,
}: {
  page: number;
  total: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const [pageList, setPageList] = useState<number[]>([]);
  const [maxPages, setMaxPages] = useState(Math.ceil(total / 10));

  useEffect(() => {
    let pageList: number[] = [];

    if (page <= 3) pageList = [1, 2, 3, 4, 5];

    if (page > 3) pageList = [page - 2, page - 1, page, page + 1, page + 2];

    pageList = pageList.filter((n) => n <= maxPages);

    setPageList(pageList);
  }, [page, maxPages]);

  useEffect(() => {
    setMaxPages(Math.ceil(total / 10));
  }, [total]);

  const setPreviousPage = () => {
    setPage((currentPage) => {
      const previousPage = currentPage - 1;
      if (previousPage < 1) return 1;
      return previousPage;
    });
  };

  const setNextPage = () => {
    setPage((currentPage) => {
      const nextPage = currentPage + 1;
      if (nextPage > maxPages) return maxPages;
      return nextPage;
    });
  };

  return (
    <section
      className={`flex flex-row items-center justify-end gap-2 text-sm mt-3`}
    >
      <button
        className={
          "w-8 h-8 rounded border border-gray-200 flex flex-row items-center justify-center"
        }
        onClick={() => setPreviousPage()}
      >
        <img src={chevronLeft} alt={"previous page"} />
      </button>
      {pageList.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`w-6 h-6 text-gray-500 rounded ${page === pageNumber ? "bg-secondary text-white" : null}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={
          "w-8 h-8 rounded border border-gray-200 flex flex-row items-center justify-center"
        }
        onClick={() => setNextPage()}
      >
        <img src={chevronRight} alt={"next page"} />
      </button>
    </section>
  );
}
