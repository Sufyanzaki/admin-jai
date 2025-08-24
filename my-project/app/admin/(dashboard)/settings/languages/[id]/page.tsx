"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table";
import {Button} from "@/components/admin/ui/button";
import {Input} from "@/components/admin/ui/input";
import {ArrowLeft, Save, Search} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {useTranslationDetails} from "@/app/admin/(dashboard)/settings/languages/[id]/_hooks/useTranslationDetails";
import {useParams} from "next/navigation";
import Preloader from "@/components/shared/Preloader";
import TranslationModal from "@/app/admin/(dashboard)/settings/languages/[id]/_components/translationModal";
import {Checkbox} from "@/components/admin/ui/checkbox";
import useEditTranslation from "@/app/admin/(dashboard)/settings/languages/[id]/_hooks/useEditTranslation";
import PaginationSection from "@/components/admin/Pagination";

export default function LanguageTranslatePage() {
    const { t } = useTranslation();
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1); // Reset to first page when searching
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { response, responseLoading, error } = useTranslationDetails(id, page, debouncedSearch);

    const {
        selectedRows,
        toggleRowSelection,
        toggleSelectAll,
        handleValueChange,
        updateTranslations,
        isUpdating,
    } = useEditTranslation();

    if(error) return (
        <div className="text-red-500">{t("Failed to load translations.")}</div>
    )

    const translations = response?.translations?.translations ?? {};
    const tableData = Object.entries(translations).map(([key, value], index) => ({
        id: index + 1,
        key,
        value,
    }));

    const allKeys = tableData.map(row => row.key);
    const allSelected = allKeys.length > 0 && allKeys.every(key => selectedRows[key]);

    const pagination = response?.translations?.pagination ?? {
        total: tableData.length,
        page,
        limit: 10,
        totalPages: Math.ceil(tableData.length / 10),
    };

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/settings/languages">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">{t("Back")}</span>
                    </Link>
                </Button>
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">{t("Manage Translations")}</h2>
                    <p className="text-muted-foreground">
                        {t("Add and update translations for different languages to make the platform accessible to a wider audience.")}
                    </p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <CardTitle>{response?.translations?.language ? t(response.translations.language) : t('Language')}</CardTitle>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={updateTranslations}
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <>
                                        <Preloader />
                                        {t("Updating...")}
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-1" />
                                        {t("Update")}
                                    </>
                                )}
                            </Button>
                            <TranslationModal />
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={t("Search translations...")}
                                    className="pl-8 w-40"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                {responseLoading ? <div className="flex items-center flex-col justify-center h-64">
                    <Preloader/>
                    <p className="text-sm">{t("Loading...")}</p>
                </div> : <CardContent>
                    <Table className="whitespace-nowrap">
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Checkbox
                                        checked={allSelected}
                                        onCheckedChange={() => toggleSelectAll(allKeys, !allSelected)}
                                    />
                                </TableHead>
                                <TableHead className="w-12 text-center">#</TableHead>
                                <TableHead>{t("Key")}</TableHead>
                                <TableHead>{t("Value")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tableData.length > 0 ? (
                                tableData.map((row, index) => (
                                    <TableRow key={row.key} className="odd:bg-muted/40">
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedRows[row.key] || false}
                                                onCheckedChange={() => toggleRowSelection(row.key)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="max-w-md">{row.key}</TableCell>
                                        <TableCell>
                                            <Input
                                                type="text"
                                                className="w-full text-center"
                                                defaultValue={row.value as string}
                                                onChange={(e) => handleValueChange(row.key, e.target.value)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8">
                                        {debouncedSearch ? t('No translations found matching your search.') : t('No translations available.')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <PaginationSection
                        pagination={{ ...pagination, page }}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </CardContent>}
            </Card>
        </div>
    );
}