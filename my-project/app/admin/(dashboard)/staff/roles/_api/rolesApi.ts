import { getRequest, postRequest, patchRequest, deleteRequest } from "@/admin-utils";
import { RoleDto, RolePayload } from "../add/_types/roleTypes";

export async function postRole(payload: RolePayload): Promise<RoleDto> {
  const r = await postRequest<RolePayload>({ url: "users/roles", data: payload });
  return r.response as RoleDto;
}

export async function getRoles(): Promise<RoleDto[]> {
  const r = await getRequest<RoleDto[]>({ url: "users/roles" });
  return r as RoleDto[];
}
//TODO: check if this is needed
export async function getAllRoles(): Promise<RoleDto[]> {
  const r = await getRequest<RoleDto[]>({ url: "users/roles" });
  return r as RoleDto[];
}

export async function patchRole(id: string, data: Partial<RolePayload>): Promise<RoleDto> {
  const r = await patchRequest<Partial<RolePayload>>({ url: `users/roles/${id}`, data });
  return r.response as RoleDto;
}

export async function deleteRole(id: number | string): Promise<void> {
  const r = await deleteRequest({
    url: `users/roles/${id}`,
    useAuth: true,
  });
  return r.response;
}

export async function getRoleById(id: number | string): Promise<RoleDto> {
  const r = await getRequest<RoleDto>({ url: `users/roles/${id}` });
  return r as RoleDto;
} 