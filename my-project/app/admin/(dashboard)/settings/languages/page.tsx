"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table"
import { Button } from "@/components/admin/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/admin/ui/dropdown-menu"
import Link from "next/link"
import { useTranslation } from "react-i18next";
import { useLanguages } from "../_hooks/useLanguages";
import AddLanguageForm from "./_components/addLanguageForm"
import { usePatchLanguageStatus } from "./_hooks/usePatchLanguageStatus";
import Preloader from "@/components/shared/Preloader"
import { useSession } from "next-auth/react";

export default function LanguagesManagementPage() {
    const { t, i18n } = useTranslation();
    const { languages, languagesLoading, error } = useLanguages();
    const { mutate: patchStatus, patchingId } = usePatchLanguageStatus();
    const { data: session } = useSession();

    let permissions;
    if (session?.user.permissions) {
        permissions = session.user.permissions.find(
            (permission) => permission.module === "languages"
        );
    }

    const canCreate = permissions?.canCreate ?? true;
    const canEdit = permissions?.canEdit ?? true;
    const canDelete = permissions?.canDelete ?? true;

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div>
                <h2 className="text-2xl font-bold">{t("Languages Management")}</h2>
                <p className="text-sm text-muted-foreground">
                    {t("Manage available languages for your application")}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t("All Languages")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {languagesLoading ? (
                            <div className="flex items-center flex-col justify-center h-64">
                                <Preloader />
                                <p className="text-sm">{t("Loading Languages")}</p>
                            </div>
                        ) : error ? (
                            <div className="text-red-500">{t("Failed to load languages.")}</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">{t("Name")}</TableHead>
                                        <TableHead>{t("Code")}</TableHead>
                                        <TableHead>{t("Status")}</TableHead>
                                        <TableHead className="text-right">{t("Actions")}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {languages && languages.length > 0 ? (
                                        languages.map((language) => (
                                            <TableRow key={language.code}>
                                                <TableCell className="flex items-center gap-3 font-medium">
                                                    {t(language.name)}
                                                </TableCell>
                                                <TableCell className="uppercase">
                                                    {t(language.code)}
                                                </TableCell>
                                                <TableCell>
                          <span
                              className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
                                  language.isActive
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {language.isActive ? t("Active") : t("Inactive")}
                          </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {patchingId === language.id ? (
                                                        <div className="flex items-center justify-end">
                                                            <Preloader size="sm" />
                                                        </div>
                                                    ) : (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    className="h-8 w-8 p-0"
                                                                >
                                                                    <span className="sr-only">{t("Open menu")}</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                {canEdit && (
                                                                    <DropdownMenuItem>
                                                                        <Link
                                                                            href={`/admin/settings/languages/${language.code}`}
                                                                        >
                                                                            {t("Translate Language")}
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {canDelete && (
                                                                    <DropdownMenuItem
                                                                        className="text-red-600"
                                                                        onClick={() =>
                                                                            patchStatus(
                                                                                language.id,
                                                                                !language.isActive
                                                                            )
                                                                        }
                                                                        disabled={!!patchingId}
                                                                    >
                                                                        {language.isActive
                                                                            ? t("Deactivate")
                                                                            : t("Activate")}
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">
                                                {t("No languages found.")}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {canCreate && <AddLanguageForm />}
            </div>
        </div>
    );
}
