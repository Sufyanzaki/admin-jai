"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useState} from "react"
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Upload, X} from "lucide-react"
import Link from "next/link"
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor"

export default function ContactForm() {

    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const [showOnHeader, setShowOnHeader] = useState(true)

    const handleImageUpload = (file: File | null) => {
        setBannerImage(file)
    }

    return (
        <>
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
                        <CardTitle>Contact Banner Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact-name">Contact Name</Label>
                            <Input id="contact-name" defaultValue="Contact" />
                        </div>

                        <div className="space-y-2">
                            <Label>Contact Banner Image (Recommended size 1920x1080)</Label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <Input
                                        id="contact-banner-image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById("contact-banner-image")?.click()}
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
                            <Input id="title" defaultValue="Welkom bij help & contact" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sub-title">Sub Title</Label>
                            <Input id="sub-title" placeholder="Contact Sub title" />
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <SimpleEditor/>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address-name">Address Name</Label>
                            <Input id="address-name" placeholder="Wil je een vraag over het gebruik van humsafar" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address-value">Address Value</Label>
                            <Input id="address-value" placeholder="stuur dan een e-mail naar: hello@humsafar.nl" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone-name">Phone Name</Label>
                            <Input id="phone-name" placeholder="Wil je contact opnemen met de afdeling Marketing?" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone-value">Phone Value</Label>
                            <Input id="phone-value" placeholder="Stuur een e-mail naar biz@humsafar.nl" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email-name">Email Name</Label>
                            <Input id="email-name" defaultValue="Misbruik melden" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email-value">Email Value</Label>
                            <Input id="email-value" defaultValue="abuse@humsafar.nl" />
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Form Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Form Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email-title">Email Title</Label>
                            <Input id="email-title" defaultValue="Hoe kunnen we je helpen?" />
                        </div>

                        <div className="space-y-2">
                            <Label>Email Description</Label>
                            <SimpleEditor />
                        </div>

                        <div className="flex items-center space-x-2 pt-4">
                            <Checkbox
                                id="show-header"
                                checked={showOnHeader}
                                onCheckedChange={(checked) => setShowOnHeader(checked as boolean)}
                            />
                            <Label htmlFor="show-header">Show on Header</Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end">
                    <Button type="submit">Update</Button>
                </div>
            </div>
        </>
    )
}