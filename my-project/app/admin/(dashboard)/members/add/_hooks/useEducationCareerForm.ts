import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { patchEducationCareer, postEducationCareer } from "@/app/shared-api/educationCareerApi";
import { getUserTrackingId, updateUserTrackingId } from "@/lib/access-token";
import { useEducationCareerInfo } from "@/app/shared-hooks/useEducationCareerInfo";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";

export default function useEducationCareerForm() {

  const { t } = useTranslation();

  const educationCareerSchema = z.object({
    primarySpecialization: z.string().min(1, t("Primary specialization is required")),
    secondarySpecialization: z.string().min(1, t("Secondary specialization is required")),
    qualifications: z.string().min(1, t("Qualifications are required")),
    experience: z.string().min(1, t("Experience is required")),
    education: z.string().min(1, t("Education is required")),
    certifications: z.string().min(1, t("Certifications are required")),
    department: z.string().min(1, t("Department is required")),
    position: z.string().min(1, t("Position is required")),
  });

  type EducationCareerFormValues = z.infer<typeof educationCareerSchema>;


  const params = useParams();
  const { educationCareer, educationCareerLoading } = useEducationCareerInfo();
  const tracker = getUserTrackingId();

  const id = useMemo(() => {
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;
    return tracker?.id ?? paramId;
  }, [params.id, tracker?.id]);

  const allowEdit = useMemo(() => {
    return id && tracker?.educationAndCareer;
  }, [id, tracker?.educationAndCareer]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    control,
    watch,
    register,
  } = useForm<EducationCareerFormValues>({
    resolver: zodResolver(educationCareerSchema),
    defaultValues: {
      primarySpecialization: "",
      secondarySpecialization: "",
      qualifications: "",
      experience: "",
      education: "",
      certifications: "",
      department: "",
      position: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (id && educationCareer) {
      reset({
        primarySpecialization: educationCareer.primarySpecialization || "",
        secondarySpecialization: educationCareer.secondarySpecialization || "",
        qualifications: educationCareer.qualifications || "",
        experience: educationCareer.experience || "",
        education: educationCareer.education || "",
        certifications: educationCareer.certifications || "",
        department: educationCareer.department || "",
        position: educationCareer.position || "",
      });
    }
  }, [tracker?.id, educationCareer, reset, id]);

  const { trigger, isMutating } = useSWRMutation(
    "updateEducationCareer",
    async (_: string, { arg }: { arg: EducationCareerFormValues }) => {
      if (id && allowEdit) {
        return await patchEducationCareer(id, arg);
      } else {
        return await postEducationCareer(id!, arg);
      }
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t("Failed to update education/career info") });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: EducationCareerFormValues, callback?: () => void) => {
    const result = await trigger(values);
    if (result) {
      showSuccess(t("Education & Career updated successfully!"));
      callback?.();
      updateUserTrackingId({ educationAndCareer: true });
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
    educationCareerLoading,
  };
} 