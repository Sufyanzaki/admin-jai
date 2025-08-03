import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { patchPartnerExpectation, postPartnerExpectation } from "../../_api/updatePartnerExpectation";
import { getUserTrackingId, updateUserTrackingId } from "@/lib/access-token";
import { useParams } from "next/navigation";
import {useEffect, useMemo} from "react";
import {usePartnerExpectations} from "@/app/(dashboard)/members/_hooks/usepartnerExpectations";

const partnerExpectationSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  lookingFor: z.string().min(1, "Looking for is required"),
  length: z.string().min(1, "Length is required"),
  religion: z.string().min(1, "Religion is required"),
  relationshipStatus: z.string().min(1, "Relationship status is required"),
  education: z.string().min(1, "Education is required"),
  weight: z.string().min(1, "Weight is required"),
  smoke: z.boolean(),
  drinking: z.boolean(),
  goingOut: z.boolean(),
  ageFrom: z.coerce.number().min(0, "From age is required"),
  ageTo: z.coerce.number().min(0, "To age is required"),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export type PartnerExpectationFormValues = z.infer<typeof partnerExpectationSchema>;

export default function usePartnerExpectationForm() {

  const params = useParams();
  const tracker = getUserTrackingId();

  const {expectations, expectationLoading} = usePartnerExpectations();

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
      smoke: false,
      drinking: false,
      goingOut: false,
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
    if(!expectations) return;

    reset({
      origin: expectations.origin || "",
      lookingFor: expectations.lookingFor || "",
      length: expectations.length || "",
      religion: expectations.religion || "",
      relationshipStatus: expectations.relationshipStatus || "",
      education: expectations.education || "",
      weight: expectations.weight || "",
      smoke: expectations.smoke || false,
      drinking: expectations.drinking || false,
      goingOut: expectations.goingOut || false,
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
        if (!id) return showError({ message: "You need to initialize a new member profile before you can add other details. Go back to basic Information to initialize a member" });

        if (id && allowEdit) return await patchPartnerExpectation(id, arg);
        else return await postPartnerExpectation(id, arg);
      },
      {
        onError: (error: any) => {
          showError({ message: error.message || "Failed to update partner expectation info" });
        },
        revalidate: false,
        populateCache: false,
      }
  );

  const onSubmit = async (values: PartnerExpectationFormValues, callback?: (data: any) => void) => {
    const result = await trigger(values);
    if (result?.status === 201 || result?.status === 200) {
      showSuccess("Partner expectation updated successfully!");
      callback?.(result);
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