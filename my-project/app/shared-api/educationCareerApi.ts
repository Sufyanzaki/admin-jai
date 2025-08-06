import { postRequest, patchRequest, getRequest } from "@/shared-lib";
import {MemberEducation} from "@/app/shared-types/member";

export async function postEducationCareer(userId: string, payload: Partial<MemberEducation>) {
  const r= await postRequest<Partial<MemberEducation>>({
    url: `users/${userId}/education-career`,
    data: payload,
    useAuth: true,
  });
  return r.response
}

export async function patchEducationCareer(userId: string, payload: Partial<MemberEducation>) {
  const r= await patchRequest<Partial<MemberEducation>>({
    url: `users/${userId}/education-career`,
    data: payload,
    useAuth: true,
  });
  return r.response
}

export async function getEducationCareer(userId: string): Promise<MemberEducation> {
  return getRequest({
    url: `users/${userId}/education-career`,
    useAuth: true,
  });
} 