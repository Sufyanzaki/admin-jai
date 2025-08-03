import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getAllBanners, BannersResponse } from "@/app/(dashboard)/marketing/banners/_api/getAllBanners";
import { useSession } from "next-auth/react";

export const useBanners = () => {
  const { data: session } = useSession();
  
  const { data, loading, error, mutate } = useSWRFix<BannersResponse>({
    key: session?.token ? 'banners' : '',
    fetcher: async () => {
      const response = await getAllBanners();
      if (!response) {
        throw new Error('Failed to fetch banners');
      }
      return response;
    }
  });

  return {
    banners: data,
    bannersLoading: loading,
    error,
    mutate
  };
}; 