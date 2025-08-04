import useSWRMutation from 'swr/mutation';
import { showError } from '@/admin-utils/lib/formErrors';
import { showSuccess } from '@/admin-utils/lib/formSuccess';
import { resendOtp, ResendOtpProps } from '../_api/resendOtp';

export default function useResendOtp() {
  const { trigger, isMutating } = useSWRMutation(
    'resendOtp',
    async (_: string, { arg }: { arg: ResendOtpProps }) => {
      return await resendOtp(arg);
    },
    {
      onError: (error: any) => {
        showError({ message: error.message });
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