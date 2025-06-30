"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {ArrowLeft, Upload } from "lucide-react";
import {DateRangePicker} from "@/components/date-range-picker";
import Link from "next/link";

export default function BannerEditPage() {
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
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">Edit Banner</h2>
                    <p className="text-muted-foreground">Upload banner and define scheduling details</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Banner Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Name + Link */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter banner name" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="link">Link</Label>
                            <Input id="link" placeholder="https://example.com" />
                        </div>
                    </div>

                    {/* Date Range Picker + CPM */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Start / End Date</Label>
                            <DateRangePicker className="w-full [&>button]:w-full" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="cpm">CPM</Label>
                            <Input id="cpm" type="number" placeholder="Enter CPM" />
                        </div>
                    </div>

                    {/* Page Selection */}
                    <div className="grid gap-2">
                        <Label htmlFor="page">Select Page</Label>
                        <Select defaultValue="home">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Page" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="home">Home</SelectItem>
                                <SelectItem value="agenda">Agenda</SelectItem>
                                <SelectItem value="blog">Blog</SelectItem>
                                <SelectItem value="blog-details">Blog Details</SelectItem>
                                <SelectItem value="how-work">How Work</SelectItem>
                                <SelectItem value="registration">Registration</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    {/* Banner Image Upload */}
                    <div className="space-y-4">
                        <Label>Banner Image</Label>
                        <div className="flex items-center gap-4">
                            <div className="h-24 w-24 shrink-0 rounded-md bg-muted flex items-center justify-center">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <input type="file" id="banner-image" className="hidden" />
                                <Button
                                    variant="outline"
                                    onClick={() => document.getElementById("banner-image")?.click()}
                                >
                                    Upload Photo
                                </Button>
                                <p className="text-sm text-muted-foreground">
                                    Upload a banner image. JPG, PNG or GIF. Max 2MB.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button type="submit">Save Banner</Button>
                    </div>
                </CardContent>

            </Card>
        </div>
    );
}
