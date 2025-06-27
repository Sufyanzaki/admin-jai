import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  ArrowLeft, BarChart2,
  CreditCard,
  HelpCircle,
  Info,
  LayoutDashboard, Megaphone, NotebookText, Package,
  Save, Settings,
  Sliders,
  Undo,
  UserCog,
  Users, Video
} from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { use } from "react"

interface Role {
  id: string;
  name: string;
  category: string;
  description: string;
  users: number;
  isDefault: boolean;
  lastUpdated: string;
  updatedBy: string;
  permissions: {
    [key: string]: string[];
  };
}

interface Module {
  id: string;
  name: string;
  description: string;
}

const staffMenuItems = [
  { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
  { id: "members", title: "Members", icon: Users },
  { id: "profile_attributes", title: "Profile Attributes", icon: UserCog },
  { id: "payments", title: "Payments", icon: CreditCard },
  { id: "frontend_settings", title: "Frontend Settings", icon: Sliders },
  { id: "faqs", title: "FAQs", icon: HelpCircle },
  { id: "blogs", title: "BLOGS", icon: NotebookText },
  { id: "packages", title: "Packages", icon: Package },
  { id: "complaints", title: "Complaints", icon: AlertCircle },
  { id: "report", title: "Report", icon: BarChart2 },
  { id: "marketing", title: "Marketing", icon: Megaphone },
  { id: "app_setting", title: "App Setting", icon: Settings },
  { id: "chat_video_setting", title: "Chat & Video Setting", icon: Video },
];

const role: Role = {
  id: "123",
  name: "Administrator",
  category: "Administrative",
  description: "Full system access with all permissions",
  users: 3,
  isDefault: true,
  lastUpdated: "2023-11-15",
  updatedBy: "System Admin",
  permissions: {
    dashboard: ["view", "edit"],
    patients: ["view", "edit", "create", "delete"],
    appointments: ["view", "edit", "create", "delete"],
    billing: ["view", "edit", "create", "delete"],
    reports: ["view", "edit", "create", "delete"],
    settings: ["view", "edit"],
    inventory: ["view", "edit", "create", "delete"],
    staff: ["view", "edit", "create", "delete"],
  },
}

export default function AddRolePage({ params }: { params: Promise<{ id: string }> }) {
  // Mock data for the role
  const { id } = use(params)
  // Permission types
  const permissionTypes: string[] = ["view", "create", "edit", "delete"]

  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="outline" size="icon" asChild className="h-8 w-8">
          <Link href={`/staff/roles`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Role</h1>
          <p className="text-sm text-muted-foreground">Modify role details and permissions</p>
        </div>
      </div>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Role Information</CardTitle>
          <CardDescription>Basic information about the role</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name</Label>
              <Input id="name" defaultValue={role.name} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" defaultValue={role.description} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="isDefault" defaultChecked={role.isDefault} />
            <Label htmlFor="isDefault">Set as default role</Label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>Configure access permissions for this role</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {staffMenuItems.map((module) => (
            <div key={module.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">{module.title}</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {permissionTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${module.id}-${type}`}
                      defaultChecked={role.permissions[module.id]?.includes(type)}
                    />
                    <Label htmlFor={`${module.id}-${type}`} className="capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
              <Separator className="mt-4" />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-2">
          <Button variant="outline">
            <Undo className="mr-2 h-4 w-4" />
            Reset Changes
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
