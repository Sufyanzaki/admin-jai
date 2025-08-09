"use client"

import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {showError, showSuccess} from "@/shared-lib";
import {patchUser} from "@/app/shared-api/userApi";
import {patchHobbiesInterests, postHobbiesInterests,} from "@/app/shared-api/hobbiesInterestsApi";
import {useSession} from "next-auth/react";
import {getUserTrackingId, updateUserTrackingId} from "@/lib/access-token";
import {useHobbiesInterestsInfo} from "@/app/shared-hooks/useHobbiesInterestsInfo";
import {useBasicInfo} from "@/app/shared-hooks/useBasicInfo";
import useSWRMutation from "swr/mutation";
import {toArray} from "@/lib/utils";

const hobbiesInterestsSchema = z.object({
    sports: z.array(z.string()).min(1, "Select at least one sport"),
    music: z.array(z.string()).min(1, "Select at least one music genre"),
    kitchen: z.array(z.string()).min(1, "Select at least one kitchen hobby"),
    reading: z.array(z.string()).min(1, "Select at least one reading category"),
    tvShows: z.array(z.string()).min(1, "Select at least one TV show type"),
    shortDescription: z.string().min(100, "At least 100 characters long"),
});

export type HobbiesInterestsForm = z.infer<typeof hobbiesInterestsSchema>;

export default function useHobbiesInterestsForm() {
    const { data: session } = useSession();
    const { hobbiesInterests, hobbiesInterestsLoading } = useHobbiesInterestsInfo();
    const { user, userLoading } = useBasicInfo();
    const router = useRouter();

    const userId = session?.user.id ? String(session.user.id) : undefined;

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
        setValue,
        watch,
        control,
    } = useForm<HobbiesInterestsForm>({
        resolver: zodResolver(hobbiesInterestsSchema),
        defaultValues: {
            sports: [],
            music: [],
            kitchen: [],
            reading: [],
            tvShows: [],
            shortDescription: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        console.log(user, hobbiesInterests)
        if (!user || !hobbiesInterests) return;

        const { shortDescription = "" } = user;
        const { sports, kitchen, reading, tvShows, music } = hobbiesInterests;
        reset({
            sports: toArray(sports),
            music: toArray(music),
            kitchen: toArray(kitchen),
            reading: toArray(reading),
            tvShows: toArray(tvShows),
            shortDescription: shortDescription,
        });
    }, [userLoading, hobbiesInterests, reset, user]);

    const { trigger, isMutating } = useSWRMutation(
        "updateHobbiesInterests",
        async (_: string, { arg }: { arg: HobbiesInterestsForm }) => {
            if (!userId) {
                return showError({
                    message:
                        "You need to initialize a new member profile before you can add hobbies. Go back to Basic Information to initialize a member.",
                });
            }

            const tracker = getUserTrackingId();
            const api = tracker?.step3 ? patchHobbiesInterests : postHobbiesInterests;

            const hobbiesPayload = {
                sports: arg.sports.join(", "),
                music: arg.music.join(", "),
                kitchen: arg.kitchen.join(", "),
                reading: arg.reading.join(", "),
                tvShows: arg.tvShows.join(", "),
            };

            await Promise.all([
                patchUser(userId, { shortDescription: arg.shortDescription }),
                api(userId, hobbiesPayload),
            ]);

            showSuccess("Hobbies & description saved!");
            return true;
        },
        {
            onError: (error: Error) => {
                showError({
                    message:
                        error.message || "Failed to update hobbies and description",
                });
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: HobbiesInterestsForm, callback?: () => void) => {
        const result = await trigger(values);
        if (result) {
            callback?.();
            updateUserTrackingId({ step3: true });
            router.push("/auth/profile/personality");
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting: isSubmitting || isMutating,
        setValue,
        reset,
        control,
        watch,
        onSubmit,
        isFetching: hobbiesInterestsLoading || userLoading,
    };
}
