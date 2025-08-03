import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Save, Search, Copy, ArrowLeft} from "lucide-react";
import type React from "react";
import PaginationSection from "@/components/Pagination";
import Link from "next/link";

export default function LanguageTranslatePage() {
    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/settings/languages">
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
                    <div className="flex items-center justify-between gap-2">
                        <CardTitle>Arabic</CardTitle>
                        <div className="relative mt-2">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Type Key" className="pl-8" />
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
                            ].map((row) => (
                                <TableRow key={row.id} className="odd:bg-muted/40">
                                    <TableCell className="text-center">{row.id}</TableCell>
                                    <TableCell className="max-w-md">{row.key}</TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            className="w-full border rounded-md px-3 py-2 text-right"
                                            defaultValue={row.value}
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
