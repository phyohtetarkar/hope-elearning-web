"use client";

import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "lucide-react";
import { ReactNode, useMemo } from "react";
import { Button } from "./button";

interface PaginationItemProps {
  key?: React.Key;
  page: number;
  isActive?: boolean;
  children?: ReactNode;
}

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  renderPage?: number;
  search?: string;
  LinkComponent: React.ComponentType<any>;
}

export function Pagination({
  totalPage,
  currentPage,
  renderPage = 3,
  search,
  LinkComponent,
}: PaginationProps) {
  const params = useMemo(() => {
    if (!search) {
      return undefined;
    }
    const params = new URLSearchParams(search);
    params.delete("page");
    return params.size > 0 ? params.toString() : undefined;
  }, [search]);

  const pages = useMemo(() => {
    if (currentPage > totalPage) {
      return [];
    }

    if (totalPage <= 1) {
      return [];
    }

    const pages = Array(totalPage > renderPage ? renderPage : totalPage).fill(
      0
    );
    const len = pages.length;

    return pages.map((p, i) => {
      if (currentPage > 1) {
        if (currentPage === totalPage) {
          return totalPage - (len - 1 - i);
        }
        return i + (currentPage - 1);
      }
      return i + currentPage;
    });
  }, [currentPage, totalPage]);

  const renderItem = ({ key, page, children }: PaginationItemProps) => {
    const href = params ? `?${params}&page=${page}` : `?page=${page}`;
    return (
      <LinkComponent key={key} href={href}>
        {children}
      </LinkComponent>
    );
  };

  if (totalPage <= 1) {
    return null;
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPage;

  const iconSize = 20;

  return (
    <nav aria-label="Pagination">
      <ul className="flex space-x-1 mb-0 items-center">
        {/* {currentPage <= 1 ? (
          <li className="cursor-not-allowed">
            <Button variant="default" size="icon" disabled>
              <ChevronsLeftIcon size={iconSize} />
            </Button>
          </li>
        ) : (
          <li>
            <Button variant="default" size="icon" asChild>
              {renderItem({
                page: 1,
                children: <ChevronsLeftIcon size={iconSize} />,
              })}
            </Button>
          </li>
        )} */}
        {!hasPrev ? (
          <li className="cursor-not-allowed">
            <Button variant="default" size="icon" disabled>
              <ChevronLeftIcon size={iconSize} />
            </Button>
          </li>
        ) : (
          <li>
            <Button variant="default" size="icon" asChild>
              {renderItem({
                page: currentPage - 1,
                children: <ChevronLeftIcon size={iconSize} />,
              })}
            </Button>
          </li>
        )}
        {totalPage !== renderPage && currentPage >= renderPage && (
          <li className="cursor-not-allowed">
            <Button variant="default" size="icon" asChild>
              {renderItem({
                page: 1,
                children: `${1}`,
              })}
            </Button>
          </li>
        )}
        {currentPage > renderPage && (
          <li className="text-default-foreground px-2">
            <EllipsisIcon size={iconSize} />
          </li>
        )}
        {pages.map((e, i) => {
          const isActive = currentPage === e;
          return (
            <li key={i}>
              <Button
                size="icon"
                variant={isActive ? "primary" : "default"}
                asChild
              >
                {renderItem({
                  page: e,
                  isActive: isActive,
                  children: `${e}`,
                })}
              </Button>
            </li>
          );
        })}
        {totalPage - renderPage > currentPage - 1 && (
          <li className="text-default-foreground px-2">
            <EllipsisIcon size={iconSize} />
          </li>
        )}
        {totalPage !== renderPage &&
          totalPage - renderPage >= currentPage - 1 && (
            <li className="cursor-not-allowed">
              <Button variant="default" size="icon" asChild>
                {renderItem({
                  page: totalPage,
                  children: `${totalPage}`,
                })}
              </Button>
            </li>
          )}
        {!hasNext ? (
          <li className="cursor-not-allowed">
            <Button variant="default" size="icon" disabled>
              <ChevronRightIcon size={iconSize} />
            </Button>
          </li>
        ) : (
          <li>
            <Button variant="default" size="icon" asChild>
              {renderItem({
                page: currentPage + 1,
                children: <ChevronRightIcon size={iconSize} />,
              })}
            </Button>
          </li>
        )}
        {/* {currentPage >= totalPage ? (
          <li className="cursor-not-allowed">
            <Button variant="default" size="icon" disabled>
              <ChevronsRightIcon size={iconSize} />
            </Button>
          </li>
        ) : (
          <li>
            <Button variant="default" size="icon" asChild>
              {renderItem({
                page: totalPage,
                children: <ChevronsRightIcon size={iconSize} />,
              })}
            </Button>
          </li>
        )} */}
      </ul>
    </nav>
  );
}
