import { postRequest, patchRequest, getRequest } from "@/admin-utils";

export interface EducationCareerPayload {
  primarySpecialization: string;
  secondarySpecialization: string;
  qualifications: string;
  experience: string;
  education: string;
  certifications: string;
  department: string;
  position: string;
}

export async function postEducationCareer(userId: string, payload: EducationCareerPayload) {
  return postRequest({
    url: `users/${userId}/education-career`,
    data: payload,
    useAuth: true,
  });
}

export async function patchEducationCareer(userId: string, payload: EducationCareerPayload) {
  return patchRequest({
    url: `users/${userId}/education-career`,
    data: payload,
    useAuth: true,
  });
}

export async function getEducationCareer(userId: string): Promise<EducationCareerPayload> {
  return getRequest({
    url: `users/${userId}/education-career`,
    useAuth: true,
  });
} 