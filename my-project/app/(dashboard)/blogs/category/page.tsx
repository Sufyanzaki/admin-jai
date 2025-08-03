'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Pencil, Trash, Plus, Search, MoreHorizontal, Loader2} from "lucide-react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { useBlogCategories } from "./_hooks/useBlogCategories";
import { BlogCategory } from "./_types/category-types";
import AddCategoryForm from "./_components/addCategoryForm";
import useDeleteBlogCategory from "./_hooks/useDeleteBlogCategory";
import {useSWRConfig} from "swr";
import EditCategoryModal from "./_components/EditCategoryModal";
import Preloader from "@/components/ui/Preloader"

export default function BlogCategoryManagement() {
    const [search, setSearch] = useState("")
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const { categories = [], loading, error } = useBlogCategories();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const { deleteCategoryById, isDeleting } = useDeleteBlogCategory();

    const { mutate: globalMutate } = useSWRConfig();

    const filteredCategories = categories.filter((cat: BlogCategory) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <div className="container mx-auto space-y-4 p-4 xl:p-6">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight">Manage Categories</h1>
                        <p className="text-muted-foreground">Manage and track all categories in the app</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Categories List */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Blog Categories</CardTitle>
                                <CardDescription>Manage your blog categories</CardDescription>
                            </div>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search categories..."
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
                                <p>Loading categories</p>
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-32 text-red-500">
                                Error loading categories
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">#</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Posts</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
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
                                                        {category.isActive ? "active" : "inactive"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {isDeleting && deletingId === category.id ? (
                                                        <Preloader size="sm" />
                                                    ) : (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => {
                                                                    const params = new URLSearchParams(window.location.search);
                                                                    params.set('edit', String(category.id));
                                                                    window.history.replaceState(null, '', `?${params.toString()}`);
                                                                    setIsEditDialogOpen(true);
                                                                }}>
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="text-red-600"
                                                                    onClick={async () => {
                                                                        setDeletingId(category.id);
                                                                        await deleteCategoryById(category.id);
                                                                        await globalMutate('blog-categories', (current: any[] = []) => current.filter(cat => cat.id !== category.id), false);
                                                                        setDeletingId(null);
                                                                    }}
                                                                >
                                                                    <Trash className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center h-24">
                                                No categories found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Add Category Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Category</CardTitle>
                        <CardDescription>Create a new blog category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AddCategoryForm />
                    </CardContent>
                </Card>
            </div>
            <EditCategoryModal />
        </div>
    )
}