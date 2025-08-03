import { patchRequest } from "@/admin-utils";

export interface PatchEmailTemplatePayload {
  key: string;
  isActive: boolean;
  translations: Array<{
    language: string;
    subject: string;
    content: string;
  }>;
}

export async function patchEmailTemplate(id: number | string, payload: PatchEmailTemplatePayload) {
  return patchRequest({
    url: `setting/email-templates/${id}`,
    data: payload,
    useAuth: true,
  });
} 