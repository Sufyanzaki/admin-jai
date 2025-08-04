import { getRequest, patchRequest } from '@/admin-utils';

export type StripeSettings = {
  key: string;
  publicKey: string;
  isActive: boolean;
};

export async function getStripe(): Promise<StripeSettings> {
  return await getRequest({
    url: 'setting/stripe',
    useAuth: true,
  });
}

export async function patchStripe(data: StripeSettings): Promise<StripeSettings> {
  const r = await patchRequest<StripeSettings>({
    url: 'setting/stripe',
    data,
    useAuth: true,
  });
  return r.response;
} 