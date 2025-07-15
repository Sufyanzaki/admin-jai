import { postRequest } from "@/admin-utils";

export type PostFaqCategoryProps = {
  name: string;
};

export async function postFaqCategory(props: PostFaqCategoryProps): Promise<{ status: number } | undefined> {
  const r = await postRequest<PostFaqCategoryProps>({
    url: "faq/categories",
    data: props,
    useAuth: true,
  });
  return { status: r.status };
}
