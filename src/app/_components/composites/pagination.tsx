import { cn } from "@/app/_libs/classnames";
import { Fragment } from "react";
import {
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
} from "../ui/pagination";

type Props = {
  currentPage: number;
  totalPage: number;
  gap?: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,

  totalPage,
  gap = 2,
  onPageChange,
}: Props) {
  const canGoToPreviousPage = currentPage > 1;
  const canGoToNextPage = currentPage < totalPage;

  if (totalPage < 2) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn("flex flex-1 flex-row items-center justify-start gap-2")}
      >
        <PaginationRoot>
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst
                onClick={() => onPageChange(1)}
                disabled={!canGoToPreviousPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                disabled={!canGoToPreviousPage}
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
            {currentPage - gap > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {Array.from(Array(totalPage).keys()).map((pageIndex) => {
              const page = pageIndex + 1;
              const key = `pagination-page-${page}`;

              if (page < currentPage - gap) {
                return <Fragment key={key} />;
              }

              if (page > currentPage + gap) {
                return <Fragment key={key} />;
              }

              return (
                <PaginationItem key={key}>
                  <PaginationButton
                    isActive={page === currentPage}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationButton>
                </PaginationItem>
              );
            })}
            {totalPage - currentPage > gap && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                disabled={!canGoToNextPage}
                onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                disabled={!canGoToNextPage}
                onClick={() => onPageChange(totalPage)}
              />
            </PaginationItem>
          </PaginationContent>
        </PaginationRoot>
      </div>
    </div>
  );
}
