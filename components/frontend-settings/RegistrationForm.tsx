"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useState} from "react"
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react"

export default function RegistrationForm(){

    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const [showOnHeader, setShowOnHeader] = useState(true)

    const handleImageUpload = (file: File | null) => {
        setBannerImage(file)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Contact</h2>
                <p className="text-muted-foreground">Here's what's happening today.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Registration Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Banner Image */}
                    <div className="space-y-2">
                        <Label>Banner Image</Label>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Input
                                    id="banner-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
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
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Create */}
                    <div className="space-y-2">
                        <Label htmlFor="step-1">Step 1: Create</Label>
                        <Input id="step-1" defaultValue="Maak je profiel" />
                    </div>

                    {/* Step 2: Details */}
                    <div className="space-y-2">
                        <Label htmlFor="step-2">Step 2: Details</Label>
                        <Input id="step-2" defaultValue="Vertel wat over jezelf?" />
                    </div>

                    {/* Step 3: Description */}
                    <div className="space-y-2">
                        <Label htmlFor="step-3">Step 3: Description</Label>
                        <Input id="step-3" defaultValue="Beschrijf jezelf in een paar woorden" />
                    </div>

                    {/* Step 4: Personal Information */}
                    <div className="space-y-2">
                        <Label htmlFor="step-4">Step 4: Personal Information</Label>
                        <Input id="step-4" defaultValue="Vertel ons over je persoonlijkheid" />
                    </div>

                    {/* My Image */}
                    <div className="space-y-2">
                        <Label htmlFor="my-image">My Image</Label>
                        <Input id="my-image" defaultValue="Upload je foto" />
                    </div>

                    {/* My Description */}
                    <div className="space-y-2">
                        <Label htmlFor="my-description">My Description</Label>
                        <Input id="my-description" defaultValue="Beschrijf jezelf in een paar zinnen" />
                    </div>

                    {/* Step 5: Partner Detail */}
                    <div className="space-y-2">
                        <Label htmlFor="step-5">Step 5: Partner Detail</Label>
                        <Input id="step-5" defaultValue="Waar ben je naar op zoek?" />
                    </div>

                    {/* Step 6: Complete Profile */}
                    <div className="space-y-2">
                        <Label htmlFor="step-6">Step 6: Complete Profile</Label>
                        <Input id="step-6" defaultValue="Maak je profiel compleet" />
                    </div>

                    {/* Step 7: Verification */}
                    <div className="space-y-2">
                        <Label htmlFor="step-7">Step 7: Verification</Label>
                        <Input id="step-7" defaultValue="Verification Code" />
                    </div>

                    {/* Show on Header */}
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
            <div className="flex justify-end gap-4">
                <Button variant="outline">Back to Humsafar</Button>
                <Button type="submit">Update</Button>
            </div>
        </div>
    )
}