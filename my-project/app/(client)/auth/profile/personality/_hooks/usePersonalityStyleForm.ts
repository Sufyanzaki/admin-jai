import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {showError, showSuccess} from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import {updateUserTrackingId} from "@/lib/access-token";
import {useSession} from "next-auth/react";
import {postPersonalityBehavior} from "@/app/shared-api/personalityBehaviorApi";
import {postLifeStyle} from "@/app/shared-api/lifeStyleApi";
import {useRouter} from "next/navigation";

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
    smoke: z.string().min(1, "Required"),
    drinking: z.string().min(1, "Required"),
    goingOut: z.string().min(1, "Required"),
});

type PersonalityBehaviorFormValues = z.infer<typeof personalityBehaviorSchema>;

export default function usePersonalityStyleForm() {

    const router = useRouter();
    const { data:session } = useSession();

    const userId = session?.user.id ? String(session.user.id) : undefined;

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
            smoke: "",
            drinking: "",
            goingOut: ""
        },
        mode: "onBlur",
    });

    const { trigger, isMutating } = useSWRMutation(
        "updatePersonalityStyle",
        async (_: string, { arg }: { arg: PersonalityBehaviorFormValues }) => {
            const {smoke, drinking, goingOut, ...other} = arg;
            if(!userId) return showError({message : "You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member"});
            await Promise.all([
                postPersonalityBehavior(userId, other),
                postLifeStyle(userId, {smoke, drinking, goingOut}),
            ]);
            showSuccess("Hobbies & description saved!");
            return true;
            },
        {
            onError: (error: Error) => {
                showError({ message: error.message || "Failed to update personality/behavior info" });
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: PersonalityBehaviorFormValues, callback?: () => void) => {
        const result = await trigger(values);
        if (result) {
            showSuccess("Personality & Behavior updated successfully!");
            callback?.();
            updateUserTrackingId({ step4: true })
            router.push("/auth/profile/photos");
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
    };
}