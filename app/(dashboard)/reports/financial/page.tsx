"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {DateRangePicker} from "@/components/date-range-picker"
import {CreditCardIcon, DollarSignIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon,} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
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
import {ChartContainer, ChartTooltipContent} from "@/components/ui/chart"

export default function FinancialReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Financial Reports</h1>
        <p className="text-muted-foreground">Track revenue, expenses, and financial performance metrics</p>
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

      <div className="md:grid max-md:space-y-4 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$128,450</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+18.2%</span> from last month
            </p>
            <div className="mt-4 h-1 w-full rounded-md bg-secondary">
              <div className="h-1 w-[75%] rounded-md bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Total Expenses</CardTitle>
            <WalletIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$87,325</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">+5.4%</span> from last month
            </p>
            <div className="mt-4 h-1 w-full rounded-md bg-secondary">
              <div className="h-1 w-[68%] rounded-md bg-red-500"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Net Profit</CardTitle>
            <TrendingUpIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$41,125</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.8%</span> from last month
            </p>
            <div className="mt-4 h-1 w-full rounded-md bg-secondary">
              <div className="h-1 w-[32%] rounded-md bg-green-500"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Payment Methods</CardTitle>
            <CreditCardIcon className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Credit Card</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span>Debit Card</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between">
              <span>Other</span>
              <span className="font-medium">1</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:grid max-md:space-y-4 gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison of revenue and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    expenses: {
                      label: "Expenses",
                      color: "hsl(var(--chart-2))",
                    },
                    profit: {
                      label: "Profit",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                  <ComposedChart
                      data={monthlyFinancialData}
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
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
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
                    <Legend
                        verticalAlign="top"
                        height={36}
                        wrapperStyle={{ paddingBottom: '20px' }}
                    />
                    <Bar
                        dataKey="revenue"
                        fill="var(--color-revenue)"
                        barSize={20}
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        dataKey="expenses"
                        fill="var(--color-expenses)"
                        barSize={20}
                        radius={[4, 4, 0, 0]}
                    />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="var(--color-profit)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Best Selling Package</CardTitle>
            <CardDescription>Distribution of revenue across different departments</CardDescription>
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
                        data={departmentRevenueData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                    >
                      {departmentRevenueData.map((entry, index) => (
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
                    <Legend
                    />
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
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Monthly financial performance metrics</CardDescription>
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
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead className="text-right">Margin</TableHead>
                <TableHead className="text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {financialSummary.map((month) => (
                  <TableRow key={month.id}>
                    <TableCell className="font-medium">{month.month}</TableCell>
                    <TableCell className="text-right">${month.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${month.expenses.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${month.profit.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{month.margin}%</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {month.growth > 0 ? (
                            <>
                              <span className="text-green-500">+{month.growth}%</span>
                              <TrendingUpIcon className="h-4 w-4 text-green-500" />
                            </>
                        ) : (
                            <>
                              <span className="text-red-500">{month.growth}%</span>
                              <TrendingDownIcon className="h-4 w-4 text-red-500" />
                            </>
                        )}
                      </div>
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

// Sample data for the tables
const financialSummary = [
  {
    id: 1,
    month: "April 2023",
    revenue: 128450,
    expenses: 87325,
    profit: 41125,
    margin: 32.0,
    growth: 12.8,
  },
  {
    id: 2,
    month: "March 2023",
    revenue: 108650,
    expenses: 82850,
    profit: 25800,
    margin: 23.7,
    growth: 8.5,
  },
  {
    id: 3,
    month: "February 2023",
    revenue: 100150,
    expenses: 76350,
    profit: 23800,
    margin: 23.8,
    growth: -2.1,
  },
  {
    id: 4,
    month: "January 2023",
    revenue: 102300,
    expenses: 78250,
    profit: 24050,
    margin: 23.5,
    growth: 5.2,
  },
  {
    id: 5,
    month: "December 2022",
    revenue: 97250,
    expenses: 74450,
    profit: 22800,
    margin: 23.4,
    growth: -1.8,
  },
]

// Chart data
const monthlyFinancialData = [
  { month: "Jan", revenue: 102300, expenses: 78250, profit: 24050 },
  { month: "Feb", revenue: 100150, expenses: 76350, profit: 23800 },
  { month: "Mar", revenue: 108650, expenses: 82850, profit: 25800 },
  { month: "Apr", revenue: 128450, expenses: 87325, profit: 41125 },
  { month: "May", revenue: 116700, expenses: 83200, profit: 33500 },
  { month: "Jun", revenue: 121500, expenses: 85100, profit: 36400 },
]

const departmentRevenueData = [
  { name: "Cardiology", value: 35250 },
  { name: "Orthopedics", value: 28750 },
  { name: "Neurology", value: 18500 },
  { name: "Pediatrics", value: 15750 },
  { name: "Dermatology", value: 12350 },
  { name: "Other", value: 17850 },
]

// Chart colors
const DEPARTMENT_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]
