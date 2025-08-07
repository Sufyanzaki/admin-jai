import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError, showSuccess } from '@/shared-lib';
import useSWRMutation from 'swr/mutation';
import { patchUser } from "@/app/shared-api/userApi";
import { postPartnerExpectation } from "@/app/shared-api/partnerExpectationApi";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

// Schema for user profile creation
export const userProfileCreateSchema = z.object({
    username: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    gender: z.enum(['Male', 'Female', 'Other']),
    age: z.number().int().min(0),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    relationshipStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed', 'Other']),
    children: z.boolean(),
    religion: z.string().min(1),
    origin: z.string().min(1),
    location: z.string().min(1),
    lookingFor: z.string().min(1),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
});

export type UserProfile = z.infer<typeof userProfileCreateSchema>;

export default function useProfileCreateForm() {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState<string | null>(null);

    const { trigger, isMutating } = useSWRMutation(
        'clientCreateUser',
        async (_: string, { arg }: { arg: UserProfile }) => {
            const { lookingFor, ...userFields } = arg;

            setCurrentStep("Updating user & Saving preferences");

            await Promise.all([
                patchUser(userId, userFields),
                postPartnerExpectation(userId, { lookingFor }),
            ]);
            return true;
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message });
                console.error('User creation error:', error);
            },
            onSuccess: () => {
                router.push('/auth/otp');
                setCurrentStep(null);
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
        setValue,
        watch,
        control,
    } = useForm<UserProfile>({
        resolver: zodResolver(userProfileCreateSchema),
        defaultValues: {
            username: "john_doe1",
            firstName: "John1",
            lastName: "Doe",
            gender: "Male",
            age: 33,
            dob: "1990-01-01",
            relationshipStatus: "Single",
            children: false,
            religion: "Christian",
            origin: "",
            location: "",
            lookingFor: "",
            country: "",
            state: "",
            city: "",
        },
        mode: 'onBlur',
    });

    const onSubmit = useCallback(
        async (values: UserProfile, callback?: () => void) => {
            try {
                const result = await trigger(values);
                if (result) {
                    showSuccess('User created successfully!');
                    callback?.();
                    router.push("/dashboard");
                }
            } catch (error) {
                if (error instanceof Error) showError({ message: error.message });
            } finally {
                setCurrentStep(null);
            }
        },
        [trigger, reset, router]
    );

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        currentStep,
        register,
        setValue,
        control,
        watch
    }
}