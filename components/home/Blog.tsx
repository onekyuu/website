"use client";

import React, { FC, useEffect } from "react";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Link } from "@/i18n/navigations";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { BlogPost } from "@/types/post";

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
  const [displayPosts, setDisplayPosts] = React.useState<BlogPost[]>([]);

  useEffect(() => {
    const updatePosts = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setDisplayPosts(blogList?.slice(0, 4) || []);
      } else {
        setDisplayPosts(blogList?.slice(0, 3) || []);
      }
    };

    updatePosts();
    window.addEventListener("resize", updatePosts);
    return () => window.removeEventListener("resize", updatePosts);
  }, [blogList]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ContentContainer>
        <div className="text-3xl font-bold text-(--color-primary-900) dark:text-(--color-primary-50) mt-7 md:text-4xl md:mt-12 lg:text-5xl lg:mt-16">
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
                <CardDescription className="mt-2 lg:mt-4 font-semibold text-base text-(--color-gray-600)">
                  {blog.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  className="text-(--color-primary-700) font-bold"
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

export default BlogSection;
