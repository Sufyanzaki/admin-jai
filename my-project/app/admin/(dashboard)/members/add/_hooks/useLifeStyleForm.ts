import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { postLifeStyle, patchLifeStyle } from "@/app/shared-api/lifeStyleApi";
import { getUserTrackingId, updateUserTrackingId } from "@/lib/access-token";
import { useLifeStyleInfo } from "../../_hooks/useLifeStyleInfo";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";


export default function useLifeStyleForm() {

  const { t } = useTranslation();

  const lifeStyleSchema = z.object({
    smoke: z.string().min(1, t("Smoke is required")),
    drinking: z.string().min(1, t("Drinking is required")),
    goingOut: z.string().min(1, t("Going out is required")),
    exercise: z.string().min(1, t("Exercise is required")),
    diet: z.string().min(1, t("Diet is required")),
    pets: z.string().min(1, t("Pets is required")),
    travel: z.string().min(1, t("Travel is required")),
    nightLife: z.string().min(1, t("Night life is required")),
  });

  type LifeStyleFormValues = z.infer<typeof lifeStyleSchema>;

  const params = useParams();
  const tracker = getUserTrackingId();

  const id = useMemo(() => {
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;
    return tracker?.id ?? paramId;
  }, [params.id, tracker?.id]);

  const allowEdit = useMemo(() => {
    return id && tracker?.lifeStyle;
  }, [id, tracker?.lifeStyle]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    control,
    watch,
  } = useForm<LifeStyleFormValues>({
    resolver: zodResolver(lifeStyleSchema),
    defaultValues: {
      smoke: "",
      drinking: "",
      goingOut: "",
      exercise: "",
      diet: "",
      pets: "",
      travel: "",
      nightLife: "",
    },
    mode: "onBlur",
  });

  const { lifeStyle, lifeStyleLoading } = useLifeStyleInfo();
  console.log(lifeStyle);

  useEffect(() => {
    if (id && lifeStyle) {
      reset({
        smoke: lifeStyle.smoke || "",
        drinking: lifeStyle.drinking || "",
        goingOut: lifeStyle.goingOut || "",
        exercise: lifeStyle.exercise || "",
        diet: lifeStyle.diet || "",
        pets: lifeStyle.pets || "",
        travel: lifeStyle.travel || "",
        nightLife: lifeStyle.nightLife || "",
      });
    }
  }, [id, lifeStyle, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "updateLifeStyle",
    async (_: string, { arg }: { arg: LifeStyleFormValues }) => {

  if (!id) return showError({ message: t("You need to initialize a new member profile before you can add other details. Go back to basic Information to initialize a member") });

      if (id && allowEdit) return await patchLifeStyle(id, arg);
      else return await postLifeStyle(id, arg);

    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t("Failed to update lifestyle info") });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: LifeStyleFormValues, callback?: () => void) => {
    const result = await trigger(values);
    if (result) {
      showSuccess(t("Lifestyle updated successfully!"));
      callback?.();
      updateUserTrackingId({ lifeStyle: true });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    setValue,
    reset,
    control,
    watch,
    onSubmit,
    lifeStyleLoading,
  };
} 