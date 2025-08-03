"use client";

import { useState, startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Card, CardHeader, CardTitle, CardDescription, CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, Settings2, Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import Preloader from "@/components/ui/Preloader";
import { useCurrencies } from "../_hooks/useCurrencies";
import { useDeleteCurrency } from "../_hooks/useDeleteCurrency";
import CurrencyModal from "@/app/(dashboard)/settings/other-settings/_components/currency-modal";
import CurrencyEditModal from "@/app/(dashboard)/settings/other-settings/_components/currency-edit-modal";
import FormatForm from "@/app/(dashboard)/settings/other-settings/_components/format-form";

export default function CurrencyTable() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { currencies, loading, error } = useCurrencies();
    const { isItemDeleting, deleteMemberById, isDeleting } = useDeleteCurrency();

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openFormatDialog, setOpenFormatDialog] = useState(false);

    const [editDialog, setEditDialog] = useState<{ isOpen: boolean; id?: string }>({
        isOpen: false,
        id: undefined,
    });

    if (loading) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader />
                <p className="text-sm">Currency Info</p>
            </div>
        );
    }

    if (error) {
        return <div className="p-6 text-red-500">Failed to load currencies.</div>;
    }

    const handleEdit = (id: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("edit", id);
            router.replace(`?${params.toString()}`);
        });
        setEditDialog({ isOpen: true, id });
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                                <Settings className="h-5 w-5" />
                                Currency Configuration
                            </CardTitle>
                            <CardDescription>Manage your system settings and appearance</CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" onClick={() => setOpenFormatDialog(true)} className="w-full sm:w-auto">
                                <Settings2 className="mr-2 h-4 w-4" />
                                Set Format
                            </Button>
                            <Button onClick={() => setOpenAddDialog(true)} className="w-full sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Currency
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                {!currencies?.length ? (
                    <div className="p-6 text-muted-foreground">No currencies found.</div>
                ) : (
                    <CardContent className="p-0">
                        <div className="rounded-lg border">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="w-[80px]">#</TableHead>
                                        <TableHead>Currency</TableHead>
                                        <TableHead>Code</TableHead>
                                        <TableHead>RTL</TableHead>
                                        <TableHead className="w-[120px] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currencies.map((currency, idx) => (
                                        <TableRow key={currency.id} className="hover:bg-muted/50">
                                            <TableCell className="font-medium">{idx + 1}</TableCell>
                                            <TableCell>{currency.currencyName}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{currency.currencyCode}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Switch id={`switch-${currency.id}`} checked={!!currency.textDirection} />
                                            </TableCell>
                                            <TableCell>
                                                {isDeleting && isItemDeleting(currency.id) ? (
                                                    <Preloader size="sm" />
                                                ) : (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0 ml-auto">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Open menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-[160px]">
                                                            <DropdownMenuItem onClick={() => handleEdit(currency.id)}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-destructive focus:text-destructive"
                                                                onClick={() => deleteMemberById(currency.id)}
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
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
                        </div>
                    </CardContent>
                )}
            </Card>

            <Dialog open={openFormatDialog} onOpenChange={setOpenFormatDialog}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Currency Format Settings</DialogTitle>
                        <DialogDescription>Configure how currency values are displayed</DialogDescription>
                    </DialogHeader>
                    <FormatForm currencies={currencies} setOpenFormatDialog={setOpenFormatDialog} />
                </DialogContent>
            </Dialog>

            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Add New Currency</DialogTitle>
                        <DialogDescription>Add a new currency to your system</DialogDescription>
                    </DialogHeader>
                    <CurrencyModal setOpenAddDialog={setOpenAddDialog} />
                </DialogContent>
            </Dialog>

            <Dialog
                open={editDialog.isOpen}
                onOpenChange={(open) => setEditDialog((prev) => ({ ...prev, isOpen: open }))}
            >
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit Currency</DialogTitle>
                        <DialogDescription>Edit currency settings</DialogDescription>
                    </DialogHeader>
                    <CurrencyEditModal
                        id={editDialog.id!}
                        setOpenEditDialog={(open: boolean) => setEditDialog((prev) => ({ ...prev, isOpen: open }))}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
