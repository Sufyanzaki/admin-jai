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

const newsletterData = [
    { id: 1, subject: "Test", content: "test" },
    { id: 2, subject: "test", content: "for testing" },
    {
        id: 3,
        subject: "hoi",
        content:
            "Op aanvraag boeken\nBoeking onderworpen aan bevestiging van de registratie van deze ruimte op ons platform en de beschikbaarheid ervan. U ontvangt binnen 48 uur na uw verzoek een antwoord.",
    },
];

export default function NewsletterListPage() {
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
                            {newsletterData.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell>{item.subject}</TableCell>
                                    <TableCell className="whitespace-pre-line">{item.content}</TableCell>
                                    <TableCell className="text-right">
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
                                                    <Link href={`/marketing/newsletter/1`} className="flex items-center gap-2">
                                                        <Eye className="w-4 h-4" />
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <PaginationSection extraClasses="w-full justfy-between" />
        </div>
    );
}
