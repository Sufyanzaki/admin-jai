import { postRequest } from "@/admin-utils";

export type PostFaqProps = {
  question: string;
  answer: string;
  categoryId: number;
};

export async function postFaq(data: PostFaqProps): Promise<{ id: string } | undefined> {
  const r = await postRequest<PostFaqProps>({
    url: "faq",
    data,
    useAuth: true,
  });
  return r.response;
}
