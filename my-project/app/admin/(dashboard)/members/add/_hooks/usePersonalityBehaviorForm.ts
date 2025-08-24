import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {showError, showSuccess} from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import {patchPersonalityBehavior, postPersonalityBehavior} from "@/app/shared-api/personalityBehaviorApi";
import {getUserTrackingId, updateUserTrackingId} from "@/lib/access-token";
import {usePersonalityBehaviorInfo} from "@/app/shared-hooks/usePersonalityBehaviorInfo";
import {useEffect, useMemo} from "react";
import { useTranslation } from "react-i18next";
import {useParams} from "next/navigation";

const usePersonalityBehaviorFormSchema = (t: any) => z.object({
  simple: z.boolean(),
  musical: z.boolean(),
  conservative: z.boolean(),
  calm: z.boolean(),
  pragmatic: z.boolean(),
  streetSmart: z.boolean(),
  subdued: z.boolean(),
  demanding: z.boolean(),
  narcissistic: z.boolean(),
  eccentric: z.boolean(),
  spiritual: z.boolean(),
  talkative: z.boolean(),
  prettySmart: z.boolean(),
  undemanding: z.boolean(),
  altruistic: z.boolean(),
  stubborn: z.boolean(),
  selfish: z.boolean(),
  sporty: z.boolean(),
  modest: z.boolean(),
  humorous: z.boolean(),
  romantic: z.boolean(),
  serious: z.boolean(),
  sharp: z.boolean(),
  caring: z.boolean(),
  spontaneously: z.boolean(),
  freethinking: z.boolean(),
  adventurous: z.boolean(),
  sensual: z.boolean(),
  straightForward: z.boolean(),
  intellectual: z.boolean(),
  embarrassed: z.boolean(),
  exuberant: z.boolean(),
  worldly: z.boolean(),
  artistic: z.boolean(),
  sluggish: z.boolean(),
  compulsive: z.boolean(),
  relaxed: z.boolean(),
});

export type PersonalityBehaviorFormValues = z.infer<ReturnType<typeof usePersonalityBehaviorFormSchema>>;

export default function usePersonalityBehaviorForm() {
  const { t } = useTranslation();

  const params = useParams();
  const tracker = getUserTrackingId();

  const id = useMemo(() => {
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;
    return tracker?.id ?? paramId;
  }, [params.id, tracker?.id]);

  const allowEdit = useMemo(() => {
    return id && tracker?.personalityAndBehavior;
  }, [id, tracker?.personalityAndBehavior]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    control,
    watch,
  } = useForm<PersonalityBehaviorFormValues>({
    resolver: zodResolver(usePersonalityBehaviorFormSchema(t)),
    defaultValues: {
      simple: false,
      musical: false,
      conservative: false,
      calm: false,
      pragmatic: false,
      streetSmart: false,
      subdued: false,
      demanding: false,
      narcissistic: false,
      eccentric: false,
      spiritual: false,
      talkative: false,
      prettySmart: false,
      undemanding: false,
      altruistic: false,
      stubborn: false,
      selfish: false,
      sporty: false,
      modest: false,
      humorous: false,
      romantic: false,
      serious: false,
      sharp: false,
      caring: false,
      spontaneously: false,
      freethinking: false,
      adventurous: false,
      sensual: false,
      straightForward: false,
      intellectual: false,
      embarrassed: false,
      exuberant: false,
      worldly: false,
      artistic: false,
      sluggish: false,
      compulsive: false,
      relaxed: false,
    },
    mode: "onBlur",
  });

  const { personalityBehavior, personalityBehaviorLoading } = usePersonalityBehaviorInfo();

  useEffect(() => {
    if (id && personalityBehavior) {
      reset({
        ...personalityBehavior
      });
    }
  }, [personalityBehavior, reset, id]);

  const { trigger, isMutating } = useSWRMutation(
    "updatePersonalityBehavior",
    async (_: string, { arg }: { arg: PersonalityBehaviorFormValues }) => {
      const { ...payload } = arg;
    
      if(!id) return showError({message : t("You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member")});
      
      if (id && allowEdit) return await patchPersonalityBehavior(id, payload);
      else return await postPersonalityBehavior(id, payload);
    
    },
    {
      onError: (error: Error) => showError({ message: error.message ? t(error.message) : t("Failed to update personality/behavior info") }),
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: PersonalityBehaviorFormValues, callback?: () => void) => {
    const result = await trigger(values);
      if (result) {
        showSuccess(t("Personality & Behavior updated successfully!"));
        callback?.();
        updateUserTrackingId({ personalityAndBehavior: true });
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
    personalityBehaviorLoading,
  };
}