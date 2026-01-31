import React, { FC } from "react";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { Link } from "@/i18n/navigations";
import { Textarea } from "../ui/textarea";
import { SocialMediaMap } from "@/lib/constants";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sendContactMessage } from "@/hooks/useSendMessage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const ContactSection: FC = () => {
  const t = useTranslations("Home");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const handleSendMessage = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-section">
      <ContentContainer className="my-7 md:my-12 lg:my-16">
        <div className="text-3xl font-bold text-(--color-primary-900) dark:text-(--color-primary-50) md:text-4xl lg:text-5xl">
          {t("contactMe")}
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-[40%_55%] items-start justify-between mt-6 lg:mt-12 w-full gap-6">
          <div className="w-full lg:h-full contact-bg rounded-3xl py-8 px-6 flex flex-1 flex-col items-center justify-between">
            <div className="flex flex-col items-center md:w-[70%] lg:items-start lg:w-full">
              <div className="text-3xl font-bold dark:text-(--color-gray-50)">
                {t("sayHello")}
              </div>
              <div className="text-lg text-(--color-gray-600) dark:text-(--color-gray-300) mt-6">
                {t("contactDescription")}
              </div>

              <div className="flex flex-row justify-between lg:flex-col w-full">
                <div className="mt-8">
                  <div className="text-xl font-semibold dark:text-(--color-gray-100) text-center lg:text-start">
                    {t("email")}
                  </div>
                  <div className="mt-2 md:mt-6 font-semibold text-(--color-primary-700) dark:text-(--color-primary-300)">
                    me@keyu.email
                  </div>
                </div>
              </div>
            </div>
            <div className="self-center flex flex-row mt-12">
              {SocialMediaMap.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="mx-4"
                  target="_blank"
                >
                  <social.icon className="h-6 w-6 text-(--color-gray-600) dark:text-(--color-gray-300)" />
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full py-8 px-7 rounded-3xl bg-(--color-background-2) dark:bg-(--color-background-dark-3) mt-6 lg:mt-0 h-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSendMessage)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("namePlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("emailPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("phone")}</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder={t("phonePlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("message")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("messagePlaceholder")}
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size={"lg"}
                  className="w-full cursor-pointer h-10 md:h-12 bg-(--color-primary-600) text-base md:text-lg font-bold rounded-xl"
                >
                  {t("sendMessage")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default ContactSection;
