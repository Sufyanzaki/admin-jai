import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ArrowLeft} from "lucide-react";
import {Label} from "@/components/ui/label";
import TipTapEditor from "@/components/editor/TipTapEditor";
import Link from "next/link";

export default function NewsletterAddPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/marketing/newsletter">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>

                <div>
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
                    <form className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="first-name">Newsletter Subject</Label>
                            <Input id="first-name" placeholder="Enter subject" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="add-content">Newsletter Content</Label>
                            <TipTapEditor />
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button className="px-8">Save</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
