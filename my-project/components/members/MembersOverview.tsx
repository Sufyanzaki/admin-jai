"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { MemberStats } from "@/app/(dashboard)/members/_types/member";

interface MembersOverviewProps {
  stats?: MemberStats;
  totalMembers: number;
}

export default function MembersOverview({ stats, totalMembers }: MembersOverviewProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="pb-2 flex !flex-row items-center justify-between">
          <CardTitle className="text-base">Overview</CardTitle>
          <Users className="size-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{stats?.total || totalMembers}</span>
              <span className="text-xs text-muted-foreground">Total Members</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Active</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {stats?.active || 0}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {stats?.percentages?.active || "0%"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Inactive</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {stats?.inactive || 0}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {stats?.percentages?.inactive || "0%"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Premium</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {stats?.premium || 0}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {stats?.percentages?.premium || "0%"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/members/add">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Member
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 