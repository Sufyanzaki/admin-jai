import { useSWRFix } from "@/shared-lib";
import { getLikesReceived } from "../_api/likes";
import {ApiResponseDto} from "@/app/(client)/dashboard/notifications/_types/notification";

export enum LikeStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}

export const useLikesReceived = (status?: LikeStatus) => {
  const { data, loading, error, mutate } = useSWRFix<ApiResponseDto>({
    key: "likes-received",
    fetcher: async () => {
      const response = await getLikesReceived({status});
      if (!response) {
        throw new Error("Failed to fetch likes received");
      }
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
