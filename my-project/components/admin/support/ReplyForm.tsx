import {Textarea} from "@/components/admin/ui/textarea";
import {DialogFooter} from "@/components/admin/ui/dialog";
import {Button} from "@/components/admin/ui/button";
import {Check} from "lucide-react";
import {AdminSupportTicketDto} from "@/app/(client)/dashboard/settings/support/_types/support";
import useReplyForm from "@/app/admin/(dashboard)/support/_hooks/useReplyForm";
import {Dispatch, SetStateAction, useState} from "react";
import {updateSupportTicket} from "@/app/shared-api/supportApi";
import {showSuccess} from "@/shared-lib";

type Props = {
    selectedTicket: AdminSupportTicketDto | null;
    setSelectedTicket: Dispatch<SetStateAction<AdminSupportTicketDto | null>>;
};

export default function ReplyForm({ selectedTicket, setSelectedTicket }: Props) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, onSubmit, errors, isLoading } = useReplyForm( selectedTicket?.id );

    const handleCloseTicket = async () => {
        if (!selectedTicket) return;
        setLoading(true);
        await updateSupportTicket({id: selectedTicket.id, status: "resolved"});
        setLoading(false);
        setSelectedTicket(null);
        showSuccess(`Ticket #${selectedTicket.id} has been marked as resolved.`);
    };

    return (
        <form onSubmit={handleSubmit(v=>onSubmit(v, ()=>setSelectedTicket(null)))}>
            <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Reply</p>
                <Textarea
                    placeholder="Type your reply here..."
                    rows={4}
                    {...register("message")}
                />
                {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                    </p>
                )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0 mt-6">
                {selectedTicket?.status !== "resolved" && (
                    <Button
                        type="button"
                        variant="default"
                        disabled={loading}
                        onClick={handleCloseTicket}
                        className="gap-1"
                    >
                        <Check className="h-4 w-4" />
                        Mark as Resolved
                    </Button>
                )}
                <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Send Reply"}
                    </Button>
                </div>
            </DialogFooter>
        </form>
    );
}
