import { useSWRFix } from '@/shared-lib';
import { getSmtp } from '../_api/smtp';

export default function useSmtp() {
  const { data, error, loading } = useSWRFix({
    key: 'smtp-settings',
    fetcher: getSmtp,
    config: { revalidateOnFocus: false },
  });
  return { data, error, isLoading: loading };
} 