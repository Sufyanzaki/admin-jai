import { patchRequest, getRequest } from "@/admin-utils";

export interface UserDashboardFooterFormData {
  sectionPage: string;
}

export interface UserDashboardFooterResponse {
  id: number;
  sectionPage: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDashboardFooterApiResponse {
  success: boolean;
  data: UserDashboardFooterResponse;
}

export async function patchUserDashboardFooterSettings(data: UserDashboardFooterFormData) {
  const r = await patchRequest<UserDashboardFooterFormData>({
    url: "setting/user-dashboard",
    data,
    useAuth: true,
  });
  return r.response;
}

export async function getUserDashboardFooterSettings() {
  return await getRequest<UserDashboardFooterApiResponse>({
    url: "setting/user-dashboard",
    useAuth: true,
  });
}