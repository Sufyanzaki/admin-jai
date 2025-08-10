"use client";
import { Button } from "@/components/client/ux/button";
import { Label } from "@/components/client/ux/label";
import { Switch } from "@/components/client/ux/switch";
import { Grid3X3, List } from "lucide-react";
import { useState } from "react";
import ListCard from "@/app/(client)/dashboard/_components/list-card";
import ProfileCard from "@/app/(client)/dashboard/_components/profile-card";
import { useTodayMatches } from "../_hooks/useTodayMatches";
import { Skeleton } from "@/components/admin/ui/skeleton";
import { MemberProfile } from "@/app/shared-types/member";

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
  {
    id: 12,
    name: "Laura",
    age: 33,
    location: "Meppel",
    image: "https://picsum.photos/200?random=212",
    status: "offline",
    description: "Like to Profiel",
  },
];

export default function MatchesPage() {
  const [online, setOnline] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { matches, matchesLoading, error } = useTodayMatches();

  const filteredResults = online
    ? matchResults.filter((profile) => profile.status === "online")
    : matchResults;

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <header className="bg-white px-6 pt-6 pb-4">
          <h1 className="text-[22px] sm:text-2xl lg:text-3xl xl:text-[36px] font-semibold">
            My Matches
          </h1>
        </header>

        <main className="flex-1 px-6 py-8 space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Switch
                checked={online}
                onCheckedChange={setOnline}
                className="data-[state=checked]:bg-app-blue"
              />
              <Label className="text-sm">Online</Label>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "theme" : "outline"}
                size="sm"
                className={`h-8 w-8 p-0`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "theme" : "outline"}
                size="sm"
                className={`h-8 w-8 p-0`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mb-8">
              {error ? (
                <div className="flex items-center justify-center h-screen">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">
                      Error loading Todays Matches
                    </h2>
                    <p className="text-muted-foreground">{error.message}</p>
                  </div>
                </div>
              ) : matchesLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[210px] w-full rounded-lg bg-app-gray/10"
                  />
                ))
              ) : Array.isArray(matches) ? (
                matches.map((profile: MemberProfile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))
              ) : null}
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {error ? (
                <div className="flex items-center justify-center h-screen">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">
                      Error loading Todays Matches
                    </h2>
                    <p className="text-muted-foreground">{error.message}</p>
                  </div>
                </div>
              ) : matchesLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[210px] w-full rounded-lg bg-app-gray/10"
                  />
                ))
              ) : Array.isArray(matches) ? (
                matches.map((profile: MemberProfile) => (
                  <ListCard key={profile.id} profile={profile} />
                ))
              ) : null}
            </div>
          )}

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
