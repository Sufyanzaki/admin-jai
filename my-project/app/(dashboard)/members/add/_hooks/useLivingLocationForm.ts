import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { patchUserLocation, postUserLocation } from "../../_api/updateLocation";
import { getUserTrackingId, updateUserTrackingId } from "@/lib/access-token";
import {useLiving} from "@/app/(dashboard)/members/_hooks/useLiving";
import {useEffect} from "react";

const livingLocationSchema = z.object({
  id: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export type UpdateUserLocationFormValues = z.infer<typeof livingLocationSchema>;

export default function useLivingLocationForm() {

  const {living, livingLoading} = useLiving();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    control,
    watch,
  } = useForm<UpdateUserLocationFormValues>({
    resolver: zodResolver(livingLocationSchema),
    defaultValues: {
      city: "",
      state: "",
      country: ""
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if(!living) return;

    reset({
      city: living.city || "",
      state: living.state || "",
      country: living.country || "",
    });
  }, [living, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "updateUserLocation",
    async (_: string, { arg }: { arg: UpdateUserLocationFormValues }) => {
      const tracker = getUserTrackingId();
      const id = tracker?.id ?? "";

      if (!id) return showError({ message: "You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member" });

      if (tracker && tracker.living) return await patchUserLocation(id,arg);
      else await postUserLocation(id, arg);
    },
    {
      onError: (error: any) => {
        showError({ message: error.message || "Failed to update user location" });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: UpdateUserLocationFormValues, callback?: (data: any) => void) => {
    const result = await trigger(values);
    if (result) {
      showSuccess("User location updated successfully!");
      reset();
      callback?.(result);
      updateUserTrackingId({ living: true });
    }
  };

  return {
    handleSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    setValue,
    reset,
    control,
    watch,
    onSubmit,
    livingLoading
  };
} 