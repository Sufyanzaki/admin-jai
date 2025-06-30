"use client";

import type React from "react";
import {useState} from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Clock, CreditCard,
  DollarSign, Download, EyeIcon, FileText,
  List,
  MoreHorizontal,
  Package,
  PackageCheck,
  PencilIcon, Plus, Receipt,
  RotateCcw,
  Search, SquarePen, Trash2,
  XCircle
} from "lucide-react";
import Link from "next/link";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const monthlyAppointmentsData = [
  {
    name: "January",
    appointments: 320,
    newPatients: 120,
    followUps: 200
  },
  {
    name: "February",
    appointments: 280,
    newPatients: 90,
    followUps: 190
  },
  {
    name: "March",
    appointments: 350,
    newPatients: 140,
    followUps: 210
  },
  {
    name: "April",
    appointments: 310,
    newPatients: 110,
    followUps: 200
  },
  {
    name: "May",
    appointments: 290,
    newPatients: 100,
    followUps: 190
  },
  {
    name: "June",
    appointments: 330,
    newPatients: 130,
    followUps: 200
  }
];

const paymentStats = [
  {
    title: "Total Payments",
    value: "€216",
    icon: <DollarSign className="size-6 text-muted-foreground" />,
    description: "All time payments received",
    status: "completed",
    count: 12 // example count
  },
  {
    title: "Active Packages",
    value: "4",
    icon: <Package className="size-6 text-muted-foreground" />,
    description: "Active packages",
    status: "active",
    count: 4
  },
  {
    title: "This Month",
    value: "€0",
    icon: <Calendar className="size-6 text-muted-foreground" />,
    description: "Current month payments",
    status: "pending",
    count: 0
  },
  {
    title: "Last Month",
    value: "€0",
    icon: <CalendarDays className="size-6 text-muted-foreground" />,
    description: "Previous month payments",
    status: "completed",
    count: 0
  },
  {
    title: "This Year",
    value: "€216",
    icon: <CalendarCheck className="size-6 text-muted-foreground" />,
    description: "Current year payments",
    status: "completed",
    count: 12
  },
  {
    title: "Last Year",
    value: "€0",
    icon: <CalendarRange className="size-6 text-muted-foreground" />,
    description: "Previous year payments",
    status: "completed",
    count: 0
  }
];


// Sample order data
const orders = [
  {
    id: 1,
    name: "Aimen Ali",
    tier: "Vip",
    method: "Admin Buy",
    amount: "Є17",
    status: "Paid",
    date: "14-04-2025",
  },
  {
    id: 2,
    name: "Umair Ali",
    tier: "Silver",
    method: "stripe",
    amount: "Є37",
    status: "Paid",
    date: "14-04-2025",
  },
  {
    id: 3,
    name: "Talha Khalid",
    tier: "Vip",
    method: "Admin Buy",
    amount: "Є100",
    status: "Paid",
    date: "14-04-2025",
  },
  {
    id: 4,
    name: "Salman Khan",
    tier: "Silver",
    method: "Admin Buy",
    amount: "Є37",
    status: "Paid",
    date: "23-04-2025",
  },
  {
    id: 5,
    name: "kris Acngel",
    tier: "Vip",
    method: "mollie",
    amount: "Є5",
    status: "Paid",
    date: "28-04-2025",
  },
  {
    id: 6,
    name: "kris Acngel",
    tier: "Vip",
    method: "mollie",
    amount: "Є5",
    status: "Pending",
    date: "28-04-2025",
  },
  {
    id: 7,
    name: "kris Acngel",
    tier: "Vip",
    method: "mollie",
    amount: "Є5",
    status: "Delivered",
    date: "28-04-2025",
  },
  {
    id: 8,
    name: "kris Acngel",
    tier: "Vip",
    method: "mollie",
    amount: "Є5",
    status: "Returned",
    date: "28-04-2025",
  },
  {
    id: 9,
    name: "kris Acngel",
    tier: "Vip",
    method: "mollie",
    amount: "Є5",
    status: "Cancelled",
    date: "28-04-2025",
  },
];

