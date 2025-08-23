import {useSWRFix} from "@/shared-lib";
import {getAllImageRequest} from "../_api/getAllImageRequest";
import {ApiResponseDto} from "@/app/(client)/dashboard/notifications/_types/notification";

export enum ImageRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "APPROVED",
  DENIED = "DENIED",
}

export enum ImageRequestType {
  SENT = "sent",
  ACCEPTED = "received",
}

export const useAllImageRequests = (type?: ImageRequestType,status?: ImageRequestStatus) => {
  const { data, loading, error, mutate } = useSWRFix<ApiResponseDto>({
    key: "image-requests",
    fetcher: async () => {
      const response = await getAllImageRequest({
       ...(type && {type}),
        ...(status && { status }),
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
