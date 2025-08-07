"use client"

import { OtpInput } from "@/components/client/otp-input";
import useOTPForm from "@/app/(client)/auth/otp/_hooks/useOtpForm";
import {Button} from "@/components/client/ux/button";
import useResendOtp from "@/app/shared-hooks/useResendOtp";
import {getUserEmail} from "@/lib/access-token";
import {Controller} from "react-hook-form";

export default function OtpForm(){

    const {handleSubmit, onSubmit, isSubmitting, control } = useOTPForm();
    const { resendOtp, isLoading: isResending } = useResendOtp();

    const handleResend = () => {
        const email = getUserEmail();
        if (email) resendOtp(email).finally();
    };

    return (
        <form onSubmit={handleSubmit(data=>onSubmit(data))} className="space-y-6">
            <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                    <OtpInput value={field.value} onChange={field.onChange} />
                )}
            />

            <div className="flex gap-4 mt-4">
                <Button type="submit"  disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Submit'}
                </Button>
                <Button type="button" variant="ghost" disabled={isResending} onClick={handleResend}>
                    {isResending ? 'Sending...' : 'Resend Code'}
                </Button>
            </div>
        </form>
    )
}