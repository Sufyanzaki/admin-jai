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
import useHomeForm from "@/app/(dashboard)/frontend-settings/_hooks/useHomeForm";
import Preloader from "@/components/ui/Preloader";

export default function HomeForm() {
    const { handleSubmit, onSubmit, errors, isLoading, register, setValue, watch, homeLoading } = useHomeForm();

    const handleImageUpload = (file: File | null, type: string) => {
        if (type === "banner") {
            setValue('bannerImage', file)
        } else {
            const imageNumber = type.replace('image', '')
            setValue(`datingSiteImage${imageNumber}` as any, file)
        }
    }

    if(homeLoading){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader/>
                <p className="text-sm">Loading...</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 xl:p-6">
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
                            {...register('bannerTitle')}
                        />
                        {errors.bannerTitle && (
                            <p className="text-sm text-red-500">{errors.bannerTitle.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="banner-subtitle">Sub-Title</Label>
                        <Input
                            id="banner-subtitle"
                            placeholder="AI 13 jaar ontwikkeld simplex met elkaar verbinden."
                            {...register('bannerSubTitle')}
                        />
                        {errors.bannerSubTitle && (
                            <p className="text-sm text-red-500">{errors.bannerSubTitle.message}</p>
                        )}
                    </div>

                    <CustomImageUpload
                        label="Banner Image (Recommended size 1920x1080)"
                        file={watch('bannerImage') instanceof File ? watch('bannerImage') : null}
                        existingImage={typeof watch('bannerImage') === 'string' ? watch('bannerImage') : undefined}
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
                            {...register('faqsTitle')}
                        />
                        {errors.faqsTitle && (
                            <p className="text-sm text-red-500">{errors.faqsTitle.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="faq-subtitle">Sub-Title</Label>
                        <Input
                            id="faq-subtitle"
                            placeholder="Je bent maar 3 stappen verwijderd van een geweldige date."
                            {...register('faqsSubTitle')}
                        />
                        {errors.faqsSubTitle && (
                            <p className="text-sm text-red-500">{errors.faqsSubTitle.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="faq-description">Description</Label>
                        <Textarea
                            id="faq-description"
                            rows={4}
                            placeholder="Humsafar.nl is een van Nederlands toonaangevende Nederlandse datingsites die vele leden heeft geholpen bij het vinden van hun perfecte levensparnter..."
                            {...register('faqsDescription')}
                        />
                        {errors.faqsDescription && (
                            <p className="text-sm text-red-500">{errors.faqsDescription.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="faq-name">Name</Label>
                            <Input 
                                id="faq-name" 
                                placeholder="Maak gratis je profiel aan" 
                                {...register('faqname')} 
                            />
                            {errors.faqname && (
                                <p className="text-sm text-red-500">{errors.faqname.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="latest-title">Latest Title</Label>
                            <Input 
                                id="latest-title" 
                                placeholder="Zo worden ontmoet leuk" 
                                {...register('faqlatestTitle')} 
                            />
                            {errors.faqlatestTitle && (
                                <p className="text-sm text-red-500">{errors.faqlatestTitle.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="latest-subtitle">Latest Sub Title</Label>
                            <Input
                                id="latest-subtitle"
                                placeholder="Online daten is makkelijk en de drempel is niet eens wat lager dan in de kroeg iemand aanspreken..."
                                {...register('faqlatestSubTitle')}
                            />
                            {errors.faqlatestSubTitle && (
                                <p className="text-sm text-red-500">{errors.faqlatestSubTitle.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="blog-title">Blog Title</Label>
                            <Input 
                                id="blog-title" 
                                placeholder="Magazine" 
                                {...register('blogTitle')} 
                            />
                            {errors.blogTitle && (
                                <p className="text-sm text-red-500">{errors.blogTitle.message}</p>
                            )}
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
                            {...register('datingSiteTitle')}
                        />
                        {errors.datingSiteTitle && (
                            <p className="text-sm text-red-500">{errors.datingSiteTitle.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomImageUpload
                            label="Dating Site Image Title1"
                            file={watch('datingSiteImage1') instanceof File ? watch('datingSiteImage1') : null}
                            existingImage={typeof watch('datingSiteImage1') === 'string' ? watch('datingSiteImage1') : undefined}
                            onFileChange={(file) => handleImageUpload(file, "image1")}
                            type="dating-image-1"
                        />

                        <CustomImageUpload
                            label="Dating Site Image Title2"
                            file={watch('datingSiteImage2') instanceof File ? watch('datingSiteImage2') : null}
                            existingImage={typeof watch('datingSiteImage2') === 'string' ? watch('datingSiteImage2') : undefined}
                            onFileChange={(file) => handleImageUpload(file, "image2")}
                            type="dating-image-2"
                        />

                        <CustomImageUpload
                            label="Dating Site Image Title3"
                            file={watch('datingSiteImage3') instanceof File ? watch('datingSiteImage3') : null}
                            existingImage={typeof watch('datingSiteImage3') === 'string' ? watch('datingSiteImage3') : undefined}
                            onFileChange={(file) => handleImageUpload(file, "image3")}
                            type="dating-image-3"
                        />

                        <CustomImageUpload
                            label="Dating Site Image Title4"
                            file={watch('datingSiteImage4') instanceof File ? watch('datingSiteImage4') : null}
                            existingImage={typeof watch('datingSiteImage4') === 'string' ? watch('datingSiteImage4') : undefined}
                            onFileChange={(file) => handleImageUpload(file, "image4")}
                            type="dating-image-4"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="show-header"
                            checked={watch('showOnHeader')}
                            onCheckedChange={(checked) => setValue('showOnHeader', checked as boolean)}
                        />
                        <Label htmlFor="show-header">Show on Header</Label>
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update'}
                </Button>
            </div>
        </form>
    )
}