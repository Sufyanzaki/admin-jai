import { patchRequest } from "@/admin-utils";

export type PatchFaqCategoryProps = {
  name: string;
};

export async function patchFaqCategory(id: number, data: PatchFaqCategoryProps): Promise<{ status: number } | undefined> {
  const r = await patchRequest<PatchFaqCategoryProps>({
    url: `faq/categories/${id}`,
    data,
    useAuth: true,
  });
  return { status: r.status };
}
