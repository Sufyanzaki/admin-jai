import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getProfile } from "@/app/(dashboard)/profile/_api/getProfile";
import { useSession } from "next-auth/react";
import { ProfileResponse } from "../_types/profile-types";
import { useEffect } from "react";

export const useProfile = () => {
  const { data: session, update } = useSession();
  
  console.log('useProfile hook called, session:', session);
  
  // Monitor session changes
  useEffect(() => {
    console.log('Session changed:', session);
  }, [session]);

  // Cleanup localStorage on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('freshProfileData');
      }
    };
  }, []);
  
  const { data, loading, error, mutate } = useSWRFix<ProfileResponse>({
    key: session?.token ? 'user-profile' : '',
    fetcher: async () => {
      const response = await getProfile();
      if (!response) {
        throw new Error('Failed to fetch profile');
      }
      
      console.log('Profile API response:', response);
      
      // Store the profile data in localStorage for client-side access
      const profileData = {
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
      };
      
      console.log('Storing fresh profile data:', profileData);
      localStorage.setItem('freshProfileData', JSON.stringify(profileData));
      
      // Trigger a session update to refresh the session
      console.log('Triggering session update...');
      await update();
      console.log('Session update completed');

      return response;
    }
  });

  // Get fresh profile data from localStorage if available
  const getFreshProfileData = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('freshProfileData');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          // Clear the data after reading it to prevent stale data
          localStorage.removeItem('freshProfileData');
          return data;
        } catch (e) {
          console.error('Error parsing stored profile data:', e);
          localStorage.removeItem('freshProfileData');
        }
      }
    }
    return null;
  };

  // Merge fresh profile data with session data
  const mergedUser = getFreshProfileData() || data?.user || session?.user;

  return {
    user: data?.user,
    userLoading: loading,
    error,
    mutate,
    mergedUser
  };
};
