import { useSWRFix } from "@/shared-lib";
import { getAllImageRequest, likesRecievedResponse } from "../_api/getAllImageRequest";

export enum ImageRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "APPROVED",
  DECLINED = "DECLINED",
}

export enum ImageRequestType {
  SENT = "sent",
  ACCEPTED = "received",
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
