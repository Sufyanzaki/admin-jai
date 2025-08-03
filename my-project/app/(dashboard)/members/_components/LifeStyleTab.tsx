"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import useLifeStyleForm from "../add/_hooks/useLifeStyleForm";
import { Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import { getUserTrackingId } from "@/lib/access-token";
import { AlertTriangle } from "lucide-react";
import Preloader from "@/components/ui/Preloader";

export default function LifeStyleTab({ callback }: { callback: () => void}) {

  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const userId = tracker?.id ?? id;

  const {
    handleSubmit,
    errors,
    isLoading,
    control,
    onSubmit,
      lifeStyleLoading
  } = useLifeStyleForm();

  return (
    <TabsContent value="life_style" className="space-y-4 mt-4">
        {lifeStyleLoading ? <div className="flex items-center flex-col justify-center h-64">
                            <Preloader />
                            <p className="text-sm">Loading Life Style</p>
                        </div> : <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Complete your life style below.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit((values) => onSubmit(values, callback))}>
                {!userId && <div className="border border-amber-200 bg-amber-50 rounded-sm p-4 mb-6">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <div className="text-amber-700 text-sm">
                            You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member
                        </div>
                    </div>
                </div>}
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="smoke">Smoke</Label>
                            <Controller
                                control={control}
                                name="smoke"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                        <SelectTrigger id="smoke">
                                            <SelectValue placeholder="Ja" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ja">Ja</SelectItem>
                                            <SelectItem value="nee">Nee</SelectItem>
                                            <SelectItem value="occasionally">Occasionally</SelectItem>
                                            <SelectItem value="socially">Socially</SelectItem>
                                            <SelectItem value="trying-to-quit">Trying to quit</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.smoke && <p className="text-sm text-red-500">{errors.smoke.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="drinking">Drinking</Label>
                            <Controller
                                control={control}
                                name="drinking"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                        <SelectTrigger id="drinking">
                                            <SelectValue placeholder="Nee" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="nee">Nee</SelectItem>
                                            <SelectItem value="ja">Ja</SelectItem>
                                            <SelectItem value="socially">Socially</SelectItem>
                                            <SelectItem value="occasionally">Occasionally</SelectItem>
                                            <SelectItem value="regularly">Regularly</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.drinking && <p className="text-sm text-red-500">{errors.drinking.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="goingOut">Going Out</Label>
                            <Controller
                                control={control}
                                name="goingOut"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                        <SelectTrigger id="goingOut">
                                            <SelectValue placeholder="Ja" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ja">Ja</SelectItem>
                                            <SelectItem value="nee">Nee</SelectItem>
                                            <SelectItem value="weekends-only">Weekends only</SelectItem>
                                            <SelectItem value="rarely">Rarely</SelectItem>
                                            <SelectItem value="frequently">Frequently</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.goingOut && <p className="text-sm text-red-500">{errors.goingOut.message}</p>}
                        </div>
                    </div>
                    <Separator />
                    {/* Additional Lifestyle */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Additional Lifestyle</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="exercise">Exercise</Label>
                                <Controller
                                    control={control}
                                    name="exercise"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger id="exercise">
                                                <SelectValue placeholder="Select exercise frequency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="daily">Daily</SelectItem>
                                                <SelectItem value="regularly">Regularly (3–5 times/week)</SelectItem>
                                                <SelectItem value="occasionally">Occasionally (1–2 times/week)</SelectItem>
                                                <SelectItem value="rarely">Rarely</SelectItem>
                                                <SelectItem value="never">Never</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.exercise && <p className="text-sm text-red-500">{errors.exercise.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="diet">Diet</Label>
                                <Controller
                                    control={control}
                                    name="diet"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger id="diet">
                                                <SelectValue placeholder="Select diet preference" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="omnivore">Omnivore</SelectItem>
                                                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                                <SelectItem value="vegan">Vegan</SelectItem>
                                                <SelectItem value="pescatarian">Pescatarian</SelectItem>
                                                <SelectItem value="keto">Keto</SelectItem>
                                                <SelectItem value="paleo">Paleo</SelectItem>
                                                <SelectItem value="halal">Halal</SelectItem>
                                                <SelectItem value="kosher">Kosher</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.diet && <p className="text-sm text-red-500">{errors.diet.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pets">Pets</Label>
                                <Controller
                                    control={control}
                                    name="pets"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger id="pets">
                                                <SelectValue placeholder="Select pet preference" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="love-pets">Love pets</SelectItem>
                                                <SelectItem value="have-pets">Have pets</SelectItem>
                                                <SelectItem value="allergic">Allergic to pets</SelectItem>
                                                <SelectItem value="no-pets">Don't like pets</SelectItem>
                                                <SelectItem value="want-pets">Want pets in future</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.pets && <p className="text-sm text-red-500">{errors.pets.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="travel">Travel</Label>
                                <Controller
                                    control={control}
                                    name="travel"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger id="travel">
                                                <SelectValue placeholder="Select travel frequency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="frequent">Frequent traveler</SelectItem>
                                                <SelectItem value="occasional">Occasional traveler</SelectItem>
                                                <SelectItem value="rare">Rarely travel</SelectItem>
                                                <SelectItem value="love-travel">Love to travel</SelectItem>
                                                <SelectItem value="homebody">Prefer staying home</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.travel && <p className="text-sm text-red-500">{errors.travel.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="socialMedia">Social Media</Label>
                                <Controller
                                    control={control}
                                    name="socialMedia"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger id="socialMedia">
                                                <SelectValue placeholder="Select social media usage" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="very-active">Very active</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="moderate">Moderate use</SelectItem>
                                                <SelectItem value="minimal">Minimal use</SelectItem>
                                                <SelectItem value="none">Don't use social media</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.socialMedia && <p className="text-sm text-red-500">{errors.socialMedia.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="workLifeBalance">Work-Life Balance</Label>
                                <Controller
                                    control={control}
                                    name="workLifeBalance"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger id="workLifeBalance">
                                                <SelectValue placeholder="Select work-life balance" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="excellent">Excellent balance</SelectItem>
                                                <SelectItem value="good">Good balance</SelectItem>
                                                <SelectItem value="working-on-it">Working on it</SelectItem>
                                                <SelectItem value="work-focused">Work-focused</SelectItem>
                                                <SelectItem value="life-focused">Life-focused</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.workLifeBalance && <p className="text-sm text-red-500">{errors.workLifeBalance.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nightLife">Night Life</Label>
                                <Controller
                                    control={control}
                                    name="nightLife"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger id="nightLife">
                                                <SelectValue placeholder="Select night life preference" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="love-nightlife">Love nightlife</SelectItem>
                                                <SelectItem value="occasional">Occasional nights out</SelectItem>
                                                <SelectItem value="quiet-evenings">Prefer quiet evenings</SelectItem>
                                                <SelectItem value="early-bird">Early bird</SelectItem>
                                                <SelectItem value="night-owl">Night owl</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.nightLife && <p className="text-sm text-red-500">{errors.nightLife.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="primaryHobby">Primary Hobby</Label>
                                <Controller
                                    control={control}
                                    name="primaryHobby"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                            <SelectTrigger id="primaryHobby">
                                                <SelectValue placeholder="Select primary hobby" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sports">Sports</SelectItem>
                                                <SelectItem value="reading">Reading</SelectItem>
                                                <SelectItem value="music">Music</SelectItem>
                                                <SelectItem value="art">Art & Creativity</SelectItem>
                                                <SelectItem value="cooking">Cooking</SelectItem>
                                                <SelectItem value="gaming">Gaming</SelectItem>
                                                <SelectItem value="outdoor">Outdoor activities</SelectItem>
                                                <SelectItem value="technology">Technology</SelectItem>
                                                <SelectItem value="fitness">Fitness</SelectItem>
                                                <SelectItem value="photography">Photography</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.primaryHobby && <p className="text-sm text-red-500">{errors.primaryHobby.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Lifestyle"}
                        </Button>
                    </div>
                </CardContent>
            </form>
        </Card>}
    </TabsContent>
  );
} 