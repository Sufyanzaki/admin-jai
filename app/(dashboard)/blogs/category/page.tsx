'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Pencil, Trash} from "lucide-react"
import {useState} from "react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import Link from "next/link";

export default function BlogCategoryManagement() {
    const [search, setSearch] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [categories, setCategories] = useState([
        { id: 1, name: "Home" },
        { id: 2, name: "Technology" },
    ])

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="grid grid-cols-3 gap-6 p-6 items-baseline">
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle className="text-lg">All Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Search Bar */}
                    <div className="mb-4">
                        <Input
                            placeholder="Search here"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Table */}
                    <div className="border rounded-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCategories.map((category, index) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell className="text-right flex justify-end gap-2">
                                            <Button variant="outline" size="icon">
                                                <Link href={`/packages/${category.id}`}>
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <Trash className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Add New Blog Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (categoryName.trim()) {
                                setCategories([
                                    ...categories,
                                    { id: categories.length + 1, name: categoryName.trim() },
                                ])
                                setCategoryName("")
                            }
                        }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="category-name">Name<span className="text-red-500">*</span></Label>
                            <Input
                                id="category-name"
                                placeholder="Name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">Save</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
