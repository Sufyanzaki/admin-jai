"use client";

import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/client/ux/select";
import { Textarea } from "@/components/client/ux/textarea";
import { Label } from "@/components/client/ux/label";
import { X } from "lucide-react";
import { Controller } from "react-hook-form";
import useSupportTicket from "@/app/(client)/dashboard/settings/support/_hook/useSupportForm";

export default function SupportTicketPage() {
    const {
        control,
        register,
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
    } = useSupportTicket();

    return (
        <div className="space-y-5">
            <div className="bg-yellow-50 border border-yellow-300 rounded-[5px] p-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-yellow-800">
                        ⚠️ Warning: Please ensure all information is accurate before saving.
                    </p>
                    <Button variant="ghost" size="sm" className="text-yellow-600 hover:bg-yellow-100">
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit(v=>onSubmit(v))} className="space-y-5">
                <div>
                    <Label>Subject</Label>
                    <Input
                        placeholder="Brief description of the issue"
                        className="h-12"
                        {...register("subject")}
                    />
                    {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                </div>

                <div>
                    <Label>Category</Label>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technical">Technical</SelectItem>
                                    <SelectItem value="billing">Billing</SelectItem>
                                    <SelectItem value="account">Account</SelectItem>
                                    <SelectItem value="general">General</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                    )}
                </div>

                <div>
                    <Label>Priority</Label>
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.priority && (
                        <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
                    )}
                </div>

                <div>
                    <Label>Description</Label>
                    <Textarea
                        placeholder="Please provide detailed information about your issue"
                        className="min-h-[100px]"
                        {...register("description")}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" size="lg" type="button">
                        Cancel
                    </Button>
                    <Button
                        variant="theme"
                        size="lg"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit Ticket"}
                    </Button>
                </div>
            </form>
        </div>
    );
}