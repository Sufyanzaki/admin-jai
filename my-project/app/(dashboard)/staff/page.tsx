"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, MoreVertical, RefreshCw, Search, Shield, Trash, UserPlus, Users, Edit } from "lucide-react";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState, useMemo } from "react";
import PaginationSection from "@/components/Pagination";
import { useStaffMembers } from "./_hooks/useStaffMembers";
import Preloader from "@/components/ui/Preloader";
import { useDebounce } from "@/hooks/useDebounce";
import useRoles from "./roles/_hook/useRoles";
import {useDeleteStaff} from "@/app/(dashboard)/staff/_hooks/useDeleteStaff";

export default function StaffPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState({key: '', value:false});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { deleteStaffById, isItemDeleting } = useDeleteStaff();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const params = {
    page: currentPage,
    limit,
    search: debouncedSearchQuery || undefined,
    allow: roleFilter !== "all" ? roleFilter : undefined,
    isActive:
      statusFilter === "all"
        ? undefined
        : statusFilter === "active"
        ? true
        : statusFilter === "inactive"
        ? false
        : undefined,
  };

  const { staffList, loading, error } = useStaffMembers(params);
  const { roles, loading: rolesLoading } = useRoles();

  const staffData = staffList?.staffMembers ?? [];

  const pagination = useMemo(() => ({
    total: staffList?.totalStaff ?? 0,
    page: staffList?.page ?? 1,
    limit: staffList?.limit ?? limit,
    totalPages: staffList ? Math.ceil(staffList.totalStaff / (staffList.limit || limit)) : 1,
  }), [staffList, limit]);

  const handleDeleteConfirm = () => {
    deleteStaffById(deleteDialogOpen.key).finally(() => setDeleteDialogOpen({key: '', value:false}));
  };

  return (
    <>
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Staff Management</h2>
          <p className="text-muted-foreground">Manage clinic staff, roles, and permissions</p>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <Button asChild>
            <Link href="/staff/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Staff
            </Link>
          </Button>
        </div>
      </div>

      <div className="md:grid max-md:space-y-6 gap-6 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Staff Directory</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search staff..."
                    className="w-full pl-8 sm:w-[300px]"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Select value={roleFilter} onValueChange={setRoleFilter} disabled={rolesLoading}>
                        <SelectTrigger className="w-full border-none p-0 shadow-none">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          {roles &&
                            roles.map((role) => (
                              <SelectItem key={role.id} value={role.name}>
                                {role.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full border-none p-0 shadow-none">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          setRoleFilter("all");
                          setStatusFilter("all");
                          setSearchQuery("");
                        }}
                      >
                        <RefreshCw className="mr-2 h-3 w-3" />
                        Reset Filters
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              {loading ? (
                <div className="flex items-center flex-col justify-center h-64">
                    <Preloader />
                    <p className="text-sm">Loading Staff</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-32 text-red-500">
                  Failed to load staff.
                </div>
              ) : staffData.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  No staff members found.
                </div>
              ) : (
              <Table className="whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                    <TableHead className="hidden md:table-cell">Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="whitespace-nowrap">
                  {staffData.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={staff.image || "/user-2.png?height=32&width=32&query=person"} alt={staff.firstName || staff.email} />
                              <AvatarFallback>{(staff.firstName || staff.email).slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{staff.firstName} {staff.lastName}</div>
                          </div>
                        </TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-xs text-muted-foreground">{staff.email}</span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {staff.createdAt ? new Date(staff.createdAt).toLocaleDateString() : "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={staff.isActive ? "success" : "destructive"}>
                            {staff.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {isItemDeleting(staff.id) ? (
                            <div className="flex justify-end"><Preloader size="sm" /></div>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link href={`/staff/${staff.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={(id) => setDeleteDialogOpen({value: true, key: staff.id})} className="text-red-500">
                                  <Trash className="mr-2 h-4 w-4" />
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
              )}
            </div>
            <PaginationSection
                pagination={pagination}
                onPageChange={setCurrentPage}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-2 flex !flex-row items-center justify-between">
              <CardTitle className="text-base">Staff Overview</CardTitle>
              <Users className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">{staffList?.totalStaff ?? 0}</span>
                  <span className="text-xs text-muted-foreground">Total Staff</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Active</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {staffList?.activeStaffCount ?? 0}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {staffList && staffList.totalStaff > 0
                        ? Math.round((staffList.activeStaffCount / staffList.totalStaff) * 100)
                        : 0
                      }%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Inactive</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {staffList?.inactiveStaffCount ?? 0}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {staffList && staffList.totalStaff > 0
                        ? Math.round((staffList.inactiveStaffCount / staffList.totalStaff) * 100)
                        : 0
                      }%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Staff Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {staffList?.countByRoles &&
                  Object.entries(staffList.countByRoles).map(([role, count]) => (
                    <div key={role} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-md bg-blue-500" />
                      <div className="flex flex-1 items-center justify-between">
                        <span className="text-sm">{role}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/staff/add">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Staff
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/staff/roles">
                    <Shield className="mr-2 h-4 w-4" />
                    Add Roles
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

      <AlertDialog open={deleteDialogOpen.value} onOpenChange={value=>setDeleteDialogOpen({...deleteDialogOpen, value: value})}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to Delete this staff member?</AlertDialogTitle>
            <AlertDialogDescription>This action will permanently delete the staff member's record from the system. This action cannot be undone and will remove all associated data including schedules, permissions and attendance records.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 text-neutral-50 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
