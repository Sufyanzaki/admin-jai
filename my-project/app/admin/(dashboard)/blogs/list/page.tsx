"use client"

import { useState } from "react";
import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/admin/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Ban, CheckCircle, Eye, MoreHorizontal, Notebook, Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useBlogs } from "@/app/shared-hooks/useBlogs";
import Preloader from "@/components/shared/Preloader";
import { useDeleteBlog } from "@/app/shared-hooks/useDeleteBlog";
import { useSession } from "next-auth/react";
import { useBlogStatus } from "@/app/admin/(dashboard)/blogs/_hooks/useBlogStatus";
import PaginationSection from "@/components/admin/Pagination";

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { blogs = [], loading, error, stats, pagination } = useBlogs(null, currentPage);
  const { deleteBlogById, isItemDeleting } = useDeleteBlog();
  const { updateBlogStatus, isItemUpdating } = useBlogStatus();
  const { data: session } = useSession();

  let permissions;
  if (session?.user.permissions) {
    permissions = session.user.permissions.find(permission => permission.module === "blogs");
  }

  const canCreate = permissions?.canCreate ?? true;
  const canEdit = permissions?.canEdit ?? true;
  const canDelete = permissions?.canDelete ?? true;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <div className="flex flex-col gap-4 p-4 xl:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight">Blog List</h1>
            <p className="text-muted-foreground">Manage and track all blogs in the fleet</p>
          </div>
          {canCreate && (
              <Button className="w-full md:w-auto" asChild>
                <Link className="flex items-center" href="/admin/blogs/create">
                  <Plus className="mr-2 h-4 w-4" />
                  New Blog
                </Link>
              </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats?.totalBlogs}</div>
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
                <div className="text-2xl font-bold">{stats?.activeBlogs}</div>
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
                <div className="text-2xl font-bold">{stats?.inactiveBlogs}</div>
                <Ban className="size-8 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground">Hidden or unpublished blogs</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blogs Table</CardTitle>
            <CardDescription>
              View and manage all blogs in your fleet
              {pagination && pagination.totalPages > 1 && (
                  <span className="ml-2 text-sm">
                (Page {pagination.page} of {pagination.totalPages})
              </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              {loading ? (
                  <div className="flex items-center flex-col justify-center h-64">
                    <Preloader />
                    <p className="text-sm">Loading Blogs...</p>
                  </div>
              ) : error ? (
                  <div className="flex items-center justify-center h-32 text-red-500">Error loading blogs</div>
              ) : blogs.length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    No blogs found.
                  </div>
              ) : (
                  <>
                    <Table className="whitespace-nowrap">
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          {(canEdit || canDelete) && (
                              <TableHead className="text-right">Actions</TableHead>
                          )}
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
                                <Badge
                                    variant={blog.isActive ? "default" : "secondary"}
                                    className={blog.isActive ? "bg-green-500" : "bg-red-500 text-white"}
                                >
                                  {blog.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </TableCell>
                              {(canEdit || canDelete) && (
                                  <TableCell className="text-right">
                                    {(isItemDeleting(blog.id) || isItemUpdating(blog.id)) ? (
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
                                              <Link href={`/admin/blogs/list/${blog.id}`}>
                                                <Eye className="mr-2 h-4 w-4" /> View
                                              </Link>
                                            </DropdownMenuItem>
                                            {canEdit && (
                                                <DropdownMenuItem asChild>
                                                  <Link href={`/admin/blogs/list/edit/${blog.id}`}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                  </Link>
                                                </DropdownMenuItem>
                                            )}
                                            {canEdit && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        updateBlogStatus(blog.id, !blog.isActive)
                                                    }
                                                >
                                                  {blog.isActive ? (
                                                      <>
                                                        <Ban className="mr-2 h-4 w-4 text-red-500" />
                                                        Set Inactive
                                                      </>
                                                  ) : (
                                                      <>
                                                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                                        Set Active
                                                      </>
                                                  )}
                                                </DropdownMenuItem>
                                            )}
                                            {canDelete && (
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => deleteBlogById(blog.id)}
                                                >
                                                  <Trash className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            )}
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                  </TableCell>
                              )}
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="w-full p-4 border-t">
                      <PaginationSection
                          pagination={pagination}
                          onPageChange={handlePageChange}
                      />
                    </div>
                  </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}