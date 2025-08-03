import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {showError} from "@/admin-utils/lib/formErrors";
import {showSuccess} from "@/admin-utils/lib/formSuccess";
import {updateProfile} from "@/app/(dashboard)/profile/_api/updateProfile";
import useSWRMutation from "swr/mutation";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import { isFile } from "@/lib/utils";
import { useProfile } from './useProfile';
import { useEffect } from 'react';

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
    image?: string;
}

export default function useProfileForm() {
    const { user, mutate } = useProfile();
    
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
        watch,
        reset,
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            location: "",
        },
        mode: 'onBlur'
    });

    useEffect(()=>{
        if(!user) return;

        reset({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        })
    }, [])

    const onSubmit = async (values: ProfileFormValues, callback?: (data: {status: number} | undefined) => void) => {
        try {
            let imageUrl: string | undefined;

            if (values.image && isFile(values.image)) {
                imageUrl = await imageUpload(values.image);
            }

            const fullName = `${values.firstName} ${values.lastName}`.trim();

            const result = await trigger({
                username: fullName,
                email: values.email,
                location: values.location,
                image: imageUrl,
            });

            if (result?.status === 200) {
                await mutate();
                showSuccess('Profile updated successfully!');
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