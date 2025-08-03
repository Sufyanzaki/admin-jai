import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {ArrowLeft, CreditCard, Download, FileText, Mail, Printer, Receipt, CheckCircle, Info} from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Sample invoices data - this would normally come from an API or database
const invoices = [
    {
        id: "INV-001",
        patient: {
            name: "John Smith",
            image: "/colorful-abstract-shapes.png",
            id: "P12345",
            email: "john.smith@example.com",
            phone: "(555) 123-4567",
            address: "123 Main St, Anytown, CA 12345",
        },
        date: "2024-04-15",
        dueDate: "2024-05-15",
        amount: 250.0,
        paid: 200.0,
        balance: 50.0,
        status: "Partially Paid",
        items: [
            { description: "General Consultation", quantity: 1, unitPrice: 150.0, amount: 150.0 },
            { description: "Blood Test", quantity: 1, unitPrice: 100.0, amount: 100.0 },
        ],
        insurance: {
            provider: "Blue Cross Blue Shield",
            policyNumber: "BCBS-123456789",
            claimStatus: "Approved",
            claimAmount: 200.0,
            claimDate: "2024-04-18",
        },
        payments: [{ date: "2024-04-20", amount: 200.0, method: "Credit Card", reference: "PAY-12345" }],
        doctor: "Dr. Sarah Johnson",
        department: "General Medicine",
        notes: "Patient requested itemized receipt for insurance reimbursement.",
    },
    {
        id: "INV-002",
        patient: {
            name: "Emily Davis",
            image: "/colorful-abstract-shapes.png",
            id: "P23456",
            email: "emily.davis@example.com",
            phone: "(555) 234-5678",
            address: "456 Oak Ave, Somewhere, NY 23456",
        },
        date: "2024-04-16",
        dueDate: "2024-05-16",
        amount: 350.0,
        paid: 0.0,
        balance: 350.0,
        status: "Unpaid",
        items: [
            { description: "Specialist Consultation", quantity: 1, unitPrice: 200.0, amount: 200.0 },
            { description: "X-Ray", quantity: 1, unitPrice: 150.0, amount: 150.0 },
        ],
        insurance: {
            provider: "Aetna",
            policyNumber: "AET-987654321",
            claimStatus: "Pending",
            claimAmount: 280.0,
            claimDate: "2024-04-18",
        },
        payments: [],
        doctor: "Dr. Michael Chen",
        department: "Radiology",
        notes: "",
    },
    {
        id: "INV-003",
        patient: {
            name: "Robert Wilson",
            image: "/user-3.png",
            id: "P34567",
            email: "robert.wilson@example.com",
            phone: "(555) 345-6789",
            address: "789 Pine St, Elsewhere, TX 34567",
        },
        date: "2024-04-10",
        dueDate: "2024-05-10",
        amount: 175.0,
        paid: 175.0,
        balance: 0.0,
        status: "Paid",
        items: [
            { description: "Follow-up Consultation", quantity: 1, unitPrice: 100.0, amount: 100.0 },
            { description: "Prescription Renewal", quantity: 1, unitPrice: 75.0, amount: 75.0 },
        ],
        insurance: {
            provider: "UnitedHealthcare",
            policyNumber: "UHC-456789123",
            claimStatus: "Approved",
            claimAmount: 140.0,
            claimDate: "2024-04-12",
        },
        payments: [{ date: "2024-04-15", amount: 175.0, method: "Bank Transfer", reference: "PAY-67890" }],
        doctor: "Dr. Lisa Brown",
        department: "Family Medicine",
        notes: "Patient requested electronic receipt.",
    },
];

