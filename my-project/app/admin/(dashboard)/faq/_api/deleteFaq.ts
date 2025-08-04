import { deleteRequest } from "@/shared-lib";

export async function deleteFaq(id: number): Promise<{ status: number } | undefined> {
  const r = await deleteRequest({
    url: `faq/${id}`,
    useAuth: true,
  });
  return { status: r.status };
}
