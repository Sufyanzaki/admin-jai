import { useSWRFix } from "@/shared-lib";
import {NewsletterDto} from "@/app/shared-types/newsletter";
import {getAllNewsletter} from "@/app/admin/(dashboard)/marketing/newsletter/_api/newsLetterApi";

export default function useNewsletters() {
  const { data, error, loading, mutate } = useSWRFix<NewsletterDto[]>({
    key: "newsletters",
    fetcher: getAllNewsletter,
  });
  return {
    data,
    error,
    isLoading: loading,
    mutate,
  };
} 