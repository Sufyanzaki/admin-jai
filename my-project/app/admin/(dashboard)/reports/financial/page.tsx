"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {DatePicker} from "@/components/admin/date-range-picker"
import {CreditCardIcon, DollarSignIcon, TrendingUpIcon, WalletIcon,} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/admin/ui/select"
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
import { useTranslation } from "react-i18next";
import {AttributeSelect} from "@/components/admin/ui/attribute-select";
import {usePackages} from "@/app/shared-hooks/usePackages";
import Preloader from "@/components/shared/Preloader";

export default function FinancialReportsPage() {
  const { t } = useTranslation();
  const { packages } = usePackages()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    gender: searchParams.get('gender') || '',
    packageId: searchParams.get('packageId') || ''
  })

  const { packagesReport, packageReportLoading } = usePackageReport({
    startDate: filters.startDate,
    endDate: filters.endDate,
    gender: filters.gender,
    packageId: filters.packageId
  })

  const handleFilterChange = (key: string, value?: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value ?? "",
    }))
  }

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
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">{t('Loading')}</p>
        </div>
    )
  }

  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{t('Financial Reports')}</h1>
          <p className="text-muted-foreground">{t('Track revenue, expenses, and financial performance metrics')}</p>
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
              <SelectValue placeholder={t('Package')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('All Packages')}</SelectItem>
              {(packages ?? []).map((item) => (
                  <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:grid max-md:space-y-4 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm xl:text-lg font-medium">{t('Total Revenue')}</CardTitle>
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
                    <span>{t("No comparison data")}</span>
                )} {t("from last year")}
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
                <CardTitle className="text-sm xl:text-lg font-medium">{t('Active Packages')}</CardTitle>
              <WalletIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{packagesReport.activePackages}</div>
              <p className="text-xs text-muted-foreground">
                {t("Currently active subscriptions")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm xl:text-lg font-medium">{t('This Month')}</CardTitle>
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
                    <span>{t("No last month data")}</span>
                )} {t("from last month")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm xl:text-lg font-medium">{t('Revenue by Gender')}</CardTitle>
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
                <CardTitle>{t('Monthly Revenue')}</CardTitle>
                <CardDescription>{t('Revenue trends over time')}</CardDescription>
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
                <CardTitle>{t('Revenue by Gender')}</CardTitle>
                <CardDescription>{t('Distribution of revenue by gender')}</CardDescription>
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
                  <CardTitle>{t('Recent Purchases')}</CardTitle>
                  <CardDescription>{t('Last 10 package purchases')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table className="whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('User')}</TableHead>
                    <TableHead>{t('Package')}</TableHead>
                    <TableHead>{t('Purchase Date')}</TableHead>
                    <TableHead className="text-right">{t('Price')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
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
                          {t(purchase.status)}
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