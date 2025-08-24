'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {Button} from "@/components/admin/ui/button"
import {Input} from "@/components/admin/ui/input"
import {MoreHorizontal, Pencil, Search, Trash} from "lucide-react"
import {useState} from "react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/admin/ui/dropdown-menu";
import {Badge} from "@/components/admin/ui/badge";
import {useBlogCategories} from "@/app/shared-hooks/useBlogCategories";
import AddCategoryForm from "./_components/addCategoryForm";
import useDeleteBlogCategory from "./_hooks/useDeleteBlogCategory";
import {useSWRConfig} from "swr";
import EditCategoryModal from "./_components/EditCategoryModal";
import Preloader from "@/components/shared/Preloader";
import {CategoryDto} from "@/app/shared-types/blog";
import {useSession} from "next-auth/react";
import { useTranslation } from "react-i18next";

export default function BlogCategoryManagement() {
    const { t } = useTranslation();

    const { data:session } = useSession();

    const [search, setSearch] = useState("")
    const { categories = [], loading, error } = useBlogCategories();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { deleteCategoryById, isDeleting } = useDeleteBlogCategory();

    const { mutate: globalMutate } = useSWRConfig();

    const filteredCategories = categories.filter((cat: CategoryDto) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    )

    let permissions;
    if (session?.user.permissions) {
        permissions = session.user.permissions.find(permission => permission.module === "blogs_category");
    }

    // Permission flags
    const canCreate = permissions?.canCreate ?? true;
    const canEdit = permissions?.canEdit ?? true;
    const canDelete = permissions?.canDelete ?? true;

    return (
        <div className=" space-y-4 p-4 xl:p-6">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight">{t("Manage Categories")}</h1>
                        <p className="text-muted-foreground">{t("Manage and track all categories in the app")}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Categories List */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>{t("Blog Categories")}</CardTitle>
                                <CardDescription>{t("Manage your blog categories")}</CardDescription>
                            </div>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={t("Search categories...")}
                                    className="pl-8"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex items-center justify-center flex-col h-32">
                                <Preloader />
                                <p>{t("Loading categories")}</p>
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-32 text-red-500">
                                {t("Error loading categories")}
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">#</TableHead>
                                        <TableHead>{t("Category")}</TableHead>
                                        <TableHead>{t("Posts")}</TableHead>
                                        <TableHead>{t("Status")}</TableHead>
                                        {(canEdit || canDelete) && (
                                            <TableHead className="text-right">{t("Actions")}</TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCategories.length > 0 ? (
                                        filteredCategories.map((category, index) => (
                                            <TableRow key={category.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell className="font-medium">{category.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{category.blogs.length}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={category.isActive ? "default" : "secondary"}>
                                                        {category.isActive ? t("active") : t("inactive")}
                                                    </Badge>
                                                </TableCell>
                                                {(canEdit || canDelete) && (
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">{t("Open menu")}</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                {canEdit && (
                                                                    <DropdownMenuItem
                                                                        onClick={() => {
                                                                            const params = new URLSearchParams(window.location.search);
                                                                            params.set('edit', String(category.id));
                                                                            window.history.replaceState(null, '', `?${params.toString()}`);
                                                                        }}
                                                                    >
                                                                        <Pencil className="mr-2 h-4 w-4" />
                                                                        {t("Edit")}
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {canDelete && (
                                                                    <DropdownMenuItem
                                                                        className="text-red-600"
                                                                        onClick={async () => {
                                                                            setDeletingId(category.id);
                                                                            await deleteCategoryById(category.id);
                                                                            await globalMutate('blog-categories', (current: CategoryDto[] = []) => current.filter(cat => cat.id !== category.id), false);
                                                                            setDeletingId(null);
                                                                        }}
                                                                    >
                                                                        <Trash className="mr-2 h-4 w-4" />
                                                                        {t("Delete")}
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center h-24">
                                                {t("No categories found")}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Add Category Form */}
                {canCreate && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("Add New Category")}</CardTitle>
                            <CardDescription>{t("Create a new blog category")}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AddCategoryForm />
                        </CardContent>
                    </Card>
                )}
            </div>
            {canEdit && <EditCategoryModal />}
        </div>
    )
}