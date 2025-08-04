import { patchRequest } from '@/admin-utils';
import { FacebookSettings } from '../../_types/facebook';

export type PatchFacebookSettingsProps = {
  clientId: string | null;
  clientSecret: string | null;
  isActive: boolean;
};

export async function patchFacebookSettings(props: PatchFacebookSettingsProps) {
  const r = await patchRequest<PatchFacebookSettingsProps>({
    url: 'setting/facebook',
    data: props,
    useAuth: true,
  });
  return r.response;
} 