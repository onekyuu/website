"use client";

import React, { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "@/i18n/navigations";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useLocale, useTranslations } from "next-intl";
import { Post } from "@/types/post";

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Post;
  type?: "latest" | "all";
}

const BlogCard: FC<BlogCardProps> = ({ post, className, type = "all" }) => {
  const t = useTranslations("Blog");
  const { image, id, date, user, category, translations, slug } = post;
  const locale = useLocale();
  return (
    <Card className={cn("w-full min-h-[40vh] rounded-xl", className)}>
      <CardContent
        className={cn(
          "flex flex-col flex-1 gap-8",
          type === "latest" ? "md:flex-row" : ""
        )}
      >
        <div className={cn("w-full", type === "latest" ? "md:w-1/2" : "")}>
          <AspectRatio ratio={1}>
            {image && (
              <Image
                src={image}
                alt="Latest Blog Post"
                fill
                className="rounded-lg object-cover"
              />
            )}
          </AspectRatio>
        </div>
        <div
          className={cn(
            "w-full flex flex-col flex-1",
            type === "latest" ? "md:w-1/2" : ""
          )}
        >
          <div className="flex flex-col gap-3 md:gap-6 flex-1">
            <div className="flex gap-2">
              <Badge key={category.title} variant={"default"}>
                {category.title}
              </Badge>
            </div>
            <div className="flex-1">
              <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                {translations[locale]?.title}
              </div>
              <div className="text-lg lg:text-xl font-semibold text-[var(--color-gray-600)]">
                {translations[locale]?.description}
              </div>
            </div>
            <Link
              href={`/blog/${slug}`}
              className="text-[var(--color-secondary-700)] font-bold text-lg"
            >
              {t("readPost")}
            </Link>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-2">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.profile.avatar} />
              <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{user.username}</span>
              <span className="text-xs text-[var(--color-gray-500)]">
                {new Date(date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
