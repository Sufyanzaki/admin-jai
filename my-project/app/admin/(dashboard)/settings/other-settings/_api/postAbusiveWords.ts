import {patchRequest} from "@/admin-utils";

export interface PostAbusiveWordsPayload {
  word: string;
}

export async function patchAbusiveWords(payload: PostAbusiveWordsPayload) {
  return patchRequest<PostAbusiveWordsPayload>({
    url: "setting/abusive",
    data: payload,
    useAuth: true,
  });
} 