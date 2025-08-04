import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { postPhysicalAppearance, patchPhysicalAppearance } from "../../_api/updatePhysicalAppearance";
import { getUserTrackingId, updateUserTrackingId } from "@/lib/access-token";
import { usePhysicalAppearanceInfo } from "../../_hooks/usePhysicalAppearanceInfo";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

const physicalAppearanceSchema = z.object({
  height: z.string().min(1, "Height is required"),
  eyeColor: z.string().min(1, "Eye color is required"),
  hairColor: z.string().min(1, "Hair color is required"),
  bodyType: z.string().min(1, "Body type is required"),
  weight: z.string().min(1, "Weight is required"),
  appearance: z.string().min(1, "Appearance is required"),
  clothing: z.string().min(1, "Clothing is required"),
  intelligence: z.string().min(1, "Intelligence is required"),
  language: z.string().min(1, "Language is required"),
});

export type PhysicalAppearanceFormValues = z.infer<typeof physicalAppearanceSchema>;

export default function usePhysicalAppearanceForm() {

  const params = useParams();
  const tracker = getUserTrackingId();

  const id = useMemo(() => {
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;
    return tracker?.id ?? paramId;
  }, [params.id, tracker?.id]);

  const allowEdit = useMemo(() => {
    return id && tracker?.aboutMe;
  }, [id, tracker?.aboutMe]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    control,
    watch,
  } = useForm<PhysicalAppearanceFormValues>({
    resolver: zodResolver(physicalAppearanceSchema),
    defaultValues: {
      height: "",
      eyeColor: "",
      hairColor: "",
      bodyType: "",
      weight: "",
      appearance: "",
      clothing: "",
      intelligence: "",
      language: "",
    },
    mode: "onBlur",
  });

  const { physicalAppearance, physicalAppearanceLoading } = usePhysicalAppearanceInfo();

  useEffect(() => {
    if (id && physicalAppearance) {
      reset({
        height: physicalAppearance.height || "",
        eyeColor: physicalAppearance.eyeColor || "",
        hairColor: physicalAppearance.hairColor || "",
        bodyType: physicalAppearance.bodyType || "",
        weight: physicalAppearance.weight || "",
        appearance: physicalAppearance.appearance || "",
        clothing: physicalAppearance.clothing || "",
        intelligence: physicalAppearance.intelligence || "",
        language: physicalAppearance.language || "",
      });
    }
  }, [tracker?.id, physicalAppearance, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "updatePhysicalAppearance",
    async (_: string, { arg }: { arg: PhysicalAppearanceFormValues }) => {

      if (!id) return showError({ message: "You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member" });

      if (id && allowEdit) return await patchPhysicalAppearance(id, arg);
      else return await postPhysicalAppearance(id, arg);
    },
    {
      onError: (error: any) => {
        showError({ message: error.message || "Failed to update physical appearance info" });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: PhysicalAppearanceFormValues, callback?: (data: any) => void) => {
    const result = await trigger(values);
      if (result?.status === 201 || result?.status === 200) {
        showSuccess("Physical appearance info updated successfully!");
        callback?.(result);
        updateUserTrackingId({ aboutMe: true });
      }
  };

  return {
    setValue,
    handleSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    reset,
    control,
    watch,
    onSubmit,
    physicalAppearanceLoading,
  };
} 