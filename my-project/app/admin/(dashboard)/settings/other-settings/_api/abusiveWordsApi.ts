import {getRequest, patchRequest} from "@/shared-lib";

export async function getAbusiveWords(): Promise<{ word: string }> {
    const res = await getRequest<{ word: string }>({
        url: "setting/abusive",
        useAuth: true,
    });
    return { word: res.word || "" };
}

export async function patchAbusiveWords(payload: { word: string }) {
    return patchRequest<{ word: string }>({
        url: "setting/abusive",
        data: payload,
        useAuth: true,
    });
}