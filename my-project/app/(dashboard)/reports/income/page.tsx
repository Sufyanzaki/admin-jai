"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {DateRangePicker} from "@/components/date-range-picker"
import {CreditCardIcon, DollarSignIcon, SearchIcon, TrendingDownIcon, TrendingUpIcon, UserIcon, WalletIcon,} from "lucide-react"
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
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Income Report</h1>
          </div>
          <p className="text-muted-foreground">Track revenue streams, payment trends, and financial performance</p>
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
          <div className="relative w-full md:w-[320px]">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search customers..." className="w-full pl-8" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Avg. monthly</CardTitle>
              <DollarSignIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,584</div>
              <p className="text-xs text-muted-foreground">+12% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Last 3 months</CardTitle>
              <TrendingUpIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,298</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+8.5%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Total this year</CardTitle>
              <UserIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">460 Travel</div>
              <p className="text-xs text-muted-foreground">$5,600 (36% of total)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Difference with last year</CardTitle>
              <CreditCardIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+3%</span> from previous period
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Income Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Income</CardTitle>
              <CardDescription>Revenue trends for the current year</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={incomeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" barSize={20} name="Revenue" />
                  <Line type="monotone" dataKey="revenue" stroke="#ff7300" name="Trend" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Customer Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Gender</CardTitle>
              <CardDescription>Income distribution by customer type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                      data={customerRevenueData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerRevenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Income Details Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <CardTitle>Customer Income Details</CardTitle>
                <CardDescription>Monthly revenue breakdown by customer</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Jan</TableHead>
                  <TableHead>Feb</TableHead>
                  <TableHead>Mar</TableHead>
                  <TableHead>Apr</TableHead>
                  <TableHead>May</TableHead>
                  <TableHead>Jun</TableHead>
                  <TableHead>Jul</TableHead>
                  <TableHead>Aug</TableHead>
                  <TableHead>Sep</TableHead>
                  <TableHead>Oct</TableHead>
                  <TableHead>Nov</TableHead>
                  <TableHead>Dec</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">460 Travel</TableCell>
                  <TableCell>$1,400.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$1,400.00</TableCell>
                  <TableCell>$1,400.00</TableCell>
                  <TableCell>$1,400.00</TableCell>
                  <TableCell>$1,400.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell className="text-right">$5,600.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Global Corp</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell className="text-right">$30,000.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  )
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const incomeData = [
  { month: 'Jan', revenue: 3900 },
  { month: 'Feb', revenue: 2500 },
  { month: 'Mar', revenue: 2500 },
  { month: 'Apr', revenue: 3900 },
  { month: 'May', revenue: 3900 },
  { month: 'Jun', revenue: 3900 },
  { month: 'Jul', revenue: 3900 },
  { month: 'Aug', revenue: 2500 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2500 },
  { month: 'Nov', revenue: 2500 },
  { month: 'Dec', revenue: 2500 },
];

const customerRevenueData = [
  { name: '460 Travel', value: 5600 },
  { name: 'Global Corp', value: 30000 },
  { name: 'Individual Clients', value: 20000 },
  { name: 'Local Businesses', value: 10000 },
];