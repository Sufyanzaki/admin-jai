import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {showError, showSuccess} from '@/shared-lib';
import useSWRMutation from 'swr/mutation';
import {useCallback} from 'react';
import {postUser} from "@/app/shared-api/userApi";
import {postUserLocation} from "@/app/shared-api/livingApi";
import {postPartnerExpectation} from "@/app/shared-api/partnerExpectationApi";

const userSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    ageFrom: z.string().min(1, "Age is required"),
    ageTo: z.string().min(1, "Age is required"),
    lookingFor: z.string().min(1, "Looking for is required"),

    dummyKey: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;

export default function useRegisterForm() {
    const { trigger, isMutating } = useSWRMutation(
        'clientCreateUser',
        async (_, { arg }: { arg: UserFormValues }) => {
            const {email, password, ageTo, ageFrom, lookingFor, ...location} = arg
            const user = await postUser({email, password});
            await postUserLocation(user.id, location);
            await postPartnerExpectation(user.id, {lookingFor, ageTo: parseInt(ageTo), ageFrom: parseInt(ageFrom)})
            return user;
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message });
                console.error('User creation error:', error);
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
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: '',
            password: '',
            country: '',
            state: '',
            city: '',
            ageFrom: '18',
            ageTo: '30',
        },
        mode: 'onBlur',
    });

    const onSubmit = useCallback(
        async (values: UserFormValues, callback?: () => void) => {
            try {
                const result = await trigger(values);
                if (result) {
                    showSuccess('User created successfully!');
                    reset();
                    callback?.();
                }
            } catch (error) {
                if (error instanceof Error) showError({ message: error.message });
            }
        },
        [trigger, reset]
    );

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        register,
        setValue,
        control,
        watch
    };
}
