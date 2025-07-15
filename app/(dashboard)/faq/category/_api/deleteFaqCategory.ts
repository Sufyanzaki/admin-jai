import { deleteRequest } from "@/admin-utils";

export async function deleteFaqCategory(id: number): Promise<{ status: number } | undefined> {
  const r = await deleteRequest({
    url: `faq/categories/${id}`,
    useAuth: true,
  });
  return { status: r.status };
}
