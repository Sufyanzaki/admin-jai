"use client"

import { Button } from "@/components/client/ux/button";
import { CheckCircle2, Home } from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {patchUser} from "@/app/shared-api/userApi";
import { useSession } from "next-auth/react";

const PaymentSuccessPage = () => {

    const {data:session } = useSession();
    const userId = session?.user.id ? String(session.user.id) : undefined;

    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const pkgId = searchParams.get("pkg") ?? undefined;

    const router = useRouter();

    const handleGoHome = () => {
        router.push("/dashboard");
    };

    useEffect(() => {
        setLoading(true)
        paymentSuccess().finally(()=>setLoading(false))
    }, []);

    async function paymentSuccess() {
        if(!userId) throw new Error("No user id provided");
        await patchUser(userId, {packageId: pkgId})
    }

    return (
        <div className="flex flex-col items-center justify-center text-center p-4 bg-white">
            <div className="relative mb-2 lg:mb-12">
                <CheckCircle2
                    className="text-app-blue"
                    size={150}
                    strokeWidth={1.5}
                />
                <div className="lg:hidden block absolute top-[-70px] right-4">
                    <Home className="text-app-blue rotate-10" size={72} strokeWidth={1.5} />
                </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold font-mon text-app-blue mt-6">
                Payment Successful 🎉
            </h1>

            <p className="text-[#6B7280] mt-2 max-w-lg">
                Thank you for your purchase! Your payment has been successfully processed.
                You can now enjoy your selected package.
            </p>

            <Button
                onClick={handleGoHome}
                variant={"secondary"}
                disabled={loading}
                size={"lg"}
                className="flex items-center justify-center gap-2 mt-10"
            >
                {loading ? "Please wait..." : <>
                    <Home className="h-12 w-12" />
                    Back to Home
                </>}
            </Button>
        </div>
    );
};

export default PaymentSuccessPage;
