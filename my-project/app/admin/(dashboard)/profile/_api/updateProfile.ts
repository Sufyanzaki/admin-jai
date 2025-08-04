import {patchRequest} from "@/admin-utils";

type UpdateProfileProps = {
    username: string;
    email: string;
    location: string;
    phone?: string;
    image?: string;
}

export async function updateProfile(props: UpdateProfileProps): Promise<{status: number} | undefined> {
    const r = await patchRequest<UpdateProfileProps>({
        url: 'auth/update-admin/1',
        data: props,
        useAuth: true
    });
    return { status: r.status }
} 