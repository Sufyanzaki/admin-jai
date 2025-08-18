"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/shared-lib";
import { createSupportTicket } from "../../../../../shared-api/supportApi";

const supportTicketSchema = z.object({
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    category: z.string().min(1, "Category is Required"),
    priority: z.string().min(1, "Priority is Required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export type SupportTicketFormValues = z.infer<typeof supportTicketSchema>;

export default function useSupportTicket() {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SupportTicketFormValues>({
        resolver: zodResolver(supportTicketSchema),
        defaultValues: {
            subject: "",
            category: "technical",
            priority: "medium",
            description: "",
        },
        mode: "onBlur",
    });

    const { trigger, isMutating } = useSWRMutation(
        "createSupportTicket",
        async (_, { arg }: { arg: SupportTicketFormValues }) => {
            return await createSupportTicket(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message || "Failed to create support ticket" });
                console.error("Support ticket error:", error);
            },
            onSuccess: () => {
                showSuccess("Support ticket created successfully!");
                reset();
            },
        }
    );

    const onSubmit = async (values: SupportTicketFormValues, callback?: () => void) => {
        const result = await trigger(values);
        if (result) {
            reset();
            callback?.();
        }
    };

    return {
        control,
        register,
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        reset,
    };
}