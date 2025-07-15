import { postRequest } from "@/admin-utils";

export type PostFaqProps = {
  question: string;
  answer: string;
  categoryId: number;
};

export async function postFaq(data: PostFaqProps): Promise<{ status: number } | undefined> {
  const r = await postRequest<PostFaqProps>({
    url: "faq",
    data,
    useAuth: true,
  });
  return { status: r.status };
}
