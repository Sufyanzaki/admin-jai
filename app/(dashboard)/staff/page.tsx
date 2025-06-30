"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Building, Calendar, Clipboard, Clock, Download, Edit, Eye, FileText, Filter, Mail, MoreVertical, Phone, RefreshCw, Search, Shield, Trash, UserCheck, UserPlus, Users, UserX } from "lucide-react";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import PaginationSection from "@/components/Pagination";

const staffData = [
  {
    id: 1,
    name: "Admin",
    email: "info@rajmedia.nl",
    password: "-",
    role: "admin",
    status: "active" // Added status
  },
  {
    id: 2,
    name: "sandjai p",
    email: "sandjai@netblue.nl",
    password: "-",
    role: "Mod",
    status: "active" // Added status
  },
  {
    id: 3,
    name: "kareemn sas",
    email: "kareembakhs112244@gmail.com",
    password: "1234341",
    role: "admin",
    status: "inactive" // Added status
  },
  {
    id: 4,
    name: "sufyan zaki",
    email: "sufyan.zaki.789@gmail.com",
    password: "122132342345",
    role: "admin",
    status: "active" // Added status
  }
];

export default function StaffPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
                  <Input type="search" placeholder="Search staff..." className="w-full pl-8 sm:w-[300px]" />
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
                    <DropdownMenuItem>
                      <Select>
                        <SelectTrigger className="w-full border-none p-0 shadow-none">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="doctor">Admin</SelectItem>
                          <SelectItem value="nurse">Moderator</SelectItem>
                        </SelectContent>
                      </Select>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Select>
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
                    <DropdownMenuItem>
                      <Button variant="outline" size="sm" className="w-full">
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
                              <AvatarImage src={"/user-2.png?height=32&width=32&query=person"} alt={staff.name} />
                              <AvatarFallback>{staff.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{staff.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-xs text-muted-foreground">{staff.email}</span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">Today</TableCell>
                        <TableCell>
                          <Badge variant="success">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
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
                              <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)} className="text-red-500">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>

            </div>
            <PaginationSection />
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
                  <span className="text-3xl font-bold">{staffData.length}</span>
                  <span className="text-xs text-muted-foreground">Total Staff</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Active</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {staffData.filter(staff => staff.status === 'active').length}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
            {Math.round((staffData.filter(staff => staff.status === 'active').length / staffData.length) * 100)}%
          </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Inactive</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {staffData.filter(staff => staff.status === 'inactive').length}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
            {Math.round((staffData.filter(staff => staff.status === 'inactive').length / staffData.length) * 100)}%
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
                {/* Count admin roles */}
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-md bg-blue-500" />
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm">Admins</span>
                    <Badge variant="outline">
                      {staffData.filter(staff => staff.role === 'admin').length}
                    </Badge>
                  </div>
                </div>

                {/* Count Mod roles */}
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-md bg-green-500" />
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm">Moderators</span>
                    <Badge variant="outline">
                      {staffData.filter(staff => staff.role === 'Mod').length}
                    </Badge>
                  </div>
                </div>

                {/* Count other roles if they exist */}
                {Array.from(new Set(staffData.map(staff => staff.role)))
                    .filter(role => !['admin', 'Mod'].includes(role))
                    .map(role => (
                        <div key={role} className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-md bg-purple-500" />
                          <div className="flex flex-1 items-center justify-between">
                            <span className="text-sm">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                            <Badge variant="outline">
                              {staffData.filter(staff => staff.role === role).length}
                            </Badge>
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

    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to Delete this staff member?</AlertDialogTitle>
            <AlertDialogDescription>This action will permanently delete the staff member's record from the system. This action cannot be undone and will remove all associated data including schedules, permissions and attendance records.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setDeleteDialogOpen(false)} className="bg-red-500 text-neutral-50 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
