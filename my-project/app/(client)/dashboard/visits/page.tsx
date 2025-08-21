"use client";
import { Button } from "@/components/client/ux/button";
import { Label } from "@/components/client/ux/label";
import { Switch } from "@/components/client/ux/switch";
import { Grid3X3, List } from "lucide-react";
import { useState } from "react";
import ListCard from "@/app/(client)/dashboard/_components/list-card";
import ProfileCard from "@/app/(client)/dashboard/_components/profile-card";
import { LikeStatus, useLikesReceived } from "../notifications/_hooks/useLikesReceived";

export default function MatchesPage() {
    const [online, setOnline] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const { likesReceived, likesReceivedLoading } = useLikesReceived(
        LikeStatus.PENDING
    );
    if (likesReceivedLoading) {
        return <p>Loading...</p>;
    }

    const filteredResults = online
        ? likesReceived?.filter(profile => profile.sender?.isOnline)
        : likesReceived;

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 flex flex-col">
                <header className="bg-white px-6 pt-6 pb-4">
                    <h1 className="text-[22px] sm:text-2xl lg:text-3xl xl:text-[36px] font-semibold">
                        Who visited me?
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
                            {filteredResults?.map((profile) => (
                                <ProfileCard key={profile.id} profile={profile?.sender} />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4 mb-8">
                            {filteredResults?.map((profile) => (
                                <ListCard key={profile.id} profile={profile?.sender} />
                            ))}
                        </div>
                    )}

                    <div className="flex justify-center items-center gap-2">
                        {/* <PaginationSection
              pagination={{
                page: matches?.page,
                limit: matches?.limit,
                total: matches?.total,
                totalPages: matches?.totalPages,
              }}
              onPageChange={(newPage) => {
                console.log("Go to page:", newPage);
              }}
            /> */}
                    </div>
                </main>
            </div>
        </div>
    );
}
