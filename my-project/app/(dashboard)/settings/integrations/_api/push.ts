import { getRequest, patchRequest } from '@/admin-utils';

export type PushSettings = {
  isActive: boolean;
  fcmApiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  serverKey: string;
};

export async function getPush(): Promise<PushSettings> {
  return await getRequest({
    url: 'setting/push',
    useAuth: true,
  });
}

export async function patchPush(data: PushSettings): Promise<PushSettings> {
  const r = await patchRequest<PushSettings>({
    url: 'setting/push',
    data,
    useAuth: true,
  });
  return r.response;
} 