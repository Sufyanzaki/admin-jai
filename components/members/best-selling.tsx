"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function BestSelling() {
  const packages = [
    {
      id: 1,
      name: "Silver",
      avatar: "/placeholder-silver.png",
      initials: "S",
      rating: 4.5,
      sold: 2,
    },
  ]

  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
          <div
              key={pkg.id}
              className="flex items-center justify-between gap-4 flex-wrap rounded-lg border p-3 transition-all hover:bg-accent"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={pkg.avatar || "/placeholder.png"} alt={pkg.name} />
                <AvatarFallback>{pkg.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{pkg.name}</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  {/* Star rating display */}
                  {[...Array(5)].map((_, i) => {
                    const isHalf = pkg.rating === i + 0.5;
                    return (
                        <span key={i}>
                  {pkg.rating >= i + 1 ? "⭐" : isHalf ? "⭐" : "☆"}
                </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="font-semibold text-lg flex items-center gap-1">
                🛒 {pkg.sold}
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </div>
          </div>
      ))}
    </div>
  )
}
