import { getRequest } from "@/admin-utils";
import type { EmailTemplate } from "../_types/emailTemplateTypes";

export async function getEmailTemplates(): Promise<EmailTemplate[]> {
  return getRequest<EmailTemplate[]>({
    url: "setting/email-templates",
    useAuth: true,
  });
} 