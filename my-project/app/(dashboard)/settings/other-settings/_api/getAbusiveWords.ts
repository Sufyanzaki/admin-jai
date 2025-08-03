import { getRequest } from "@/admin-utils";

export async function getAbusiveWords(): Promise<{ word: string }> {
  const res = await getRequest<{ word: string }>({
    url: "setting/abusive",
    useAuth: true,
  });
  return { word: res.word || "" };
}