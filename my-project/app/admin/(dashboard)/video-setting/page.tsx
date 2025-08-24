"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Button } from "@/components/admin/ui/button";
import { Controller } from "react-hook-form";
import useChatSettingForm from "../settings/other-settings/_hooks/useChatSettingForm";
import React from "react";
import Preloader from "@/components/shared/Preloader";
import { useSession } from "next-auth/react";
import { useTranslation } from 'react-i18next';

export default function ChatAndVideoSetting() {
    const { t } = useTranslation();

    const { handleSubmit, onSubmit, errors, isLoading, control, register, loading } = useChatSettingForm();
    const { data: session } = useSession();

    if (loading) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader />
                <p className="text-sm">{t("Loading chat & video settings")}</p>
            </div>
        )
    }

    let permissions;
    if (session?.user.permissions) {
        permissions = session.user.permissions.find(permission => permission.module === "chat_video_setting");
    }

    const canEdit = permissions?.canEdit ?? true;

    return (
        <div className="flex flex-col gap-5 p-4 xl:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">{t("Chat & Video Setting")}</h2>
                    <p className="text-muted-foreground">{t("Manage your users and their information.")}</p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{t("Chat Settings")}</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit((values) => onSubmit(values))}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="message-length">{t("Message length")}</Label>
                                <Input id="message-length" type="number" {...register("messageLength", { valueAsNumber: true })} className="w-full" />
                                {errors.messageLength && <p className="text-sm text-red-500">{errors.messageLength.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="file-size-limit">{t("File size limit (bytes)")}</Label>
                                <Input id="file-size-limit" type="number" {...register("fileSizeLimit", { valueAsNumber: true })} className="w-full" />
                                <p className="text-sm">{t("Loading chat & video settings")}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="chat-notice">{t("Chat page notice message")}</Label>
                            <Controller
                                name="pageNoticeMessage"
                                control={control}
                                render={({ field }) => (
                                    <Textarea id="chat-notice" {...field} className="min-h-[80px] resize-none" />
                                )}
                            />
                            {errors.pageNoticeMessage && <p className="text-sm text-red-500">{errors.pageNoticeMessage.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">{t("Chat & Video Setting")}</h2>
                                <p className="text-muted-foreground">{t("Manage your users and their information.")}</p>
                                <Controller
                                    name="noticeStyle"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="banner">{t("Banner")}</SelectItem>
                                                <SelectItem value="popup">{t("Popup")}</SelectItem>
                                                <Label htmlFor="message-length">{t("Message length")}</Label>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <Label htmlFor="file-size-limit">{t("File size limit (bytes)")}</Label>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="displayName">{t("Display name format")}</Label>
                                <Controller
                                    name="displayName"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="username-only">{t("Username Only")}</SelectItem>
                                                {errors.pageNoticeMessage && <p className="text-sm text-red-500">{errors.pageNoticeMessage.message}</p>}
                                                <SelectItem value="both">{t("Username & Full Name")}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.displayName && <p className="text-sm text-red-500">{errors.displayName.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="enable-images">{t("Enable Images")}</Label>
                                <Controller
                                    name="enableImages"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value ? "yes" : "no"} onValueChange={v => field.onChange(v === "yes")} key={field.value ? "a" : "b"}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yes">{t("Yes")}</SelectItem>
                                                <SelectItem value="no">{t("No")}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.enableImages && <p className="text-sm text-red-500">{errors.enableImages.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="enable-videos">{t("Enable Videos")}</Label>
                                <Controller
                                    name="enableVideos"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value ? "yes" : "no"} onValueChange={v => field.onChange(v === "yes")} key={field.value ? "a" : "b"}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yes">{t("Yes")}</SelectItem>
                                                <SelectItem value="no">{t("No")}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.enableVideos && <p className="text-sm text-red-500">{errors.enableVideos.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="enable-files">{t("Enable Files")}</Label>
                                <Controller
                                    name="enableFiles"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value ? "yes" : "no"} onValueChange={v => field.onChange(v === "yes")} key={field.value ? "a" : "b"}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yes">{t("Yes")}</SelectItem>
                                                <SelectItem value="no">{t("No")}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.enableFiles && <p className="text-sm text-red-500">{errors.enableFiles.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="file-extensions">{t("File Extension List")}</Label>
                            <Controller
                                name="fileExtensions"
                                control={control}
                                render={({ field }) => (
                                    <Textarea id="file-extensions" {...field} className="min-h-[80px] resize-none" />
                                )}
                            />
                            {errors.fileExtensions && <p className="text-sm text-red-500">{errors.fileExtensions.message}</p>}
                            <p className="text-sm text-muted-foreground">
                                {t("File extension list must be comma separated list. Ex. doc, xls, zip, txt.")}
                            </p>
                        </div>
                        {canEdit && <div className="flex justify-end pt-4">
                            <Button className="px-8" type="submit" disabled={isLoading}>
                                {isLoading ? t("Updating...") : t("Update")}
                            </Button>
                        </div>}
                    </CardContent>
                </form>
            </Card>
        </div >
    );
}