"use client"

import {Button} from "@/components/admin/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {Input} from "@/components/admin/ui/input"
import {Label} from "@/components/admin/ui/label"
import {Textarea} from "@/components/admin/ui/textarea"
import {Checkbox} from "@/components/admin/ui/checkbox"
import {Separator} from "@/components/admin/ui/separator"
import {ArrowLeft, Save} from "lucide-react"
import Link from "next/link"
import {Switch} from "@/components/admin/ui/switch"
import {use} from "react"
import {Controller} from "react-hook-form"
import useEditRoleForm from "../../_hook/useEditRoleForm"
import Preloader from "@/components/shared/Preloader";
import {permissionTypes, roleMenuItems} from "../../../const/permissions"

export default function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const {
    handleSubmit,
    onSubmit,
    control,
    loading,
    error,
    errors,
    isSubmitting
  } = useEditRoleForm(id);

  if (loading) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading role</p>
        </div>
    )
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Failed to load role.</div>;
  }

  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="outline" size="icon" asChild className="h-8 w-8">
            <Link href={`/admin/staff/roles`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Role</h1>
            <p className="text-sm text-muted-foreground">Modify role details and permissions</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(data => onSubmit(data))}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Role Information</CardTitle>
              <CardDescription>Basic information about the role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Role Name</Label>
                  <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                          <Input id="name" placeholder="Enter role name" {...field} />
                      )}
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <Textarea id="description" placeholder="Role Description" {...field} />
                    )}
                />
                {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                    name="isDefault"
                    control={control}
                    render={({ field }) => (
                        <Switch id="isDefault" checked={field.value} onCheckedChange={field.onChange} />
                    )}
                />
                <Label htmlFor="isDefault">Set as default role</Label>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background mt-6">
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Configure access permissions for this role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {roleMenuItems.map((module, modIdx) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">{module.title}</Label>
                      <div className="flex gap-8 justify-start items-center">
                        {module.permissions.map((permKey) => {
                          const permConfig = permissionTypes.find((p) => p.key === permKey);
                          if (!permConfig) return null;
                          return (
                              <Controller
                                  key={permConfig.key}
                                  name={`permissions.${modIdx}.${permConfig.key}`}
                                  control={control}
                                  render={({ field }) => (
                                      <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`${module.id}-${permConfig.label}`}
                                            checked={!!field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label htmlFor={`${module.id}-${permConfig.label}`} className="capitalize">
                                          {permConfig.label}
                                        </Label>
                                      </div>
                                  )}
                              />
                          );
                        })}
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-end flex-wrap gap-2">
              <Button type="submit" disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
  )
}