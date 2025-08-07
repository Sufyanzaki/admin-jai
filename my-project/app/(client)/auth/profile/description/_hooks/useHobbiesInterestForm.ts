import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/shared-lib";
import { patchUser } from "@/app/shared-api/userApi";
import { postHobbiesInterests } from "@/app/shared-api/hobbiesInterestsApi";

// Zod schema
const hobbiesInterestsSchema = z.object({
    sports: z.array(z.string()).min(1, "Select at least one sport"),
    music: z.array(z.string()).min(1, "Select at least one music genre"),
    kitchen: z.array(z.string()).min(1, "Select at least one kitchen hobby"),
    reading: z.array(z.string()).min(1, "Select at least one reading category"),
    tvShows: z.array(z.string()).min(1, "Select at least one TV show type"),
    description: z.string().min(10, "Description is required"),
});

export type HobbiesInterestsForm = z.infer<typeof hobbiesInterestsSchema>;

export default function useHobbiesInterestsForm(userId: string) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<string | null>(null);

    // --------------------
    // React Hook Form
    // --------------------
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
            description: "",
        },
        mode: "onBlur",
    });

    const onSubmit = useCallback(
        async (values: HobbiesInterestsForm) => {
            try {
                if (!userId) throw new Error("User ID missing");

                setCurrentStep("Saving hobbies & description");

                // Separate API payloads
                const hobbiesPayload = {
                    sports: values.sports.join(", "),
                    music: values.music.join(", "),
                    kitchen: values.kitchen.join(", "),
                    reading: values.reading.join(", "),
                    tvShows: values.tvShows.join(", "),
                };

                await Promise.all([
                    patchUser(userId, { shortDescription: values.description }),
                    postHobbiesInterests(userId, hobbiesPayload),
                ]);

                showSuccess("Hobbies & description saved!");
                router.push("/auth/profile/personality");
            } catch (err) {
                if (err instanceof Error) showError({ message: err.message });
                console.error(err);
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
        isLoading: isSubmitting,
        currentStep,
        register,
        setValue,
        control,
        watch,
        reset,
    };
}
