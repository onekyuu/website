"use client";

import ContentContainer from "@/components/ContentContainer";
import PageLayout from "@/components/PageLayout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const BlogPage = () => {
  const t = useTranslations("Blog");

  const BlogList = [
    {
      id: 1,
      title: "Blog Post 1",
      description: "This is the description for blog post 1.",
      date: "2023-10-01",
      image: "/blog-cover.jpeg",
      avatar: "/project-cover.jpeg",
      author: "Author 1",
      tags: ["Next.js", "React"],
    },
    {
      id: 2,
      title: "Blog Post 2",
      description: "This is the description for blog post 2.",
      date: "2023-10-02",
      image: "/blog-cover.jpeg",
      avatar: "/project-cover.jpeg",
      author: "Author 2",
      tags: ["React", "Next.js"],
    },
    {
      id: 3,
      title: "Blog Post 3",
      description: "This is the description for blog post 3.",
      date: "2023-10-03",
      image: "/blog-cover.jpeg",
      avatar: "/project-cover.jpeg",
      author: "Author 3",
      tags: ["JavaScript", "Web Development"],
    },
    {
      id: 4,
      title: "Blog Post 4",
      description: "This is the description for blog post 4.",
      date: "2023-10-04",
      image: "/blog-cover.jpeg",
      avatar: "/project-cover.jpeg",
      author: "Author 4",
      tags: ["CSS", "Design"],
    },
  ];

  const latestBlogNode = (
    <ContentContainer>
      <BlogCard type="latest" post={BlogList[0]} />
    </ContentContainer>
  );

  return (
    <PageLayout
      heroContent={{
        title: t("title"),
        subtitle: { start: t("subtitleStart"), end: t("subtitleEnd") },
        extraContent: (
          <ContentContainer className="flex items-center justify-center mt-4 md:mt-8">
            <div className="flex flex-col md:flex-row w-full max-w-4xl items-center gap-2 p-4 bg-[var(--color-secondary-300)] rounded-xl">
              <Input type="text" placeholder={t("searchPlaceholder")} />
              <Button
                type="submit"
                variant="outline"
                className="rounded-xl cursor-pointer w-full md:w-auto"
                size={"lg"}
              >
                {t("searchButton")}
              </Button>
            </div>
          </ContentContainer>
        ),
      }}
      latestContent={{
        title: t("latestBlog"),
        content: latestBlogNode,
      }}
    >
      <ContentContainer className="my-18">
        <div className="text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-2xl md:text-3xl lg:text-4xl font-bold">
          {t("allPosts")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {BlogList.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <Separator className="mt-8" />
        <Pagination className="w-full h-16 py-4 px-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ContentContainer>
    </PageLayout>
  );
};

export default BlogPage;
