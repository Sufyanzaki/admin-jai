"use client"

import { Button } from "@/components/client/ux/button"
import { XCircle, Home } from "lucide-react"
import {useRouter} from "next/navigation";

const PaymentErrorPage = () => {

    const router = useRouter();

    const handleGoHome = () => {
        router.push("/dashboard")
    }

    return (
        <div className="flex flex-col items-center justify-center text-center p-4 bg-white">
            <div className="relative mb-2 lg:mb-12">
                <XCircle
                    className="text-red-500"
                    size={150}
                    strokeWidth={1.5}
                />
                <div className="lg:hidden block absolute top-[-70px] right-4">
                    <Home className="text-red-500 rotate-10" size={72} strokeWidth={1.5} />
                </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold font-mon text-red-600 mt-6">
                Payment Failed ❌
            </h1>

            <p className="text-[#6B7280] mt-2 max-w-lg">
                Unfortunately, your payment could not be processed.
                Please try again or use a different payment method.
            </p>

            <Button
                onClick={handleGoHome}
                variant={"secondary"}
                size={"lg"}
                className="flex items-center justify-center gap-2 mt-10"
            >
                <Home className="h-12 w-12" />
                Back to Home
            </Button>
        </div>
    )
}

export default PaymentErrorPage
