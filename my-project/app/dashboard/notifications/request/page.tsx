import {NotificationCard} from "@/app/dashboard/notifications/_components/notification-card";

const sampleNotification = {
    id: "1",
    type: "like" as const,
    from: {
        name: "Dora M",
        age: 39,
        height: "5.5",
        languages: ["Hindi"],
        religion: "Hindu",
        profession: "Finance Professional",
        image: "https://picsum.photos/seed/dora/200",
        isVerified: true,
        isOnline: true,
        lastSeen: "1d ago",
    },
    message: "Hi, it is nice connecting with you. I liked your profile and would like to take this forward.",
    timestamp: "Dec 30, 04:22 PM",
    isStarred: true,
}

export default function RequestPage() {
    return (
        <div className="space-y-8">
            <NotificationCard notification={sampleNotification} />
            <NotificationCard notification={sampleNotification} />
        </div>
    )
}