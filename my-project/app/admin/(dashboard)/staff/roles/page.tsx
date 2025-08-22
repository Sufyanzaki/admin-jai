"use client"

import {Button} from "@/components/admin/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {Badge} from "@/components/admin/ui/badge"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/admin/ui/dialog"
import {ArrowLeft, Eye, MoreHorizontal, Pencil, Plus, Shield, Trash,} from "lucide-react"
import Link from "next/link"
import {useState} from "react"
import RoleForm from "./_components/roleForm"
import useRoles from "./_hook/useRoles"
import useDeleteRole from "./_hook/useDeleteRole";
import Preloader from "@/components/shared/Preloader";
import {DeleteRoleModal} from "@/components/admin/roles/delete-role-modal";
import {useSession} from "next-auth/react";

export default function RolesAndPermissionsPage() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<{ id: string; name: string } | null>(null)

  const { roles, loading, error } = useRoles();
  const { deleteRole, isDeleting } = useDeleteRole();
  const { data: session } = useSession();

  let permissions;
  if (session?.user.permissions) {
    permissions = session.user.permissions.find(permission => permission.module === "roles");
  }

  const canCreate = permissions?.canCreate ?? true;
  const canEdit = permissions?.canEdit ?? true;
  const canDelete = permissions?.canDelete ?? true;
  const canView = permissions?.canView ?? true;

  if (loading) {
    return(
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading roles...</p>
        </div>
    )
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Failed to load roles.</div>;
  }
  if (!roles) {
    return <div className="p-8 text-center text-lg">No roles found.</div>;
  }

  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/staff">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Roles & Permissions</h1>
            <p className="text-sm text-muted-foreground">Manage staff access and security controls</p>
          </div>
        </div>

        {canView ? (
            <>
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
              </div>

              {canCreate && (
                  <div className="flex justify-end gap-2 flex-wrap">
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
              )}

              <Card className="bg-background">
                <CardContent className="p-0">
                  <Table className="whitespace-nowrap">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        {(canEdit || canDelete) && (
                            <TableHead className="text-right">Actions</TableHead>
                        )}
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
                            {(canEdit || canDelete) && (
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
                                        <Link href={`/admin/staff/roles/${role.id}`} className="flex w-full">
                                          <Eye className="mr-2 h-4 w-4" />
                                          View
                                        </Link>
                                      </DropdownMenuItem>
                                      {canEdit && (
                                          <DropdownMenuItem asChild>
                                            <Link href={`/admin/staff/roles/${role.id}/edit`} className="flex w-full">
                                              <Pencil className="mr-2 h-4 w-4" />
                                              Edit
                                            </Link>
                                          </DropdownMenuItem>
                                      )}
                                      {canDelete && (
                                          <>
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
                                          </>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                            )}
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

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
            </>
        ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">You don&#39;t have permission to view roles.</p>
            </div>
        )}
      </div>
  )
}