import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { postHobbiesInterests, patchHobbiesInterests } from "@/app/shared-api/hobbiesInterestsApi";
import { getUserTrackingId, updateUserTrackingId } from "@/lib/access-token";
import { useHobbiesInterestsInfo } from "@/app/shared-hooks/useHobbiesInterestsInfo";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";


export default function useHobbiesInterestsForm() {

  const { t } = useTranslation();

  const hobbiesInterestsSchema = z.object({
    sports: z.any()
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: t("Please select at least one sport")
      })
      .pipe(z.array(z.string()).min(1, {
        message: t("Please select at least one sport")
      })),
    music: z.any()
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: t("Please select at least one music")
      })
      .pipe(z.array(z.string()).min(1, {
        message: t("Please select at least one music")
      })),
    kitchen: z.any()
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: t("Please select at least one kitchen")
      })
      .pipe(z.array(z.string()).min(1, {
        message: t("Please select at least one kitchen")
      })),
    reading: z.any()
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: t("Please select at least one reading")
      })
      .pipe(z.array(z.string()).min(1, {
        message: t("Please select at least one reading")
      })),
    tvShows: z.any()
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: t("Please select at least one tvShows")
      })
      .pipe(z.array(z.string()).min(1, {
        message: t("Please select at least one tvShows")
      })),
  });

  type HobbiesInterestsFormValues = z.infer<typeof hobbiesInterestsSchema>;

  const params = useParams();
  const tracker = getUserTrackingId();

  const id = useMemo(() => {
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;
    return tracker?.id ?? paramId;
  }, [params.id, tracker?.id]);

  const allowEdit = useMemo(() => {
    return id && tracker?.hobbiesAndInterest;
  }, [id, tracker?.hobbiesAndInterest]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
  } = useForm<HobbiesInterestsFormValues>({
    resolver: zodResolver(hobbiesInterestsSchema),
    defaultValues: {
      sports: [],
      music: [],
      kitchen: [],
      reading: [],
      tvShows: [],
    },
    mode: "onBlur",
  });

  const { hobbiesInterests, hobbiesInterestsLoading } = useHobbiesInterestsInfo();

  useEffect(() => {
    if (id && hobbiesInterests) {
      reset({
        sports: hobbiesInterests.sports?.split(",") || [],
        music: hobbiesInterests.music?.split(",") || [],
        kitchen: hobbiesInterests.kitchen?.split(",") || [],
        reading: hobbiesInterests.reading?.split(",") || [],
        tvShows: hobbiesInterests.tvShows?.split(",") || [],
      });
    }
  }, [id, hobbiesInterests, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "updateHobbiesInterests",
    async (_: string, { arg }: { arg: HobbiesInterestsFormValues }) => {
  if (!id) return showError({ message: t("You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member") });

      const payload = {
        sports: arg.sports.join(","),
        music: arg.music.join(","),
        kitchen: arg.kitchen.join(","),
        reading: arg.reading.join(","),
        tvShows: arg.tvShows.join(","),
      }

      if (id && allowEdit) return await patchHobbiesInterests(id, payload);
      else return await postHobbiesInterests(id, payload);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t("Failed to update hobbies/interests info") });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: HobbiesInterestsFormValues, callback?: () => void) => {
    const result = await trigger(values);
    if (result) {
      showSuccess(t("Hobbies & Interests updated successfully!"));
      callback?.();
      updateUserTrackingId({ hobbiesAndInterest: true });
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
    hobbiesInterestsLoading,
  };
} 