export default function InvoiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // Find the invoice with the matching ID
    const {id} = use(params)
    const invoice = invoices.find((inv) => inv.id === id) || invoices[0];

    // Calculate subtotal, tax, and total
    const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * 0.08; // Assuming 8% tax
    const total = subtotal + tax;

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/payments">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <div className="space-y-2">
                        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Payment Receipt</h1>
                        <p className="text-sm text-muted-foreground">{invoice.id} • RCP-007-2024</p>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                    <Button variant="outline" size="sm">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Receipt
                    </Button>
                    <Button size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View Invoice
                    </Button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Payment Details Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Payment Details</CardTitle>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Pending
                            </Badge>
                        </div>
                        <CardDescription>Transaction information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Payment ID</span>
                                <span className="font-medium">PMT-007</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Receipt Number</span>
                                <span className="font-medium">RCP-007-2024</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Date</span>
                                <span>2024-04-28</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Amount</span>
                                <span className="font-bold">${invoice.paid.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Payment Method</span>
                                <span>Check</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Check Number</span>
                                <span>CHK-56789</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Processed By</span>
                                <span>Amanda Wilson</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Patient Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Patient Information</CardTitle>
                        <CardDescription>Patient details and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={invoice.patient.image || "/user-2.png"} alt={invoice.patient.name} />
                                <AvatarFallback>{invoice.patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{invoice.patient.name}</p>
                                <p className="text-sm text-muted-foreground">{invoice.patient.id}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <span className="text-sm text-muted-foreground">Email:</span>
                                <span className="ml-2">{invoice.patient.email}</span>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground">Phone:</span>
                                <span className="ml-2">{invoice.patient.phone}</span>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground">Address:</span>
                                <span className="ml-2 text-sm">{invoice.patient.address}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Invoice Details Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Invoice Details</CardTitle>
                    <CardDescription>Information about the related invoice</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="details" className="w-full">
                        <TabsList>
                            <TabsTrigger value="details">Invoice Details</TabsTrigger>
                            <TabsTrigger value="items">Line Items</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="space-y-4 mt-4">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center gap-2">
                                    <span className="font-medium">Invoice Number</span>
                                    <span className="sm:text-lg font-bold">{invoice.id}</span>
                                </div>
                                  <Separator className="my-4" />
                                <div className="flex justify-between items-center gap-2">
                                    <span className="font-medium">Invoice Date</span>
                                    <span className="sm:text-lg font-bold">{invoice.date}</span>
                                </div>
                                  <Separator className="my-4" />
                                <div className="flex justify-between items-cent gap-2er">
                                    <span className="font-medium">Due Date</span>
                                    <span className="sm:text-lg font-bold">{invoice.dueDate}</span>
                                </div>
                                  <Separator className="my-4" />
                                <div className="flex justify-between items-center gap-2">
                                    <span className="font-medium">Description</span>
                                    <span className="sm:text-lg font-bold">Orthopedic consultation and X-ray</span>
                                </div>
                                  <Separator className="my-4" />
                                <div className="flex justify-between items-center gap-2">
                                    <span className="font-medium">Total Amount</span>
                                    <span className="sm:text-lg font-bold">${total.toFixed(2)}</span>
                                </div>
                                  <Separator className="my-4" />
                                <div className="flex justify-between items-center gap-2">
                                    <span className="font-medium">Amount Paid</span>
                                    <span className="sm:text-lg font-bold">${invoice.paid.toFixed(2)}</span>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex justify-between items-center gap-2">
                                    <span className="font-medium">Remaining Balance</span>
                                    <span className="sm:text-lg font-bold">${invoice.balance.toFixed(2)}</span>
                                </div>
                            </div>
                            {invoice.notes && (
                                <>
                                    <Separator />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">Notes</p>
                                        <p className="text-sm">{invoice.notes}</p>
                                    </div>
                                </>
                            )}
                        </TabsContent>
                        <TabsContent value="items" className="mt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">Quantity</TableHead>
                                        <TableHead className="text-right">Unit Price</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoice.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                            <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tax (8%):</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Payment Status Alert */}
            {invoice.status !== "Paid" && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="space-y-8">
                        <div className="flex gap-2">
                            <Info className="h-5 w-5 text-orange-600 mt-0.5" />
                            <h3 className="text-orange-900 font-semibold">Payment Pending</h3>
                        </div>
                        <div className="flex-1">
                            <p className="text-orange-700 text-sm mt-2">
                                Your prescription for Lisinopril will expire in 7 days. Please schedule a follow-up appointment for renewal.
                            </p>
                            <div className="mt-4">
                                <Button variant="outline">
                                    <Info className="mr-1 h-4 w-4" />
                                    Check Status
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}