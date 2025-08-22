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
import {CreditCardIcon, DollarSignIcon, Search, TrendingUpIcon, UserIcon} from "lucide-react";
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR"
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Total Payments</CardTitle>
              <DollarSignIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${payments.totalPayments.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {payments.yearDifferencePercent !== null ?
                    `${payments.yearDifferencePercent > 0 ? '+' : ''}${payments.yearDifferencePercent}% from last year` :
                    'No comparison data'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">Active Packages</CardTitle>
              <TrendingUpIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{payments.activePackages}</div>
              <p className="text-xs text-muted-foreground">
                ${payments.thisMonthPayments.toFixed(2)} this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">This Year</CardTitle>
              <UserIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${payments.thisYearPayments.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                ${payments.lastYearPayments.toFixed(2)} last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm xl:text-lg font-medium">This Month</CardTitle>
              <CreditCardIcon className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${payments.thisMonthPayments.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                ${payments.lastMonthPayments.toFixed(2)} last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mb-6">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search payments..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={handleSearchChange}
            />
          </div>
        </div>

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
                {filterPaymentsBySearch(payments.lastTenUserPackages).map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={"/user-2.png"} alt={`${pkg.user.firstName} ${pkg.user.lastName}`} />
                            <AvatarFallback>
                              {pkg.user.firstName.charAt(0)}
                              {pkg.user.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {pkg.user.firstName} {pkg.user.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground md:hidden">
                              {pkg.package.name} • {formatCurrency(pkg.priceAtPurchase)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{pkg.package.name}</TableCell>
                      <TableCell>{formatCurrency(pkg.priceAtPurchase)}</TableCell>
                      <TableCell>
                        <Badge
                            variant="outline"
                            className={statusColors[pkg.status] || "bg-gray-500/20 text-gray-700 border-gray-500"}
                        >
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

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to Delete this payment?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The payment&#39;s data will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                  onClick={() => setDeleteDialogOpen(false)}
                  className="bg-red-500 text-neutral-50 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  );
}
