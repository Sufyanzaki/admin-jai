import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { patchHobbiesInterests } from "@/app/shared-api/hobbiesInterestsApi";
import { updateUserTrackingId } from "@/lib/access-token";
import { useHobbiesInterestsInfo } from "@/app/shared-hooks/useHobbiesInterestsInfo";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {toArray} from "@/lib/utils";

const hobbiesInterestsSchema = z.object({
    sports: z.array(z.string()).min(1, "Select at least one sport"),
    music: z.array(z.string()).min(1, "Select at least one music genre"),
    kitchen: z.array(z.string()).min(1, "Select at least one kitchen hobby"),
    reading: z.array(z.string()).min(1, "Select at least one reading category"),
    tvShows: z.array(z.string()).min(1, "Select at least one TV show type"),
});

type HobbiesInterestsFormValues = z.infer<typeof hobbiesInterestsSchema>;

export default function useHobbiesForm() {
    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const userIdProps = userId;

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

    const { hobbiesInterests, hobbiesInterestsLoading } = useHobbiesInterestsInfo(userIdProps);
    console.log(hobbiesInterests);

    useEffect(() => {
        if (!hobbiesInterests) return;
        const { sports, kitchen, reading, tvShows, music } = hobbiesInterests;
        reset({
            sports: toArray(sports),
            music: toArray(music),
            kitchen: toArray(kitchen),
            reading: toArray(reading),
            tvShows: toArray(tvShows),
        });
    }, [hobbiesInterests, hobbiesInterestsLoading, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "updateHobbiesInterests",
        async (_: string, { arg }: { arg: HobbiesInterestsFormValues }) => {
            if (!userId) {
                return showError({
                    message:
                        "You need to initialize a new member profile before you can add other details. Go back to Basic Information to initialize a member.",
                });
            }
            const hobbiesPayload = {
                sports: arg.sports.join(", "),
                music: arg.music.join(", "),
                kitchen: arg.kitchen.join(", "),
                reading: arg.reading.join(", "),
                tvShows: arg.tvShows.join(", "),
            };
            await patchHobbiesInterests(userId, hobbiesPayload);
            return true;
        },
        {
            onError: (error: Error) => {
                showError({
                    message: error.message || "Failed to update hobbies/interests info",
                });
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: HobbiesInterestsFormValues, callback?: () => void) => {
        const result = await trigger(values);
        if (result) {
            showSuccess("Hobbies & Interests updated successfully!");
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
