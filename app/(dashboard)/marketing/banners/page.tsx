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
import {Search, MoreHorizontal, UserPlus, Loader2} from "lucide-react";
import PaginationSection from "@/components/Pagination";
import { useBanners } from "./_hooks/useBanners";
import { format } from "date-fns";
import { useDeleteBanner } from "./_hooks/useDeleteBanner";


export default function BannerListPage() {
    const { banners, bannersLoading, error } = useBanners();
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { deleteBannerById, isDeleting } = useDeleteBanner();

    // Filter banners based on search term
    const filteredBanners = banners?.filter(banner => 
        banner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.page.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Format date for display
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd-MM-yyyy');
        } catch {
            return 'Invalid Date';
        }
    };

    // Show loading state
    if (bannersLoading) {
        return (
            <div className="flex flex-col gap-6 p-4 xl:p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Loading banners...</span>
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
                        <p className="text-red-500 mb-2">Error loading banners</p>
                        <p className="text-sm text-muted-foreground">{error.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
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
                            <Input 
                                placeholder="Search banners" 
                                className="pl-8" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
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
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Page</TableHead>
                                <TableHead className="text-right">Option</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBanners.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-24 text-center">
                                        No banners found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredBanners.map((banner) => (
                                    <TableRow key={banner.id}>
                                        <TableCell>{banner.id}</TableCell>
                                        <TableCell>{banner.name}</TableCell>
                                        <TableCell>${banner.cpm.toFixed(2)}</TableCell>
                                        <TableCell>{formatDate(banner.startDate)}</TableCell>
                                        <TableCell>{formatDate(banner.endDate)}</TableCell>
                                        <TableCell>
                                            <Badge variant={banner.isActive ? "default" : "secondary"}>
                                                {banner.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{formatDate(banner.createdAt)}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{banner.page}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {isDeleting && deletingId === String(banner.id) ? (
                                                <div className="flex items-center justify-center h-10">
                                                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                                </div>
                                            ) : (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/marketing/banners/${banner.id}`}>View Details</Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/marketing/banners/${banner.id}/edit`}>Edit Banner</Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={async () => {
                                                                setDeletingId(String(banner.id));
                                                                await deleteBannerById(String(banner.id));
                                                                setDeletingId(null);
                                                            }}
                                                        >
                                                            Deactivate
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
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
