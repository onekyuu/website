import React, { FC } from "react";
import ContentContainer from "../ContentContainer";
import { Separator } from "../ui/separator";
import { Link } from "@/i18n/navigations";

const FooterSection: FC = () => {
  return (
    <div className="bg-[var(--color-gray-900)] mx-2 my-4 py-8 md:m-4 md:py-12 lg:m-8 lg:py-16 rounded-3xl">
      <ContentContainer className="px-2">
        <Separator className="my-4 bg-[var(--color-gray-600)]" />
        <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 justify-items-center text-[var(--color-gray-50)]">
          <div className="mt-8 md:mt-4">
            <span>Home</span>
          </div>
          <div className="mt-8 md:mt-4">
            <span>Portfolio</span>
            <div className="text-[var(--color-gray-400)] text-sm md:text-base flex flex-col mt-4">
              <Link href="/portfolio" className="my-1">
                Portfolio 1
              </Link>
              <Link href="/portfolio" className="my-1">
                Portfolio 2
              </Link>
              <Link href="/portfolio" className="my-1">
                Portfolio 3
              </Link>
              <Link href="/portfolio" className="my-1">
                Portfolio 4
              </Link>
            </div>
          </div>
          <div className="mt-8 md:mt-4">
            <span>Blog</span>
            <div className="text-[var(--color-gray-400)] text-sm md:text-base flex flex-col mt-4">
              <Link href="/blog" className="my-1">
                blog 1
              </Link>
              <Link href="/blog" className="my-1">
                blog 2
              </Link>
              <Link href="/blog" className="my-1">
                blog 3
              </Link>
              <Link href="/blog" className="my-1">
                blog 4
              </Link>
            </div>
          </div>
          <div className="mt-8 md:mt-4">Gallery</div>
        </div>
        <Separator className="my-4 bg-[var(--color-gray-600)]" />
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-2 text-[var(--color-gray-50)] text-xl">
            <div>logo</div>
            <div>OneKyuu</div>
          </div>
          <div className="text-sm md:text-base text-[var(--color-gray-300)] text-center align-middle">
            © {new Date().getFullYear()}. All rights reserved.
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default FooterSection;
