import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Plus, Search, Eye, Trash2, MoreVertical, Copy, Save} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import PaginationSection from "@/components/Pagination";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import TipTapEditor from "@/components/editor/TipTapEditor";

export default function NewsletterAddPage() {
    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Add Newsletter</h2>
                    <p className="text-muted-foreground">View and manage newsletters</p>
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
