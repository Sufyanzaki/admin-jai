import {deleteRequest, getRequest} from "@/shared-lib";
import {NewsletterDto} from "@/app/shared-types/newsletter";

export async function deleteNewsletter(id: string): Promise<{ status: number } | undefined> {
    const r = await deleteRequest({
        url: `newsletter/${id}`,
        useAuth: true,
    });
    return r.response;
}

export async function getAllNewsletter(): Promise<NewsletterDto[]> {
    return await getRequest({
        url: "newsletter",
        useAuth: true,
    });
}

export async function getNewsletterById(id: string): Promise<NewsletterDto> {
    return await getRequest({
        url: `newsletter/${id}`,
        useAuth: true,
    });
}