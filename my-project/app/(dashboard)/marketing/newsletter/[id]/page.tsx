"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useParams } from "next/navigation";
import useNewsletterById from "../_hooks/useNewsletterById";
import { unescapeHtml } from "@/lib/utils";
import Preloader from "@/components/ui/Preloader";

export default function NewsletterViewPage() {
    const params = useParams();
    const id = params?.id as string;
    const { data, isLoading, error } = useNewsletterById(id);

    if (isLoading) return (
        <div className="flex items-center flex-col justify-center h-64">
            <Preloader/>
            <p className="text-sm">Loading</p>
        </div>
    );
    if (error) return <div>Error loading newsletter.</div>;
    if (!data) return <div>No newsletter found.</div>;

    const emails: string[] = Array.isArray(data.emails)
        ? data.emails
        : typeof data.emails === 'string' && data.emails
        ? data.emails.split(',').map(e => e.trim())
        : [];

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
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Newsletter Details</h2>
                    <p className="text-muted-foreground">Detailed view of sent newsletter</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Newsletter Overview</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                        <div className="w-40 font-medium text-muted-foreground">Title</div>
                        <div>{data.title}</div>
                    </div>
                    <Separator />
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                        <div className="w-40 font-medium text-muted-foreground">Sent</div>
                        <div>
                            <Badge variant={data.sent ? "success" : "secondary"}>
                                {data.sent ? "Sent" : "Not Sent"}
                            </Badge>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <div className="font-medium text-muted-foreground mb-1">Emails (Users)</div>
                        <div className="flex flex-wrap gap-1">
                            {emails.map((email, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                    {email}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                        <div className="w-40 font-medium text-muted-foreground">Content</div>
                        <div dangerouslySetInnerHTML={{ __html: unescapeHtml(data.content) }} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
