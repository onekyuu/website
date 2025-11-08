"use client";

import React, { FC, useEffect } from "react";
import ContentContainer from "../ContentContainer";
import { useLocale, useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "@/i18n/navigations";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/types/post";
import { Skeleton } from "../ui/skeleton";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

const Blog: FC = () => {
  const t = useTranslations("Home");
  const locale = useLocale();
  const [displayPosts, setDisplayPosts] = React.useState<BlogPost[]>([]);

  const {
    data: blogData,
    isLoading,
    isError,
    error,
  } = usePosts({
    page: 1,
    pageSize: 4,
  });

  const formatBlogData = (data: Post[] | undefined) => {
    if (!data) return [];
    return data.map((post: Post) => ({
      id: post.id,
      title: post.translations[locale]?.title || post.title,
      description: post.translations[locale]?.description || post.description,
      date: post.date,
      image: post.image,
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const updatePosts = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setDisplayPosts(formatBlogData(blogData?.results)?.slice(0, 4) || []);
      } else {
        setDisplayPosts(formatBlogData(blogData?.results)?.slice(0, 3) || []);
      }
    };

    updatePosts();
    window.addEventListener("resize", updatePosts);
    return () => window.removeEventListener("resize", updatePosts);
  }, [blogData]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ContentContainer>
        <div className="text-2xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] mt-7 md:text-3xl md:mt-12 lg:text-4xl lg:mt-16">
          {t("blog")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {displayPosts.map((blog) => (
            <Card key={blog.id} className="flex flex-col">
              <CardContent className="flex-1">
                <AspectRatio ratio={1}>
                  <Image
                    src={blog.image || "/blog-cover.jpeg"}
                    alt={blog.title}
                    className="rounded-lg object-cover"
                    fill
                  />
                </AspectRatio>
                <CardTitle className="mt-4 lg:mt-8 text-xl font-bold md:text-2xl">
                  {blog.title}
                </CardTitle>
                <CardDescription className="mt-2 lg:mt-4 font-semibold text-base text-[var(--color-gray-600)]">
                  {blog.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  className="text-[var(--color-primary-700)] font-bold"
                  href={"/blog"}
                >
                  {t("readPost")}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};

export default Blog;
