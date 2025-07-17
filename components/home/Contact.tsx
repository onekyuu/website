import React, { FC } from "react";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import Form from "next/form";
import { Button } from "../ui/button";
import GithubIcon from "@/assets/github.svg";
import LeetcodeIcon from "@/assets/leetcode.svg";
import ZennIcon from "@/assets/zenn.svg";
import InstagramIcon from "@/assets/instagram.svg";
import { Link } from "@/i18n/navigations";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const Contact: FC = () => {
  const t = useTranslations("Home");

  const SocialMediaMap = [
    {
      name: "GitHub",
      icon: GithubIcon,
      url: "https://github.com/onekyuu",
    },
    {
      name: "LeetCode",
      icon: LeetcodeIcon,
      url: "https://leetcode.com/u/onekyuu/",
    },
    {
      name: "Zenn",
      icon: ZennIcon,
      url: "https://zenn.dev/onekyuu",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      url: "https://www.instagram.com/onekyuu_?igsh=N2VkcHpiMnFvOGVi&utm_source=qr",
    },
  ];

  const SendMessageMap = [
    {
      name: "name",
      placeholder: t("namePlaceholder"),
      type: "text",
    },
    {
      name: "email",
      placeholder: t("emailPlaceholder"),
      type: "email",
    },
    {
      name: "phoneNumber",
      placeholder: t("phonePlaceholder"),
      type: "tel",
    },
    {
      name: "message",
      placeholder: t("messagePlaceholder"),
      type: "textarea",
    },
  ];

  const handleSendMessage = async (formData: FormData) => {
    // Handle form submission logic here
    console.log("Form submitted with data:", Object.fromEntries(formData));
  };

  return (
    <div>
      <ContentContainer className="my-7 md:my-12 lg:my-16">
        <div className="text-2xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] md:text-3xl lg:text-4xl">
          {t("contactMe")}
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between mt-6 lg:mt-12 lg:h-[50vh] w-full">
          <div className="w-full lg:h-full lg:w-[40%] contact-bg rounded-3xl py-8 px-6 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center md:w-[70%] lg:items-start lg:w-full">
              <div className="text-3xl font-bold dark:text-[var(--color-gray-50)]">
                {t("sayHello")}
              </div>
              <div className="text-lg text-[car(--color-gray-600)] dark:text-[var(--color-gray-300)] mt-6">
                {t("contactDescription")}
              </div>

              <div className="flex flex-row justify-between lg:flex-col w-full">
                <div className="mt-8">
                  <div className="text-xl font-semibold dark:text-[var(--color-gray-100)] text-center lg:text-start">
                    {t("email")}
                  </div>
                  <div className="mt-2 md:mt-6 font-semibold text-[var(--color-primary-700)] dark:text-[var(--color-primary-300)]">
                    xxx.gmail.com
                  </div>
                </div>
                <div className="mt-8">
                  <div className="text-xl font-semibold dark:text-[var(--color-gray-100)] text-center lg:text-start">
                    {t("phone")}
                  </div>
                  <div className="mt-2 md:mt-6 font-semibold text-[var(--color-primary-700)] dark:text-[var(--color-primary-300)]">
                    12345678901
                  </div>
                </div>
              </div>
            </div>
            <div className="self-center flex flex-row mt-12">
              {SocialMediaMap.map((social) => (
                <Link key={social.name} href={social.url} className="mx-4">
                  <social.icon className="h-6 w-6 text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)]" />
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[55%] py-8 px-7 rounded-3xl bg-[var(--color-background-2)] dark:bg-[var(--color-background-dark-3)] mt-6 lg:mt-0 h-full">
            <Form action={handleSendMessage} className="flex flex-col h-full">
              {SendMessageMap.map((field) =>
                field.type === "textarea" ? (
                  <div key={field.name} className="pb-4 flex flex-col flex-1">
                    <Label htmlFor={field.name}>{t(`${field.name}`)}</Label>
                    <Textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={10}
                      className="mt-2 w-full flex-1 min-h-48"
                      id={field.name}
                    />
                  </div>
                ) : (
                  <div key={field.name} className="pb-4">
                    <Label htmlFor={field.name}>{t(`${field.name}`)}</Label>
                    <Input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="mt-2 w-full"
                      id={field.name}
                    />
                  </div>
                )
              )}
              <Button
                type="submit"
                size={"lg"}
                className="w-full h-10 md:h-12 bg-[var(--color-primary-600)] text-base md:text-lg font-bold rounded-xl"
              >
                {t("sendMessage")}
              </Button>
            </Form>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Contact;
