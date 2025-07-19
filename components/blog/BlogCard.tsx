"use client";

import React, { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "@/i18n/navigations";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useTranslations } from "next-intl";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  avatar: string;
  author: string;
  tags: string[];
}

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: BlogPost;
  type?: "latest" | "all";
}

const BlogCard: FC<BlogCardProps> = ({ post, className, type = "all" }) => {
  const t = useTranslations("Blog");
  return (
    <Card className={cn("w-full min-h-[40vh] rounded-xl", className)}>
      <CardContent
        className={cn(
          "flex flex-col gap-8",
          type === "latest" ? "md:flex-row" : ""
        )}
      >
        <div className={cn("w-full", type === "latest" ? "md:w-1/2" : "")}>
          <AspectRatio ratio={1}>
            <Image
              src={post.image}
              alt="Latest Blog Post"
              fill
              className="rounded-lg object-cover"
            />
          </AspectRatio>
        </div>
        <div
          className={cn(
            "w-full flex flex-col justify-between",
            type === "latest" ? "md:w-1/2" : ""
          )}
        >
          <div className="flex flex-col gap-3 md:gap-6">
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Badge variant={"default"}>{tag}</Badge>
              ))}
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              {post.title}
            </div>
            <div className="text-lg lg:text-xl font-semibold text-[var(--color-gray-600)]">
              {post.description}
            </div>
            <Link
              href={`/blog/${post.id}`}
              className="text-[var(--color-secondary-700)] font-bold text-lg"
            >
              {t("readPost")}
            </Link>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Avatar className="h-14 w-14">
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{post.author}</span>
              <span className="text-xs text-[var(--color-gray-500)]">
                {new Date(post.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
