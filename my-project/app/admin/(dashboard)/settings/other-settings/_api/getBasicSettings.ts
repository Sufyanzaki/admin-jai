import { getRequest } from "@/shared-lib";
import { BasicSettingsFormValues } from "../_hooks/useBasicSettingsForm";

export async function getBasicSettings(): Promise<BasicSettingsFormValues> {
  return getRequest({ url: "setting/basic-setting", useAuth: true });
} 