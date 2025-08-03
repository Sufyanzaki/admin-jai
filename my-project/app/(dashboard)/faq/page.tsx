"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Edit, PlusCircle, Search, Trash2} from "lucide-react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {FaqAddModal} from "@/app/(dashboard)/faq/_components/faq-add-modal";
import useFaq from "./_hooks/useFaq";
import { useRouter, useSearchParams } from "next/navigation";
import useDeleteFaq from "./_hooks/useDeleteFaq";
import Preloader from "@/components/ui/Preloader";
import {FaqEditModal} from "@/app/(dashboard)/faq/_components/faq-edit-modal";

export default function SupportFAQ() {
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { data: faqs, isLoading, error } = useFaq();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { deleteFaqById, isLoading: isDeleting } = useDeleteFaq();
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const filteredFAQs = (faqs || []).filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (id: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("edit", String(id));
        router.replace(`?${params.toString()}`);
        setIsEditModalOpen(true);
    };

    const handleModalClose = (value: boolean) => {
        setIsEditModalOpen(value);
        setOpen(value);
        if (!value) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("edit");
            router.replace(`?${params.toString()}`);
        }
    };

    const handleDelete = async (id: number) => {
        setDeletingId(id);
        await deleteFaqById(id);
        setDeletingId(null);
    };

    return (
        <div className="container mx-auto space-y-6 p-4 xl:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight">FAQ Management</h2>
                    <p className="text-muted-foreground">Create and manage members faq surveys</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                        <Link href="/faq/category">
                            Manage Category
                        </Link>
                    </Button>
                    <Button size="sm" onClick={() => setOpen(true)}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Faq
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>
                        Find answers to common questions about using the matrimonial platform and managing your profile.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative mb-6">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search FAQs..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {isLoading ? (
                        <div className="flex items-center flex-col justify-center h-64">
                            <Preloader/>
                            <p className="text-sm">Loading...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-500">
                            <p>Error loading FAQs</p>
                        </div>
                    ) : filteredFAQs.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">Question</TableHead>
                                    <TableHead className="hidden sm:table-cell">Answer</TableHead>
                                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                                    <TableHead className="w-[120px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredFAQs.map((faq) => (
                                    <TableRow key={faq.id}>
                                        <TableCell className="font-medium align-top">{faq.question}</TableCell>
                                        <TableCell className="align-top hidden sm:table-cell">{faq.answer}</TableCell>
                                        <TableCell className="hidden md:table-cell">{faq.category?.name || "-"}</TableCell>
                                        <TableCell className="text-right align-top">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => handleEdit(faq.id)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit FAQ</span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                                    onClick={() => handleDelete(faq.id)}
                                                    disabled={isDeleting && deletingId === faq.id}
                                                >
                                                    {isDeleting && deletingId === faq.id ? (
                                                        <Preloader size="sm"/>
                                                    ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                    )}
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
            <FaqAddModal isOpen={open} onClose={handleModalClose} />
            <FaqEditModal isOpen={isEditModalOpen} onClose={handleModalClose} />
        </div>
    );
}
