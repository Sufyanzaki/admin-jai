import { useSWRFix } from '@/admin-utils/lib/useSwrFix';
import { getFacebookSettings } from '../_api/getFacebookSettings';
import { FacebookSettings } from '../../_types/facebook';

export default function useFacebookSettings() {
  const { data, error, loading } = useSWRFix<FacebookSettings>({
    key: 'facebook-settings',
    fetcher: getFacebookSettings,
    config: { revalidateOnFocus: false },
  });
  
  return { 
    data, 
    error, 
    isLoading: loading 
  };
} 