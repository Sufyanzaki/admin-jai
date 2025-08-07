import {deleteRequest, getRequest, patchRequest, postRequest} from "@/shared-lib";
import type { StaffListResponse, StaffMemberDto } from "../_types/staff";

type StaffProps = {
    page?: number;
    limit?: number;
    search?: string;
    allow?: string;
    isActive?: boolean
}

type Payload = Partial<StaffMemberDto>

export async function getStaffMembers(params?: StaffProps): Promise<StaffListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.allow) queryParams.append('allow', params.allow);
    if (typeof params?.isActive === "boolean") queryParams.append('isActive', params.isActive ? "true" : "false");

    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";

    return await getRequest({
        url: `users/staff/staff-members${query}`,
        useAuth: true,
    });
}

export async function getStaffMember(id: string): Promise<StaffMemberDto> {
    return await getRequest({
        url: `users/${id}`,
        useAuth: true,
    });
}

export async function editStaffMember(data: Payload) {
    const { id, ...otherInfo } = data;
    const r = await patchRequest<Payload>({
        url: `users/${id}`,
        data: otherInfo,
        useAuth: true,
    });
    return r.response;
}

export async function deleteStaff(id: string): Promise<{message: string}> {
    const r = await deleteRequest({
        url: `users/${id}`,
        useAuth: true
    });
    return r.response
}

export async function createStaffMember(payload: Payload) {
    const r = await postRequest<Payload>({
        url: "users",
        data: payload,
        useAuth: true,
    });
    return r.response;
}