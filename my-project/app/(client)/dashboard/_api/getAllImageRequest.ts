import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";
import { ImageRequestStatus, ImageRequestType } from "../_hooks/useAllImageRequests";

export type likesRecievedResponse = {
  status: "success" | "error";
  data: MemberProfile;
};

export async function getAllImageRequest(
  params?: { type?: ImageRequestType; status?: ImageRequestStatus }
): Promise<likesRecievedResponse> {
  return await getRequest<likesRecievedResponse>({
    url: "/users/image-request",
    params, // <-- now params is actually used
    useAuth: true,
  });
}
