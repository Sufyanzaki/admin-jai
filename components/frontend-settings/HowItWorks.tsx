"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useState} from "react"
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Upload, X} from "lucide-react"
import Link from "next/link";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor"

export default function HowItWorks(){

    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const [showOnHeader, setShowOnHeader] = useState(true)

    const handleImageUpload = (file: File | null) => {
        setBannerImage(file)
    }

    return (
        <div className="space-y-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/frontend-settings">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>

                <div className="flex flex-col space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Contact</h2>
                    <p className="text-muted-foreground">Fill the form to add new page.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Banner Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Banner Image (Recommended size 1920x1080)</Label>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <Input
                                    id="banner-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById("banner-image")?.click()}
                                        className="flex items-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Choose File
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                    {bannerImage ? bannerImage.name : "No file chosen"}
                  </span>
                                    {bannerImage && (
                                        <Button type="button" variant="ghost" size="sm" onClick={() => handleImageUpload(null)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {bannerImage && (
                                <div className="w-20 h-20 border rounded-lg overflow-hidden">
                                    <img
                                        src={URL.createObjectURL(bannerImage) || "/placeholder.svg"}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" defaultValue="Waarom kiezen voor Humsafar?" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sub-title">Sub Title</Label>
                        <SimpleEditor/>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Meld je nu aan gratis aan" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="search">Search</Label>
                        <Input id="search" placeholder="Search" />
                    </div>
                </CardContent>
            </Card>

            {/* FAQs Section */}
            <Card>
                <CardHeader>
                    <CardTitle>FAQs Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="faq-title">Title</Label>
                        <Input id="faq-title" defaultValue="Partner zoeken voor het leven?" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="faq-sub-title">Sub Title</Label>
                        <SimpleEditor/>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <SimpleEditor/>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="faq-name">Name</Label>
                        <Input id="faq-name" defaultValue="Add Profile" />
                    </div>
                </CardContent>
            </Card>

            {/* Footer Options */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="show-header"
                                checked={showOnHeader}
                                onCheckedChange={(checked) => setShowOnHeader(checked as boolean)}
                            />
                            <Label htmlFor="show-header">Show on Header</Label>
                        </div>
                        <Button type="submit">Update</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}