"use client"

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getProfile } from "@/app/(dashboard)/profile/_api/getProfile";
import { useSession } from "next-auth/react";
import { ProfileResponse } from "../_types/profile-types";

export const useProfile = () => {
  const { data: session, update } = useSession();
  
  const { data, loading, error, mutate } = useSWRFix<ProfileResponse>({
    key: session ? 'user-profile' : '',
    fetcher: async () => {
      const response = await getProfile();
      if (!response) {
        throw new Error('Failed to fetch profile');
      }
      
      await update({
        ...session,
        user: {
          ...session?.user,
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          dob: response.user.dob,
          role: response.user.role,
          isActive: response.user.isActive,
          image: response.user.image,
          phone: response.user.phone,
          department: response.user.department,
          location: response.user.location,
          origin: response.user.origin,
          gender: response.user.gender,
          age: response.user.age,
          relationshipStatus: response.user.relationshipStatus,
          children: response.user.children,
          religion: response.user.religion,
          shortDescription: response.user.shortDescription,
          createdAt: response.user.createdAt,
          updatedAt: response.user.updatedAt,
          name: response.user.firstName && response.user.lastName 
            ? `${response.user.firstName} ${response.user.lastName}`
            : response.user.username,
        }
      });

      return response;
    }
  });

  return {
    user: data?.user,
    userLoading: loading,
    error,
    mutate
  };
};
