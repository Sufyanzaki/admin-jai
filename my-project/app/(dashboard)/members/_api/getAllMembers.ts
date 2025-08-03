import { getRequest } from '@/admin-utils';
import { GetAllMembersResponse } from '../_types/member';

export type GetAllMembersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  gender?: string;
  isPremium?: boolean;
};

export async function getAllMembers(params?: GetAllMembersParams): Promise<GetAllMembersResponse> {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.status) queryParams.append('status', params.status);
  if (params?.gender) queryParams.append('gender', params.gender);
  if (params?.isPremium !== undefined) queryParams.append('isPremium', params.isPremium.toString());

  const url = queryParams.toString() ? `users?${queryParams.toString()}` : 'users';
  
  return await getRequest({
    url,
    useAuth: true,
  });
} 