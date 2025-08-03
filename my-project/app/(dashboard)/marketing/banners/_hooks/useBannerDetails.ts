import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getBannerDetails, BannerDetails } from "@/app/(dashboard)/marketing/banners/_api/getBannerDetails";
import { useSession } from "next-auth/react";

export const useBannerDetails = (id: string) => {
  const { data: session } = useSession();
  
  const { data, loading, error, mutate } = useSWRFix<BannerDetails>({
    key: session?.token && id ? `banner-details-${id}` : '',
    fetcher: async () => {
      const response = await getBannerDetails(id);
      if (!response) {
        throw new Error('Failed to fetch banner details');
      }
      return response;
    }
  });

  return {
    banner: data,
    bannerLoading: loading,
    error,
    mutate
  };
}; 