import { getRequest } from "@/shared-lib";
import { ProfileAttributeResponse } from "@/app/shared-types/attribute";

export async function getProfileAttributes(): Promise<ProfileAttributeResponse[]> {
  return getRequest({
    url: `profile-attribute`,
    useAuth: true,
  });
} 