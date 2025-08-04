import { getRequest } from "@/admin-utils";
import type { EmailTemplate } from "../_types/emailTemplateTypes";

export async function getEmailTemplateById(id: number | string): Promise<EmailTemplate> {
  return getRequest<EmailTemplate>({
    url: `setting/email-templates/${id}`,
    useAuth: true,
  });
} 