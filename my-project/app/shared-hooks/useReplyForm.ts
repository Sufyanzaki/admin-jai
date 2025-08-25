import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError, showSuccess } from "@/shared-lib";
import { useTranslation } from "react-i18next";
import useSWRMutation from 'swr/mutation';
import { sendReply } from "@/app/shared-api/supportApi";
import { useSWRConfig } from "swr";
import { AdminSupportTicketDto } from "@/app/(client)/dashboard/settings/support/_types/support";


export default function useReplyForm(ticketId?: string) {
    const { t } = useTranslation();
    const { mutate } = useSWRConfig();

    const replySchema = z.object({
        message: z.string()
            .min(1, t("Message is required"))
            .max(1000, t("Message must be less than 1000 characters")),
    });

    type ReplyFormValues = z.infer<typeof replySchema>;

    const { trigger, isMutating } = useSWRMutation(
        `tickets-${ticketId}`,
        async (_: string, { arg }: { arg: ReplyFormValues }) => {
            console.log('Sending reply', arg, ticketId);
            if (!ticketId) throw new Error(t('Ticket ID is required to send a reply.'))
            return await sendReply({ ticketId, ...arg });
        },
        {
            onError: (error: unknown) => {
                // @ts-expect-error unknown type
                showError({ message: t(error.message) }); setError(error.message); throw new Error(error.message);
            }
        }
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ReplyFormValues>({
        resolver: zodResolver(replySchema),
        defaultValues: {
            message: "",
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: ReplyFormValues, callback: () => void) => {
        try {
            const r = await trigger(values);
            showSuccess(t("Reply sent successfully!"));
            callback();

            mutate(
                "support",
                (current: AdminSupportTicketDto[] | undefined) => {
                    return current
                        ? current.map((ticket) => {
                            if (ticket.id === ticketId) {
                                return {
                                    ...ticket,
                                    replies: [...ticket.replies, r]
                                };
                            }
                            return ticket;
                        })
                        : [];
                },
                false
            ).finally();

            reset();
        } catch (error: unknown) {
            // @ts-expect-error unknown type
            showError({ message: t(error.message) }); setError(error.message); throw new Error(error.message);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
    };
}
