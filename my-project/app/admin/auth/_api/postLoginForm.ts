import { LoginResponse } from "@/app/shared-types/auth";
import {postRequest} from "@/shared-lib";

type LoginProps = {
    email: string;
    password: string;
}

export async function postLoginForm(props: LoginProps): Promise<LoginResponse | undefined> {
    const r = await postRequest<LoginProps>({
        url: 'auth/login',
        data : props,
        useAuth: false
    });
    return r.response
}