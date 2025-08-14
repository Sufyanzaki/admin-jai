"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/client/ux/tabs";
import { Button } from "@/components/client/ux/button";
import { Label } from "@/components/client/ux/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/client/ux/select";
import {useState} from "react";
import { Input } from "@/components/client/ux/input";

export default function PaymentMethodSelector() {
    const [mollieMethod, setMollieMethod] = useState("");

    return (
        <div className="w-full bg-white rounded-[5px] space-y-6">
            <h1 className="text-2xl font-bold mb-6">Choose a Payment Method</h1>

            <Tabs defaultValue="stripe" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="stripe">Stripe</TabsTrigger>
                    <TabsTrigger value="mollie">Mollie</TabsTrigger>
                </TabsList>

                <TabsContent value="stripe" className="mt-6">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Stripe Payment</h2>
                        <p className="text-sm text-muted-foreground">
                            Enter your card details below to complete the payment.
                        </p>

                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="w-full h-11"/>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date (MM/YY)</Label>
                                <Input id="expiry" placeholder="MM/YY"  className="h-11"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="CVC"  className="h-11"/>
                            </div>
                        </div>

                        <Button className="w-full mt-4" size="lg">
                            Pay (€5) with Stripe
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="mollie" className="mt-6">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Mollie Payment</h2>
                        <p className="text-sm text-muted-foreground">
                            Choose your preferred Mollie payment method.
                        </p>

                        <Select value={mollieMethod} onValueChange={setMollieMethod}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a payment method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="credit-card">Credit Card</SelectItem>
                                <SelectItem value="ideal">iDEAL</SelectItem>
                                <SelectItem value="paypal">PayPal</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button disabled={!mollieMethod} className="w-full mt-4" size="lg">
                            Pay (€5) with {mollieMethod ? mollieMethod.charAt(0).toUpperCase() + mollieMethod.slice(1) : "Mollie"}
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
