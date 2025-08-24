"use client"

import React from "react";
import { useTranslation } from "react-i18next";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table";
import {Button} from "@/components/admin/ui/button";
import {Input} from "@/components/admin/ui/input";
import {Eye, MoreVertical, Plus, Search, Trash2} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu";
import Link from "next/link";
import useNewsletters from "./_hooks/useNewsletters";
import useDeleteNewsletter from "./_hooks/useDeleteNewsletter";
import {unescapeHtml} from "@/lib/utils";
import Preloader from "@/components/shared/Preloader";
import {useSession} from "next-auth/react";

export default function NewsletterListPage() {
    const { t } = useTranslation();

    const { data: session } = useSession();

    const { data: newsletters, isLoading, error } = useNewsletters();
    const { deleteNewsletterById, isLoading: isDeleting } = useDeleteNewsletter();
    const [deletingId, setDeletingId] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        await deleteNewsletterById(id);
        setDeletingId(null);
    };

    let permissions;
    if (session?.user.permissions) {
        permissions = session.user.permissions.find(permission => permission.module === "newsletter");
    }

    const canCreate = permissions?.canCreate ?? true;
    const canEdit = permissions?.canEdit ?? true;
    const canDelete = permissions?.canDelete ?? true;

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            {/* Page Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">{t('Newsletter List')}</h2>
                    <p className="text-muted-foreground">{t('View and manage newsletters')}</p>
                </div>
                {canCreate && (
                    <Button className="gap-2" asChild={true}>
                        <Link href="/admin/marketing/newsletter/add">
                            <Plus className="w-4 h-4" />
                            {t('Add Newsletter')}
                        </Link>
                    </Button>
                )}
            </div>

            {/* Card Section */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle>{t('All Newsletters')}</CardTitle>
                        <div className="relative mt-2 sm:mt-0">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t('Search subject')} className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center flex-col justify-center h-64">
                            <Preloader />
                            <p className="text-sm">{t('Loading Newsletter')}</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-500">
                            <p>{t('Error loading newsletters')}</p>
                        </div>
                    ) : newsletters && newsletters.length > 0 ? (
                        <Table className="whitespace-nowrap">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12 text-center">#</TableHead>
                                    <TableHead>{t('Subject')}</TableHead>
                                    <TableHead>{t('Content')}</TableHead>
                                    {(canEdit || canDelete) && (
                                        <TableHead className="text-right">{t('Option')}</TableHead>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {newsletters
                                    .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="text-center">{index + 1}</TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell className="whitespace-pre-line"><div dangerouslySetInnerHTML={{__html: unescapeHtml(item.content)}} /></TableCell>
                                            {(canEdit || canDelete) && (
                                                <TableCell className="text-right">
                                                    {isDeleting && deletingId === item.id ? (
                                                        <div className="flex justify-end h-full">
                                                            <Preloader size="sm" />
                                                        </div>
                                                    ) : (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreVertical className="w-4 h-4" />
                                                                    <span className="sr-only">{t('Open actions')}</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="flex items-center gap-2">
                                                                    <Link href={`/admin/marketing/newsletter/${item.id}`} className="flex items-center gap-2">
                                                                        <Eye className="w-4 h-4" />
                                                                        {t('View')}
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                {canDelete && (
                                                                    <DropdownMenuItem
                                                                        className="flex items-center gap-2 text-red-500 focus:text-red-600"
                                                                        onClick={() => handleDelete(item.id)}
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                        {t('Delete')}
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    )}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">{t('No newsletters found')}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            {/*<PaginationSection extraClasses="w-full justfy-between" />*/}
        </div>
    );
}