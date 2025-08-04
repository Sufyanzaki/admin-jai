import { postRequest } from "@/shared-lib";

export type ResendOtpProps = {
  email: string;
};

export type ResendOtpResponse = {
  success: boolean;
  message?: string;
};

export async function resendOtp(props: ResendOtpProps): Promise<ResendOtpResponse | undefined> {
  const r = await postRequest<ResendOtpProps>({
    url: 'auth/resend-otp',
    data: props,
    useAuth: false,
  });
  return r.response;
} 