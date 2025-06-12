"use client"

import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function AddBlogPage() {

    const [bannerFile, setBannerFile] = useState<File | null>(null)
    const [metaImageFile, setMetaImageFile] = useState<File | null>(null)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-2">Edit Blog</h1>
                    <p className="text-muted-foreground">Manage and track all ambulances in the fleet</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Blogs Details</CardTitle>
                    <CardDescription>View and manage all ambulances in your fleet</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="grid grid-cols-2 gap-6">
                        {/* Blog Title */}
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="title">Blog Title *</Label>
                            <Input id="title" placeholder="Blog Title" required />
                        </div>

                        {/* Category */}
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tech">Technology</SelectItem>
                                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                    <SelectItem value="education">Education</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Slug */}
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="slug">Slug *</Label>
                            <Input id="slug" placeholder="Slug" required />
                        </div>

                        {/* Banner */}
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="banner">Banner (1300x650)</Label>
                            <Input
                                id="banner"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                            />
                        </div>

                        {/* Short Description */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="short-description">Short Description *</Label>
                            <Textarea id="short-description" placeholder="Short Description" rows={4} required />
                        </div>

                        {/* Description */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Description" rows={6} />
                        </div>

                        {/* Meta Title */}
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="meta-title">Meta Title</Label>
                            <Input id="meta-title" placeholder="Meta Title" />
                        </div>

                        {/* Meta Image */}
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="meta-image">Meta Image (200x200)+</Label>
                            <Input
                                id="meta-image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setMetaImageFile(e.target.files?.[0] || null)}
                            />
                        </div>

                        {/* Meta Description */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="meta-description">Meta Description</Label>
                            <Textarea id="meta-description" placeholder="Meta Description" rows={4} />
                        </div>

                        {/* Meta Keywords */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="meta-keywords">Meta Keywords</Label>
                            <Input id="meta-keywords" placeholder="Meta Keywords" />
                        </div>

                        {/* Action Buttons */}
                        <div className="col-span-2 flex justify-end space-x-4 pt-4">
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}