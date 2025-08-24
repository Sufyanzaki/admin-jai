import { showError, showSuccess } from '@/shared-lib';
import { postBlockUser } from '../_api/postBlockUser';
import { mutate } from 'swr';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';


export const useReportProfile = (blockedUserId: number) => {
  const { t } = useTranslation();

  const reportSchema = z.object({
    reason: z.string().min(1, t("please enter reason")),
    additionDetail: z.string().optional(),
  });

  type ComplaintFormValues = z.infer<typeof reportSchema>;


  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
  } = useForm<ComplaintFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: "",
      additionDetail: "",
    },
  });

  const trigger = async (blockedUserId: number) => {

    try {
      const res = await postBlockUser({ blockedUserId });
      if (res) {
        showSuccess("User Blocked successfully!");
      }
      mutate("blocked-profiles").finally();
      return res;
    } catch (err: unknown) {
      let message = t("An error occurred while blocking this profile");

      if (err instanceof Error) {
        message = err.message;
      }

      showError({ message });
      throw err;
    }
  };

  const onSubmit = async (_: ComplaintFormValues, callback?: () => void) => {
    await trigger(blockedUserId);
    callback?.();
  };


  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    setValue,
    control,
    watch,
    reset,
    isSubmitting
  };
};
