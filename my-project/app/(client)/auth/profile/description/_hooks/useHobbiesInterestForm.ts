import {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {showError, showSuccess} from "@/shared-lib";
import {patchUser} from "@/app/shared-api/userApi";
import {postHobbiesInterests} from "@/app/shared-api/hobbiesInterestsApi";
import { useSession } from "next-auth/react";
import {updateUserTrackingId} from "@/lib/access-token";
import {useHobbiesInterestsInfo} from "@/app/admin/(dashboard)/members/_hooks/useHobbiesInterestsInfo";
import {useBasicInfo} from "@/app/admin/(dashboard)/members/_hooks/useBasicInfo";

const hobbiesInterestsSchema = z.object({
    sports: z.array(z.string()).min(1, "Select at least one sport"),
    music: z.array(z.string()).min(1, "Select at least one music genre"),
    kitchen: z.array(z.string()).min(1, "Select at least one kitchen hobby"),
    reading: z.array(z.string()).min(1, "Select at least one reading category"),
    tvShows: z.array(z.string()).min(1, "Select at least one TV show type"),
    shortDescription: z.string().min(10, "Description is required"),
});

export type HobbiesInterestsForm = z.infer<typeof hobbiesInterestsSchema>;

export default function useHobbiesInterestsForm() {

    const { data:session } = useSession();

    const {hobbiesInterests, hobbiesInterestsLoading} = useHobbiesInterestsInfo();
    const {user, userLoading} = useBasicInfo();

    const userId = session?.user.id ? String(session.user.id) : undefined;

    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<string | null>(null);

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
        if(!user || !hobbiesInterests) return;

        reset({
            sports: [],
            music: [],
            kitchen: [],
            reading: [],
            tvShows: [],
            shortDescription: user.shortDescription ? user.shortDescription : "",
        })
    }, [userLoading, hobbiesInterests]);

    const onSubmit = useCallback(
        async (values: HobbiesInterestsForm) => {
            try {
                if (!userId) throw new Error("User ID missing");
                setCurrentStep("Saving hobbies & description");

                const hobbiesPayload = {
                    sports: values.sports.join(", "),
                    music: values.music.join(", "),
                    kitchen: values.kitchen.join(", "),
                    reading: values.reading.join(", "),
                    tvShows: values.tvShows.join(", "),
                };

                await Promise.all([
                    patchUser(userId, { shortDescription: values.shortDescription }),
                    postHobbiesInterests(userId, hobbiesPayload),
                ]);

                updateUserTrackingId({ step3: true })

                showSuccess("Hobbies & description saved!");
                router.push("/auth/profile/personality");
            } catch (err) {
                if (err instanceof Error) showError({ message: err.message });
            } finally {
                setCurrentStep(null);
            }
        },
        [userId, router]
    );

    return {
       handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        currentStep,
        register,
        setValue,
        control,
        watch,
        reset,
        isFetching: hobbiesInterestsLoading || userLoading
    };
}
