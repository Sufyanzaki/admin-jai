import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/client/ux/select"
import { Button } from "@/components/client/ux/button"
import { FormEvent, useState } from "react"
import { createPayment } from "@/app/shared-api/paymentApi"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

type Props = {
    id?: string
    amount: number
}

export default function MollieForm({ id, amount }: Props) {
    const { t } = useTranslation()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function handleClick(e: FormEvent) {
        e.preventDefault()
        if (!id) throw new Error(t("No package id provided"))

        setLoading(true)

        const r = await createPayment({
            packageId: id,
            provider: "mollie",
        })

        router.push(r.data.checkoutUrl)

        setLoading(false)
    }

    return (
        <>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("Select a payment method")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="credit-card">{t("Credit Card")}</SelectItem>
                    <SelectItem value="ideal">{t("iDEAL")}</SelectItem>
                    <SelectItem value="paypal">{t("PayPal")}</SelectItem>
                </SelectContent>
            </Select>

            <Button disabled={loading} className="w-full mt-4" size="lg" onClick={handleClick}>
                {t("Pay (€{{amount}}) with Mollie", { amount })}
            </Button>
        </>
    )
}
