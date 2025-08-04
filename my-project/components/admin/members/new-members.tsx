"use client"

import { CalendarDays, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserDto } from "@/app/(dashboard)/profile/_types/profile-types"
import { format } from "date-fns"
import Link from "next/link"

export function NewMembers({ users }: { users: UserDto[] }) {
  return (
      <div className="space-y-4">
        {users.map((user) => (
            <div
                key={user.id}
                className="flex items-center justify-between gap-4 flex-wrap rounded-lg border p-3 transition-all hover:bg-accent"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.image || "/user-2.png"} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback>
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {user.age} yrs • {user.gender}
                  </div>
                  {user.shortDescription && (
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {user.shortDescription}
                      </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                    variant={user.isActive ? "default" : "outline"}
                    className={
                      user.isActive
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                    }
                >
                  {user.isActive ? "Active" : "InActive"}
                </Badge>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {format(new Date(user.createdAt), "MMM d, yyyy")}
                </div>
                <Link href={`/members/${user.id}`}>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </Link>
              </div>
            </div>
        ))}
      </div>
  )
}