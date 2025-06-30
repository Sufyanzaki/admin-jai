import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import React from "react";

const emails = [
    "talhakhalid628@gmail.com",
    "AyeshaKahan@gmail.com",
    "zubair123@gmail.com",
    "ik@ik.nl",
    "info@rajmedia.nl",
    "talhakhalid3234@gmail.com",
    "talhakhalid635434538@gmail.com",
];

export default function NewsletterViewPage() {
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
                    {/* Emails */}
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
                        <div className="w-40 font-medium text-muted-foreground">Subject</div>
                        <div>Test</div>
                    </div>
                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                        <div className="w-40 font-medium text-muted-foreground">Content</div>
                        <div>test</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
