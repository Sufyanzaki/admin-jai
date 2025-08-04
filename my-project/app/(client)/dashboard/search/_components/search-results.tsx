"use client";
import { Button } from "@/components/client/ux/button";
import { Label } from "@/components/client/ux/label";
import { Switch } from "@/components/client/ux/switch";
import { Grid3X3, List } from "lucide-react";
import { useState } from "react";
import ProfileCard from "../../_components/profile-card";
import ListCard from "@/app/(client)/dashboard/_components/list-card";

const searchResults = [
  {
    id: 1,
    name: "Daniella",
    age: 32,
    location: "Nieuwkuijk",
    image: "https://picsum.photos/200?random=1",
    status: "online",
    description: "Like to Profiel",
    account: "private",
  },
  {
    id: 2,
    name: "Naé",
    age: 31,
    location: "Roerlo",
    image: "https://picsum.photos/200?random=2",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 3,
    name: "Laura",
    age: 35,
    location: "Meppel",
    image: "https://picsum.photos/200?random=3",
    status: "offline",
    description: "Like to Profiel",
    account: "private",
  },
  {
    id: 4,
    name: "Daniella",
    age: 28,
    location: "Heerenveen",
    image: "https://picsum.photos/200?random=4",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 5,
    name: "Naé",
    age: 30,
    location: "Renklo",
    image: "https://picsum.photos/200?random=5",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 6,
    name: "Laura",
    age: 33,
    location: "Meppel",
    image: "https://picsum.photos/200?random=6",
    status: "offline",
    description: "Like to Profiel",
  },
  {
    id: 7,
    name: "Daniella",
    age: 32,
    location: "Nieuwkuijk",
    image: "https://picsum.photos/200?random=7",
    status: "online",
    description: "Like to Profiel",
    account: "plus",
  },
  {
    id: 8,
    name: "Naé",
    age: 31,
    location: "Roerlo",
    image: "https://picsum.photos/200?random=8",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 9,
    name: "Laura",
    age: 35,
    location: "Meppel",
    image: "https://picsum.photos/200?random=9",
    status: "offline",
    description: "Like to Profiel",
  },
  {
    id: 10,
    name: "Daniella",
    age: 28,
    location: "Heerenveen",
    image: "https://picsum.photos/200?random=10",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 11,
    name: "Naé",
    age: 30,
    location: "Renklo",
    image: "https://picsum.photos/200?random=11",
    status: "online",
    description: "Like to Profiel",
  },
  {
    id: 12,
    name: "Laura",
    age: 33,
    location: "Meppel",
    image: "https://picsum.photos/200?random=12",
    status: "offline",
    description: "Like to Profiel",
  },
];

export function SearchResults() {
  const [online, setOnline] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredResults = online
    ? searchResults.filter((profile) => profile.status === "online")
    : searchResults;

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <header className="bg-white px-6 pt-6 pb-4">
          <h1 className="text-[22px] sm:text-2xl lg:text-3xl xl:text-[36px] font-semibold">
            Search Profiles
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
              <Label className="text-sm mb-1">Online</Label>
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
              {filteredResults.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {filteredResults.map((profile) => (
                <ListCard key={profile.id} profile={profile} />
              ))}
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
