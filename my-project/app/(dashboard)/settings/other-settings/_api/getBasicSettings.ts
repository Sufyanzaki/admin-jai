import { getRequest } from "@/admin-utils";
import { BasicSettingsFormValues } from "../_hooks/useBasicSettingsForm";

export async function getBasicSettings(): Promise<BasicSettingsFormValues> {
  return getRequest({ url: "setting/basic-setting", useAuth: true });
} 