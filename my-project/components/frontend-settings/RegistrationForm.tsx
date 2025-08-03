"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import {CustomImageUpload} from "@/components/frontend-settings/CustomImageInput"
import Link from "next/link"
import { Controller } from "react-hook-form"
import useRegistrationForm from "@/app/(dashboard)/frontend-settings/_hooks/useRegisterationForm";
import Preloader from "@/components/ui/Preloader";

export default function RegistrationForm() {
    const {
        register,
        handleSubmit,
        control,
        errors,
        isLoading,
        onSubmit,
        loading
    } = useRegistrationForm();

    if(loading) return (
        <div className="flex items-center flex-col justify-center h-64">
            <Preloader/>
            <p className="text-sm">Loading...</p>
        </div>
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 p-4 xl:p-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/frontend-settings">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Registration</h2>
                        <p className="text-muted-foreground">Fill the form to add new page.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Registration Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Banner Image */}
                        <Controller
                            name="bannerImage"
                            control={control}
                            render={({ field }) => (
                                <CustomImageUpload
                                    file={field.value instanceof File ? field.value : null}
                                    existingImage={typeof field.value === 'string' ? field.value : undefined}
                                    label="Banner Image"
                                    onFileChange={(file) => field.onChange(file)}
                                    type="banner-1"
                                />
                            )}
                        />

                        {/* Step 1 */}
                        <div className="space-y-2">
                            <Label htmlFor="step1Title">Step 1: Choose Preference</Label>
                            <Input
                                id="step1Title"
                                {...register("step1Title")}
                                placeholder="Select your gender and preferences"
                            />
                            {errors.step1Title && (
                                <p className="text-sm font-medium text-destructive">{errors.step1Title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="step1Description">Step 1 Description</Label>
                            <Input
                                id="step1Description"
                                {...register("step1Description")}
                            />
                            {errors.step1Description && (
                                <p className="text-sm font-medium text-destructive">{errors.step1Description.message}</p>
                            )}
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-2">
                            <Label htmlFor="step2Title">Step 2: About Yourself</Label>
                            <Input
                                id="step2Title"
                                {...register("step2Title")}
                                placeholder="Add basic information like age and location"
                            />
                            {errors.step2Title && (
                                <p className="text-sm font-medium text-destructive">{errors.step2Title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="step2Description">Step 2 Description</Label>
                            <Input
                                id="step2Description"
                                {...register("step2Description")}
                            />
                            {errors.step2Description && (
                                <p className="text-sm font-medium text-destructive">{errors.step2Description.message}</p>
                            )}
                        </div>

                        {/* Step 3 */}
                        <div className="space-y-2">
                            <Label htmlFor="step3Title">Step 3: Upload Photo</Label>
                            <Input
                                id="step3Title"
                                {...register("step3Title")}
                                placeholder="A smile says more than a thousand words"
                            />
                            {errors.step3Title && (
                                <p className="text-sm font-medium text-destructive">{errors.step3Title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="step3Description">Step 3 Description</Label>
                            <Input
                                id="step3Description"
                                {...register("step3Description")}
                            />
                            {errors.step3Description && (
                                <p className="text-sm font-medium text-destructive">{errors.step3Description.message}</p>
                            )}
                        </div>

                        {/* Step 4 */}
                        <div className="space-y-2">
                            <Label htmlFor="step4Title">Step 4: Describe Yourself</Label>
                            <Input
                                id="step4Title"
                                {...register("step4Title")}
                                placeholder="Let others know who you are"
                            />
                            {errors.step4Title && (
                                <p className="text-sm font-medium text-destructive">{errors.step4Title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="step4Description">Step 4 Description</Label>
                            <Input
                                id="step4Description"
                                {...register("step4Description")}
                            />
                            {errors.step4Description && (
                                <p className="text-sm font-medium text-destructive">{errors.step4Description.message}</p>
                            )}
                        </div>

                        {/* My Image Section */}
                        <div className="space-y-2">
                            <Label htmlFor="myImageTitle">My Image Title</Label>
                            <Input
                                id="myImageTitle"
                                {...register("myImageTitle")}
                                placeholder="Upload a clear recent photo of yourself"
                            />
                            {errors.myImageTitle && (
                                <p className="text-sm font-medium text-destructive">{errors.myImageTitle.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="myImageDescription">My Image Description</Label>
                            <Input
                                id="myImageDescription"
                                {...register("myImageDescription")}
                            />
                            {errors.myImageDescription && (
                                <p className="text-sm font-medium text-destructive">{errors.myImageDescription.message}</p>
                            )}
                        </div>

                        {/* My Description Section */}
                        <div className="space-y-2">
                            <Label htmlFor="myDescriptionTitle">My Description Title</Label>
                            <Input
                                id="myDescriptionTitle"
                                {...register("myDescriptionTitle")}
                            />
                            {errors.myDescriptionTitle && (
                                <p className="text-sm font-medium text-destructive">{errors.myDescriptionTitle.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="myDescriptionPlaceholder">Description Placeholder</Label>
                            <Input
                                id="myDescriptionPlaceholder"
                                {...register("myDescriptionPlaceholder")}
                                placeholder="Write something interesting about yourself..."
                            />
                            {errors.myDescriptionPlaceholder && (
                                <p className="text-sm font-medium text-destructive">{errors.myDescriptionPlaceholder.message}</p>
                            )}
                        </div>

                        {/* Step 5 */}
                        <div className="space-y-2">
                            <Label htmlFor="step5Title">Step 5: Fill Interests</Label>
                            <Input
                                id="step5Title"
                                {...register("step5Title")}
                                placeholder="Indicate what you like so we can find a match"
                            />
                            {errors.step5Title && (
                                <p className="text-sm font-medium text-destructive">{errors.step5Title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="step5Description">Step 5 Description</Label>
                            <Input
                                id="step5Description"
                                {...register("step5Description")}
                            />
                            {errors.step5Description && (
                                <p className="text-sm font-medium text-destructive">{errors.step5Description.message}</p>
                            )}
                        </div>

                        {/* Step 6 */}
                        <div className="space-y-2">
                            <Label htmlFor="step6Title">Step 6: Answer Questions</Label>
                            <Input
                                id="step6Title"
                                {...register("step6Title")}
                                placeholder="Help us understand you better"
                            />
                            {errors.step6Title && (
                                <p className="text-sm font-medium text-destructive">{errors.step6Title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="step6Description">Step 6 Description</Label>
                            <Input
                                id="step6Description"
                                {...register("step6Description")}
                            />
                            {errors.step6Description && (
                                <p className="text-sm font-medium text-destructive">{errors.step6Description.message}</p>
                            )}
                        </div>

                        {/* Step 7 */}
                        <div className="space-y-2">
                            <Label htmlFor="step7Title">Step 7: Ready to Start!</Label>
                            <Input
                                id="step7Title"
                                {...register("step7Title")}
                                placeholder="Your profile is now ready to be viewed"
                            />
                            {errors.step7Title && (
                                <p className="text-sm font-medium text-destructive">{errors.step7Title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="step7Description">Step 7 Description</Label>
                            <Input
                                id="step7Description"
                                {...register("step7Description")}
                            />
                            {errors.step7Description && (
                                <p className="text-sm font-medium text-destructive">{errors.step7Description.message}</p>
                            )}
                        </div>

                        {/* Show on Header */}
                        <div className="flex items-center space-x-2 pt-4">
                            <Controller
                                name="showOnHeader"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="show-header"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                            <Label htmlFor="show-header">Show on Header</Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update"}
                    </Button>
                </div>
            </div>
        </form>
    )
}