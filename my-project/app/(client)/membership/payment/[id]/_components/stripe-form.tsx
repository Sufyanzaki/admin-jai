"use client";

import {Label} from "@/components/client/ux/label";
import {Button} from "@/components/client/ux/button";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {FormEvent, useState} from "react";
import {createPayment} from "@/app/shared-api/paymentApi";
import {showError, showSuccess} from "@/shared-lib";
import {patchUser} from "@/app/shared-api/userApi";
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation";

type Props = {
    id?: string;
    amount: number;
}

export default function StripeForm({id, amount}: Props) {

    const router = useRouter();

    const {data:session } = useSession();

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const userId = session?.user.id ? String(session.user.id) : undefined;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if(!stripe || !elements) return;
        if(!userId) throw new Error("No user id provided");
        if(!id) throw new Error("No package id provided");

        setLoading(true);

        const r = await createPayment({
            packageId: id,
            provider: "stripe"
        })

        const clientSecret = r.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
            },
        });
        await patchUser(userId, {packageId: id})

        if (result.error) showError(result.error);
        else if (result.paymentIntent?.status === "succeeded") {
            showSuccess("Payment successful!");
            router.push("/dashboard");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Label>Card Details</Label>
            <div className="border rounded-md p-3 border-gray-300">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#32325d",
                                "::placeholder": { color: "#a0aec0" },
                            },
                            invalid: { color: "#fa755a" },
                        },
                    }}
                />
            </div>

            <Button
                className="w-full"
                size="lg"
                type="submit"
                disabled={!stripe || loading}
            >
                {loading ? "Processing..." : `Pay (€${amount}) with Stripe`}
            </Button>
        </form>
    );
}
