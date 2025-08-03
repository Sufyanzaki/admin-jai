"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePackages } from "@/app/(dashboard)/packages/_hooks/usePackages"
import { format } from "date-fns"
import Link from "next/link";

export function BestSelling() {
  const { packages, loading } = usePackages()

  if (loading || !packages) {
    return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4 flex-wrap rounded-lg border p-3">
                <div className="flex items-center space-x-4 w-full">
                  <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
          ))}
        </div>
    )
  }

  return (
      <div className="space-y-4">
        {packages.map((pkg) => (
            <div
                key={pkg.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-lg border p-3 transition-all hover:bg-accent"
            >
              <div className="flex items-center space-x-4 flex-1">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={pkg.image || "/placeholder.png"} alt={pkg.name} />
                  <AvatarFallback>{pkg.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="font-medium flex items-center gap-2">
                    {pkg.name}
                    {!pkg.isActive && (
                        <Badge variant="destructive" className="text-xs">
                          Inactive
                        </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">${pkg.price}</span>
                      <span>•</span>
                      <span>{pkg.validity} days validity</span>
                    </div>
                    {pkg.features && (
                        <div className="line-clamp-1 text-xs mt-1">
                          Features: {pkg.features}
                        </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">

                <Link href={`/packages/${pkg.id}/view`} className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
        ))}
      </div>
  )
}