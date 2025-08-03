import { useSWRFix } from '@/admin-utils/lib/useSwrFix';
import { getAllMembers, GetAllMembersParams } from '../_api/getAllMembers';

export default function useAllMembers(params?: GetAllMembersParams) {
  const key = `all-members-${JSON.stringify(params || {})}`;

  const { data, error, loading, mutate } = useSWRFix({
    key,
    fetcher: () => getAllMembers(params),
    config: { revalidateOnFocus: false },
  });
  return { data, error, isLoading: loading, mutate };
} 
