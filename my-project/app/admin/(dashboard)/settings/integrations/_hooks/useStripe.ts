import { useSWRFix } from '@/shared-lib';
import { getStripe } from '../_api/stripe';

export default function useStripe() {
  const { data, error, loading } = useSWRFix({
    key: 'stripe-settings',
    fetcher: getStripe,
    config: { revalidateOnFocus: false },
  });
  return { data, error, isLoading: loading };
} 