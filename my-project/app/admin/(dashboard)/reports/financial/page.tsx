"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {DatePicker} from "@/components/admin/date-range-picker"
import {CreditCardIcon, DollarSignIcon, SearchIcon, TrendingUpIcon, WalletIcon,} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/admin/ui/select"
import {Input} from "@/components/admin/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table"
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {ChartContainer, ChartTooltipContent} from "@/components/admin/ui/chart"
import {usePackageReport} from "@/app/admin/(dashboard)/reports/_hooks/usePackageReport";
import {useSearchParams} from "next/navigation";
import React, {useState} from "react";
import {AttributeSelect} from "@/components/admin/ui/attribute-select";
import {Button} from "@/components/admin/ui/button";
import {usePackages} from "@/app/shared-hooks/usePackages";
import Preloader from "@/components/shared/Preloader";

export default function FinancialReportsPage() {
  const { packages } = usePackages()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')

  const [filters, setFilters] = useState({
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    gender: searchParams.get('gender') || '',
    packageId: searchParams.get('packageId') || ''
  })

  const { packagesReport, packageReportLoading, refetch } = usePackageReport({
    startDate: filters.startDate,
    endDate: filters.endDate,
    gender: filters.gender,
    packageId: filters.packageId
  })

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (filters.startDate) params.append('startDate', filters.startDate)
    if (filters.endDate) params.append('endDate', filters.endDate)
    if (filters.gender && filters.gender !== 'all') params.append('gender', filters.gender)
    if (filters.packageId && filters.packageId !== 'all') params.append('packageId', filters.packageId)

    refetch().finally()
  }

  const handleFilterChange = (key: string, value?: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value ?? "",
    }))
  }

  // Prepare data for charts and tables from packagesReport
  const revenueByGenderData = packagesReport?.revenueByGender
      ? Object.entries(packagesReport.revenueByGender).map(([name, value]) => ({
        name,
        value: Number(value)
      }))
      : [];

  const monthlyRevenueData = packagesReport?.monthlyRevenue || [];
  const lastTenUserPackages = packagesReport?.lastTenUserPackages || [];

  if (!packagesReport) {
    return (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">No data available</p>
        </div>
    )
  }

  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">Track revenue, expenses, and financial performance metrics</p>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center w-fit">
          <DatePicker
              onDateChange={(date) => {
                handleFilterChange("startDate", date || "")
              }}
          />
          <AttributeSelect
              attributeKey="iAmA"
              value={filters.gender}
              onChange={(value) => handleFilterChange('gender', value || '')}
              placeholder="Select gender"
          />
          <Select
              value={filters.packageId}
              onValueChange={(value) => handleFilterChange('packageId', value)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Packages</SelectItem>
              {(packages ?? []).map((item) => (
                  <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>

        <div className="md:grid max-md:space-y-4 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Total Revenue</CardTitle>
              <DollarSignIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${packagesReport.totalPayments?.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {packagesReport.yearDifferencePercent !== null ? (
                    <span className={packagesReport.yearDifferencePercent >= 0 ? "text-green-500" : "text-red-500"}>
                  {packagesReport.yearDifferencePercent >= 0 ? '+' : ''}
                      {packagesReport.yearDifferencePercent}%
                </span>
                ) : (
                    <span>No comparison data</span>
                )} from last year
              </p>
              <div className="mt-4 h-1 w-full rounded-md bg-secondary">
                <div
                    className="h-1 rounded-md bg-primary"
                    style={{ width: `${Math.min(100, Math.max(0, packagesReport.yearDifferencePercent || 0))}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Active Packages</CardTitle>
              <WalletIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{packagesReport.activePackages}</div>
              <p className="text-xs text-muted-foreground">
                Currently active subscriptions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">This Month</CardTitle>
              <TrendingUpIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${packagesReport.thisMonthPayments?.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {packagesReport.lastMonthPayments > 0 ? (
                    <span className={packagesReport.thisMonthPayments >= packagesReport.lastMonthPayments ? "text-green-500" : "text-red-500"}>
                  {((packagesReport.thisMonthPayments - packagesReport.lastMonthPayments) / packagesReport.lastMonthPayments * 100).toFixed(1)}%
                </span>
                ) : (
                    <span>No last month data</span>
                )} from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Revenue by Gender</CardTitle>
              <CreditCardIcon className="size-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              {revenueByGenderData.map((item) => (
                  <div key={item.name} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-medium">${item.value.toFixed(2)}</span>
                  </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {packageReportLoading ? <div className="flex justify-center items-center h-64"><Preloader /></div> : <>
          <div className="md:grid max-md:space-y-4 gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ChartContainer
                      config={{
                        revenue: {
                          label: "Revenue",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                      <ComposedChart
                          data={monthlyRevenueData}
                          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12 }}
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            content={<ChartTooltipContent />}
                            wrapperStyle={{
                              backgroundColor: 'white',
                              padding: '8px',
                              borderRadius: '4px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey="revenue"
                            fill="var(--color-revenue)"
                            barSize={20}
                            radius={[4, 4, 0, 0]}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue by Gender</CardTitle>
                <CardDescription>Distribution of revenue by gender</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer
                      config={{
                        value: {
                          label: "Revenue",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                            data={revenueByGenderData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            paddingAngle={2}
                        >
                          {revenueByGenderData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                            content={<ChartTooltipContent />}
                            wrapperStyle={{
                              backgroundColor: 'white',
                              padding: '8px',
                              borderRadius: '4px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle>Recent Purchases</CardTitle>
                  <CardDescription>Last 10 package purchases</CardDescription>
                </div>
                <div className="relative w-full md:w-[320px]">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="Search customers..."
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table className="whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="whitespace-nowrap">
                  {lastTenUserPackages.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell className="font-medium">
                          {purchase.user.firstName} {purchase.user.lastName}
                        </TableCell>
                        <TableCell>{purchase.package.name}</TableCell>
                        <TableCell>
                          {new Date(purchase.purchaseDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          ${purchase.priceAtPurchase.toFixed(2)}
                        </TableCell>
                        <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                        purchase.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}>
                      {purchase.status}
                    </span>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>}
      </div>
  )
}

// Chart colors
const DEPARTMENT_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]