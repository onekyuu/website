"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/types/post";
import { useLocale } from "next-intl";
import { useProjects } from "@/hooks/useProjects";
import { useGallery } from "@/hooks/useGallery";
import HeroSection from "@/components/home/Hero";
import SkillsSection from "@/components/home/Skills";
import PortfolioSection from "@/components/home/Portfolio";
import BlogSection from "@/components/home/Blog";
import GallerySection from "@/components/home/Gallery";
import ContactSection from "@/components/home/Contact";
import FooterSection from "@/components/home/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const locale = useLocale();

  const {
    data: blogResponse,
    isLoading: isBlogLoading,
    isError: isBlogError,
    error: blogError,
  } = usePosts({
    page: 1,
    pageSize: 4,
  });

  const {
    data: projectResponse,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
  } = useProjects({
    page: 1,
    pageSize: 10,
  });

  const {
    data: galleryResponse,
    isLoading: isGalleryLoading,
    isError: isGalleryError,
    error: galleryError,
  } = useGallery({
    page: 1,
    pageSize: 10,
    featured: true,
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

  return (
    <div className="min-h-screen pb-4 lg:pb-0">
      <HeroSection />
      <SkillsSection />
      <PortfolioSection
        projectList={projectResponse || []}
        isLoading={isProjectLoading}
      />
      <BlogSection
        blogList={formatBlogData(blogResponse?.results)}
        isLoading={isBlogLoading}
        isError={isBlogError}
        error={blogError}
      />
      <GallerySection
        galleryList={galleryResponse?.results || []}
        isLoading={isGalleryLoading}
        isError={isGalleryError}
        error={galleryError}
      />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
