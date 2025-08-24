import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { patchPartnerExpectation, postPartnerExpectation } from "@/app/shared-api/partnerExpectationApi";
import { getUserTrackingId, updateUserTrackingId } from "@/lib/access-token";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { usePartnerExpectations } from "@/app/admin/(dashboard)/members/_hooks/usepartnerExpectations";

export default function usePartnerExpectationForm() {

  const { t } = useTranslation();

  const partnerExpectationSchema = z.object({
    origin: z.string().min(1, t("Origin is required")),
    lookingFor: z.string().min(1, t("Looking for is required")),
    length: z.string().min(1, t("Length is required")),
    religion: z.string().min(1, t("Religion is required")),
    relationshipStatus: z.string().min(1, t("Relationship status is required")),
    education: z.string().min(1, t("Education is required")),
    weight: z.string().min(1, t("Weight is required")),
    smoke: z.string().min(1, t("Required")),
    drinking: z.string().min(1, t("Required")),
    goingOut: z.string().min(1, t("Required")),
    ageFrom: z.coerce.number().min(0, t("From age is required")),
    ageTo: z.coerce.number().min(0, t("To age is required")),
    city: z.string().optional(),
    state: z.string().min(1, t("State is Required")),
    country: z.string().min(1, t("Country is Required")),
  });

  type PartnerExpectationFormValues = z.infer<typeof partnerExpectationSchema>;


  const params = useParams();
  const tracker = getUserTrackingId();

  const { expectations, expectationLoading } = usePartnerExpectations();

  const id = useMemo(() => {
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;
    return tracker?.id ?? paramId;
  }, [params.id, tracker?.id]);

  const allowEdit = useMemo(() => {
    return id && tracker?.partnerExpectation;
  }, [id, tracker?.partnerExpectation]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    control,
    watch,
  } = useForm<PartnerExpectationFormValues>({
    resolver: zodResolver(partnerExpectationSchema),
    defaultValues: {
      origin: "",
      lookingFor: "",
      length: "",
      religion: "",
      relationshipStatus: "",
      education: "",
      weight: "",
      smoke: "",
      drinking: "",
      goingOut: "",
      ageFrom: 0,
      ageTo: 0,
      // Updated location defaults
      city: "",
      state: "",
      country: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!expectations) return;

    reset({
      origin: expectations.origin || "",
      lookingFor: expectations.lookingFor || "",
      length: expectations.length || "",
      religion: expectations.religion || "",
      relationshipStatus: expectations.relationshipStatus || "",
      education: expectations.education || "",
      weight: expectations.weight || "",
      smoke: expectations.smoke || "",
      drinking: expectations.drinking || "",
      goingOut: expectations.goingOut || "",
      ageFrom: expectations.ageFrom || 0,
      ageTo: expectations.ageTo || 0,
      city: expectations.city || "",
      state: expectations.state || "",
      country: expectations.country || "",
    })
  }, [expectations, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "updatePartnerExpectation",
    async (_: string, { arg }: { arg: PartnerExpectationFormValues }) => {
  if (!id) return showError({ message: t("You need to initialize a new member profile before you can add other details. Go back to basic Information to initialize a member") });

      if (id && allowEdit) return await patchPartnerExpectation(id, arg);
      else return await postPartnerExpectation(id, arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t("Failed to update partner expectation info") });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: PartnerExpectationFormValues, callback?: () => void) => {
    const result = await trigger(values);
    if (result) {
      showSuccess(t("Partner expectation updated successfully!"));
      callback?.();
      updateUserTrackingId({ partnerExpectation: true });
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
    expectationLoading
  };
}