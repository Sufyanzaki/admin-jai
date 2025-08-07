import useSWRMutation from 'swr/mutation';
import { showError } from '@/shared-lib';
import { showSuccess } from '@/shared-lib';
import {OtpProps, resendOtp} from "@/app/shared-api/auth";

export default function useResendOtp() {
  const { trigger, isMutating } = useSWRMutation(
    'resendOtp',
    async (_: string, { arg }: { arg: Partial<OtpProps> }) => {
      return await resendOtp(arg);
    },
    {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          showError({ message: error.message });
        } else {
          showError({ message: 'An unknown error occurred.' });
        }
      },
    }
  );

  const resendOtpHandler = async (email: string) => {
    const result = await trigger({ email });
      if (result) {
        showSuccess('OTP sent successfully!');
        return result;
      }
  };

  return {
    resendOtp: resendOtpHandler,
    isLoading: isMutating,
  };
} 