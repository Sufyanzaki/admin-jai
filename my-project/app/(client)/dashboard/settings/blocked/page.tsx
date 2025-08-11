"use client";
import { Button } from "@/components/client/ux/button";
import ProfileCard from "@/app/(client)/dashboard/_components/profile-card";
import { getBlockedProfiles } from "./_api/getBlockedProfiles";
import { useBlockedProfiles } from "./_hooks/useBlockedProfiles";
import { MemberProfile } from "@/app/shared-types/member";
import { useUnblockUser } from "./_hooks/useUnblockProfile";

const matchResults = [
  {
    id: 1,
    name: "Daniella",
    age: 32,
    location: "Nieuwkuijk",
    image: "https://picsum.photos/200?random=201",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 2,
    name: "Naé",
    age: 31,
    location: "Roerlo",
    image: "https://picsum.photos/200?random=202",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 3,
    name: "Laura",
    age: 35,
    location: "Meppel",
    image: "https://picsum.photos/200?random=203",
    status: "offline",
    description: "Like to Profiel",
  },
  {
    id: 4,
    name: "Daniella",
    age: 28,
    location: "Heerenveen",
    image: "https://picsum.photos/200?random=204",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 5,
    name: "Naé",
    age: 30,
    location: "Renklo",
    image: "https://picsum.photos/200?random=205",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 6,
    name: "Laura",
    age: 33,
    location: "Meppel",
    image: "https://picsum.photos/200?random=206",
    status: "offline",
    description: "Like to Profiel",
  },
  {
    id: 7,
    name: "Daniella",
    age: 32,
    location: "Nieuwkuijk",
    image: "https://picsum.photos/200?random=207",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 8,
    name: "Naé",
    age: 31,
    location: "Roerlo",
    image: "https://picsum.photos/200?random=208",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 9,
    name: "Laura",
    age: 35,
    location: "Meppel",
    image: "https://picsum.photos/200?random=209",
    status: "offline",
    description: "Like to Profiel",
  },
  {
    id: 10,
    name: "Daniella",
    age: 28,
    location: "Heerenveen",
    image: "https://picsum.photos/200?random=210",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 11,
    name: "Naé",
    age: 30,
    location: "Renklo",
    image: "https://picsum.photos/200?random=211",
    status: "online",
    description: "Like to Profiel",
  },
];

export default function BlockedPage() {
  const { blockedProfiles, blockedLoading, error } = useBlockedProfiles();
  
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mb-8">
            {blockedProfiles?.map((profile: MemberProfile) => (
              <ProfileCard key={profile.id} profile={profile} blocked />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="default" size="sm" className="bg-app-blue">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
