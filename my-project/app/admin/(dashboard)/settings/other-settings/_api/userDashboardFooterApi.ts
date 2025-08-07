import { patchRequest, getRequest } from "@/shared-lib";
import {DashboardFooterResponse} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";

type UserDashboardFooterFormData = Partial<DashboardFooterResponse>;

export async function patchUserDashboardFooterSettings(data: UserDashboardFooterFormData) {
  const r = await patchRequest<UserDashboardFooterFormData>({
    url: "setting/user-dashboard",
    data,
    useAuth: true,
  });
  return r.response;
}

export async function getUserDashboardFooterSettings(): Promise<DashboardFooterResponse> {
  return await getRequest({
    url: "setting/user-dashboard",
    useAuth: true,
  });
}