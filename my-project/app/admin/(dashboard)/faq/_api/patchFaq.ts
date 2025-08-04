import { patchRequest } from "@/shared-lib";

export type PatchFaqProps = {
  question: string;
  answer: string;
  categoryId: number;
};

export async function patchFaq(id: number, data: PatchFaqProps): Promise<{ status: number } | undefined> {
  const r = await patchRequest<PatchFaqProps>({
    url: `faq/${id}`,
    data,
    useAuth: true,
  });
  return { status: r.status };
}
