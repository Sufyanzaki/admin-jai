import {Card, CardContent} from "@/components/admin/ui/card";
import {Bell, FileText, Key, Lock, Shield, User} from "lucide-react";
import {useActivity} from "@/app/admin/(dashboard)/profile/_hooks/useActivity";
import Preloader from "@/components/shared/Preloader";

export default function RecentActivity(){

    const { data, loading } = useActivity();

    if(loading){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader/>
                <p className="text-sm">Loading Activity</p>
            </div>
        )
    }

    if(!data){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <p className="text-sm">No recent activity found.</p>
            </div>
        )
    }

    return (
        <Card>
            <CardContent>
                <div className="space-y-4">
                    {[
                        { action: "Password changed", date: "March 15, 2024 10:30 AM", icon: Key, description: "Changed from web browser (Chrome)", status: "success" },
                        { action: "Login from new device", date: "March 14, 2024 3:45 PM", icon: User, description: "MacBook Pro - New York, USA", status: "warning" },
                        { action: "Profile updated", date: "March 13, 2024 2:15 PM", icon: User, description: "Updated contact information", status: "info" },
                        { action: "Security settings-c modified", date: "March 12, 2024 11:20 AM", icon: Shield, description: "Enabled 2FA authentication", status: "success" },
                        { action: "Document downloaded", date: "March 11, 2024 9:15 AM", icon: FileText, description: "Downloaded annual report", status: "info" },
                        { action: "Failed login attempt", date: "March 10, 2024 8:20 PM", icon: Lock, description: "Invalid credentials from unknown IP", status: "error" },
                        { action: "Account recovery initiated", date: "March 9, 2024 4:15 PM", icon: Key, description: "Password reset requested", status: "warning" },
                        { action: "New device registered", date: "March 8, 2024 1:30 PM", icon: User, description: "iPhone 13 - New York, USA", status: "info" },
                        { action: "Security alert", date: "March 7, 2024 10:45 AM", icon: Bell, description: "Suspicious activity detected", status: "error" },
                        { action: "Backup completed", date: "March 6, 2024 9:00 AM", icon: FileText, description: "System backup successful", status: "success" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className={`rounded-md p-2 ${
                                item.status === "success" ? "bg-green-100 text-green-600" :
                                    item.status === "warning" ? "bg-yellow-100 text-yellow-600" :
                                        item.status === "error" ? "bg-red-100 text-red-600" :
                                            "bg-muted"
                            }`}>
                                <item.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm mb-2 font-medium">{item.action}</p>
                                    <span className="text-xs text-muted-foreground">{item.date}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}