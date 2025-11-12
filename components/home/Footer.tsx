"use client";

import React, { FC } from "react";
import ContentContainer from "../ContentContainer";
import { Separator } from "../ui/separator";
import { Link } from "@/i18n/navigations";
import { useLocale } from "next-intl";
import { LanguageCode } from "@/types/common";
import { useProjects } from "@/hooks/useProjects";
import { usePosts } from "@/hooks/usePosts";

const FooterSection: FC = () => {
  const locale = useLocale() as LanguageCode;
  const { data: projectList } = useProjects({ page: 1, pageSize: 4 });
  const { data: blogList } = usePosts({ page: 1, pageSize: 10 });

  const recentPosts = blogList?.results?.slice(0, 4) || [];
  const recentProjects = projectList?.slice(0, 4) || [];

  return (
    <div className="bg-[var(--color-gray-900)] mx-2 my-4 py-8 md:m-4 md:py-12 lg:m-8 lg:py-16 rounded-3xl">
      <ContentContainer className="px-2">
        <Separator className="my-4 bg-[var(--color-gray-600)]" />
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-4 lg:grid-rows-1 lg:justify-items-center text-[var(--color-gray-50)]">
          <div className="mt-8 md:mt-4">
            <Link href="/">Home</Link>
          </div>
          <div className="mt-8 md:mt-4">
            <Link href="/portfolio">Portfolio</Link>
            <div className="text-[var(--color-gray-400)] text-sm md:text-base flex flex-col mt-4">
              {recentProjects?.map((project) => (
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="my-1"
                  key={project.slug}
                >
                  {project.translations[locale]?.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 md:mt-4">
            <Link href="/blog">Blog</Link>
            <div className="text-[var(--color-gray-400)] text-sm md:text-base flex flex-col mt-4">
              {recentPosts?.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  className="my-1"
                  key={post.slug}
                >
                  {post.translations[locale]?.title}
                </Link>
              ))}
            </div>
          </div>
          <Link className="mt-8 md:mt-4" href="/gallery">
            Gallery
          </Link>
        </div>
        <Separator className="my-4 bg-[var(--color-gray-600)]" />
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-2 text-[var(--color-gray-50)] text-xl">
            <div className="font-bold text-xl hero-text-gradient bg-clip-text text-transparent">
              OneKyuu
            </div>
          </div>
          <div className="text-sm md:text-base text-[var(--color-gray-300)] text-center align-middle">
            © {new Date().getFullYear()}. All rights reserved.
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default FooterSection;
