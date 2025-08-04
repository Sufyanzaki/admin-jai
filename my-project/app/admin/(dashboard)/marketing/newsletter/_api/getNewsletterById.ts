import { getRequest } from "@/shared-lib";
import { Newsletter } from '../_types/newsletter';

export async function getNewsletterById(id: string): Promise<Newsletter> {
  return await getRequest({
    url: `newsletter/${id}`,
    useAuth: true,
  });
} 