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

const hobbiesInterestsSchema = z.object({
    sports: z.string().min(1, "Sports is required"),
    music: z.string().min(1, "Music is required"),
    kitchen: z.string().min(1, "Kitchen is required"),
    reading: z.string().min(1, "Reading is required"),
    tvShows: z.string().min(1, "TV Shows is required"),
});

type HobbiesInterestsFormValues = z.infer<typeof hobbiesInterestsSchema>;

export default function useHobbiesForm() {
    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
        watch,
    } = useForm<HobbiesInterestsFormValues>({
        resolver: zodResolver(hobbiesInterestsSchema),
        defaultValues: {
            sports: "",
            music: "",
            kitchen: "",
            reading: "",
            tvShows: "",
        },
        mode: "onBlur",
    });

    const { hobbiesInterests, hobbiesInterestsLoading } = useHobbiesInterestsInfo();

    useEffect(() => {
        if (!hobbiesInterestsLoading && hobbiesInterests) {
            reset({
                sports: hobbiesInterests.sports || "",
                music: hobbiesInterests.music || "",
                kitchen: hobbiesInterests.kitchen || "",
                reading: hobbiesInterests.reading || "",
                tvShows: hobbiesInterests.tvShows || "",
            });
        }
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
            await patchHobbiesInterests(userId, arg);
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
