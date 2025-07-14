"use client";

import React, { FC } from "react";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "@/i18n/navigations";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

const Blog: FC = () => {
  const t = useTranslations("Home");

  const BlogList = [
    {
      id: 1,
      title: "Blog Post 1",
      description: "This is the description for blog post 1.",
      date: "2023-10-01",
    },
    {
      id: 2,
      title: "Blog Post 2",
      description: "This is the description for blog post 2.",
      date: "2023-10-02",
    },
    {
      id: 3,
      title: "Blog Post 3",
      description: "This is the description for blog post 3.",
      date: "2023-10-03",
    },
    {
      id: 4,
      title: "Blog Post 4",
      description: "This is the description for blog post 4.",
      date: "2023-10-04",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ContentContainer>
        <div className="text-2xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] mt-7 md:text-3xl md:mt-12 lg:text-4xl lg:mt-16">
          {t("blog")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {BlogList.map((blog) => (
            <Card key={blog.id}>
              <CardHeader></CardHeader>
              <CardContent>
                <AspectRatio ratio={1}>
                  <Image
                    src="/blog-cover.jpeg"
                    alt="Image"
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
