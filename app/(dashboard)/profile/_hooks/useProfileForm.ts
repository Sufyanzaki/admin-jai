import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {showError} from "@/admin-utils/lib/formErrors";
import {showSuccess} from "@/admin-utils/lib/formSuccess";
import {updateProfile} from "@/app/(dashboard)/profile/_api/updateProfile";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useProfile } from "./useProfile";

const profileSchema = z.object({
    firstName: z.string()
        .min(1, "First name is required")
        .min(2, "First name must be at least 2 characters"),
    lastName: z.string()
        .min(1, "Last name is required")
        .min(2, "Last name must be at least 2 characters"),
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    phone: z.string().optional(),
    location: z.string()
        .min(1, "Location is required")
        .min(2, "Location must be at least 2 characters"),
    image: z.any().optional(), 
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

type UpdateProfileProps = {
    username: string;
    email: string;
    location: string;
    phone?: string;
    image?: string;
}

export default function useProfileForm() {
    const { data: session } = useSession();
    const { mutate } = useProfile();
    
    const { trigger, isMutating } = useSWRMutation(
        'updateProfile',
        async (url: string, { arg }: { arg: UpdateProfileProps }) => {
            return await updateProfile(arg);
        },
        {
            onError: (error: any) => {
                showError({message: error.message});
                console.error('Profile update error:', error);
            }
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setValue,
        reset,
        watch,
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            location: "",
        },
        mode: 'onBlur'
    });

    console.log(session)

    useEffect(() => {
        const user = session?.user as any;
        if (user) {
            setValue("firstName", user.firstName || "");
            setValue("lastName", user.lastName || "");
            setValue("email", user.email || "");
            setValue("phone", user.phone || "");
            setValue("location", user.location || "");
        }
    }, [session, setValue]);

    const onSubmit = async (values: ProfileFormValues, callback?: (data: {status: number} | undefined) => void) => {
        try {
            let imageUrl: string | undefined;

            if (values.image && values.image instanceof File) {
                imageUrl = "https://example.com/admin.jpg";
            }

            // Combine firstName and lastName for the username field
            const fullName = `${values.firstName} ${values.lastName}`.trim();

            const result = await trigger({
                username: fullName,
                email: values.email,
                location: values.location,
                phone: values.phone,
                image: imageUrl,
            });

            if (result?.status === 200) {
                await mutate();
                showSuccess('Profile updated successfully!');
                reset();
                callback?.(result);
            }
        } catch (error: any) {
            showError({message: error.message});
            console.error('Profile update error:', error);
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        register,
        setValue,
        watch
    };
} 