import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { postLifeStyle, patchLifeStyle } from "../../_api/updateLifeStyle";
import { getUserTrackingId, updateUserTrackingId } from "@/lib/access-token";
import { useLifeStyleInfo } from "../../_hooks/useLifeStyleInfo";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

const lifeStyleSchema = z.object({
  smoke: z.string().min(1, "Smoke is required"),
  drinking: z.string().min(1, "Drinking is required"),
  goingOut: z.string().min(1, "Going out is required"),
  exercise: z.string().min(1, "Exercise is required"),
  diet: z.string().min(1, "Diet is required"),
  pets: z.string().min(1, "Pets is required"),
  travel: z.string().min(1, "Travel is required"),
  socialMedia: z.string().min(1, "Social media is required"),
  workLifeBalance: z.string().min(1, "Work-life balance is required"),
  nightLife: z.string().min(1, "Night life is required"),
  primaryHobby: z.string().min(1, "Hobby is required"),
});

export type LifeStyleFormValues = z.infer<typeof lifeStyleSchema>;

export default function useLifeStyleForm() {

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
      socialMedia: "",
      workLifeBalance: "",
      nightLife: "",
      primaryHobby: "",
    },
    mode: "onBlur",
  });

  const { lifeStyle, lifeStyleLoading } = useLifeStyleInfo();

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
        socialMedia: lifeStyle.socialMedia || "",
        workLifeBalance: lifeStyle.workLifeBalance || "",
        nightLife: lifeStyle.nightLife || "",
        primaryHobby: lifeStyle.primaryHobby || "",
      });
    }
  }, [id, lifeStyle, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "updateLifeStyle",
    async (_: string, { arg }: { arg: LifeStyleFormValues }) => {

      if (!id) return showError({ message: "You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member" });

      if (id && allowEdit) return await patchLifeStyle(id, arg);
      else return await postLifeStyle(id, arg);
      
    },
    {
      onError: (error: any) => {
        showError({ message: error.message || "Failed to update lifestyle info" });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: LifeStyleFormValues, callback?: (data: any) => void) => {
    const result = await trigger(values);
    if (result?.status === 201 || result?.status === 200) {
      showSuccess("Lifestyle updated successfully!");
      callback?.(result);
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