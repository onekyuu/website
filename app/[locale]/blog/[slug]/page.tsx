"use client";

import ContentContainer from "@/components/ContentContainer";
import PageLayout from "@/components/PageLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { TiptapContent } from "@/components/TiptapContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePostDetail } from "@/hooks/usePosts";
import { useTiptapHeadings } from "@/hooks/useTiptapHeadings";
import { Link } from "@/i18n/navigations";
import { SocialMediaMap } from "@/lib/constants";
import { LanguageCode } from "@/types/common";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { FC, useMemo } from "react";

const BlogDetailPage: FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const locale = params?.locale as LanguageCode;
  const { data: postData } = usePostDetail(slug);

  const formatBlogData = useMemo(() => {
    return {
      ...postData,
      title: postData?.translations[locale]?.title || "",
      description: postData?.translations[locale]?.description || "",
      content: postData?.translations[locale]?.content || "",
    };
  }, [postData, locale]);

  const headings = useTiptapHeadings(formatBlogData.content);

  return (
    <PageLayout
      heroContent={{
        title: "Blog.",
        subtitle: formatBlogData.title,
        extraContent: (
          <div className="text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] text-base md:text-lg lg:text-xl text-center mt-4">
            {formatBlogData.description}
          </div>
        ),
        images: formatBlogData.image ? [formatBlogData.image] : [],
      }}
    >
      <ContentContainer className="mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <TableOfContents
                className="bg-[var(--color-secondary-100)] dark:bg-[var(--color-primary-900)] rounded-xl p-4"
                headings={headings}
              />
            </aside>
          )}

          <article className="min-w-0">
            <div className="flex flex-col flex-wrap gap-4 mb-8 text-sm text-[var(--color-gray-600)] dark:text-[var(--color-gray-400)]">
              {formatBlogData.date && (
                <time>{dayjs(formatBlogData.date).format("MMMM D, YYYY")}</time>
              )}
              {formatBlogData.user && (
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={formatBlogData.user.profile.avatar}
                      alt={formatBlogData.user.username}
                    />
                    <AvatarFallback>
                      {formatBlogData.user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-lg">
                    {formatBlogData.user.username}
                  </span>
                </div>
              )}
            </div>

            <TiptapContent content={formatBlogData.content} />
            <div className="bg-[var(--color-secondary-100)] dark:bg-[var(--color-background-dark-1)] px-6 py-7 rounded-2xl mt-16 text-2xl text-[var(--color-primary-900)] dark:text-[var(--color-secondary-50)] font-bold flex justify-between">
              Follow Me
              <div className="flex gap-8 items-center">
                {SocialMediaMap.map((social) => (
                  <Link key={social.name} href={social.url} target="_blank">
                    <social.icon className="h-6 w-6 text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)]" />
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </ContentContainer>
    </PageLayout>
  );
};

export default BlogDetailPage;
