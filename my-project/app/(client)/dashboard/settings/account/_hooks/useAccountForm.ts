import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import useSWRMutation from "swr/mutation";
import {useEffect, useState} from "react";
import {patchUser} from "@/app/shared-api/userApi";
import {useSession} from "next-auth/react";
import {MemberProfile} from "@/app/shared-types/member";
import {imageUpload} from "@/admin-utils/utils/imageUpload";
import {showError, showSuccess} from "@/shared-lib";
import {useBasicInfo} from "@/app/shared-hooks/useBasicInfo";

const clientAccountSchema = z.object({
    image: z
        .any()
        .refine((val) => val instanceof File || typeof val === "string", {
            message: "Please provide a valid image",
        }),
    firstName: z.string().min(1, "First name is required"),
    username: z.string().min(1, "User name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.string().min(1, "Gender is required"),
    dob: z.string().min(1, "Date of birth is required"),
    email: z.string().email("Please enter a valid email"),
});

export type ClientAccountFormValues = z.infer<typeof clientAccountSchema>;

export default function useClientAccount() {

    const { data: session } = useSession();

    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false)

    const userId = session?.user?.id ? String(session.user.id) : undefined
    const { user, userLoading } = useBasicInfo(userId);

    const { trigger } = useSWRMutation(
        "client-account",
        async (_: string, { arg }: { arg: Partial<MemberProfile> }) => {
            if(!userId) throw new Error("User ID is undefined. Please log in again")
            return await patchUser(userId, arg);
        },
        {
            onError: (error: unknown) => {
                if (error instanceof Error) {
                    showError({ message: error.message });
                } else {
                    showError({ message: "An unknown error occurred." });
                }
            },
        }
    );

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
        watch,
        control,
    } = useForm<ClientAccountFormValues>({
        resolver: zodResolver(clientAccountSchema),
        defaultValues: {
            image: "",
            firstName: "",
            username: "",
            lastName: "",
            gender: "male",
            dob: "",
            email: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        if(!user) return;

        const {image, firstName, username, lastName, gender, dob, email} = user;

        reset({
            image,
            firstName,
            username,
            lastName,
            gender,
            dob,
            email,
        })
    }, [user, reset])

    const onSubmit = async (values: ClientAccountFormValues) => {
        try {
            let imageUrl = undefined;

            if (values.image instanceof File) {
                setIsUploading(true);
                imageUrl = await imageUpload(values.image);
                setIsUploading(false);
            }

            await trigger({
                ...values,
                image: imageUrl,
            });

            showSuccess("Profile updated successfully!");
            router.push("/dashboard");
        } catch (error: unknown) {
            setIsUploading(false);
            if(error instanceof Error) showError({ message: error.message });
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        setValue,
        watch,
        control,
        errors,
        isLoading: isSubmitting || isUploading,
        isFetching: userLoading
    };
}
