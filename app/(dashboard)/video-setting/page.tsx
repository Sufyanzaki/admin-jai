import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react";

export default function ChatAndVideoSetting() {
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
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="message-length">Message length</Label>
                            <Input id="message-length" type="number" defaultValue="100" className="w-full" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="file-size-limit">File size limit(MB)</Label>
                            <Input id="file-size-limit" type="number" defaultValue="3" className="w-full" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="chat-notice">Chat page notice message</Label>
                        <Textarea id="chat-notice" defaultValue="Humsafar chat center" className="min-h-[80px] resize-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="notice-style">Chat page notice style</Label>
                            <Select defaultValue="banner">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="banner">Banner</SelectItem>
                                    <SelectItem value="popup">Popup</SelectItem>
                                    <SelectItem value="inline">Inline</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="display-format">Display name format</Label>
                            <Select defaultValue="username-only">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="username-only">Username Only</SelectItem>
                                    <SelectItem value="full-name">Full Name</SelectItem>
                                    <SelectItem value="both">Username & Full Name</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="enable-images">Enable Images</Label>
                            <Select defaultValue="yes">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="enable-videos">Enable Videos</Label>
                            <Select defaultValue="no">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="enable-files">Enable Files</Label>
                            <Select defaultValue="yes">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="file-extensions">File Extension List</Label>
                        <Textarea id="file-extensions" defaultValue="doc,txt,docx" className="min-h-[80px] resize-none" />
                        <p className="text-sm text-muted-foreground">
                            File extension list must be comma separated list. Ex. doc, xls, zip, txt.
                        </p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button className="px-8">Update</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}