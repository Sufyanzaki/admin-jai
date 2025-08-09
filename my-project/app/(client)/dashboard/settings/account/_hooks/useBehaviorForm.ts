"use client"

import { usePersonalityBehaviorInfo } from "@/app/shared-hooks/usePersonalityBehaviorInfo";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import {patchPersonalityBehavior} from "@/app/shared-api/personalityBehaviorApi";
import {showError, showSuccess} from "@/shared-lib";


const personalityBehaviorSchema = z.object({
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

export type PersonalityBehaviorFormValues = z.infer<typeof personalityBehaviorSchema>;

export default function useBehaviorForm() {

    const {data:session} = useSession();
    const userIdProps = session?.user?.id ? String(session.user.id) : undefined;

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setValue,
        reset,
        control,
        watch,
    } = useForm<PersonalityBehaviorFormValues>({
        resolver: zodResolver(personalityBehaviorSchema),
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

    const { personalityBehavior, personalityBehaviorLoading } = usePersonalityBehaviorInfo(userIdProps);

    useEffect(() => {
        if(!personalityBehavior) return;
        const {id, userId, ...other} = personalityBehavior;
        reset({ other });
        console.warn(id, userId)

    }, [personalityBehavior, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "updatePersonalityBehavior",
        async (_: string, { arg }: { arg: PersonalityBehaviorFormValues }) => {
            const { ...payload } = arg;
            if(!userIdProps) throw new Error("User ID is undefined. Please log in again");
            return await patchPersonalityBehavior(userIdProps, payload);

        },
        {
            onError: (error: Error) => showError({ message: error.message || "Failed to update personality/behavior info" }),
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: PersonalityBehaviorFormValues, callback?: () => void) => {
        const result = await trigger(values);
        if (result) {
            showSuccess("Personality & Behavior updated successfully!");
            callback?.();
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        setValue,
        control,
        watch,
        onSubmit,
        personalityBehaviorLoading,
    };
}