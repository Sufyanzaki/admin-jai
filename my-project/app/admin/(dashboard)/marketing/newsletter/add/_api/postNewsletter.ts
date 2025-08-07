import { postRequest } from "@/shared-lib";
import {NewsletterDto} from "@/app/shared-types/newsletter";

type Payload = Partial<NewsletterDto>;

export async function postNewsletter(data: Payload): Promise<NewsletterDto> {
  const r = await postRequest<Payload>({
    url: "newsletter",
    data,
    useAuth: true,
  });
  return r.response;
}