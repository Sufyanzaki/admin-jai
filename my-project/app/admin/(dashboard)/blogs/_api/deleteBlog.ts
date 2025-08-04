import { deleteRequest } from "@/shared-lib";

export async function deleteBlog(id: string): Promise<{ status: number } | undefined> {
  const r = await deleteRequest({
    url: `blog/${id}`,
    useAuth: true,
  });
  return { status: r.status };
}
