import {postRequest} from "@/admin-utils";
import {LoginResponse} from "@/app/auth/_types/auth";

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