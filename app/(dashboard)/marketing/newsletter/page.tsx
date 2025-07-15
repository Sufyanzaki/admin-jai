"use client"

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Plus, Search, Eye, Trash2, MoreVertical, Copy, Save} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import PaginationSection from "@/components/Pagination";
import Link from "next/link";
import useNewsletters from "./_hooks/useNewsletters";
import useDeleteNewsletter from "./_hooks/useDeleteNewsletter";
import { unescapeHtml } from "@/lib/utils";

export default function NewsletterListPage() {
    const { data: newsletters, isLoading, error } = useNewsletters();
    const { deleteNewsletterById, isLoading: isDeleting, error: deleteError } = useDeleteNewsletter();
    const [deletingId, setDeletingId] = React.useState<number | null>(null);

    const handleDelete = async (id: number) => {
        setDeletingId(id);
        await deleteNewsletterById(id);
        setDeletingId(null);
    };

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            {/* Page Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Newsletter List</h2>
                    <p className="text-muted-foreground">View and manage newsletters</p>
                </div>
                <Button className="gap-2" asChild={true}>
                    <Link href="/marketing/newsletter/add">
                        <Plus className="w-4 h-4" />
                        Add Newsletter
                    </Link>
                </Button>
            </div>

            {/* Card Section */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle>All Newsletters</CardTitle>
                        <div className="relative mt-2 sm:mt-0">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search subject" className="pl-8" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">Loading...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-500">
                            <p>Error loading newsletters</p>
                        </div>
                    ) : newsletters && newsletters.length > 0 ? (
                        <Table className="whitespace-nowrap">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12 text-center">#</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Content</TableHead>
                                    <TableHead className="text-right">Option</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {newsletters.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell className="whitespace-pre-line"><div dangerouslySetInnerHTML={{__html: unescapeHtml(item.content)}} /></TableCell>
                                        <TableCell className="text-right">
                                            {isDeleting && deletingId === item.id ? (
                                                <div className="flex justify-center items-center h-full">
                                                    <svg className="animate-spin h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </div>
                                            ) : (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="w-4 h-4" />
                                                            <span className="sr-only">Open actions</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="flex items-center gap-2">
                                                            <Link href={`/marketing/newsletter/${item.id}`} className="flex items-center gap-2">
                                                                <Eye className="w-4 h-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:text-red-600" onClick={() => handleDelete(item.id)} disabled={isDeleting && deletingId === item.id}>
                                                            {isDeleting && deletingId === item.id ? (
                                                                <svg className="animate-spin h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                            ) : (
                                                                <Trash2 className="w-4 h-4" />
                                                            )}
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">No newsletters found</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            <PaginationSection extraClasses="w-full justfy-between" />
        </div>
    );
}
