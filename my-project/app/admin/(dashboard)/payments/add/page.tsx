"use client";
import { Button } from "@/components/admin/ui/button";
import { Calendar } from "@/components/admin/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/admin/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import {ArrowLeft, CalendarIcon, Upload} from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useState } from "react";
import {format} from "date-fns";
import {cn} from "@/lib/utils";

export default function AddPatientPage() {
  const { t } = useTranslation();

  const [orderId, setOrderId] = useState("6")
  const [orderDate, setOrderDate] = useState("09-06-2025")
  const [deliveryDate, setDeliveryDate] = useState<Date>()
  const [paymentMethod, setPaymentMethod] = useState("")
  const [customer, setCustomer] = useState("")
  const [packages, setPackages] = useState("")
  const [amount, setAmount] = useState("12345 67890")
  const [deliveryStatus, setDeliveryStatus] = useState("Delivered")
  const [paymentStatus, setPaymentStatus] = useState("")

  const paymentMethods = ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Cash on Delivery", "Digital Wallet"]

  const customers = ["John Smith", "Sarah Johnson", "Michael Brown", "Emma Wilson", "David Davis", "Lisa Anderson"]

  const packageOptions = [
    "Standard Package",
    "Express Package",
    "Premium Package",
    "Economy Package",
    "Overnight Package",
    "International Package",
  ]

  const deliveryStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "Returned",
  ]

  const paymentStatuses = ["Pending", "Processing", "Completed", "Failed", "Refunded", "Cancelled"]

  return (
    <div className="flex flex-col gap-5 p-4 xl:p-6">
      <div className="flex items-center flex-wrap gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/payments">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{t("Back")}</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">{t('Add Payment')}</h1>
          <p className="text-muted-foreground">
            {t('Record a new payment or subscription made by a member for premium features or services.')}
          </p>
        </div>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('Order Management')}</CardTitle>
          <CardDescription>{t('Create or edit order details')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Row 1: Order ID, Order Date, Delivery Date */}
          <div className="space-y-2">
            <Label htmlFor="order-id">{t('Order ID')}</Label>
      <Input
        id="order-id"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder={t('Enter order ID')}
      />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order-date">{t('Order Date')}</Label>
      <Input
        id="order-date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
        placeholder={t('DD-MM-YYYY')}
      />
          </div>

          <div className="space-y-2">
            <Label>{t('Delivery Date')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !deliveryDate && "text-muted-foreground"
                    )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deliveryDate ? format(deliveryDate, "PPP") : t('Select date')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={deliveryDate}
                    onSelect={setDeliveryDate}
                    initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Row 2: Customer, Packages, Amount */}
          <div className="space-y-2">
            <Label htmlFor="customer">{t('Customer')}</Label>
            <Select value={customer} onValueChange={setCustomer}>
              <SelectTrigger id="customer">
                <SelectValue placeholder={t('Select')} />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customerName) => (
                    <SelectItem key={customerName} value={customerName}>
                      {customerName}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="packages">{t('Packages')}</Label>
            <Select value={packages} onValueChange={setPackages}>
              <SelectTrigger id="packages">
                <SelectValue placeholder={t('Select')} />
              </SelectTrigger>
              <SelectContent>
                {packageOptions.map((pkg) => (
                    <SelectItem key={pkg} value={pkg}>
                      {pkg}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">{t('Amount')}</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">€</span>
          <Input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t('12345 67890')}
            className="pl-8"
          />
            </div>
          </div>

          {/* Row 3: Payment Method, Delivery Status, Payment Status */}
          <div className="space-y-2">
            <Label htmlFor="payment-method">{t('Payment Method')}</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment-method">
                <SelectValue placeholder={t('Select')} />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery-status">{t('Delivery Status')}</Label>
            <Select value={deliveryStatus} onValueChange={setDeliveryStatus}>
              <SelectTrigger id="delivery-status">
                <SelectValue placeholder={t('Select')} />
              </SelectTrigger>
              <SelectContent>
                {deliveryStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-status">{t('Payment Status')}</Label>
            <Select value={paymentStatus} onValueChange={setPaymentStatus}>
              <SelectTrigger id="payment-status">
                <SelectValue placeholder={t('Select')} />
              </SelectTrigger>
              <SelectContent>
                {paymentStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
  <Button variant="outline">{t('Cancel')}</Button>
  <Button>{t('Save Order')}</Button>
      </div>
    </div>
  );
}
