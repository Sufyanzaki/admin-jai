import {Card, CardContent, CardHeader, CardTitle} from "@/components/client/ux/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/client/ux/table";
import {Button} from "@/components/client/ux/button";
import {CheckCircle, Eye} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/client/ux/dialog";
import {Label} from "@/components/client/ux/label";
import {Badge} from "@/components/client/ux/badge";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {AdminSupportTicketDto} from "@/app/(client)/dashboard/settings/support/_types/support";
import {useSupportTickets} from "@/app/shared-hooks/useSupportTickets";
import Preloader from "@/components/shared/Preloader";
import ClientReplyForm from "./client-reply-form";
import {useSession} from "next-auth/react";

export default function TicketTable() {
    const { t } = useTranslation();
    const { supportTickets, ticketsLoading } = useSupportTickets();

    console.log(supportTickets)

    const { data:session } = useSession();
    const currentUser = session?.user.id;

    const [selectedTicket, setSelectedTicket] = useState<AdminSupportTicketDto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            open: { variant: "destructive" as const, label: t("Open") },
            closed: { variant: "secondary" as const, label: t("Closed") },
            pending: { variant: "default" as const, label: t("Pending") },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    const getPriorityBadge = (priority: string) => {
        const priorityConfig = {
            low: { color: "bg-blue-100 text-blue-800", label: t("Low") },
            medium: { color: "bg-yellow-100 text-yellow-800", label: t("Medium") },
            high: { color: "bg-orange-100 text-orange-800", label: t("High") },
            critical: { color: "bg-red-100 text-red-800", label: t("Critical") },
        };
        const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
        return <Badge className={config.color}>{config.label}</Badge>;
    };

    const openTicketModal = (ticket: AdminSupportTicketDto) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    if (ticketsLoading) {
        return (
            <div className="text-center py-10 flex justify-center">
                <Preloader />
            </div>
        );
    }

    return (
        <>
            <Card>
                <CardHeader className="justify-start">
                    <CardTitle className="font-medium">{t("My Support Tickets")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("ID")}</TableHead>
                                <TableHead>{t("Subject")}</TableHead>
                                <TableHead>{t("Category")}</TableHead>
                                <TableHead>{t("Priority")}</TableHead>
                                <TableHead>{t("Status")}</TableHead>
                                <TableHead>{t("Created")}</TableHead>
                                <TableHead>{t("Actions")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {supportTickets && supportTickets.length > 0 ? (
                                supportTickets.map((ticket) => (
                                    <TableRow key={ticket.id}>
                                        <TableCell>#{ticket.id}</TableCell>
                                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                                        <TableCell className="capitalize">{t(ticket.category)}</TableCell>
                                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                                        <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openTicketModal(ticket)}
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                {t("View")}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-500">
                                        {t("No tickets found")}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-0 border border-gray-200/70">
                    <DialogHeader className="px-6 py-4 border-b border-gray-200/50">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                                <span>{t("Ticket Details")}</span>
                                <span className="text-muted-foreground">#{selectedTicket?.id}</span>
                            </DialogTitle>
                            {selectedTicket && (
                                <div className="flex items-center gap-2">
                                    {getStatusBadge(selectedTicket.status)}
                                </div>
                            )}
                        </div>
                        <DialogDescription className="text-base mt-2 font-medium text-foreground">
                            {selectedTicket?.subject}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedTicket && (
                        <div className="space-y-6 p-6">
                            {/* Ticket Metadata */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50/40 rounded-lg border border-gray-200/50">
                                <div className="space-y-1">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        {t("Category")}
                                    </Label>
                                    <p className="capitalize font-medium">{t(selectedTicket.category)}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        {t("Priority")}
                                    </Label>
                                    <div className="mt-1">{getPriorityBadge(selectedTicket.priority)}</div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        {t("Created")}
                                    </Label>
                                    <p className="font-medium">
                                        {new Date(selectedTicket.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        {t("Last Updated")}
                                    </Label>
                                    <p className="font-medium">
                                        {new Date(selectedTicket.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Original Message */}
                            <div className="space-y-3">
                                <Label className="text-sm font-semibold">
                                    {t("Original Message")}
                                </Label>
                                <div className="p-4 bg-gray-50/30 rounded-lg border border-gray-200/50">
                                    <p className="text-sm whitespace-pre-wrap">{selectedTicket.description}</p>
                                </div>
                            </div>

                            {/* Replies Section */}
                            {selectedTicket.replies && selectedTicket.replies.length > 0 && (
                                <div className="space-y-4">
                                    <Label className="text-sm font-semibold">
                                        {t("Conversation History")}
                                    </Label>
                                    <div className="space-y-4">
                                        {selectedTicket.replies.map((reply) => {
                                            const isUser = reply.senderId === currentUser;
                                            return (
                                                <div
                                                    key={reply.id}
                                                    className={`p-4 rounded-lg border ${
                                                        isUser
                                                            ? "bg-white border-gray-200 ml-6"
                                                            : "bg-blue-50/30 border-blue-200 mr-6"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className={`h-2 w-2 rounded-full ${
                                                                    isUser ? "bg-gray-400" : "bg-blue-500"
                                                                }`}
                                                            />
                                                            <span className="text-sm font-medium">
                                                                {isUser ? t("You") : t("Support Team")}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(reply.createdAt).toLocaleDateString()} •{" "}
                                                            {new Date(reply.createdAt).toLocaleTimeString([], {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-foreground">{reply.message}</p>
                                                </div>
                                            );
                                        })}

                                    </div>
                                </div>
                            )}

                            <ClientReplyForm selectedTicket={selectedTicket} callback={()=>setIsModalOpen(false)}/>

                            {selectedTicket.status === "closed" && (
                                <div className="p-6 bg-gray-50/30 rounded-lg border border-gray-200/50 text-center">
                                    <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-3" />
                                    <p className="text-lg font-semibold text-foreground mb-2">
                                        {t("This ticket has been closed")}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {t("No further replies can be added to this ticket")}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
