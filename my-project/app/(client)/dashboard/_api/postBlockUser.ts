import { postRequest } from "@/shared-lib";

export type blockUser = {
    blockedUserId: number
}

export type blockResponse = {
  message: string; 
};


export async function postBlockUser(payload: blockUser): Promise<blockResponse> {
    const r = await postRequest<blockUser>({
        url: "users/block",
        data: payload,
        useAuth: true,
    });
    return r.response;
}