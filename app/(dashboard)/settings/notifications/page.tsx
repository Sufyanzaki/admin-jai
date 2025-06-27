"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  Save,
  Plus,
  Edit,
  Trash,
  Download,
  Upload,
  RefreshCcw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Copy,
  Eye,
  MoreHorizontal, PencilIcon,
} from "lucide-react"
import Link from "next/link"
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
import { Badge } from "@/components/ui/badge"

export default function NotificationsPage() {
  // Mock data for notification templates
  const emailTemplates = [
    {
      id: 1,
      name: "When a member visited your profile",
      subject: "Someone viewed your profile",
      type: "Email",
      lastUpdated: "2023-11-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Email On Accepting Interest",
      subject: "Your interest has been accepted",
      type: "Email",
      lastUpdated: "2023-10-22",
      status: "Active",
    },
    {
      id: 3,
      name: "New Chat Message",
      subject: "You have a new message",
      type: "Email",
      lastUpdated: "2023-09-30",
      status: "Active",
    },
    {
      id: 4,
      name: "Ask for a Photo",
      subject: "Photo request from a member",
      type: "Email",
      lastUpdated: "2023-10-05",
      status: "Active",
    },
    {
      id: 5,
      name: "Buy a Package",
      subject: "Package purchase confirmation",
      type: "Email",
      lastUpdated: "2023-11-02",
      status: "Active",
    },
    {
      id: 6,
      name: "VIP Package End",
      subject: "Your VIP package is ending soon",
      type: "Email",
      lastUpdated: "2023-10-18",
      status: "Active",
    },
    {
      id: 7,
      name: "OTP Activation Mail",
      subject: "Your OTP for account activation",
      type: "Email",
      lastUpdated: "2023-11-10",
      status: "Active",
    },
    {
      id: 8,
      name: "Forgot Password",
      subject: "Password reset instructions",
      type: "Email",
      lastUpdated: "2023-11-05",
      status: "Active",
    },
    {
      id: 9,
      name: "Delete Member Account",
      subject: "Account deletion confirmation",
      type: "Email",
      lastUpdated: "2023-10-30",
      status: "Active",
    },
    {
      id: 10,
      name: "Welcome Mail After Activation",
      subject: "Welcome to our platform",
      type: "Email",
      lastUpdated: "2023-11-12",
      status: "Active",
    },
    {
      id: 11,
      name: "New Member Register from Admin",
      subject: "New member registration",
      type: "Email",
      lastUpdated: "2023-10-15",
      status: "Active",
    },
    {
      id: 12,
      name: "Member Buy Package from Admin",
      subject: "Package purchase processed",
      type: "Email",
      lastUpdated: "2023-11-08",
      status: "Active",
    },
    {
      id: 13,
      name: "Member Delete Account from Admin",
      subject: "Account deletion notification",
      type: "Email",
      lastUpdated: "2023-10-25",
      status: "Active",
    },
    {
      id: 14,
      name: "Admin Verification Email",
      subject: "Account verification required",
      type: "Email",
      lastUpdated: "2023-11-14",
      status: "Active",
    },
    {
      id: 15,
      name: "Financial Report",
      subject: "Your financial report is ready",
      type: "Email",
      lastUpdated: "2023-10-10",
      status: "Active",
    },
    {
      id: 16,
      name: "Income Report",
      subject: "Monthly income statement",
      type: "Email",
      lastUpdated: "2023-11-01",
      status: "Active",
    },
    {
      id: 17,
      name: "Detail Report",
      subject: "Detailed activity report",
      type: "Email",
      lastUpdated: "2023-10-20",
      status: "Active",
    },
    {
      id: 18,
      name: "Members Report",
      subject: "Membership statistics report",
      type: "Email",
      lastUpdated: "2023-11-05",
      status: "Active",
    },
    {
      id: 19,
      name: "Report Profile",
      subject: "Profile report notification",
      type: "Email",
      lastUpdated: "2023-10-28",
      status: "Active",
    },
    {
      id: 20,
      name: "User Inquiry",
      subject: "New user inquiry received",
      type: "Email",
      lastUpdated: "2023-11-15",
      status: "Active",
    },
    {
      id: 21,
      name: "New User Registration",
      subject: "Welcome to our community",
      type: "Email",
      lastUpdated: "2023-11-03",
      status: "Active",
    },
    {
      id: 22,
      name: "User Purchased a Package",
      subject: "Package purchase confirmation",
      type: "Email",
      lastUpdated: "2023-10-17",
      status: "Active",
    },
    {
      id: 23,
      name: "New Matches Notification",
      subject: "You have new matches",
      type: "Email",
      lastUpdated: "2023-11-09",
      status: "Active",
    },
    {
      id: 24,
      name: "Admin Forget Password",
      subject: "Admin password reset",
      type: "Email",
      lastUpdated: "2023-10-12",
      status: "Active",
    },
    {
      id: 25,
      name: "User Forget Password",
      subject: "Password reset instructions",
      type: "Email",
      lastUpdated: "2023-11-07",
      status: "Active",
    }
  ];

  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="outline" size="icon" asChild className="h-8 w-8">
          <Link href="/settings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Notification Settings</h1>
          <p className="text-sm text-muted-foreground">Configure email, SMS, and in-app notifications</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Welcome Email</CardTitle>
            <Mail className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">1,248</h2>
            <p className="text-xs text-muted-foreground">
              Sent this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Password Reset</CardTitle>
            <Mail className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">876</h2>
            <p className="text-xs text-muted-foreground">
              Sent this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Order Confirmation</CardTitle>
            <Mail className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">2,415</h2>
            <p className="text-xs text-muted-foreground">
              Sent this month
            </p>
          </CardContent>
        </Card>
      </div>

      <h1 className="text-2xl font-bold">Email Templates</h1>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Input type="search" placeholder="Search templates..." className="w-[300px]" />
        </div>
      </div>

      <Card className="bg-background">
        <CardContent className="p-0">
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:table-cell">Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {emailTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>{template.subject}</TableCell>
                    <TableCell className="hidden md:table-cell">{template.lastUpdated}</TableCell>
                    <TableCell>
                      <Badge variant={template.status === "Active" ? "default" : "secondary"}>
                        {template.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link href="/settings/notifications/1" className="flex gap-2">
                              <PencilIcon className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
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

    </div>
  )
}
