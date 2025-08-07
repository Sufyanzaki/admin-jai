import {getRequest, patchRequest} from "@/shared-lib";
import {BasicSettings} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";

type Payload = Partial<BasicSettings>

export async function getBasicSettings(): Promise<BasicSettings> {
    return getRequest({ url: "setting/basic-setting", useAuth: true });
}

export async function patchBasicSettings(data: Payload): Promise<BasicSettings> {
    const r = await patchRequest({
        url: "setting/basic-setting",
        data,
        useAuth: true,
    });
    return r.response;
}