"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/client/ux/tabs"
import StripeForm from "./_components/stripe-form"
import usePackageById from "@/app/shared-hooks/usePackageById"
import Preloader from "@/components/shared/Preloader"
import { useParams } from "next/navigation"
import MollieForm from "./_components/mollie-form"
import { Elements } from "@stripe/react-stripe-js"
import type React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { useTranslation } from "react-i18next"

export default function PaymentMethodSelector() {
    const { t } = useTranslation()
    const params = useParams()
    const id = typeof params.id === 'string' ? params.id : params.id?.[0]

    const { pkg, loading, error } = usePackageById(id)

    if (loading) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader />
                <p className="text-sm">{t("Loading Payment")}</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <p className="text-sm">{t("Error loading Payment")}</p>
            </div>
        )
    }

    if (!pkg) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <p className="text-sm">{t("Package not found")}</p>
            </div>
        )
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

    return (
        <div className="w-full bg-white rounded-[5px] space-y-6">
            <h1 className="text-2xl font-bold mb-6">{t("Choose a Payment Method")}</h1>

            <Tabs defaultValue="stripe" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="stripe">{t("Stripe")}</TabsTrigger>
                    <TabsTrigger value="mollie">{t("Mollie")}</TabsTrigger>
                </TabsList>

                <TabsContent value="stripe" className="mt-6">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">{t("Stripe Payment")}</h2>
                        <p className="text-sm text-muted-foreground">
                            {t("Enter your card details below to complete the payment.")}
                        </p>

                        <Elements stripe={stripePromise}>
                            <StripeForm id={id} amount={pkg.price} />
                        </Elements>
                    </div>
                </TabsContent>

                <TabsContent value="mollie" className="mt-6">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">{t("Mollie Payment")}</h2>
                        <p className="text-sm text-muted-foreground">
                            {t("Choose your preferred Mollie payment method.")}
                        </p>
                        <MollieForm id={id} amount={pkg.price} />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
