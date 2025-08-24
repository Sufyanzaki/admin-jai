"use client";

import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/shared-lib";
import { OtpProps, resendOtp } from "@/app/shared-api/auth";
import { useTranslation } from "react-i18next";

export default function useResendOtp() {
  const { t } = useTranslation();

  const { trigger, isMutating } = useSWRMutation(
      "resendOtp",
      async (_: string, { arg }: { arg: Partial<OtpProps> }) => {
        return await resendOtp(arg);
      },
      {
        onError: (error: unknown) => {
          if (error instanceof Error) {
            showError({ message: t(error.message) });
          } else {
            showError({ message: t("An unknown error occurred.") });
          }
        },
      }
  );

  const resendOtpHandler = async (email: string) => {
    const result = await trigger({ email });
    if (result) {
      showSuccess(t("OTP sent successfully!"));
      return result;
    }
  };

  return {
    resendOtp: resendOtpHandler,
    isLoading: isMutating,
  };
}
