import { useSWRFix } from '@/shared-lib';
import {getNewsletterById} from "@/app/admin/(dashboard)/marketing/newsletter/_api/newsLetterApi";

export default function useNewsletterById(id: string) {
  const { data, error, loading } = useSWRFix({
    key: id ? `newsletter-${id}` : '',
    fetcher: () => getNewsletterById(id),
    config: { revalidateOnFocus: false },
  });
  return { data, error, isLoading: loading };
} 