import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { postLanguageInfo, patchLanguageInfo } from "../../_api/updateLanguageInfo";
import { getUserTrackingId, updateUserTrackingId } from "@/lib/access-token";
import { useLanguageInfoInfo } from "../../_hooks/useLanguageInfoInfo";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

const languageInfoSchema = z.object({
  motherTongue: z.string().min(1, "Mother tongue is required"),
  knownLanguages: z.string().min(1, "Known languages are required"),
});

export type LanguageInfoFormValues = z.infer<typeof languageInfoSchema>;

export default function useLanguageInfoForm() {

  const params = useParams();
  const tracker = getUserTrackingId();

  const id = useMemo(() => {
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;
    return tracker?.id ?? paramId;
  }, [params.id, tracker?.id]);

  const allowEdit = useMemo(() => {
    return id && tracker?.languages;
  }, [id, tracker?.languages]);


  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
  } = useForm<LanguageInfoFormValues>({
    resolver: zodResolver(languageInfoSchema),
    defaultValues: {
      motherTongue: "",
      knownLanguages: "",
    },
    mode: "onBlur",
  });

  const { languageInfo, languageInfoLoading } = useLanguageInfoInfo();

  useEffect(() => {
    if (id && languageInfo) {
      reset({
        motherTongue: languageInfo.motherTongue || "",
        knownLanguages: languageInfo.knownLanguages || "",
      });
    }
  }, [id, languageInfo, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "updateLanguageInfo",
    async (_: string, { arg }: { arg: LanguageInfoFormValues }) => {

      if (!id) return showError({ message: "You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member" });

      if (id && allowEdit) return await patchLanguageInfo(id, arg);
      else return await postLanguageInfo(id, arg);
    },
    {
      onError: (error: any) => {
        showError({ message: error.message || "Failed to update language info" });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: LanguageInfoFormValues, callback?: (data: any) => void) => {
    const result = await trigger(values);
    if (result?.status === 201 || result?.status === 200) {
      showSuccess("Language info updated successfully!");
      callback?.(result);
      updateUserTrackingId({ languages: true });
    }
  };

  return {
    handleSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    reset,
    control,
    watch,
    onSubmit,
    languageInfoLoading,
  };
} 