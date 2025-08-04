import {postRequest} from "@/shared-lib";

type UpdatePasswordProps = {
    currentPassword: string;
    newPassword: string;
}

export async function updatePassword(props: UpdatePasswordProps): Promise<{status: number} | undefined> {
    const r = await postRequest<UpdatePasswordProps>({
        url: 'auth/change-password',
        data : props,
        useAuth: true
    });
    return { status: r.status }
}