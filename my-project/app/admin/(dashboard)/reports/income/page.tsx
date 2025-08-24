"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { DatePicker } from "@/components/admin/date-range-picker"
import { CreditCardIcon, DollarSignIcon, TrendingUpIcon, UserIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table"
import {
  Bar,
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
import { usePackageReport } from "@/app/admin/(dashboard)/reports/_hooks/usePackageReport"
import { usePackages } from "@/app/shared-hooks/usePackages"
import { useSearchParams } from "next/navigation"
import React, { useState } from "react"
import { useTranslation } from "react-i18next";
import Preloader from "@/components/shared/Preloader"
import { Badge } from "@/components/admin/ui/badge";
import { AttributeSelect } from "@/components/admin/ui/attribute-select";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

export default function FinancialReportsPage() {
  const { t } = useTranslation();
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

  const { packages } = usePackages()

  const handleFilterChange = (key: string, value?: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value ?? "",
    }))
  }

  if (!packagesReport && packageReportLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Preloader />
      </div>
    )
  }

  if (!packagesReport && !packageReportLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader />
        <p className="text-sm">{t('Loading')}</p>
      </div>
    )
  }

  if (!packagesReport) {
    return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader />
        <p className="text-sm">Loading</p>
      </div>
    )
  }

  const monthlyRevenueData = packagesReport.monthlyRevenue.map(item => ({
    month: item.month,
    revenue: item.revenue
  }))

  const revenueByGenderData = Object.entries(packagesReport.revenueByGender).map(([name, value]) => ({
    name,
    value
  }))

  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{t('Income Report')}</h1>
        </div>
        <p className="text-muted-foreground">{t('Track revenue streams, payment trends, and financial performance')}</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
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
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t('Total Payments')}</CardTitle>
            <DollarSignIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${packagesReport.totalPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {packagesReport.yearDifferencePercent !== null ?
                `${packagesReport.yearDifferencePercent > 0 ? '+' : ''}${packagesReport.yearDifferencePercent}% from last year` :
                'No comparison data'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t('Active Packages')}</CardTitle>
            <TrendingUpIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{packagesReport.activePackages}</div>
            <p className="text-xs text-muted-foreground">
              ${packagesReport.thisMonthPayments.toFixed(2)} {t("this month")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t('This Year')}</CardTitle>
            <UserIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${packagesReport.thisYearPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ${packagesReport.lastYearPayments.toFixed(2)} {t("last year")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t('This Month')}</CardTitle>
            <CreditCardIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${packagesReport.thisMonthPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ${packagesReport.lastMonthPayments.toFixed(2)} {t("last month")}
            </p>
          </CardContent>
        </Card>
      </div>

      {packageReportLoading ? <div className="h-64 flex justify-center items-center">
        <Preloader />
      </div> : <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('Monthly Income')}</CardTitle>
              <CardDescription>{t('Revenue trends for the current year')}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" barSize={20} name="Revenue" />
                  <Line type="monotone" dataKey="revenue" stroke="#ff7300" name="Trend" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Revenue by Gender')}</CardTitle>
              <CardDescription>{t('Income distribution by customer gender')}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByGenderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByGenderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <CardTitle>{t('Recent Purchases')}</CardTitle>
                <CardDescription>{t('Last 10 package purchases')}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('Customer')}</TableHead>
                  <TableHead>{t('Package')}</TableHead>
                  <TableHead>{t('Purchase Date')}</TableHead>
                  <TableHead>{t('Status')}</TableHead>
                  <TableHead className="text-right">{t('Amount')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packagesReport.lastTenUserPackages.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell className="font-medium">
                      {purchase.user.firstName} {purchase.user.lastName}
                    </TableCell>
                    <TableCell>{purchase.package.name}</TableCell>
                    <TableCell>
                      {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={purchase.status === 'ACTIVE' ? 'default' : 'secondary'}>
                        {t(purchase.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${purchase.priceAtPurchase.toFixed(2)}
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
};