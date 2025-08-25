import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { postNewsletter } from "../_api/postNewsletter";
import { useState } from "react";

export default function useNewsletterForm() {

  const { t } = require('react-i18next');
  const newsletterSchema = z.object({
    title: z.string().min(1, t("Title is required")),
    content: z.string().min(1, t("Content is required")),
    emails: z.string().min(1, t("Emails are required")),
  });

   type NewsletterFormValues = z.infer<typeof newsletterSchema>;

  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    control,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      title: "",
      content: "",
      emails: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    setIsLoading(true);
    try {
      const result = await postNewsletter(values);
      if (result) {
        showSuccess(t("Newsletter created successfully!"));
        reset();
      }
    } catch (error: unknown) {
      // @ts-expect-error unknown type
      showError({ message: t(error.message) });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isLoading,
    register,
    control,
  };
} 