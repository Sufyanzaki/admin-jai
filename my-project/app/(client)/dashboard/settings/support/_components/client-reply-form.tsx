import { Label } from "@/components/client/ux/label";
import { Textarea } from "@/components/client/ux/textarea";
import { Button } from "@/components/client/ux/button";
import { CheckCircle, MessageSquare } from "lucide-react";
import { AdminSupportTicketDto } from "@/app/(client)/dashboard/settings/support/_types/support";
import { useTranslation } from "react-i18next";
import useReplyForm from "@/app/shared-hooks/useReplyForm";

type ClientReplyFormProps = {
    selectedTicket: AdminSupportTicketDto;
    callback: ()=>void;
};

export default function ClientReplyForm({ selectedTicket, callback }: ClientReplyFormProps) {
    const { t } = useTranslation();
    const { register, handleSubmit, onSubmit, errors, isLoading } = useReplyForm(selectedTicket?.id);

    return (
        <>
            {selectedTicket.status !== "closed" && (
                <form
                    onSubmit={handleSubmit(v=>onSubmit(v, callback))}
                    className="space-y-4 pt-4 border-t border-gray-200/50"
                >
                    <Label className="text-base font-semibold">{t("Add Reply")}</Label>

                    <Textarea
                        placeholder={t("Type your reply here...")}
                        {...register("message")}
                        className="min-h-[120px] resize-none border-gray-300/70 focus:border-gray-400/50"
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm">{errors.message.message}</p>
                    )}

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            size="default"
                            type="button"
                        >
                            <CheckCircle className="w-4 h-4" />
                            {t("Close Ticket")}
                        </Button>

                        <Button
                            size="default"
                            type="submit"
                            disabled={isLoading}
                        >
                            <MessageSquare className="w-4 h-4" />
                            {t("Send Reply")}
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
}
