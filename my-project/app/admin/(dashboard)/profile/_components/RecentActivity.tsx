import { Card, CardContent } from "@/components/admin/ui/card";
import { useTranslation } from "react-i18next";
import { Bell, FileText, Key, Lock, Shield, User } from "lucide-react";
import { useActivity } from "@/app/admin/(dashboard)/profile/_hooks/useActivity";
import Preloader from "@/components/shared/Preloader";
import { format } from "date-fns";
import { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    PASSWORD_CHANGED: Key,
    LOGIN_NEW_DEVICE: User,
    PROFILE_UPDATED: User,
    SECURITY_MODIFIED: Shield,
    DOCUMENT_DOWNLOADED: FileText,
    FAILED_LOGIN: Lock,
    ACCOUNT_RECOVERY: Key,
    DEVICE_REGISTERED: User,
    SECURITY_ALERT: Bell,
    BACKUP_COMPLETED: FileText,
    MEMEBER_REGISTERED: User,
};

const statusMap: Record<string, "success" | "warning" | "error" | "info"> = {
    PASSWORD_CHANGED: "success",
    LOGIN_NEW_DEVICE: "warning",
    PROFILE_UPDATED: "info",
    SECURITY_MODIFIED: "success",
    DOCUMENT_DOWNLOADED: "info",
    FAILED_LOGIN: "error",
    ACCOUNT_RECOVERY: "warning",
    DEVICE_REGISTERED: "info",
    SECURITY_ALERT: "error",
    BACKUP_COMPLETED: "success",
    MEMEBER_REGISTERED: "success",
};

export default function RecentActivity() {
    const { t } = useTranslation();

    const { data: activities, loading } = useActivity();

    if (loading) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader />
                <p className="text-sm">{t('Loading Activity')}</p>
            </div>
        );
    }

    if (!activities || activities.length === 0) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <p className="text-sm">{t('No recent activity found.')}</p>
            </div>
        );
    }

    return (
        <Card>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((item) => {
                        const Icon = iconMap[item.type] || Bell;
                        const status = statusMap[item.type] || "info";

                        return (
                            <div key={item.id} className="flex items-start gap-4">
                                <div
                                    className={`rounded-md p-2 ${status === "success"
                                            ? "bg-green-100 text-green-600"
                                            : status === "warning"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : status === "error"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm mb-2 font-medium">{item.type.replaceAll("_", " ")}</p>
                                        <span className="text-xs text-muted-foreground">
                                            {format(new Date(item.createdAt), "PPP p")}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{item.message}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
