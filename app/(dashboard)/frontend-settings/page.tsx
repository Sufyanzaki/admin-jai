"use client"

import React from "react"
import Link from "next/link";
import {Edit, Plus, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const settings = [
    {
        id: "1",
        category: "Home",
        slug: "home",
        url: "https://ticketprijs.nl"
    },
    {
        id: "2",
        category: "Contact",
        slug: "contact",
        url: "https://ticketprijs.nl/contact"
    },
    {
        id: "3",
        category: "How Work",
        slug: "how-work",
        url: "https://ticketprijs.nl/how-work"
    },
    {
        id: "4",
        category: "Registration",
        slug: "registration",
        url: "https://ticketprijs.nl/profile-create"
    },
    {
        id: "5",
        category: "Term and conditions",
        slug: "terms-and-conditions",
        url: "https://ticketprijs.nl/terms"
    },
    {
        id: "6",
        category: "Veelgestelde Vragen",
        slug: "veelgestelde-vragen",
        url: "https://ticketprijs.nl/veelgestelde-vragen"
    },
    {
        id: "7",
        category: "Agenda",
        slug: "agenda",
        url: "https://ticketprijs.nl/agenda"
    }
];

export default function SettingPage() {
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

            <Card>
                <CardHeader>
                    <CardTitle>Website Pages</CardTitle>
                    <CardDescription>
                        Create, edit, and manage the content of your website pages with ease.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {settings.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Url</TableHead>
                                    <TableHead className="w-[120px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {settings.map((setting) => (
                                    <TableRow key={setting.id}>
                                        <TableCell className="font-medium align-top">{setting.category}</TableCell>
                                        <TableCell className="align-top">{setting.url}</TableCell>
                                        <TableCell className="text-right align-top">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8">
                                                    <Link href={`/frontend-settings/edit/${setting.slug}`} as={`/frontend-settings/edit/${setting.id}?slug=${setting.slug}`}>
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit FAQ</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete FAQ</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">No FAQs found matching your search</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
