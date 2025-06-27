"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import { CustomImageUpload } from "./CustomImageInput"
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

export default function HomeForm() {
    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const [datingImages, setDatingImages] = useState<{ [key: string]: File | null }>({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    })
    const [showOnHeader, setShowOnHeader] = useState(false)

    const handleImageUpload = (file: File | null, type: string) => {
        if (type === "banner") {
            setBannerImage(file)
        } else {
            setDatingImages((prev) => ({ ...prev, [type]: file }))
        }
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
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Home</h2>
                    <p className="text-muted-foreground">Fill the form to add new page.</p>
                </div>
            </div>


            {/* Banner Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Banner Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="banner-title">Title</Label>
                        <Input
                            id="banner-title"
                            placeholder="Dating leuk genoaakt... zonder de spelletjes."
                            defaultValue="Dating leuk genoaakt... zonder de spelletjes."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="banner-subtitle">Sub-Title</Label>
                        <Input
                            id="banner-subtitle"
                            placeholder="AI 13 jaar ontwikkeld simplex met elkaar verbinden."
                            defaultValue="AI 13 jaar ontwikkeld simplex met elkaar verbinden."
                        />
                    </div>

                    <CustomImageUpload
                        label="Banner Image (Recommended size 1920x1080)"
                        file={bannerImage}
                        onFileChange={(file) => handleImageUpload(file, "banner")}
                        type="banner-image"
                    />
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
                        <Input
                            id="faq-title"
                            placeholder="Het antwoord al simplex op onze datingsites?"
                            defaultValue="Het antwoord al simplex op onze datingsites?"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="faq-subtitle">Sub-Title</Label>
                        <Input
                            id="faq-subtitle"
                            placeholder="Je bent maar 3 stappen verwijderd van een geweldige date."
                            defaultValue="Je bent maar 3 stappen verwijderd van een geweldige date."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="faq-description">Description</Label>
                        <Textarea
                            id="faq-description"
                            rows={4}
                            placeholder="Humsafar.nl is een van Nederlands toonaangevende Nederlandse datingsites die vele leden heeft geholpen bij het vinden van hun perfecte levensparnter..."
                            defaultValue="Humsafar.nl is een van Nederlands toonaangevende Nederlandse datingsites die vele leden heeft geholpen bij het vinden van hun perfecte levensparnter. Of je nu nieuw bent of Humsafar.nl voor het eerst ontdekt, meld je vandaag nog gratis aan en maak contact met andere mensen die op zoek zijn naar echte online dating en een in Humsafar.nl Humsafar.nl"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="faq-name">Name</Label>
                            <Input id="faq-name" placeholder="Maak gratis je profiel aan" defaultValue="Maak gratis je profiel aan" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="latest-title">Latest Title</Label>
                            <Input id="latest-title" placeholder="Zo worden ontmoet leuk" defaultValue="Zo worden ontmoet leuk" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="latest-subtitle">Latest Sub Title</Label>
                            <Input
                                id="latest-subtitle"
                                placeholder="Online daten is makkelijk en de drempel is niet eens wat lager dan in de kroeg iemand aanspreken..."
                                defaultValue="Online daten is makkelijk en de drempel is niet eens wat lager dan in de kroeg iemand aanspreken. Bovendien ben je op internet anoniem. Maar daarnaast is het grootste voordeel dat je op een datingsite de Humsafar zeker weet dat iedereen serious op zoek"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="blog-title">Blog Title</Label>
                            <Input id="blog-title" placeholder="Magazine" defaultValue="Magazine" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Dating Site Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Dating Site Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="dating-title">Dating Site Title</Label>
                        <Input
                            id="dating-title"
                            placeholder="Hoe kun je daten met dat je kiest ben voor een serieuze ervaring op een online datingsites?"
                            defaultValue="Hoe kun je daten met dat je kiest ben voor een serieuze ervaring op een online datingsites?"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomImageUpload
                            label="Dating Site Image Title1"
                            file={datingImages.image1}
                            onFileChange={(file) => handleImageUpload(file, "image1")}
                            type="dating-image-1"
                        />

                        <CustomImageUpload
                            label="Dating Site Image Title2"
                            file={datingImages.image2}
                            onFileChange={(file) => handleImageUpload(file, "image2")}
                            type="dating-image-2"
                        />

                        <CustomImageUpload
                            label="Dating Site Image Title3"
                            file={datingImages.image3}
                            onFileChange={(file) => handleImageUpload(file, "image3")}
                            type="dating-image-3"
                        />

                        <CustomImageUpload
                            label="Dating Site Image Title4"
                            file={datingImages.image4}
                            onFileChange={(file) => handleImageUpload(file, "image4")}
                            type="dating-image-4"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
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