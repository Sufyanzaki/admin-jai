"use client"

import React from "react"
import Link from "next/link";
import {Edit, Plus, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useBasicPages} from "@/app/(dashboard)/frontend-settings/_hooks/useBasicPages";
import {useDeleteBasicPage} from "@/app/(dashboard)/frontend-settings/_hooks/useDeleteBasicPage";
import Preloader from "@/components/ui/Preloader";

export default function SettingPage() {
    const { basicPages, isLoading, error } = useBasicPages();
    const { deletePageById, isDeleting } = useDeleteBasicPage();

    const handleDelete = async (id: number) => {
        await deletePageById(id);
    };

    if(isLoading){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader/>
                <p className="text-sm">Loading Pages</p>
            </div>
        )
    }

    const customPages = basicPages?.filter(page => page.type.toLowerCase() === 'custom') || [];
    const corePages = basicPages?.filter(page => page.type.toLowerCase() !== 'custom') || [];

    return (
        <div className="container space-y-6 p-4 xl:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Frontend Settings</h1>
                    <p className="text-muted-foreground">
                        Customize the appearance and user experience of your dating platform.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/frontend-settings/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Page
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Static Pages Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Core Website Pages</CardTitle>
                    <CardDescription>
                        These are the essential pages of your website that cannot be deleted.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Url</TableHead>
                                <TableHead className="w-[120px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {corePages.map((page, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium align-top">{page.Title}</TableCell>
                                    <TableCell className="align-top">{page.Url}</TableCell>
                                    <TableCell className="align-top capitalize">{page.pageType?.toLowerCase()}</TableCell>
                                    <TableCell className="text-right align-top">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                                <Link href={`/frontend-settings/edit?slug=${page.type}`}>
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Custom Pages</CardTitle>
                    <CardDescription>
                        Create, edit, and manage your additional website pages.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <div className="text-center py-10">
                            <p className="text-destructive">Error loading pages</p>
                        </div>
                    ) : customPages && customPages.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Url</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="w-[120px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customPages.map((page) => (
                                    <TableRow key={page.id}>
                                        <TableCell className="font-medium align-top">{page.Title}</TableCell>
                                        <TableCell className="align-top">{page.Url}</TableCell>
                                        <TableCell className="align-top capitalize">{page.pageType?.toLowerCase()}</TableCell>
                                        <TableCell className="text-right align-top">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                                    <Link href={`/frontend-settings/edit/${page.id}/basic`}>
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    disabled={isDeleting}
                                                    onClick={() => handleDelete(page.id)}
                                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">No custom pages found</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}