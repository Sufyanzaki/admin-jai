"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import { Controller } from "react-hook-form";
import useChatSettingForm from "../settings/other-settings/_hooks/useChatSettingForm";
import React from "react";
import Preloader from "@/components/ui/Preloader";

export default function ChatAndVideoSetting() {
    const { handleSubmit, onSubmit, errors, isLoading, control, register, loading } = useChatSettingForm();

    if (loading) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader/>
                <p className="text-sm">Loading chat & video settings</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5 p-4 xl:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Chat & Video Setting</h2>
                    <p className="text-muted-foreground">Manage your users and their information.</p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Chat Settings</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit((values) => onSubmit(values))}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="message-length">Message length</Label>
                                <Input id="message-length" type="number" {...register("messageLength", { valueAsNumber: true })} className="w-full" />
                                {errors.messageLength && <p className="text-sm text-red-500">{errors.messageLength.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="file-size-limit">File size limit (bytes)</Label>
                                <Input id="file-size-limit" type="number" {...register("fileSizeLimit", { valueAsNumber: true })} className="w-full" />
                                {errors.fileSizeLimit && <p className="text-sm text-red-500">{errors.fileSizeLimit.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="chat-notice">Chat page notice message</Label>
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
                                <Label htmlFor="noticeStyle">Chat page notice style</Label>
                                <Controller
                                    name="noticeStyle"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="banner">Banner</SelectItem>
                                                <SelectItem value="popup">Popup</SelectItem>
                                                <SelectItem value="inline">Inline</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.noticeStyle && <p className="text-sm text-red-500">{errors.noticeStyle.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Display name format</Label>
                                <Controller
                                    name="displayName"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="username-only">Username Only</SelectItem>
                                                <SelectItem value="full-name">Full Name</SelectItem>
                                                <SelectItem value="both">Username & Full Name</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.displayName && <p className="text-sm text-red-500">{errors.displayName.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="enable-images">Enable Images</Label>
                                <Controller
                                    name="enableImages"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value ? "yes" : "no"} onValueChange={v => field.onChange(v === "yes") } key={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yes">Yes</SelectItem>
                                                <SelectItem value="no">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.enableImages && <p className="text-sm text-red-500">{errors.enableImages.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="enable-videos">Enable Videos</Label>
                                <Controller
                                    name="enableVideos"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value ? "yes" : "no"} onValueChange={v => field.onChange(v === "yes") }  key={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yes">Yes</SelectItem>
                                                <SelectItem value="no">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.enableVideos && <p className="text-sm text-red-500">{errors.enableVideos.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="enable-files">Enable Files</Label>
                                <Controller
                                    name="enableFiles"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value ? "yes" : "no"} onValueChange={v => field.onChange(v === "yes") } key={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yes">Yes</SelectItem>
                                                <SelectItem value="no">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.enableFiles && <p className="text-sm text-red-500">{errors.enableFiles.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="file-extensions">File Extension List</Label>
                            <Controller
                                name="fileExtensions"
                                control={control}
                                render={({ field }) => (
                                    <Textarea id="file-extensions" {...field} className="min-h-[80px] resize-none" />
                                )}
                            />
                            {errors.fileExtensions && <p className="text-sm text-red-500">{errors.fileExtensions.message}</p>}
                            <p className="text-sm text-muted-foreground">
                                File extension list must be comma separated list. Ex. doc, xls, zip, txt.
                            </p>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button className="px-8" type="submit" disabled={isLoading}>
                                {isLoading ? "Updating..." : "Update"}
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}