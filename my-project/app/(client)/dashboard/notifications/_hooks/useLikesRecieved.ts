import { useSWRFix } from "@/shared-lib";
import { getLikesRecieved, likesRecievedResponse } from "../_api/getLikesRecived";

export enum LikeStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}

export const useLikesRecieved = (status?: LikeStatus) => {
  const { data, loading, error, mutate } = useSWRFix<likesRecievedResponse>({
    key: ["likes-recieved"], 
    fetcher: async () => {
      const response = await getLikesRecieved(status ? { status } : undefined);
      if (!response) {
        throw new Error("Failed to fetch likes recieved");
      }
      return response;
    }
  });

  return {
    likesRecieved: data?.data,
    likesRecievedLoading: loading,
    error,
    mutate
  };
};
