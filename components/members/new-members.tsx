"use client"

import {CalendarDays, Clock} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function NewMembers() {
  const userMatches = [
    {
      id: 1,
      user: {
        username: "amaad",
        name: "amaad kareem",
        gender: "Man",
        dob: "03-02-1994",
        age: 31,
        avatar: "/default-male.png", // Default avatar path
        initials: "AK",
      },
      matchDate: "2024-06-10", // Current date as example
      matchType: "Premium", // Could be "Premium", "Basic", "Compatibility" etc.
      status: "Active", // "Active", "Pending", "Expired" etc.
      lastActivity: "2 hours ago",
    },
    // Additional example users to match the original array's length
    {
      id: 2,
      user: {
        username: "sarah_j",
        name: "Sarah Johnson",
        gender: "Woman",
        dob: "15-08-1990",
        age: 33,
        avatar: "/default-female.png",
        initials: "SJ",
      },
      matchDate: "2024-06-08",
      matchType: "Compatibility",
      status: "Pending",
      lastActivity: "1 day ago",
    },
    {
      id: 3,
      user: {
        username: "mike_84",
        name: "Michael Brown",
        gender: "Man",
        dob: "22-11-1984",
        age: 39,
        avatar: "/default-male.png",
        initials: "MB",
      },
      matchDate: "2024-06-05",
      matchType: "Basic",
      status: "Active",
      lastActivity: "3 days ago",
    },
    {
      id: 4,
      user: {
        username: "lisa_r",
        name: "Lisa Roberts",
        gender: "Woman",
        dob: "30-05-1992",
        age: 32,
        avatar: "/default-female.png",
        initials: "LR",
      },
      matchDate: "2024-06-01",
      matchType: "Premium",
      status: "Expired",
      lastActivity: "1 week ago",
    },
    {
      id: 5,
      user: {
        username: "david_k",
        name: "David Kim",
        gender: "Man",
        dob: "14-09-1988",
        age: 35,
        avatar: "/default-male.png",
        initials: "DK",
      },
      matchDate: "2024-05-28",
      matchType: "Compatibility",
      status: "Active",
      lastActivity: "2 weeks ago",
    }
  ];

  return (
      <div className="space-y-4">
        {userMatches.map((match) => (
            <div
                key={match.id}
                className="flex items-center justify-between gap-4 flex-wrap rounded-lg border p-3 transition-all hover:bg-accent"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={match.user.avatar || "/user-2.png"} alt={match.user.name} />
                  <AvatarFallback>{match.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{match.user.name}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {match.user.age} yrs • {match.user.gender}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                    variant={match.status === "Active" ? "default" : "outline"}
                    className={
                      match.matchType === "Premium"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                          : match.matchType === "Compatibility"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : ""
                    }
                >
                  {match.matchType}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {match.lastActivity}
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </div>
        ))}
      </div>
  )
}
