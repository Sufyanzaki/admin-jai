import { useSWRFix } from "@/shared-lib";
import { getAllBanners } from "@/app/admin/(dashboard)/marketing/banners/_api/bannerApi";
import { useSession } from "next-auth/react";
import { BannerDto } from "@/app/admin/(dashboard)/marketing/banners/_types/bannerTypes";
import { useTranslation } from "react-i18next";

export const useBanners = () => {
  const { t } = useTranslation();

  const { data: session } = useSession();

  const { data, loading, error, mutate } = useSWRFix<BannerDto[]>({
    key: session?.token ? 'banners' : '',
    fetcher: async () => {
      const response = await getAllBanners();
      if (!response) {
        throw new Error(t('Failed to fetch banners'));
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