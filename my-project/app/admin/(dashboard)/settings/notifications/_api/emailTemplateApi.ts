import {
    EmailTemplateDto,
    EmailTemplateResponse
} from "@/app/admin/(dashboard)/settings/notifications/_types/emailTemplateTypes";
import {getRequest, patchRequest} from "@/shared-lib";

type Payload = Partial<EmailTemplateDto>;

export async function getEmailTemplateById(id: string): Promise<EmailTemplateDto> {
    return getRequest<EmailTemplateDto>({
        url: `setting/email-templates/${id}`,
        useAuth: true,
    });
}

export async function getEmailTemplates(): Promise<EmailTemplateResponse> {
    return getRequest({
        url: "setting/email-templates",
        useAuth: true,
    });
}

export async function patchEmailTemplate(id: string, payload: Payload) {
    const r = await patchRequest<Payload>({
        url: `setting/email-templates/${id}`,
        data: payload,
        useAuth: true,
    });
    return r.response;
}