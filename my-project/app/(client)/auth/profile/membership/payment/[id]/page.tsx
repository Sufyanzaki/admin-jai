"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/client/ux/tabs";
import StripeForm from "./_components/stripe-form";
import usePackageById from "@/app/shared-hooks/usePackageById";
import Preloader from "@/components/shared/Preloader";
import {useParams} from "next/navigation";
import MollieForm from "./_components/mollie-form";

export default function PaymentMethodSelector() {

    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : params.id?.[0];

    const { pkg, loading, error } = usePackageById(id)

    if(loading){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader/>
                <p className="text-sm">Loading Attributes</p>
            </div>
        )
    }

    if(error){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <p className="text-sm">Error loading Payment</p>
            </div>
        )
    }

    if(!pkg){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <p className="text-sm">Package not found</p>
            </div>
        )
    }

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

                        <StripeForm id={id} amount={pkg.price}/>
                    </div>
                </TabsContent>

                <TabsContent value="mollie" className="mt-6">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Mollie Payment</h2>
                        <p className="text-sm text-muted-foreground">Choose your preferred Mollie payment method.</p>
                        <MollieForm id={id} amount={pkg.price}/>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