export default function PaymentsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterOrdersByTab = (tabValue: string) => {
    if (tabValue === "all") return orders;
    return orders.filter(order => order.status.toLowerCase() === tabValue);
  };

  const filterOrdersBySearch = (ordersToFilter: typeof orders) => {
    if (!searchTerm) return ordersToFilter;
    const lower = searchTerm.toLowerCase();
    return ordersToFilter.filter(
        (order) =>
            order.name.toLowerCase().includes(lower) ||
            order.tier.toLowerCase().includes(lower) ||
            order.method.toLowerCase().includes(lower)
    );
  };

  return (
      <div className="p-4 xl:p-6">
        <div className="flex flex-col gap-5 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Payments</h1>
              <p className="text-muted-foreground">Manage your payments and their records.</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          {/* Payment Stats - 30% width */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {paymentStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-md xl:text-lg font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="h-1 w-full bg-muted">
                        <div
                            className={`h-1 ${
                                stat.status === "completed"
                                    ? "bg-green-500"
                                    : stat.status === "pending"
                                        ? "bg-amber-500"
                                        : "bg-blue-500"
                            }`}
                            style={{
                              width: `${(stat.count / Math.max(...paymentStats.map(s => s.count))) * 100}%`
                            }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{stat.count}</span>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to Delete this order?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. The order's data will be permanently removed.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setDeleteDialogOpen(false)} className="bg-red-500 text-neutral-50 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <TabsList className="grid grid-cols-5 md:max-w-xl">
              <TabsTrigger value="all" className="flex items-center gap-1 justify-center">
                <List className="w-4 h-4" />
                All Orders
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-1 justify-center">
                <Clock className="w-4 h-4" />
                Pending
              </TabsTrigger>
              <TabsTrigger value="delivered" className="flex items-center gap-1 justify-center">
                <PackageCheck className="w-4 h-4" />
                Delivered
              </TabsTrigger>
              <TabsTrigger value="returned" className="flex items-center gap-1 justify-center">
                <RotateCcw className="w-4 h-4" />
                Returns
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex items-center gap-1 justify-center">
                <XCircle className="w-4 h-4" />
                Cancelled
              </TabsTrigger>
            </TabsList>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Search orders..."
                  className="pl-9 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={handleSearchChange}
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterOrdersBySearch(filterOrdersByTab("all")).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={"/user-2.png"} alt={order.name} />
                                <AvatarFallback>{order.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{order.name}</p>
                                <p className="text-sm text-muted-foreground md:hidden">
                                  {order.tier} • {order.method}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{order.tier}</TableCell>
                          <TableCell>{order.method}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>
                            <Badge
                                variant="outline"
                                className={
                                  order.status === "Paid" ? "bg-green-500/20 text-green-700 border-green-500" :
                                      order.status === "Pending" ? "bg-yellow-500/20 text-yellow-700 border-yellow-500" :
                                          order.status === "Delivered" ? "bg-blue-500/20 text-blue-700 border-blue-500" :
                                              order.status === "Returned" ? "bg-purple-500/20 text-purple-700 border-purple-500" :
                                                  order.status === "Cancelled" ? "bg-red-500/20 text-red-700 border-red-500" :
                                                      "bg-gray-500/20 text-gray-700 border-gray-500"
                                }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                  <Link href={`/payments/1`}>
                                    <Receipt className="mr-2 h-4 w-4" />
                                    View Order
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
          </TabsContent>

          {["pending", "delivered", "returned", "cancelled"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <Card>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Tier</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterOrdersBySearch(filterOrdersByTab(tab)).map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={"/user-2.png"} alt={order.name} />
                                    <AvatarFallback>{order.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{order.name}</p>
                                    <p className="text-sm text-muted-foreground md:hidden">
                                      {order.tier} • {order.method}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{order.tier}</TableCell>
                              <TableCell>{order.method}</TableCell>
                              <TableCell>{order.amount}</TableCell>
                              <TableCell>
                                <Badge
                                    variant="outline"
                                    className={
                                      order.status === "Paid" ? "bg-green-500/20 text-green-700 border-green-500" :
                                          order.status === "Pending" ? "bg-yellow-500/20 text-yellow-700 border-yellow-500" :
                                              order.status === "Delivered" ? "bg-blue-500/20 text-blue-700 border-blue-500" :
                                                  order.status === "Returned" ? "bg-purple-500/20 text-purple-700 border-purple-500" :
                                                      order.status === "Cancelled" ? "bg-red-500/20 text-red-700 border-red-500" :
                                                          "bg-gray-500/20 text-gray-700 border-gray-500"
                                    }
                                >
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem asChild>
                                      <Link href={`/orders/${order.id}`}>View Order</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)} className="text-red-600">
                                      Delete
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
              </TabsContent>
          ))}
        </Tabs>
      </div>
  );
}