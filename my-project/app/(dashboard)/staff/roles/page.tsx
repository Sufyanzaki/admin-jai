"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  Users,
  Shield,
  UserCog,
  FileText,
  Pencil,
  LayoutDashboard,
  CreditCard,
  Sliders,
  HelpCircle,
  NotebookText,
  Package,
  AlertCircle,
  BarChart2,
  Megaphone, Settings, Video,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { DeleteRoleModal } from "@/components/roles/delete-role-modal"
import RoleForm from "./_components/roleForm"
import useRoles from "./_hook/useRoles"
import useDeleteRole from "./_hook/useDeleteRole";
import Preloader from "@/components/ui/Preloader";

export default function RolesAndPermissionsPage() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<{ id: string; name: string } | null>(null)

  const { roles, loading, error } = useRoles();
  const { deleteRole, isDeleting } = useDeleteRole();

  if (loading) {
    return(
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading role</p>
        </div>
    )
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Failed to load roles.</div>;
  }
  if (!roles) {
    return <div className="p-8 text-center text-lg">No roles found.</div>;
  }

  const administrativeRoles = roles.filter((role) => role.catagory === "Administrative");
  const customRoles = roles.filter((role) => role.catagory === "Custom");

  const modules = [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
    { id: "members", title: "Members", icon: Users },
    { id: "profile_attributes", title: "Profile Attributes", icon: UserCog },
    { id: "payments", title: "Payments", icon: CreditCard },
  ];

  const permissionTypes = ["view", "create", "edit", "delete"];

  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="outline" size="icon" asChild>
            <Link href="/staff">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Roles & Permissions</h1>
            <p className="text-sm text-muted-foreground">Manage staff access and security controls</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
              <Shield className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl xl:text-4xl mb-2 font-bold">{roles.length}</div>
              <p className="text-xs text-muted-foreground">
                {roles.filter((r) => r.isDefault).length} default, {roles.filter((r) => !r.isDefault).length} custom
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staff Assigned</CardTitle>
              <Users className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl xl:text-4xl mb-2 font-bold">-</div>
              <p className="text-xs text-muted-foreground">Across all roles</p>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administrative Roles</CardTitle>
              <UserCog className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl xl:text-4xl mb-2 font-bold">{administrativeRoles.length}</div>
              <p className="text-xs text-muted-foreground">
                {/* Staff assigned count can be added if available in API */}
                - staff assigned
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Permission Sets</CardTitle>
              <FileText className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl xl:text-4xl mb-2 font-bold">{modules.length}</div>
              <p className="text-xs text-muted-foreground">{permissionTypes.length} permission types</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search roles..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Role
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-background">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                  <DialogDescription>
                    Define a new role with specific permissions for staff members.
                  </DialogDescription>
                </DialogHeader>
                <RoleForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Roles</TabsTrigger>
            <TabsTrigger value="administrative">Administrative</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card className="bg-background">
              <CardContent className="p-0">
                <Table className="whitespace-nowrap">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">{role.name}</TableCell>
                          <TableCell>
                            <Badge variant={role.isActive ? 'default' : 'destructive'}>
                              {role.isActive ? 'active' : 'inactive'}
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
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                  <Link href={`/staff/roles/${role.id}`} className="flex w-full">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/staff/roles/${role.id}/edit`} className="flex w-full">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => {
                                      setRoleToDelete({ id: role.id, name: role.name })
                                      setDeleteModalOpen(true)
                                    }}
                                >
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
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="administrative" className="mt-4">
            <Card className="bg-background">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {administrativeRoles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">{role.name}</TableCell>
                          <TableCell>
                            <Badge variant={role.isDefault ? 'default' : 'destructive'}>
                              {role.isDefault ? 'active' : 'inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right flex justify-end gap-2">
                            <Button variant="outline" size="icon" asChild>
                              <Link href={`/roles/${role.id}`}>
                                <Pencil className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setRoleToDelete({ id: role.id, name: role.name })
                                  setDeleteModalOpen(true)
                                }}
                            >
                              <Trash className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="custom" className="mt-4">
            <Card className="bg-background">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customRoles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">{role.name}</TableCell>
                          <TableCell>
                            <Badge variant={role.isDefault ? 'default' : 'destructive'}>
                              {role.isDefault ? 'active' : 'inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right flex justify-end gap-2">
                            <Button variant="outline" size="icon" asChild>
                              <Link href={`/roles/${role.id}`}>
                                <Pencil className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setRoleToDelete({ id: role.id, name: role.name })
                                  setDeleteModalOpen(true)
                                }}
                            >
                              <Trash className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {roleToDelete && (
            <DeleteRoleModal
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                roleName={roleToDelete.name}
                onConfirm={async () => {
                  await deleteRole(roleToDelete.id);
                  setDeleteModalOpen(false);
                  setRoleToDelete(null);
                }}
                isLoading={isDeleting}
            />
        )}
      </div>
  )
}