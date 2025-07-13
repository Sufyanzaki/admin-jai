"use client";

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
import {ArrowLeft, Loader2} from "lucide-react";
import React from "react";
import { useBannerDetails } from "../_hooks/useBannerDetails";
import { format } from "date-fns";
import { useParams } from "next/navigation";

export default function BannerInformationCard() {
    const params = useParams();
    const id = params.id as string;
    const { banner, bannerLoading, error } = useBannerDetails(id);

    // Format date for display
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd-MM-yyyy HH:mm');
        } catch {
            return 'Invalid Date';
        }
    };

    // Show loading state
    if (bannerLoading) {
        return (
            <div className="flex flex-col gap-6 p-4 xl:p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Loading banner details...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="flex flex-col gap-6 p-4 xl:p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-red-500 mb-2">Error loading banner details</p>
                        <p className="text-sm text-muted-foreground">{error.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Show not found state
    if (!banner) {
        return (
            <div className="flex flex-col gap-6 p-4 xl:p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-muted-foreground mb-2">Banner not found</p>
                        <Button asChild>
                            <Link href="/marketing/banners">Back to Banners</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/marketing/banners">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>

                <div className="space-y-2">
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
                        variant={banner.isActive ? "default" : "secondary"}
                        className={
                            banner.isActive
                                ? "bg-green-500 text-white"
                                : "bg-gray-500 text-white"
                        }
                    >
                        {banner.isActive ? "Active" : "Inactive"}
                    </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                    {[
                        { label: "Banner ID", value: banner.id },
                        { label: "Name", value: banner.name },
                        { label: "Link", value: <a href={banner.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">{banner.link}</a> },
                        { label: "CPM", value: `$${banner.cpm.toFixed(2)}` },
                        { label: "Start Date", value: formatDate(banner.startDate) },
                        { label: "End Date", value: formatDate(banner.endDate) },
                        { label: "Page Displayed", value: banner.page },
                        { label: "Created At", value: formatDate(banner.createdAt) },
                        { label: "Banner Image", value: <a href={banner.bannerImage} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">View Image</a> },
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
