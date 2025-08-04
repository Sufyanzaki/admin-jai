import { deleteRequest } from "@/shared-lib";

export async function deleteNewsletter(id: number): Promise<{ status: number } | undefined> {
  const r = await deleteRequest({
    url: `newsletter/${id}`,
    useAuth: true,
  });
  return { status: r.status };
} 