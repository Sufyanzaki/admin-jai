import {patchRequest} from "@/shared-lib";

export async function patchBasicSettings(data: any) {
  return patchRequest({
    url: "setting/basic-setting",
    data,
    useAuth: true,
  });
} 