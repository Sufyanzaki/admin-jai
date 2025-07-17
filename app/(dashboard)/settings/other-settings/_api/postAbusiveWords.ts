import { postRequest } from "@/admin-utils";

export interface PostAbusiveWordsPayload {
  words: string[];
}

export async function postAbusiveWords(payload: PostAbusiveWordsPayload) {
  return postRequest<PostAbusiveWordsPayload>({
    url: "/settings/abusive",
    data: payload,
    useAuth: true,
  });
} 