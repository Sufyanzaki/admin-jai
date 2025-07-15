"use client"

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import useNewsletterForm from "./_hooks/useNewsletterForm";
import { Controller } from "react-hook-form";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function NewsletterAddPage() {
    const { handleSubmit, onSubmit, errors, isLoading, register, control } = useNewsletterForm();

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/marketing/newsletter">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>

                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">Add Newsletter</h2>
                    <p className="text-muted-foreground">Create and publish a new newsletter</p>
                </div>
            </div>

            {/* Card Section */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle>Newsletters</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Label htmlFor="title">Newsletter Subject</Label>
                            <Input id="title" placeholder="Enter subject" {...register("title")} disabled={isLoading} />
                            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">Newsletter Content</Label>
                            <Controller
                                control={control}
                                name="content"
                                render={({ field }) => (
                                    <SimpleEditor
                                        existingValue={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="emails">Emails</Label>
                            <Input id="emails" placeholder="Comma separated emails (user1@example.com, user2@example.com)" {...register("emails")} disabled={isLoading} />
                            {errors.emails && <p className="text-sm text-red-500 mt-1">{errors.emails.message}</p>}
                        </div>
                        <div className="flex justify-end pt-6">
                            <Button className="px-8" type="submit" disabled={isLoading}>{isLoading ? "Submitting..." : "Save"}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
