"use client"

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import useFaqCategories from "./_hooks/useFaqCategories";
import CategoryModal from "./_components/category-modal";
import useFaqCategoryDelete from "./_hooks/useFaqCategoryDelete";
import { useRouter, useSearchParams } from "next/navigation";
import Preloader from "@/components/shared/Preloader";
import {useSession} from "next-auth/react";

export default function CategoryPage() {
    const { t } = useTranslation();

    const { data: session } = useSession();

    const [open, setOpen] = useState(false);
    const { data: categories, isLoading } = useFaqCategories();
    const { deleteCategory, isLoading: isDeleting } = useFaqCategoryDelete();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        await deleteCategory(id);
        setDeletingId(null);
    };

    const handleEdit = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("edit", String(id));
        router.replace(`?${params.toString()}`);
        setOpen(true);
    };

    const handleModalClose = (value: boolean) => {
        setOpen(value);
        if (!value) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("edit");
            router.replace(`?${params.toString()}`);
        }
    };

    let permissions;
    if (session?.user.permissions) {
        permissions = session.user.permissions.find(permission => permission.module === "faqs_category");
    }

    // Permission flags
    const canCreate = permissions?.canCreate ?? true;
    const canEdit = permissions?.canEdit ?? true;
    const canDelete = permissions?.canDelete ?? true;

    return (
        <div className="container py-6 space-y-6 p-4 xl:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/faq">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">{t("Back")}</span>
                        </Link>
                    </Button>

                    <div className="flex flex-col space-y-2">
                        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{t('Manage Categories')}</h1>
                        <p className="text-muted-foreground">
                            {t('Create and manage categories for organizing your FAQ content')}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="secondary">
                        <Link href="/admin/faq">{t('Back')}</Link>
                    </Button>
                    <Button onClick={() => setOpen(true)} disabled={!canCreate}>
                        <Plus className="mr-2 h-4 w-4" />
                        {t('Add New')}
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('Categories')}</CardTitle>
                    <CardDescription>
                        {t('Organize and manage user profile categories such as religion, caste, profession, and lifestyle preferences.')}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center flex-col justify-center h-64">
                            <Preloader/>
                            <p className="text-sm">{t('Loading...')}</p>
                        </div>
                    ) : categories && categories.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">{t('ID')}</TableHead>
                                    <TableHead>{t('Name')}</TableHead>
                                    <TableHead className="w-[120px] text-right">{t('Actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium align-top">{category.id}</TableCell>
                                        <TableCell className="align-top">{category.name}</TableCell>
                                        <TableCell className="text-right align-top">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => canEdit && handleEdit(category.id)}
                                                    disabled={!canEdit}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">{t('Edit FAQ')}</span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                                    onClick={() => canDelete && handleDelete(category.id)}
                                                    disabled={isDeleting && deletingId === category.id || !canDelete}
                                                >
                                                    {isDeleting && deletingId === category.id ? (
                                                        <Preloader size="sm"/>
                                                    ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                    )}
                                                    <span className="sr-only">{t('Delete FAQ')}</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">{t('No Categories found matching your search')}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            <CategoryModal isOpen={open} onClose={handleModalClose} canCreate={canCreate} canEdit={canEdit} />
        </div>
    );
}
