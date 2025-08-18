"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card"
import { DatePicker } from "@/components/admin/date-range-picker"
import {CalendarIcon, CheckCircleIcon, ClockIcon, XCircleIcon} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/admin/ui/select"
import {Input} from "@/components/admin/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table"
import {Badge} from "@/components/admin/ui/badge"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/admin/ui/chart"
import {useDetailReport} from "@/app/admin/(dashboard)/reports/_hooks/useDetailReport"
import Preloader from "@/components/shared/Preloader"
import {useRouter, useSearchParams} from "next/navigation"
import React, {useState} from "react"
import {Button} from "@/components/admin/ui/button";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function DetailedReportsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    status: searchParams.get('status') || '',
    role: searchParams.get('role') || '',
  })

  const { detailReport, detailReportLoading, refetch } = useDetailReport({
    startDate: filters.startDate,
    endDate: filters.endDate,
    status: filters.status,
    role: filters.role,
  })

  const handleFilterChange = (key: string, value?: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value ?? "",
    }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (filters.startDate) params.append('startDate', filters.startDate)
    if (filters.endDate) params.append('endDate', filters.endDate)
    if (filters.status) params.append('status', filters.status)
    if (filters.role) params.append('role', filters.role)

    router.push(`/admin/reports/detailed?${params.toString()}`)
    refetch()
  }

  // Transform API data for charts
  const relationshipStatusData = detailReport?.data?.relationshipPercentages?.map(item => ({
    name: item.status,
    value: item.count,
    percentage: item.percentage
  })) || []

  const originData = detailReport?.data?.top5Origins?.map(item => ({
    name: item.origin,
    appointments: item._count.origin
  })) || []

  const religionData = detailReport?.data?.religionGroup?.map(item => ({
    name: item.religion,
    value: item._count.religion
  })) || []

  const careerData = detailReport?.data?.careerGroup?.map(item => ({
    name: item.primarySpecialization,
    value: item._count.primarySpecialization
  })) || []

  if(!detailReport && detailReportLoading){
    return (
        <div className="flex justify-center items-center h-64">
          <Preloader />
        </div>
    )
  }

  if (!detailReport && !detailReportLoading) {
    return (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">No data available</p>
        </div>
    )
  }

  if(!detailReport){
    return (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">No data available</p>
        </div>
    )
  }


  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Detailed Reports</h1>
          <p className="text-muted-foreground">Analyze user data, track trends, and generate detailed reports</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <DatePicker
                onDateChange={(date) => {
                  handleFilterChange("startDate", date || "")
                }}
            />
            <Select
                value={filters.role}
                onValueChange={(value) => handleFilterChange('role', value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="CLIENT">Client</SelectItem>
                <SelectItem value="MODERATOR">Moderator</SelectItem>
              </SelectContent>
            </Select>
            <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Daily Logins</CardTitle>
              <CalendarIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl lg:text-4xl mb-2 font-bold">{detailReport.data.totalLogins}</h2>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              <div className="mt-4 h-1 w-full rounded-md bg-secondary">
                <div
                    className="h-1 rounded-md bg-primary"
                    style={{ width: `${(detailReport.data.totalLogins / (detailReport.data.totalLogins + detailReport.data.neverLoggedIn)) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Completed Profiles</CardTitle>
              <CheckCircleIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl lg:text-4xl mb-2 font-bold">{detailReport.data.completedProfiles}</h2>
              <p className="text-xs text-muted-foreground">
                {((detailReport.data.completedProfiles / detailReport.data.totalLogins) * 100).toFixed(1)}% completion rate
              </p>
              <div className="mt-4 h-1 w-full rounded-md bg-secondary">
                <div
                    className="h-1 rounded-md bg-green-500"
                    style={{ width: `${(detailReport.data.completedProfiles / detailReport.data.totalLogins) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Deleted Accounts</CardTitle>
              <XCircleIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl lg:text-4xl mb-2 font-bold">{detailReport.data.deletedProfiles}</h2>
              <p className="text-xs text-muted-foreground">
                {((detailReport.data.deletedProfiles / detailReport.data.totalLogins) * 100).toFixed(1)}% deletion rate
              </p>
              <div className="mt-4 h-1 w-full rounded-md bg-secondary">
                <div
                    className="h-1 rounded-md bg-red-500"
                    style={{ width: `${(detailReport.data.deletedProfiles / detailReport.data.totalLogins) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Never Logged In</CardTitle>
              <ClockIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl lg:text-4xl mb-2 font-bold">{detailReport.data.neverLoggedIn}</h2>
              <p className="text-xs text-muted-foreground">
                {((detailReport.data.neverLoggedIn / detailReport.data.totalLogins) * 100).toFixed(1)}% no-show rate
              </p>
              <div className="mt-4 h-1 w-full rounded-md bg-secondary">
                <div
                    className="h-1 rounded-md bg-amber-500"
                    style={{ width: `${(detailReport.data.neverLoggedIn / detailReport.data.totalLogins) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Relationship Status</CardTitle>
              <CardDescription>Breakdown of users by relationship status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                        data={relationshipStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                      {relationshipStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} users`, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Top Origins</CardTitle>
              <CardDescription>Distribution of users by origin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                      layout="vertical"
                      data={originData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 80,
                        bottom: 5,
                      }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="appointments" fill="#8884d8" name="Users" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* More charts for religion and gender */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Religion</CardTitle>
              <CardDescription>Breakdown of users by religion</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={religionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" barSize={20} name="Users" />
                  <Line type="monotone" dataKey="value" stroke="#ff7300" name="Trend" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Career</CardTitle>
              <CardDescription>Breakdown of users by career</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer className="h-[300px] w-full max-w-full" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                        data={careerData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                      {careerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

        {/* Recent Users Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Detailed view of the last 10 users</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Search users..." className="h-8 w-[150px] lg:w-[250px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="whitespace-nowrap">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailReport.data.lastTenAccounts.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.firstName || 'Unknown'} {user.lastName || ''}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge
                            variant="outline"
                            className={
                              user.isDeleted
                                  ? "border-red-500 bg-red-500/10 text-red-500"
                                  : user.isActive
                                      ? "border-green-500 bg-green-500/10 text-green-500"
                                      : "border-amber-500 bg-amber-500/10 text-amber-500"
                            }
                        >
                          {user.isDeleted ? 'Deleted' : user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
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