import { getRequest, patchRequest } from '@/admin-utils';

export type CaptchaSettings = {
  siteKey: string;
  siteSecret: string;
  isActive: boolean;
};

export async function getCaptcha(): Promise<CaptchaSettings> {
  return await getRequest({
    url: 'setting/recaptcha',
    useAuth: true,
  });
}

export async function patchCaptcha(data: CaptchaSettings): Promise<CaptchaSettings> {
  const r = await patchRequest<CaptchaSettings>({
    url: 'setting/recaptcha',
    data,
    useAuth: true,
  });
  return r.response;
} 