import {patchRequest, getRequest, postRequest} from "@/admin-utils";

export interface FooterFormData {
  footerLogo?: string;
  footerDescription: string;
  linkName: string;
  searchName: string;
  footerContent: string;
}

export interface FooterResponse {
  id: string;
  footerLogo?: string;
  footerDescription: string;
  linkName: string;
  searchName: string;
  footerContent: string;
  createdAt: string;
  updatedAt: string;
}

export async function patchFooterSettings(data: FooterFormData) {
  const r = await patchRequest<FooterFormData>({
    url: "setting/footer",
    data,
    useAuth: true,
  });
  return r.response;
}

export async function getFooterSettings() {
  return await getRequest<FooterResponse>({
    url: "setting/footer",
    useAuth: true,
  });
}


export interface FooterSection {
  id?: string;
  sectionName: string;
  pageNames: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getFooterSections(): Promise<FooterSection[]> {
  return await getRequest<FooterSection[]>({
    url: "setting/footer/sections",
    useAuth: true,
  });
}

export async function updateFooterSection(id: string,data: FooterSection): Promise<FooterSection> {
  const r = await patchRequest<FooterSection>({
    url: `setting/footer/sections/${id}`,
    data,
    useAuth: true,
  });
  return r.response;
}

export async function createFooterSection(data: FooterSection): Promise<FooterSection> {
  const r = await postRequest<FooterSection>({
    url: "setting/footer/sections",
    data,
    useAuth: true,
  });
  return r.response;
}