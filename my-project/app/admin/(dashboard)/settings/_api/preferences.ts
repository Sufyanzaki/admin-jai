
import {getRequest, patchRequest} from "@/admin-utils";

export interface SystemSettingsDto {
    maintenanceMode: boolean;
    defaultCurrency: string;
    defaultLanguage: string;
}

export async function patchPreferenceSettings(payload: SystemSettingsDto) {
    return patchRequest<SystemSettingsDto>({
        url: "setting/defaultPrefence",
        data: payload,
        useAuth: true,
    });
}

export async function getPreferenceSettings(): Promise<SystemSettingsDto> {
    return getRequest<SystemSettingsDto>({
        url: "setting/defaultPrefence",
        useAuth: true,
    });
}