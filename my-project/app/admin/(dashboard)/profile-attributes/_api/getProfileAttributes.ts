import { getRequest } from "@/shared-lib";
import { ProfileAttributeResponse } from "./getProfileAttribute";

export async function getProfileAttributes(): Promise<ProfileAttributeResponse[]> {
  return getRequest({
    url: `profile-attribute`,
    useAuth: true,
  });
} 