import { useSWRFix } from '@/shared-lib';
import { getMollie } from '../_api/mollie';

export default function useMollie() {
  const { data, error, loading } = useSWRFix({
    key: 'mollie-settings',
    fetcher: getMollie,
    config: { revalidateOnFocus: false },
  });
  return { data, error, isLoading: loading };
} 