"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Users,
  Edit,
  Download,
  Clock,
  LayoutDashboard,
  UserCog,
  CreditCard,
  Sliders,
  HelpCircle,
  NotebookText,
  Package,
  AlertCircle,
  BarChart2,
  Megaphone,
  Settings, Video
} from "lucide-react"
import Link from "next/link"
import { use } from "react"
import useRoleById from "../_hook/useRoleById"
import { RoleDto, Permission } from "../add/_types/roleTypes"
import Preloader from "@/components/ui/Preloader";

export default function RoleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { role, loading, error } = useRoleById(id);

  if (loading) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading</p>
        </div>
    )
  }
  if (error || !role) {
    return <div className="p-8 text-center text-red-500">Failed to load role.</div>;
  }

  function isPermissionArray(
    permissions: RoleDto["permissions"]
  ): permissions is Permission[] {
    return Array.isArray(permissions);
  }

  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="outline" size="icon" asChild className="h-8 w-8">
          <Link href="/staff/roles">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{role.name} Role</h1>
          <p className="text-sm text-muted-foreground">View and manage role details and permissions</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1 bg-background">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>Role Details</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/staff/roles/${id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Role
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Role Name</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{role.name}</Badge>
                  {role.isDefault && <Badge>Default</Badge>}
                </div>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm font-medium">Users Assigned</p>
                <div className="flex items-center justify-end gap-2">
                  <Badge variant="secondary">-</Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/staff/roles/${role.id}/users`}>
                      <Users className="mr-2 h-4 w-4" />
                      View Users
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Created By</p>
                <p className="text-sm">-</p>
                <p className="text-xs text-muted-foreground">
                  <Clock className="mr-1 inline-block h-3 w-3" />
                  -
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Last Updated By</p>
                <p className="text-sm">-</p>
                <p className="text-xs text-muted-foreground">
                  <Clock className="mr-1 inline-block h-3 w-3" />
                  -
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 bg-background">
          <CardHeader>
            <CardTitle>Permission Summary</CardTitle>
            <CardDescription>Overview of permissions granted to this role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isPermissionArray(role.permissions) ? (
                role.permissions.map((perm) => (
                  <div key={perm.module} className="space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <p className="text-sm font-medium">{perm.module}</p>
                      <div className="flex gap-1">
                        {["canView", "canCreate", "canEdit", "canDelete"].map((type) => {
                          const hasPermission = perm[type as keyof typeof perm];
                          return (
                            <Badge
                              key={`${perm.module}-${type}`}
                              variant={hasPermission ? "default" : "outline"}
                              className={!hasPermission ? "opacity-40" : ""}
                            >
                              {type.replace("can", "").toLowerCase()}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                Object.entries(role.permissions).map(([module, perms]) => (
                  <div key={module} className="space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <p className="text-sm font-medium">{module}</p>
                      <div className="flex gap-1">
                        {perms.map((type) => (
                          <Badge
                            key={`${module}-${type}`}
                            variant={"default"}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-background">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>Detailed view of all permissions for this role</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Permissions
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Module</TableHead>
                <TableHead>View</TableHead>
                <TableHead>Create</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {isPermissionArray(role.permissions)
                ? role.permissions.map((perm) => (
                    <TableRow key={perm.module}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span>{perm.module}</span>
                        </div>
                      </TableCell>
                      {["canView", "canCreate", "canEdit", "canDelete"].map((type) => (
                        <TableCell key={`${perm.module}-${type}`}>
                          <Checkbox checked={!!perm[type as keyof typeof perm]} disabled />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : Object.entries(role.permissions).map(([module, perms]) => (
                    <TableRow key={module}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span>{module}</span>
                        </div>
                      </TableCell>
                      {["view", "create", "edit", "delete"].map((type) => (
                        <TableCell key={`${module}-${type}`}>
                          <Checkbox checked={perms.includes(type)} disabled />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
