import { getRequest, patchRequest } from '@/admin-utils';

export type MollieSettings = {
  key: string | null;
  isActive: boolean;
};

export async function getMollie(): Promise<MollieSettings> {
  return await getRequest({
    url: 'setting/mollie',
    useAuth: true,
  });
}

export async function patchMollie(data: MollieSettings): Promise<MollieSettings> {
  const r = await patchRequest<MollieSettings>({
    url: 'setting/mollie',
    data,
    useAuth: true,
  });
  return r.response;
} 