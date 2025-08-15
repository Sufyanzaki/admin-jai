import { useSWRFix } from "@/shared-lib";
import { getAllImageRequest, likesRecievedResponse } from "../_api/getAllImageRequest";

export enum ImageRequestStatus {
  PENDING = "pending",
  ACCEPTED = "approve",
  DECLINED = "declined",
}

export enum ImageRequestType {
  PENDING = "pending",
  RECIEVED = "received",
  DECLINED = "declined",
}

export const useAllImageRequests = (type?: ImageRequestType,status?: ImageRequestStatus) => {
  const { data, loading, error, mutate } = useSWRFix<likesRecievedResponse>({
    key: ["image-requests"],
    fetcher: async () => {
      const response = await getAllImageRequest({
       ...(type && {type}),
        ...(status && { status }), // only include status if provided
      });
      if (!response) {
        throw new Error("Failed to fetch likes received");
      }
      return response;
    },
  });

  return {
    AllImagesRequests: data?.data,
    AllImagesRequestsLoading: loading,
    error,
    mutate,
  };
};
