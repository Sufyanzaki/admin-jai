"use client"

import type React from "react"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import ImageWrapper from "@/components/client/image-wrapper";
import {Container} from "@/components/client/ux/container";
import {useRegistration} from "@/app/shared-hooks/useRegistration";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PaymentLayout({ children }: { children: React.ReactNode }) {

    const { registrationSettings } = useRegistration();

    return (
        <div>
            <div className="hidden h-screen w-full lg:flex flex-row overflow-hidden">
                <div className="h-screen w-[31%]">
                    <div
                        className="h-full w-full bg-cover bg-center bg-black/20"
                        style={{ backgroundImage: `url(${registrationSettings?.bannerImage})` }}
                    />
                </div>

                <div className="w-[69%] flex flex-col">
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <div className="flex items-center justify-between px-4 py-6 lg:px-14 lg:py-7">
                            <Link href="/" className="text-2xl font-bold">
                                <ImageWrapper
                                    width={200}
                                    height={200}
                                    src="/logo-black.png"
                                    alt="humsafar"
                                />
                            </Link>
                            <p className="text-md text-black">
                                Don&apos;t have an account?
                                <Link href="/" className="ml-1 font-medium hover:underline">
                                    Register
                                </Link>
                            </p>
                        </div>

                        <div className="w-full mx-auto mt-10 overflow-auto">
                            <Container>{children}</Container>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col min-h-screen w-full lg:hidden">
                <div className="flex items-center h-[78px] px-4">
                    <Link href="/" className="text-2xl font-bold">
                        <ImageWrapper
                            width={170}
                            height={170}
                            src="/logo-black.png"
                            alt="humsafar"
                        />
                    </Link>
                </div>

                <div className="h-[272px] w-full">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(/assets/login-couple-mobile.png)` }}
                    />
                </div>

                <div className="flex flex-col w-full">
                    <p className="mt-7 text-center text-md text-black">
                        Don&apos;t have an account?
                        <Link href="/" className="ml-1 font-medium hover:underline">
                            Register
                        </Link>
                    </p>
                    <div className="mt-6 mx-auto w-full max-w-full overflow-auto">
                        <Container>
                            <Elements stripe={stripePromise}>
                                {children}
                            </Elements>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    )
}
