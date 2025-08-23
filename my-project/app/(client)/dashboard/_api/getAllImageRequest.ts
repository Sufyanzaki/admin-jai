import {getRequest} from "@/shared-lib";
import {ImageRequestStatus, ImageRequestType} from "../_hooks/useAllImageRequests";
import {ApiResponseDto} from "@/app/(client)/dashboard/notifications/_types/notification";

export async function getAllImageRequest(
  params?: { type?: ImageRequestType; status?: ImageRequestStatus }
): Promise<ApiResponseDto> {
  let url = "users/image-request";

  if (params) {
    const query = new URLSearchParams();

    if (params.type) query.append("type", params.type);
    // if (params.status) query.append("status", params.status);

    const queryString = query.toString();
    if (queryString) url += `?${queryString}`;
  }

  return await getRequest<ApiResponseDto>({
    url,
    useAuth: true,
  });
}
