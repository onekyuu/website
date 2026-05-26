"use client";

import React, { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SectionShell, SplitHeader } from "@/components/layout";
import { SiteButton } from "@/components/site";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/hooks/useSendMessage";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection: FC = () => {
  const t = useTranslations("Home");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionShell id="contact-section">
      <SplitHeader
        eyebrow="Contact / 06"
        title={t("contactMe")}
        className="mb-[3.625rem] lg:gap-[4.5rem]"
      />

      <Form {...form}>
        <div
          data-home-contact-panel
          className="grid border border-site-ink lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
        >
          <div className="flex min-h-[21.25rem] flex-col justify-between bg-site-ink p-8 text-site-paper lg:min-h-[32.5rem]">
            <div>
              <h3 className="text-[1.625rem] leading-[1.05]">
                {t("sayHello")}
              </h3>
              <p className="mt-5 leading-[1.6] text-[#aaa8a1] dark:text-[#8f8a80]">
                {t("contactDescription")}
              </p>
            </div>
            <div>
              <div className="text-site-control uppercase tracking-[0.14em] text-[#aaa8a1] dark:text-[#8f8a80]">
                {t("email")}
              </div>
              <a
                href="mailto:me@keyu.email"
                className="mt-3 block text-2xl leading-tight text-site-paper"
              >
                me@keyu.email
              </a>
            </div>
          </div>
          <form
            onSubmit={form.handleSubmit(handleSendMessage)}
            className="grid gap-4 p-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-site-control uppercase tracking-site-label text-site-muted">
                    {t("name")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("namePlaceholder")}
                      className="h-auto border-0 border-b border-site-ink bg-transparent px-0 py-3 text-base focus-visible:border-site-ink focus-visible:ring-0"
                      {...field}
                    />
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
                  <FormLabel className="text-site-control uppercase tracking-site-label text-site-muted">
                    {t("email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="h-auto border-0 border-b border-site-ink bg-transparent px-0 py-3 text-base focus-visible:border-site-ink focus-visible:ring-0"
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
                  <FormLabel className="text-site-control uppercase tracking-site-label text-site-muted">
                    {t("message")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("messagePlaceholder")}
                      rows={5}
                      className="border-0 border-b border-site-ink bg-transparent px-0 py-3 text-base focus-visible:border-site-ink focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SiteButton type="submit" disabled={isSubmitting}>
              {t("sendMessage")}
            </SiteButton>
          </form>
        </div>
      </Form>
    </SectionShell>
  );
};

export default ContactSection;
