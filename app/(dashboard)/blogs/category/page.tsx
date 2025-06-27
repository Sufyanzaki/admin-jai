'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Pencil, Trash, Plus, Search, MoreHorizontal} from "lucide-react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
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

export default function BlogCategoryManagement() {
    const [search, setSearch] = useState("")
    const [categoryName, setCategoryName] = useState("");
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [categories, setCategories] = useState([
        { id: 1, name: "Home", posts: 15, status: "active" },
        { id: 2, name: "Technology", posts: 42, status: "active" },
        { id: 3, name: "Travel", posts: 8, status: "inactive" },
    ])

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = (id: number) => {
        setCategories(categories.filter(cat => cat.id !== id))
    }

    return (
        <div className="container mx-auto space-y-4 p-4 xl:p-6">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight mb-2">Manage Categories</h1>
                        <p className="text-muted-foreground">Manage and track all ambulances in the fleet</p>
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
                                                <Badge variant="outline">{category.posts}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={category.status === "active" ? "default" : "secondary"}>
                                                    {category.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={()=>setIsEditDialogOpen(true)}>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => handleDelete(category.id)}
                                                        >
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
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
                    </CardContent>
                </Card>

                {/* Add Category Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Category</CardTitle>
                        <CardDescription>Create a new blog category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (categoryName.trim()) {
                                    setCategories([
                                        ...categories,
                                        {
                                            id: categories.length + 1,
                                            name: categoryName.trim(),
                                            posts: 0,
                                            status: "active"
                                        },
                                    ])
                                    setCategoryName("")
                                }
                            }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="category-name">
                                    Category Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="category-name"
                                    placeholder="e.g. Food, Lifestyle"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            Update the name of this blog category
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={()=>{}}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-category-name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="edit-category-name"
                                    className="col-span-3"
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}