import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import React from "react";

export default function BannerInformationCard() {
    const banner = {
        id: 3,
        name: "Test Banner",
        link: "https://example.com",
        cpm: 122.0,
        page: "Blog Details",
        startDate: "07-04-2025",
        endDate: "17-04-2025",
        views: 2,
        viewsLeft: 120,
        status: "Active",
    };

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/marketing/banners">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>

                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">View Banner</h2>
                    <p className="text-muted-foreground">Upload banner and define scheduling details</p>
                </div>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Banner Information</CardTitle>
                        <CardDescription>Details about this banner</CardDescription>
                    </div>
                    <Badge
                        variant={banner.status === "Active" ? "default" : "secondary"}
                        className={
                            banner.status === "Active"
                                ? "bg-green-500 text-white"
                                : "bg-gray-500 text-white"
                        }
                    >
                        {banner.status}
                    </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                    {[
                        { label: "Banner ID", value: banner.id },
                        { label: "Name", value: banner.name },
                        { label: "Link", value: <span className="text-blue-600 underline">{banner.link}</span> },
                        { label: "CPM", value: `$${banner.cpm.toFixed(2)}` },
                        { label: "Start Date", value: banner.startDate },
                        { label: "End Date", value: banner.endDate },
                        { label: "Page Displayed", value: banner.page },
                        { label: "Views Count", value: banner.views },
                        { label: "Views Left", value: banner.viewsLeft },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3"
                        >
                            <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                            <p className="font-medium mt-1 sm:mt-0 text-right">{item.value}</p>
                        </div>
                    ))}
                </CardContent>


            </Card>
        </div>
    );
}
