import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { postNewsletter, PostNewsletterProps } from "../_api/postNewsletter";
import { useState } from "react";

const newsletterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  emails: z.string().min(1, "Emails are required"),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export default function useNewsletterForm() {
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
      if (result?.status === 201 || result?.status === 200) {
        showSuccess("Newsletter created successfully!");
        reset();
      }
    } catch (error: any) {
      showError({ message: error.message || "Failed to create newsletter" });
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