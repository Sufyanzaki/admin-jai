import { getRequest } from "@/shared-lib";
import { GoogleSettings } from '../../_types/google';

export async function getGoogleSettings(): Promise<GoogleSettings> {
  return await getRequest({
    url: 'setting/google',
    useAuth: true,
  });
} 