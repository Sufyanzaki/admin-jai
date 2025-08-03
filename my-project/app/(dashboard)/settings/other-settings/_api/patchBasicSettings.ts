import {patchRequest} from "@/admin-utils"; // or "@/admin-utils/lib/httpRequests"

export async function patchBasicSettings(data: any) {
  return patchRequest({
    url: "setting/basic-setting",
    data,
    useAuth: true,
  });
} 