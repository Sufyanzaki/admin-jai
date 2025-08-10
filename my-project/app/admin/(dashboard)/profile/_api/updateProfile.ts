import {patchRequest} from "@/shared-lib";

type UpdateProfileProps = {
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
}

export async function updateProfile(id: string, props: UpdateProfileProps): Promise<{status: number} | undefined> {
    const r = await patchRequest<UpdateProfileProps>({
        url: `auth/update-admin/${id}`,
        data: props,
        useAuth: true
    });
    return { status: r.status }
} 