"use client"

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowLeft, Plus, Save, Trash2, Upload} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddPackagesPage() {
    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/packages">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div className="space-y-2">
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Add Package</h1>
                    <p className="text-muted-foreground">Update package details and pricing</p>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-4 border-b">
                    <CardTitle>Package Details</CardTitle>
                    <CardDescription>Update your package information</CardDescription>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g. Premium Plan"
                                className="bg-background"
                            />
                            <p className="text-xs text-muted-foreground">
                                This will be displayed to customers
                            </p>
                        </div>

                        {/* Price Field */}
                        <div className="space-y-2">
                            <Label htmlFor="price">
                                Price <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                    €
                                </div>
                                <Input
                                    id="price"
                                    placeholder="0.00"
                                    className="pl-8 bg-background"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Set 0 for free packages
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">
                                Validity <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="price"
                                    placeholder="0 Days"
                                    className="bg-background"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Set 0 for free packages
                            </p>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                        <Label htmlFor="package-image">Package Image</Label>

                        <div className="flex items-start gap-4">
                            <div className="border rounded-md w-24 h-24 flex items-center justify-center bg-muted/50">
                                <Plus className="w-12 h-12 text-muted-foreground" />
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="relative">
                                    <input
                                        id="package-image"
                                        type="file"
                                        accept="image/*"
                                        onChange={() => {}}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Button
                                        variant="outline"
                                        type="button"
                                        className="w-full sm:w-auto"
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Image
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Recommended size: 600x600px. Max 2MB.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe what's included in this package"
                            className="min-h-[100px] bg-background"
                        />
                        <p className="text-xs text-muted-foreground">
                            This will be shown to customers
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="space-y-3">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <Input
                                        placeholder={`Feature ${item}`}
                                        className="bg-background"
                                    />
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" type="button">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Feature
                            </Button>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end pt-6">
                    <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Update Package
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}