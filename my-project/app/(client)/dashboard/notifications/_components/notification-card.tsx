"use client"

import ImageWrapper from "@/components/client/image-wrapper"
import { Button } from "@/components/client/ux/button"
import { Mail, ShieldCheck, Star } from "lucide-react"

interface NotificationCardProps {
    notification: {
        id: string
        type: "like" | "message" | "connection"
        from: {
            name: string
            age: number
            height: string
            languages: string[]
            religion: string
            profession: string
            image: string
            isVerified: boolean
            isOnline: boolean
            lastSeen?: string
        }
        message: string
        timestamp: string
        isStarred?: boolean
    }
}

export function NotificationCard({ notification }: NotificationCardProps) {
    const { from, message, timestamp, type, isStarred } = notification

    const handleAccept = () => console.log("Accepted connection from", from.name)
    const handleDecline = () => console.log("Declined connection from", from.name)
    const handleViewProfile = () => console.log("View profile of", from.name)
    const handleReport = () => console.log("Report profile of", from.name)

    return (
        <div className="w-full rounded-[5px] bg-white border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 px-4 py-3 gap-2">
                <h3 className="font-medium text-sm sm:text-base">
                    You received a {type} from {from.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{timestamp}</span>
                    {isStarred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                </div>
            </div>

            <div className="space-y-4 px-4 py-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-shrink-0 self-center sm:self-start">
                        <ImageWrapper
                            src={from.image || "/placeholder.svg"}
                            alt={from.name}
                            className="w-24 h-24 sm:w-32 md:w-40 sm:h-32 md:h-40 rounded-[5px] object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col justify-between sm:flex-row sm:justify-between">
                            <div className="space-y-2 sm:max-w-[70%]">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-lg sm:text-xl font-semibold">{from.name}</h4>
                                    {from.isVerified && <ShieldCheck className="w-4 h-4 text-app-blue" />}
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-xs text-green-600">
                    {from.isOnline ? "Online now" : `Online ${from.lastSeen || "1d"} ago`}
                  </span>
                                </div>

                                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                                    {from.age} Years, {from.height} | {from.languages.join(", ")},{" "}
                                    {from.religion} | {from.profession}
                                </p>

                                <div className="flex items-start gap-2">
                                    <Mail className="w-4 h-4 text-app-blue mt-0.5 flex-shrink-0" />
                                    <p className="text-sm leading-relaxed">{message}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                                    <Button
                                        onClick={handleViewProfile}
                                        variant="outline"
                                        size="sm"
                                        className="px-4 sm:px-6 w-full sm:w-auto"
                                    >
                                        View my Profile
                                    </Button>
                                    <Button
                                        onClick={handleReport}
                                        variant="outline"
                                        size="sm"
                                        className="px-4 sm:px-6 w-full sm:w-auto"
                                    >
                                        Report This Profile
                                    </Button>
                                </div>
                            </div>

                            <div className="sm:text-right space-y-2">
                                <p className="text-xs">She invited you to Connect</p>
                                <div className="flex gap-2 flex-wrap">
                                    <Button
                                        onClick={handleAccept}
                                        size="sm"
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 grow sm:grow-0"
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        onClick={handleDecline}
                                        size="sm"
                                        variant="outline"
                                        className="px-4 grow sm:grow-0"
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
