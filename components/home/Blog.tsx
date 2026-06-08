"use client";

import React, { FC } from "react";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import { BlogPost } from "@/types/post";
import FlowingMenu from "@/components/blog/FlowingMenu";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogSectionProps {
  blogList: BlogPost[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const BlogSection: FC<BlogSectionProps> = ({
  blogList,
  isLoading,
  isError,
  error,
}) => {
  const t = useTranslations("Home");
  const menuItems = (blogList || []).slice(0, 4).map((blog) => ({
    link: `/blog/${blog.slug}`,
    text: blog.title,
    image: blog.image || "/blog-cover.jpeg",
  }));

  return (
    <section className="flex min-h-screen items-center justify-center py-20">
      <ContentContainer>
        <div className="text-3xl font-bold text-(--color-primary-900) dark:text-(--color-primary-50) mt-7 md:text-4xl md:mt-12 lg:text-5xl lg:mt-16">
          {t("blog")}
        </div>

        {isLoading && (
          <div className="mt-8 overflow-hidden md:mt-14">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[clamp(7rem,11vw,10rem)] w-full rounded-none border-t border-[var(--color-gray-300)] first:border-t-0 dark:border-[var(--color-gray-700)]"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="mt-8 p-6 text-center text-red-600 dark:text-red-400 md:mt-14">
            {error?.message}
          </div>
        )}

        {!isLoading && !isError && menuItems.length > 0 && (
          <div className="mt-8 overflow-hidden md:mt-14">
            <FlowingMenu
              items={menuItems}
              speed={15}
            />
          </div>
        )}
      </ContentContainer>
    </section>
  );
};

export default BlogSection;
