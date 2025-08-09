import { postRequest } from "@/shared-lib";

export type sendLike = {
    receiverId: number
}

export type sendLikeResponse = {
  status: string; // e.g. "success"
  data: {
    id: number;
    senderId: number;
    receiverId: number;
    status: "PENDING" | "ACCEPTED" | "REJECTED"; // add more statuses if needed
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    sender: {
      id: number;
      firstName: string;
      lastName: string;
      image: string;
    };
  };
};


export async function postLike(payload: sendLike): Promise<sendLikeResponse> {
    const r = await postRequest<sendLike>({
        url: "users/like",
        data: payload,
        useAuth: true,
    });
    return r.response;
} 