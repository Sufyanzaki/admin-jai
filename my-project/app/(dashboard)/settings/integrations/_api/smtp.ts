import { getRequest, patchRequest } from '@/admin-utils';

export type SmtpSettings = {
  host: string;
  port: number;
  username: string;
  password: string;
  encryption: string;
  fromAddress: string;
  fromName: string;
};

export async function getSmtp(): Promise<SmtpSettings> {
  return await getRequest({
    url: 'setting/smtp',
    useAuth: true,
  });
}

export async function patchSmtp(data: SmtpSettings): Promise<SmtpSettings> {
  const r = await patchRequest<SmtpSettings>({
    url: 'setting/smtp',
    data,
    useAuth: true,
  });
  return r.response;
} 