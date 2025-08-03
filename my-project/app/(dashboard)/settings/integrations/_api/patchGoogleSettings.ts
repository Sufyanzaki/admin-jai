import { patchRequest } from '@/admin-utils';
import { GoogleSettings } from '../../_types/google';

export type PatchGoogleSettingsProps = {
  clientId: string | null;
  clientSecret: string | null;
  isActive: boolean;
};

export async function patchGoogleSettings(props: PatchGoogleSettingsProps): Promise<GoogleSettings> {
  const r = await patchRequest<PatchGoogleSettingsProps>({
    url: 'setting/google',
    data: props,
    useAuth: true,
  });
  return r.response;
} 