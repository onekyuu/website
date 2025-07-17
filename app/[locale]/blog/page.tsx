"use client";

import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import React from "react";

const BlogPage = () => {
  const t = useTranslations("Blog");

  const latestBlogNode = <div></div>;

  return (
    <PageLayout
      heroContent={{
        title: t("title"),
        subtitle: { start: t("subtitleStart"), end: t("subtitleEnd") },
        extraContent: <div>search</div>,
      }}
      latestContent={{
        title: t("latestBlog"),
        content: latestBlogNode,
      }}
    ></PageLayout>
  );
};

export default BlogPage;
