"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePosts } from "@/hooks/usePosts";
import { useLocale } from "next-intl";
import { useProjects } from "@/hooks/useProjects";
import { useGallery } from "@/hooks/useGallery";
import HeroSection from "@/components/home/Hero";
import SkillsSection from "@/components/home/Skills";
import SkillsMarquee from "@/components/home/SkillsMarquee";
import PortfolioSection from "@/components/home/Portfolio";
import BlogSection from "@/components/home/Blog";
import GalleryParallaxSection from "@/components/home/GalleryParallax";
import ContactSection from "@/components/home/Contact";
import StickyFooter from "@/components/home/StickyFooter";
import SectionNavigation from "@/components/home/SectionNavigation";
import { useMemo } from "react";

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
    pageSize: 10,
  });

  const {
    data: projectResponse,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
  } = useProjects({
    page: 1,
    pageSize: 4,
    featured: true,
    ordering: "-priority",
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

  const formatBlogData = useMemo(() => {
    if (!blogResponse?.results) return [];
    return blogResponse.results.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.translations[locale]?.title || post.title,
      description: post.translations[locale]?.description || post.description,
      date: post.date || "",
      image: post.image,
    }));
  }, [blogResponse?.results, locale]);

  return (
    <div className="min-h-screen pb-4 lg:pb-0">
      <SectionNavigation />
      <div id="home-hero" className="scroll-mt-24">
        <HeroSection />
      </div>
      <div id="home-skills" className="scroll-mt-24">
        <SkillsSection />
        <SkillsMarquee />
      </div>
      <div id="home-portfolio" className="scroll-mt-24">
        <PortfolioSection
          projectList={projectResponse || []}
          isLoading={isProjectLoading}
        />
      </div>
      <div id="home-blog" className="scroll-mt-24">
        <BlogSection
          blogList={formatBlogData}
          isLoading={isBlogLoading}
          isError={isBlogError}
          error={blogError}
        />
      </div>
      <div id="home-gallery" className="scroll-mt-24">
        <GalleryParallaxSection
          galleryList={galleryResponse?.results || []}
          isLoading={isGalleryLoading}
          isError={isGalleryError}
          error={galleryError}
        />
      </div>
      <div id="home-contact" className="scroll-mt-24">
        <ContactSection />
      </div>
      <StickyFooter />
    </div>
  );
}
