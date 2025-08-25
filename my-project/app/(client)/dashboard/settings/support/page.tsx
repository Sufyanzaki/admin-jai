"use client";

import {Button} from "@/components/client/ux/button";
import {Input} from "@/components/client/ux/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/client/ux/select";
import {Textarea} from "@/components/client/ux/textarea";
import {Label} from "@/components/client/ux/label";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/client/ux/card";
import {X} from "lucide-react";
import {Controller} from "react-hook-form";
import useSupportTicket from "@/app/(client)/dashboard/settings/support/_hook/useSupportForm";
import {useTranslation} from "react-i18next";
import TicketTable from "@/app/(client)/dashboard/settings/support/_components/ticket-table";

export default function SupportTicketPage() {
    const { t } = useTranslation();

    const {
        control,
        register,
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
    } = useSupportTicket();


    return (
        <div className="space-y-8">
            <div className="bg-yellow-50 border border-yellow-300 rounded-[5px] p-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-yellow-800">
                        ⚠️ {t("Warning: Please ensure all information is accurate before saving.")}
                    </p>
                    <Button variant="ghost" size="sm" className="text-yellow-600 hover:bg-yellow-100">
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader className="justify-start">
                    <CardTitle className="font-medium">{t("Create New Support Ticket")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(v => onSubmit(v))} className="space-y-5">
                        <div>
                            <Label>{t("Subject")}</Label>
                            <Input
                                placeholder={t("Brief description of the issue")}
                                className="h-12"
                                {...register("subject")}
                            />
                            {errors.subject && (
                                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                            )}
                        </div>

                        <div>
                            <Label>{t("Category")}</Label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t("Select category")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technical">{t("Technical")}</SelectItem>
                                            <SelectItem value="billing">{t("Billing")}</SelectItem>
                                            <SelectItem value="account">{t("Account")}</SelectItem>
                                            <SelectItem value="general">{t("General")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        <div>
                            <Label>{t("Priority")}</Label>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t("Select priority")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">{t("Low")}</SelectItem>
                                            <SelectItem value="medium">{t("Medium")}</SelectItem>
                                            <SelectItem value="high">{t("High")}</SelectItem>
                                            <SelectItem value="critical">{t("Critical")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.priority && (
                                <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
                            )}
                        </div>

                        <div>
                            <Label>{t("Description")}</Label>
                            <Textarea
                                placeholder={t("Please provide detailed information about your issue")}
                                className="min-h-[100px]"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" size="lg" type="button">
                                {t("Cancel")}
                            </Button>
                            <Button
                                variant="theme"
                                size="lg"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? t("Submitting...") : t("Submit Ticket")}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <TicketTable />
        </div>
    );
}
