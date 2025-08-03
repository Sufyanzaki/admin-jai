import { postRequest } from "@/admin-utils";
import { LoginResponse } from "../_types/auth";

export type OtpProps = {
  email: string;
  otp: string;
};

export async function postOtp(props: OtpProps): Promise<LoginResponse | undefined> {
  const r = await postRequest<OtpProps>({
    url: 'auth/verify-email',
    data: props,
    useAuth: false,
  });
  return r.response;
} 