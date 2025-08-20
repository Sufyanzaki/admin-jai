import {patchRequest, getRequest, postRequest} from "@/shared-lib";
import {
  FooterSectionDto,
  FooterSettingDto
} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";

type Payload = Partial<FooterSettingDto>;
type SectionPayload = Partial<FooterSectionDto>;

export async function patchFooterSettings(data: Payload) {
  const r = await patchRequest<Payload>({
    url: "setting/footer",
    data,
    useAuth: true,
  });
  return r.response;
}

export async function getFooterSettings(): Promise<FooterSettingDto> {
  return await getRequest<FooterSettingDto>({
    url: "setting/footer",
    useAuth: true,
  });
}

export async function getFooterSections(): Promise<FooterSectionDto[]> {
  return await getRequest({
    url: "setting/footer/sections",
    useAuth: true,
  });
}

export async function getFooterSectionDetails(id:string): Promise<FooterSectionDto[]> {
  return await getRequest({
    url: `setting/footer/sections/${id}`,
    useAuth: true,
  });
}

export async function updateFooterSection(id: string,data: SectionPayload): Promise<FooterSectionDto> {
  const r = await patchRequest<SectionPayload>({
    url: `setting/footer/sections/${id}`,
    data,
    useAuth: true,
  });
  return r.response;
}

export async function createFooterSection(data: SectionPayload): Promise<FooterSectionDto> {
  const r = await postRequest<SectionPayload>({
    url: "setting/footer/sections",
    data,
    useAuth: true,
  });
  return r.response;
}