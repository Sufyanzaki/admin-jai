import { useSWRFix } from '@/admin-utils/lib/useSwrFix';
import { getCaptcha } from '../_api/captcha';

export default function useCaptcha() {
  const { data, error, loading } = useSWRFix({
    key: 'captcha-settings',
    fetcher: getCaptcha,
    config: { revalidateOnFocus: false },
  });
  return { data, error, isLoading: loading };
} 