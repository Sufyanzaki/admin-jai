import { postRequest } from "@/shared-lib";

export type PostNewsletterProps = {
  title: string;
  content: string;
  emails: string;
};

export async function postNewsletter(data: PostNewsletterProps): Promise<{ status: number } | undefined> {
  const r = await postRequest<PostNewsletterProps>({
    url: "newsletter",
    data,
    useAuth: true,
  });
  return { status: r.status };
} 