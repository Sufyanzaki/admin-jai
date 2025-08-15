import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/client/ux/select";
import {Button} from "@/components/client/ux/button";
import {FormEvent, useState} from "react";
import {createPayment} from "@/app/(client)/auth/profile/membership/payment/[id]/_api/paymentApi";
import {useRouter} from "next/navigation";

type Props = {
    id?: string;
    amount: number;
}

export default function MollieForm({id, amount}:Props){

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleClick(e:FormEvent){
        e.preventDefault();
        if(!id) throw new Error("No package id provided");

        setLoading(true);

        const r = await createPayment({
            packageId: id,
            provider: "mollie"
        })

        router.push(r.data.checkoutUrl)

        setLoading(false);
    }

    return (
        <>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a payment method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="ideal">iDEAL</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
            </Select>

            <Button disabled={loading} className="w-full mt-4" size="lg" onClick={handleClick}>
                Pay (€${amount}) with Mollie
            </Button>
        </>
    )
}