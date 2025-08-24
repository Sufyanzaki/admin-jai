import { useSWRFix } from "@/shared-lib";
import { getLikesReceived } from "../_api/likes";
import { ApiResponseDto } from "@/app/(client)/dashboard/notifications/_types/notification";
import { useTranslation } from "react-i18next";

export enum LikeStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}

export const useLikesReceived = (status?: LikeStatus) => {
  const { t } = useTranslation();
  const { data, loading, error, mutate } = useSWRFix<ApiResponseDto>({
    key: `likes-received-${status}`,
    fetcher: async () => {
      const response = await getLikesReceived({ status });
      if (!response) throw new Error(t("Failed to fetch likes received"));
      return response;
    }
  });

  return {
    likesReceived: data?.data,
    likesReceivedLoading: loading,
    error,
    mutate
  };
};
