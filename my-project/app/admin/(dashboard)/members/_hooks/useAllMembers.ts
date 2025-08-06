import { useSWRFix } from '@/shared-lib';
import { memberApi, GetAllMembersParams } from '../../../../shared-api/memberApi';

export default function useAllMembers(params?: GetAllMembersParams) {
  const key = `all-members-${JSON.stringify(params || {})}`;

  const { data, error, loading, mutate } = useSWRFix({
    key,
    fetcher: () => memberApi(params),
    config: { revalidateOnFocus: false },
  });
  return { data, error, isLoading: loading, mutate };
} 
