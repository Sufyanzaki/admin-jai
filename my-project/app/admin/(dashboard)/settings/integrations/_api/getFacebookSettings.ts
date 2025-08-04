import { getRequest } from "@/shared-lib";
import { FacebookSettings } from '../../_types/facebook';

export async function getFacebookSettings(): Promise<FacebookSettings> {
  return await getRequest({
    url: 'setting/facebook',
    useAuth: true,
  });
} 