import { patchRequest } from "@/shared-lib";

export interface PatchLanguageStatusPayload {
  id: string | number;
  isActive: boolean;
}

