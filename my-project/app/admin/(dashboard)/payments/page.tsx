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
} from "@/components/admin/ui/alert-dialog";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/admin/ui/avatar";
import {Badge} from "@/components/admin/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Input} from "@/components/admin/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table";
import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  Clock,
  CreditCard,
  DollarSign,
  List,
  Package,
  PackageCheck,
  Search,
  XCircle
} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/admin/ui/tabs";
import {usePayments} from "@/app/admin/(dashboard)/payments/_hooks/usePayments";
import Preloader from "@/components/shared/Preloader";
import {UserPackageDto} from "@/app/admin/(dashboard)/payments/_types/payment";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-500/20 text-green-700 border-green-500",
  EXPIRED: "bg-red-500/20 text-red-700 border-red-500",
  CANCELLED: "bg-gray-500/20 text-gray-700 border-gray-500",
  PENDING: "bg-yellow-500/20 text-yellow-700 border-yellow-500"
};

export default function PaymentsPage() {
  const { payments, paymentLoading } = usePayments();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterPaymentsByTab = (tabValue: string) => {
    if (tabValue === "all") return payments?.lastTenUserPackages || [];
    return (payments?.lastTenUserPackages || []).filter(pkg =>
        tabValue === "active" ? pkg.status === "ACTIVE" :
            tabValue === "expired" ? pkg.status === "EXPIRED" :
                pkg.status === "CANCELLED"
    );
  };

  const filterPaymentsBySearch = (paymentsToFilter: UserPackageDto[]) => {
    if (!searchTerm) return paymentsToFilter;
    const lower = searchTerm.toLowerCase();
    return paymentsToFilter.filter(
        (pkg) =>
            pkg.user.firstName.toLowerCase().includes(lower) ||
            pkg.user.lastName.toLowerCase().includes(lower) ||
            pkg.package.name.toLowerCase().includes(lower) ||
            pkg.status.toLowerCase().includes(lower)
    );
  };

  if (paymentLoading || !payments) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">Loading your payments...</p>
        </div>
    );
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Payment stats based on actual data
  const paymentStats = [
    {
      title: "Total Payments",
      value: formatCurrency(payments.totalPayments),
      icon: <DollarSign className="size-6 text-muted-foreground" />,
      description: "All time payments received",
      status: "completed",
      count: payments.lastTenUserPackages.length
    },
    {
      title: "Active Packages",
      value: payments.activePackages.toString(),
      icon: <Package className="size-6 text-muted-foreground" />,
      description: "Active packages",
      status: "active",
      count: payments.activePackages
    },
    {
      title: "This Month",
      value: formatCurrency(payments.thisMonthPayments),
      icon: <Calendar className="size-6 text-muted-foreground" />,
      description: "Current month payments",
      status: payments.thisMonthPayments > 0 ? "completed" : "pending",
      count: payments.lastTenUserPackages.filter(p =>
          new Date(p.purchaseDate).getMonth() === new Date().getMonth()
      ).length
    },
    {
      title: "Last Month",
      value: formatCurrency(payments.lastMonthPayments),
      icon: <CalendarDays className="size-6 text-muted-foreground" />,
      description: "Previous month payments",
      status: payments.lastMonthPayments > 0 ? "completed" : "pending",
      count: payments.lastTenUserPackages.filter(p => {
        const date = new Date(p.purchaseDate);
        const now = new Date();
        return date.getMonth() === (now.getMonth() - 1 + 12) % 12 &&
            date.getFullYear() === (now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear());
      }).length
    },
    {
      title: "This Year",
      value: formatCurrency(payments.thisYearPayments),
      icon: <CalendarCheck className="size-6 text-muted-foreground" />,
      description: "Current year payments",
      status: "completed",
      count: payments.lastTenUserPackages.filter(p =>
          new Date(p.purchaseDate).getFullYear() === new Date().getFullYear()
      ).length
    },
    {
      title: "Last Year",
      value: formatCurrency(payments.lastYearPayments),
      icon: <CreditCard className="size-6 text-muted-foreground" />,
      description: "Previous year payments",
      status: payments.lastYearPayments > 0 ? "completed" : "pending",
      count: payments.lastTenUserPackages.filter(p =>
          new Date(p.purchaseDate).getFullYear() === new Date().getFullYear() - 1
      ).length
    }
  ];

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
                              width: `${(stat.count / Math.max(1, ...paymentStats.map(s => s.count))) * 100}%`
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
              <AlertDialogTitle>Are you sure you want to Delete this payment?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. The payment&#39;s data will be permanently removed.</AlertDialogDescription>
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
            <TabsList className="grid grid-cols-4 md:max-w-xl">
              <TabsTrigger value="all" className="flex items-center gap-1 justify-center">
                <List className="w-4 h-4" />
                All Payments
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-1 justify-center">
                <PackageCheck className="w-4 h-4" />
                Active
              </TabsTrigger>
              <TabsTrigger value="expired" className="flex items-center gap-1 justify-center">
                <Clock className="w-4 h-4" />
                Expired
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex items-center gap-1 justify-center">
                <XCircle className="w-4 h-4" />
                Cancelled
              </TabsTrigger>
            </TabsList>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Search payments..."
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
                      <TableHead>Customer</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Purchase Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterPaymentsBySearch(filterPaymentsByTab("all")).map((pkg) => (
                        <TableRow key={pkg.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={"/user-2.png"} alt={`${pkg.user.firstName} ${pkg.user.lastName}`} />
                                <AvatarFallback>{pkg.user.firstName.charAt(0)}{pkg.user.lastName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{pkg.user.firstName} {pkg.user.lastName}</p>
                                <p className="text-sm text-muted-foreground md:hidden">
                                  {pkg.package.name} • {formatCurrency(pkg.priceAtPurchase)}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{pkg.package.name}</TableCell>
                          <TableCell>{formatCurrency(pkg.priceAtPurchase)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusColors[pkg.status] || "bg-gray-500/20 text-gray-700 border-gray-500"}>
                              {pkg.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(pkg.purchaseDate)}</TableCell>
                          <TableCell>{formatDate(pkg.endDate)}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {["active", "expired", "cancelled"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <Card>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Package</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Purchase Date</TableHead>
                          <TableHead>Expiry Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterPaymentsBySearch(filterPaymentsByTab(tab)).map((pkg) => (
                            <TableRow key={pkg.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={"/user-2.png"} alt={`${pkg.user.firstName} ${pkg.user.lastName}`} />
                                    <AvatarFallback>{pkg.user.firstName.charAt(0)}{pkg.user.lastName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{pkg.user.firstName} {pkg.user.lastName}</p>
                                    <p className="text-sm text-muted-foreground md:hidden">
                                      {pkg.package.name} • {formatCurrency(pkg.priceAtPurchase)}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{pkg.package.name}</TableCell>
                              <TableCell>{formatCurrency(pkg.priceAtPurchase)}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={statusColors[pkg.status] || "bg-gray-500/20 text-gray-700 border-gray-500"}>
                                  {pkg.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatDate(pkg.purchaseDate)}</TableCell>
                              <TableCell>{formatDate(pkg.endDate)}</TableCell>
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