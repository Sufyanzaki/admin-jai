import { getRequest } from "@/shared-lib";
import {ProfileAttributeResponse} from "@/app/shared-types/attribute";

export async function getProfileAttribute(id: string): Promise<ProfileAttributeResponse> {
  return getRequest({
    url: `profile-attribute/key/${id}`,
    useAuth: true,
  });
} 