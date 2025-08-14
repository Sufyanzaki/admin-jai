"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table";
import {Button} from "@/components/admin/ui/button";
import {Input} from "@/components/admin/ui/input";
import {ArrowLeft, Search} from "lucide-react";
import type React from "react";
import Link from "next/link";
import {useTranslationDetails} from "@/app/admin/(dashboard)/settings/languages/[id]/_hooks/useTranslationDetails";
import {useParams} from "next/navigation";
import Preloader from "@/components/shared/Preloader";
import TranslationModal from "@/app/admin/(dashboard)/settings/languages/[id]/_components/translationModal";

export default function LanguageTranslatePage() {

    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';

    const { translation, translationLoading, error } = useTranslationDetails(id);

    if(translationLoading) return (
        <div className="flex items-center flex-col justify-center h-64">
            <Preloader/>
            <p className="text-sm">Loading...</p>
        </div>
    )

    if(error) return (
        <div className="text-red-500">Failed to load translations.</div>
    )

    console.log(translation)

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/settings/languages">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Manage Translations</h2>
                    <p className="text-muted-foreground">
                        Add and update translations for different languages to make the platform accessible to a wider audience.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <CardTitle>Arabic</CardTitle>

                        <div className="flex flex-wrap items-center gap-2">
                            <Button variant="secondary" size="sm">
                                Update
                            </Button>
                            <TranslationModal />
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Type Key" className="pl-8 w-40" />
                            </div>
                        </div>
                    </div>
                </CardHeader>


                <CardContent>
                    <Table className="whitespace-nowrap">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12 text-center">#</TableHead>
                                <TableHead>Key</TableHead>
                                <TableHead>Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { id: 1, key: "Congratulations", value: "تهنينا" },
                                {
                                    id: 2,
                                    key: "You have successfully completed the updating process. Please Login to continue",
                                    value: "لقد أكملت بنجاح عملية التحديث. يرجى تسجيل الدخول للمتابعة",
                                },
                                { id: 3, key: "Go to Home", value: "اذهب إلى الصفحة الرئيسية" },
                                { id: 4, key: "Login to Admin panel", value: "تسجيل الدخول إلى لوحة الإدارة" },
                                { id: 5, key: "I want to Hire", value: "أريد أن أوظف" },
                                { id: 6, key: "Welcome", value: "مرحبا" },
                                { id: 7, key: "Dashboard", value: "لوحة التحكم" },
                                { id: 8, key: "Profile", value: "الملف الشخصي" },
                            ].map((row, index) => (
                                <TableRow key={row.key} className="odd:bg-muted/40">
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell className="max-w-md">{row.key}</TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            className="w-full border rounded-md px-3 py-2 text-right"
                                            defaultValue={row.text}
                                            dir="rtl"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/*<PaginationSection />*/}
                </CardContent>
            </Card>
        </div>
    );
}
