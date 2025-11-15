"use client";

import ContentContainer from "@/components/ContentContainer";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React, { FC, useState } from "react";
import BlogCard from "@/components/blog/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { usePosts, usePrefetchPosts } from "@/hooks/usePosts";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollTo } from "@/hooks/useScrollTo";

const BlogPage: FC = () => {
  const t = useTranslations("Blog");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { scrollToElement } = useScrollTo();

  const pageSize = 8;

  const {
    data: postsData,
    isLoading,
    isError,
    error,
  } = usePosts({
    page: currentPage,
    pageSize,
    search: searchQuery,
  });

  const prefetchPosts = usePrefetchPosts();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToElement("all-posts");
  };

  const handlePrefetchNextPage = () => {
    if (postsData && currentPage * pageSize < postsData.count) {
      prefetchPosts({
        page: currentPage + 1,
        pageSize,
        search: searchQuery,
      });
    }
  };

  const totalPages = postsData?.totalPages || 0;
  const blogList = postsData?.results || [];
  const latestPost = blogList[0];

  const latestBlogNode = latestPost ? (
    <ContentContainer>
      <BlogCard type="latest" post={latestPost} />
    </ContentContainer>
  ) : null;

  return (
    <PageLayout
      heroContent={{
        title: t("title"),
        subtitle: { start: t("subtitleStart"), end: t("subtitleEnd") },
        extraContent: (
          <ContentContainer className="flex items-center justify-center mt-4 md:mt-8">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row w-full max-w-4xl items-center gap-2 p-4 bg-[var(--color-secondary-300)] rounded-xl"
            >
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button
                type="submit"
                variant="outline"
                className="rounded-xl cursor-pointer w-full md:w-auto"
                size="lg"
              >
                {t("searchButton")}
              </Button>
            </form>
          </ContentContainer>
        ),
      }}
      latestContent={{
        title: t("latestBlog"),
        content: latestBlogNode,
      }}
      isSubtitleReverse={true}
    >
      <ContentContainer className="my-18">
        <div
          id="all-posts"
          className="text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-2xl md:text-3xl lg:text-4xl font-bold"
        >
          {t("allPosts")}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {Array.from({ length: pageSize }).map((_, index) => (
              <div key={index} className="w-full">
                <Skeleton className="h-[500px] w-full rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <p className="text-red-600 dark:text-red-400">
              {t("errorMessage")}: {error?.message}
            </p>
          </div>
        )}

        {!isLoading && !isError && blogList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {blogList.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {!isLoading && !isError && blogList.length === 0 && (
          <div className="mt-8 p-6 text-center text-gray-500 dark:text-gray-400">
            {t("noResults")}
          </div>
        )}

        {totalPages > 1 && (
          <>
            <Separator className="mt-8" />
            <Pagination className="w-full h-16 py-4 px-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNumber);
                        }}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                        handlePrefetchNextPage();
                      }
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </ContentContainer>
    </PageLayout>
  );
};

export default BlogPage;
