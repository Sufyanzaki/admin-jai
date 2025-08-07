import {postRequest} from "@/shared-lib";
import {LoginResponse} from "@/app/shared-types/auth";

export type ResendOtpResponse = {
    success: boolean;
    message?: string;
};

type LoginProps = {
    email: string;
    password: string;
}

export type OtpProps = {
    email: string;
    otp: string;
};

export async function postLoginForm(props: LoginProps): Promise<LoginResponse | undefined> {
    const r = await postRequest<LoginProps>({
        url: 'auth/login',
        data : props,
        useAuth: false
    });
    return r.response
}

export async function postOtp(props: OtpProps): Promise<LoginResponse | undefined> {
    const r = await postRequest<OtpProps>({
        url: 'auth/verify-email',
        data: props,
        useAuth: false,
    });
    return r.response;
}

export async function resendOtp(props: Partial<OtpProps>): Promise<ResendOtpResponse | undefined> {
    const r = await postRequest<Partial<OtpProps>>({
        url: 'auth/resend-otp',
        data: props,
        useAuth: false,
    });
    return r.response;
} 