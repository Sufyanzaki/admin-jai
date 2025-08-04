import { useSWRFix } from '@/admin-utils/lib/useSwrFix';
import { getNewsletterById } from '../_api/getNewsletterById';

export default function useNewsletterById(id: string) {
  const { data, error, loading } = useSWRFix({
    key: id ? `newsletter-${id}` : '',
    fetcher: () => getNewsletterById(id),
    config: { revalidateOnFocus: false },
  });
  return { data, error, isLoading: loading };
} 