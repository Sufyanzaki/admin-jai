"use client";
import {useBlockedProfiles} from "./_hooks/useBlockedProfiles";
import Preloader from "@/components/shared/Preloader";
import ProfileCard from "@/app/(client)/dashboard/_components/profile-card";

export default function BlockedPage() {
  const { blockedProfiles, blockedLoading } = useBlockedProfiles();

  if(blockedLoading){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Preloader />
      </div>
    );
  }

  if(!blockedProfiles) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No blocked profiles found.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mb-8">
            {blockedProfiles?.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} blocked />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
