import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowLeft, Download, Mail, Printer} from "lucide-react";
import Link from "next/link";

export default function PaymentsPage() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 flex-wrap">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/payments">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold mb-2">Payment Receipt</h2>
                    <p className="text-muted-foreground">
                        Purchase Date: 28-04-2025
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                </Button>
                <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                </Button>
                <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email Receipt
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Billed To</CardTitle>
                        <CardDescription>Customer information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between flex-wrap gap-3">
                            <span className="text-muted-foreground">Name</span>
                            <span className="font-medium">Kris Acngel</span>
                        </div>
                        <div className="flex justify-between flex-wrap gap-3">
                            <span className="text-muted-foreground">Email</span>
                            <span className="font-medium">loes.aziem@hotmail.com</span>
                        </div>
                        <div className="flex justify-between flex-wrap gap-3">
                            <span className="text-muted-foreground">Phone</span>
                            <span className="font-medium">-</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Purchase Summary</CardTitle>
                        <CardDescription>Order details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border overflow-x-auto">
                            <table className="min-w-full divide-y divide-border whitespace-nowrap">
                                <thead>
                                <tr className="bg-muted/50">
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Item</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Price</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="px-4 py-3 text-sm">Vip</td>
                                    <td className="px-4 py-3 text-sm text-right">€5</td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr className="border-t border-border">
                                    <td className="px-4 py-3 text-sm font-medium text-right">Total</td>
                                    <td className="px-4 py-3 text-sm font-bold text-right">€5</td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>Transaction information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between flex-wrap gap-3">
                        <span className="text-muted-foreground">Purchase Date</span>
                        <span className="font-medium">28-04-2025</span>
                    </div>
                    <div className="flex justify-between flex-wrap gap-3">
                        <span className="text-muted-foreground">Total Amount</span>
                        <span className="font-medium">€5</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}