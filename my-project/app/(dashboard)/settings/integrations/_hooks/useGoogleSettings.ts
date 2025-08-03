import { useSWRFix } from '@/admin-utils/lib/useSwrFix';
import { getGoogleSettings } from '../_api/getGoogleSettings';
import { GoogleSettings } from '../../_types/google';

export default function useGoogleSettings() {
  const { data, error, loading } = useSWRFix<GoogleSettings>({
    key: 'google-settings',
    fetcher: getGoogleSettings,
    config: { revalidateOnFocus: false },
  });
  
  return { 
    data, 
    error, 
    isLoading: loading 
  };
} 