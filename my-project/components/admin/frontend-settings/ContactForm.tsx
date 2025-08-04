"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Loader2} from "lucide-react"
import Link from "next/link"
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor"
import { CustomImageUpload } from "./CustomImageInput"
import useContactForm from "@/app/(dashboard)/frontend-settings/_hooks/useContactForm"
import { Controller } from "react-hook-form"
import Preloader from "@/components/ui/Preloader";

export default function ContactForm() {
    const {
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        isUploading,
        register,
        setValue,
        watch,
        control,
        contactLoading
    } = useContactForm();

    const handleImageUpload = (file: File | null) => {
        setValue('contactBannerImage', file)
    }

    if(contactLoading){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader/>
                <p className="text-sm">Loading...</p>
            </div>
        )
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Banner Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="contact-name">Contact Name</Label>
                                <Input
                                    id="contact-name"
                                    {...register('contactName')}
                                    placeholder="Contact"
                                    disabled={isLoading}
                                />
                                {errors.contactName && (
                                    <p className="text-sm text-red-500">{errors.contactName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <CustomImageUpload
                                    label="Contact Banner Image (Recommended size 1920x1080)"
                                    file={watch('contactBannerImage') instanceof File ? watch('contactBannerImage') : null}
                                    existingImage={typeof watch('contactBannerImage') === 'string' ? watch('contactBannerImage') : undefined}
                                    onFileChange={(file) => handleImageUpload(file)}
                                    type="contact-banner-image"
                                />
                                {isUploading && (
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Uploading image...
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    {...register('bannerTitle')}
                                    placeholder="Welkom bij help & contact"
                                    disabled={isLoading}
                                />
                                {errors.bannerTitle && (
                                    <p className="text-sm text-red-500">{errors.bannerTitle.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sub-title">Sub Title</Label>
                                <Input
                                    id="sub-title"
                                    {...register('bannerSubTitle')}
                                    placeholder="Contact Sub title"
                                    disabled={isLoading}
                                />
                                {errors.bannerSubTitle && (
                                    <p className="text-sm text-red-500">{errors.bannerSubTitle.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Controller
                                    name="bannerDescription"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <SimpleEditor
                                                existingValue={field.value}
                                                onChange={field.onChange}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm text-red-500">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address-name">Address Name</Label>
                                <Input
                                    id="address-name"
                                    {...register('addressName')}
                                    placeholder="Wil je een vraag over het gebruik van humsafar"
                                    disabled={isLoading}
                                />
                                {errors.addressName && (
                                    <p className="text-sm text-red-500">{errors.addressName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address-value">Address Value</Label>
                                <Input
                                    id="address-value"
                                    {...register('addressValue')}
                                    placeholder="stuur dan een e-mail naar: hello@humsafar.nl"
                                    disabled={isLoading}
                                />
                                {errors.addressValue && (
                                    <p className="text-sm text-red-500">{errors.addressValue.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone-name">Phone Name</Label>
                                <Input
                                    id="phone-name"
                                    {...register('phoneName')}
                                    placeholder="Wil je contact opnemen met de afdeling Marketing?"
                                    disabled={isLoading}
                                />
                                {errors.phoneName && (
                                    <p className="text-sm text-red-500">{errors.phoneName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone-value">Phone Value</Label>
                                <Input
                                    id="phone-value"
                                    {...register('phoneValue')}
                                    placeholder="Stuur een e-mail naar biz@humsafar.nl"
                                    disabled={isLoading}
                                />
                                {errors.phoneValue && (
                                    <p className="text-sm text-red-500">{errors.phoneValue.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email-name">Email Name</Label>
                                <Input
                                    id="email-name"
                                    {...register('emailName')}
                                    placeholder="Misbruik melden"
                                    disabled={isLoading}
                                />
                                {errors.emailName && (
                                    <p className="text-sm text-red-500">{errors.emailName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email-value">Email Value</Label>
                                <Input
                                    id="email-value"
                                    {...register('emailValue')}
                                    placeholder="abuse@humsafar.nl"
                                    disabled={isLoading}
                                />
                                {errors.emailValue && (
                                    <p className="text-sm text-red-500">{errors.emailValue.message}</p>
                                )}
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
                                <Label htmlFor="contactFormTitle">Email Title</Label>
                                <Input
                                    id="email-title"
                                    {...register('contactFormTitle')}
                                    placeholder="Hoe kunnen we je helpen?"
                                    disabled={isLoading}
                                />
                                {errors.contactFormTitle && (
                                    <p className="text-sm text-red-500">{errors.contactFormTitle.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Email Description</Label>
                                <Controller
                                    name="contactFormDescription"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <SimpleEditor
                                                existingValue={field.value}
                                                onChange={field.onChange}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm text-red-500">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>

                            <div className="flex items-center space-x-2 pt-4">
                                <Checkbox
                                    id="show-header"
                                    checked={watch('showOnHeader')}
                                    onCheckedChange={(checked) => setValue('showOnHeader', checked as boolean)}
                                    disabled={isLoading}
                                />
                                <Label htmlFor="show-header">Show on Header</Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {isUploading ? "Uploading..." : "Saving..."}
                                </>
                            ) : "Update"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}