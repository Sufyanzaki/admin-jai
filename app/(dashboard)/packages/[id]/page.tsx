"use client"

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function PackagesDetailsPage() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="#">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Edit Package</h1>
                    <p className="text-muted-foreground">Add a new package to your app.</p>
                </div>
            </div>

            <Card className="">
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input id="name" placeholder="Name" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">€</div>
                            <Input
                                id="price"
                                placeholder="Price"
                                className="pl-8"
                                type="number"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="package-image">
                            Package Image
                        </Label>
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <input
                                    id="package-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={()=>{}}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Button
                                    variant="outline"
                                    className=""
                                    type="button"
                                >
                                    Choose File
                                </Button>
                            </div>
                            <span className="text-gray-500 text-sm">No file chosen</span>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button>Update</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}