import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { patchLanguageInfo, postLanguageInfo } from "@/app/shared-api/languageInfoApi";
import { getUserTrackingId, updateUserTrackingId } from "@/lib/access-token";
import { useLanguageInfoInfo } from "@/app/shared-hooks/useLanguageInfoInfo";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";

export default function useLanguageInfoForm() {


  const { t } = useTranslation();

  const languageInfoSchema = z.object({
    motherTongue: z.string().min(1, t("Mother tongue is required")),
    knownLanguages: z.any().refine((val) => Array.isArray(val) && val.length > 0, {
      message: t("Please select at least one language")
    })
      .pipe(z.array(z.string()).min(1, {
        message: t("Please select at least one language")
      })),
  });

  type LanguageInfoFormValues = z.infer<typeof languageInfoSchema>;

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
      knownLanguages: [],
    },
    mode: "onBlur",
  });

  const { languageInfo, languageInfoLoading } = useLanguageInfoInfo();

  useEffect(() => {
    if (id && languageInfo) {
      reset({
        motherTongue: languageInfo.motherTongue || "",
        knownLanguages: languageInfo.knownLanguages?.split(",") || [],
      });
    }
  }, [id, languageInfo, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "updateLanguageInfo",
    async (_: string, { arg }: { arg: LanguageInfoFormValues }) => {

  if (!id) return showError({ message: t("You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member") });

      const payload = {
        ...arg,
        knownLanguages: arg.knownLanguages.join(","),
      }

      if (id && allowEdit) return await patchLanguageInfo(id, payload);
      else return await postLanguageInfo(id, payload);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t("Failed to update language info") });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: LanguageInfoFormValues, callback?: () => void) => {
    const result = await trigger(values);
    if (result) {
      showSuccess(t("Language info updated successfully!"));
      callback?.();
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