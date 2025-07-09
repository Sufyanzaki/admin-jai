"use client"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {DateRangePicker} from "@/components/date-range-picker"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {CalendarIcon, DownloadIcon, FilterIcon, PackageIcon, RefreshCwIcon, SearchIcon, TruckIcon, UsersIcon,} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Cell, Legend, Pie, PieChart, ResponsiveContainer,} from "recharts"
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"

const memberRoleData = [
  { name: "member", value: 1050, color: "#8884d8", label: "Member" },
  { name: "admin", value: 25, color: "#82ca9d", label: "Admin" },
  { name: "moderator", value: 170, color: "#ffc658", label: "Moderator" },
];

const memberStatusData = [
  { name: "active", value: 1032, color: "#4ade80", label: "Active" },
  { name: "inactive", value: 183, color: "#facc15", label: "Inactive" },
  { name: "suspended", value: 30, color: "#f87171", label: "Suspended" },
];

export default function InventoryReportPage() {
  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Member Report</h1>
          </div>
          <p className="text-muted-foreground">Track member information, status, and demographics</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <DateRangePicker />
            <Select defaultValue="all-services">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Relationship Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-services">Relationship Status</SelectItem>
                <SelectItem value="all-single">Single</SelectItem>
                <SelectItem value="consultations">Married</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-service">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-service">Status</SelectItem>
                <SelectItem value="all-active">Active</SelectItem>
                <SelectItem value="consultations">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-departments">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-departments">Country</SelectItem>
                <SelectItem value="cardiology">Germany</SelectItem>
                <SelectItem value="neurology">India</SelectItem>
                <SelectItem value="orthopedics">Spain</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Total Members</CardTitle>
              <UsersIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">+28 members this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Active Members</CardTitle>
              <Badge variant="success" className="px-1.5 py-0.5 text-xs">
                1,032
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82.9%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">New Members</CardTitle>
              <Badge variant="secondary">
                28
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.2%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+0.8%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Avg. Membership</CardTitle>
              <CalendarIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 years</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+0.3</span> from last year
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="md:grid max-md:space-y-6 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Members by Role</CardTitle>
              <CardDescription>Distribution of members by their roles</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer
                  config={{
                    member: {
                      label: "Member",
                      color: "#8884d8",
                    },
                    admin: {
                      label: "Admin",
                      color: "#82ca9d",
                    },
                    moderator: {
                      label: "Moderator",
                      color: "#ffc658",
                    },
                  }}
                  className="h-[300px] w-full max-w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                        data={memberRoleData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                      {memberRoleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Member Status Distribution</CardTitle>
              <CardDescription>Current status of all members</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer
                  config={{
                    active: {
                      label: "Active",
                      color: "#4ade80",
                    },
                    inactive: {
                      label: "Inactive",
                      color: "#facc15",
                    },
                    suspended: {
                      label: "Suspended",
                      color: "#f87171",
                    },
                  }}
                  className="h-[300px] w-full max-w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                        data={memberStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                      {memberStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{
                          paddingTop: "20px",
                          fontSize: "12px"
                        }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <CardTitle>Recent Members</CardTitle>
                <CardDescription>New members who joined recently</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Search..." className="h-8 w-[150px] lg:w-[250px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="whitespace-nowrap">
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Relationship Type</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Join Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="whitespace-nowrap">
                <TableRow>
                  <TableCell className="font-medium">taeda</TableCell>
                  <TableCell>Member</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>Single - no children</TableCell>
                  <TableCell>Pakistan</TableCell>
                  <TableCell>Faisalabad</TableCell>
                  <TableCell>07/02/2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">john_doe</TableCell>
                  <TableCell>Member</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>Married</TableCell>
                  <TableCell>USA</TableCell>
                  <TableCell>New York</TableCell>
                  <TableCell>06/15/2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">sarah_smith</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>Single - with children</TableCell>
                  <TableCell>UK</TableCell>
                  <TableCell>London</TableCell>
                  <TableCell>05/22/2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">mike_jones</TableCell>
                  <TableCell>Moderator</TableCell>
                  <TableCell>
                    <Badge variant="warning">Inactive</Badge>
                  </TableCell>
                  <TableCell>Divorced</TableCell>
                  <TableCell>Canada</TableCell>
                  <TableCell>Toronto</TableCell>
                  <TableCell>04/10/2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">lisa_wang</TableCell>
                  <TableCell>Member</TableCell>
                  <TableCell>
                    <Badge variant="destructive">Suspended</Badge>
                  </TableCell>
                  <TableCell>Single - no children</TableCell>
                  <TableCell>Australia</TableCell>
                  <TableCell>Sydney</TableCell>
                  <TableCell>03/28/2025</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  )
}
