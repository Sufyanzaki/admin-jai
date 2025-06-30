"use client"

import React, {useState} from "react"
import Link from "next/link";
import {ArrowLeft, Edit, Plus, StepBack, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {CategoryModal} from "@/components/modals";

const categories = [
    {
        id: "faq-1",
        title: "Authentication"
    }
]

export default function CategoryPage() {
    const [open, setOpen] = useState(false)

    return (
    <div className="container py-6 space-y-6 p-4 xl:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/faq">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>

                <div className="flex flex-col space-y-2">
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Manage Categories</h1>
                    <p className="text-muted-foreground">
                        Create and manage categories for organizing your FAQ content
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="secondary">
                  <Link href="/faq">
                      Back
                  </Link>
              </Button>
              <Button onClick={()=>setOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
              </Button>
          </div>
      </div>

        <Card>
            <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                    Organize and manage user profile categories such as religion, caste, profession, and lifestyle preferences.
                </CardDescription>
            </CardHeader>

            <CardContent>

                {categories.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="w-[120px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium align-top">{category.id}</TableCell>
                                    <TableCell className="align-top">{category.title}</TableCell>
                                    <TableCell className="text-right align-top">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={()=>setOpen(true)}>
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit FAQ</span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
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
                        <p className="text-muted-foreground">No Categories found matching your search</p>
                    </div>
                )}
            </CardContent>
        </Card>
        <CategoryModal isOpen={open} onClose={setOpen}/>
    </div>
  )
}
