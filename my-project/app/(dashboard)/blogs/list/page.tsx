"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Ban,
  Car,
  CheckCircle,
  Edit,
  Eye,
  MoreHorizontal,
  Notebook, Pencil,
  Plus,
  Search,
  Settings, Trash,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { useBlogs } from "../_hooks/useBlogs";
import Preloader from "@/components/ui/Preloader";
import { useDeleteBlog } from "../_hooks/useDeleteBlog";

export default function BlogListPage() {
  const { blogs = [], loading, error } = useBlogs();
  const { deleteBlogById, isItemDeleting } = useDeleteBlog();

  return (
    <div className="flex flex-col gap-4 p-4 xl:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight">Blog List</h1>
          <p className="text-muted-foreground">Manage and track all blogs in the fleet</p>
        </div>
        <Button className="w-full md:w-auto" asChild>
          <Link className="flex items-center" href="/blogs/create">
            <Plus className="mr-2 h-4 w-4" />
            New Blog
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">7</div>
              <Notebook className="size-8 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4</div>
              <CheckCircle className="size-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">Currently visible and updated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3</div>
              <Ban className="size-8 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground">Hidden or unpublished blogs</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blogs Table</CardTitle>
          <CardDescription>View and manage all blog in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            {loading ? (
                <div className="flex items-center flex-col justify-center h-64">
                  <Preloader/>
                  <p className="text-sm">Loading Blogs...</p>
                </div>
            ) : error ? (
              <div className="flex items-center justify-center h-32 text-red-500">Error loading blogs</div>
            ) : blogs.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                No blogs found.
              </div> )
            : (
              <Table className="whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="whitespace-nowrap">
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">
                        <Link href={`/blogs/${blog.id}`} className="hover:underline">
                          {blog.id}
                        </Link>
                      </TableCell>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{blog.categoryId}</TableCell>
                      <TableCell>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {isItemDeleting(blog.id) ? (
                            <Preloader size="sm" />
                              ) : (
                                <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/blogs/list/${blog.id}`}>
                                <Eye className="mr-2 h-4 w-4" /> View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/blogs/list/edit/${blog.id}`}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => deleteBlogById(blog.id)}
                              disabled={isItemDeleting(blog.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                              )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
