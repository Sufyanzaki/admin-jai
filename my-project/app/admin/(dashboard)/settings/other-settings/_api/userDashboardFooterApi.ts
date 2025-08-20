import { patchRequest, getRequest } from "@/shared-lib";
import {
  DashboardFooterDto,
  DashboardFooterResponse
} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";

type Payload = Partial<DashboardFooterDto>;

export async function patchUserDashboardFooterSettings(data: Payload) {
  const r = await patchRequest<Payload>({
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