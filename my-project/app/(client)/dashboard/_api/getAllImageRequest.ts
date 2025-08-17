import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";
import { ImageRequestStatus, ImageRequestType } from "../_hooks/useAllImageRequests";

export type likesRecievedResponse = {
  status: "success" | "error";
  data: MemberProfile[];
};

export async function getAllImageRequest(
  params?: { type?: ImageRequestType; status?: ImageRequestStatus }
): Promise<likesRecievedResponse> {
  let url = "users/image-request";

  if (params) {
    const query = new URLSearchParams();

    if (params.type) query.append("type", params.type);
    if (params.status) query.append("status", params.status);

    const queryString = query.toString();
    if (queryString) url += `?${queryString}`;
  }

  return await getRequest<likesRecievedResponse>({
    url,
    useAuth: true,
  });
}
