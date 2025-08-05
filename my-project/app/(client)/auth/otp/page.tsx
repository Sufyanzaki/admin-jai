import OtpForm from "@/app/(client)/auth/otp/_components/otp-form";

export default function OTPPage(){
    return (
        <div className="space-y-6 w-fit">
            <h2 className="text-2xl font-bold">Verification Code</h2>
            <label className="block text-sm font-medium text-gray-700">
                Enter your verification code *
            </label>
            <OtpForm />
        </div>
    )
}