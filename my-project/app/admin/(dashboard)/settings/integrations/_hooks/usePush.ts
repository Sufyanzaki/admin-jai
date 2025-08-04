import { useSWRFix } from '@/shared-lib';
import { getPush } from '../_api/push';

export default function usePush() {
  const { data, error, loading } = useSWRFix({
    key: 'push-settings',
    fetcher: getPush,
    config: { revalidateOnFocus: false },
  });
  return { data, error, isLoading: loading };
} 