"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Search, MoreHorizontal, UserPlus} from "lucide-react";
import PaginationSection from "@/components/Pagination";

// Sample banner data
const bannerData = [
    {
        id: 1,
        name: "admin",
        cpm: "21.00",
        startDate: "30-11--0001",
        endDate: "30-11--0001",
        views: 0,
        viewsLeft: 21,
        page: "Registration",
    },
    {
        id: 2,
        name: "Test",
        cpm: "5000.00",
        startDate: "07-04-2025",
        endDate: "18-04-2025",
        views: 2,
        viewsLeft: 4998,
        page: "Blog",
    },
    {
        id: 3,
        name: "Test Banner",
        cpm: "122.00",
        startDate: "07-04-2025",
        endDate: "17-04-2025",
        views: 2,
        viewsLeft: 120,
        page: "Blog Details",
    },
    {
        id: 4,
        name: "banner2",
        cpm: "23.00",
        startDate: "07-04-2025",
        endDate: "25-04-2025",
        views: 2,
        viewsLeft: 21,
        page: "Agenda",
    },
    {
        id: 5,
        name: "Home",
        cpm: "119.00",
        startDate: "07-04-2025",
        endDate: "18-04-2025",
        views: 10,
        viewsLeft: 109,
        page: "Home",
    },
    {
        id: 6,
        name: "test12",
        cpm: "21.00",
        startDate: "07-04-2025",
        endDate: "30-04-2025",
        views: 2,
        viewsLeft: 19,
        page: "How Work",
    },
    {
        id: 7,
        name: "home banner",
        cpm: "200.00",
        startDate: "21-03-2025",
        endDate: "25-03-2025",
        views: 0,
        viewsLeft: 200,
        page: "Home",
    },
];

export default function BannerListPage() {
    const [filteredData] = useState(bannerData);

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            {/* Page Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Manage Banners</h2>
                    <p className="text-muted-foreground">View, edit, and track your active banners</p>
                </div>
                <div className="flex items-center flex-wrap gap-2">
                    <Button asChild className="w-full sm:w-fit">
                        <Link href="/marketing/banners/add">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add New
                        </Link>
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle>All Banners</CardTitle>
                        <div className="relative mt-2 sm:mt-0">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search banners" className="pl-8" />
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <Table className="whitespace-nowrap">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>CPM</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Views</TableHead>
                                <TableHead>Views Left</TableHead>
                                <TableHead>Page</TableHead>
                                <TableHead className="text-right">Option</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-24 text-center">
                                        No banners found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((banner) => (
                                    <TableRow key={banner.id}>
                                        <TableCell>{banner.id}</TableCell>
                                        <TableCell>{banner.name}</TableCell>
                                        <TableCell>{banner.cpm}</TableCell>
                                        <TableCell>{banner.startDate}</TableCell>
                                        <TableCell>{banner.endDate}</TableCell>
                                        <TableCell>{banner.views}</TableCell>
                                        <TableCell>{banner.viewsLeft}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{banner.page}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/marketing/banners/1`}>View Details</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/marketing/banners/1/edit`}>Edit Banner</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>Deactivate</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <PaginationSection />
        </div>
    );
}
