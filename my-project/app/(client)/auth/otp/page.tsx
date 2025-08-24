import OtpForm from "@/app/(client)/auth/otp/_components/otp-form";
import { useTranslation } from "react-i18next";

export default function OTPPage() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 w-fit">
            <h2 className="text-2xl font-bold">{t("Verification Code")}</h2>
            <label className="block text-sm font-medium text-gray-700">
                {t("Enter your verification code *")}
            </label>
            <OtpForm />
        </div>
    );
}
