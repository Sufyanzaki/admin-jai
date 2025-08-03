import { getRequest } from "@/admin-utils";
import { ProfileAttributeResponse } from "./getProfileAttribute";

export async function getProfileAttributes(): Promise<ProfileAttributeResponse[]> {
  return getRequest({
    url: `profile-attribute`,
    useAuth: true,
  });
} 