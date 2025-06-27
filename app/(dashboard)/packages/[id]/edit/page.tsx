"use client"

import React, { useState } from 'react';
import {
    ArrowLeft,
    Save,
    Upload,
    Plus,
    Trash2,
    Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PackageEditPage = () => {
    const [packageData, setPackageData] = useState({
        name: 'Premium Plan',
        price: '29.99',
        description: 'Complete package with all premium features',
        status: 'Active',
        category: 'Premium'
    });

    const [features, setFeatures] = useState([
        'Feature 1',
        'Feature 2',
        'Feature 3'
    ]);

    const [currentColor, setCurrentColor] = useState('bg-blue-500');

    const handleChange = (field: string, value: string) => {
        setPackageData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFeatureChange = (index: number, value: string) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
    };

    const addFeature = () => {
        setFeatures([...features, '']);
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        console.log('Package updated:', { packageData, features });
    };

    return (
        <div className="flex flex-col gap-5 p-4 xl:p-6">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <a href="/packages">
                        <ArrowLeft className="h-4 w-4" />
                    </a>
                </Button>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Edit Package</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Package Information</CardTitle>
                            <CardDescription>Update the basic information for this package</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Package Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    value={packageData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    placeholder="e.g. Premium Plan"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">
                                    Price <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                        €
                                    </div>
                                    <Input
                                        id="price"
                                        value={packageData.price}
                                        onChange={(e) => handleChange("price", e.target.value)}
                                        placeholder="0.00"
                                        className="pl-8"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Set 0 for free packages
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={packageData.category} onValueChange={(value) => handleChange("category", value)}>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select package category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Basic">Basic</SelectItem>
                                        <SelectItem value="Premium">Premium</SelectItem>
                                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                                        <SelectItem value="Custom">Custom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between space-y-0">
                                <div className="flex flex-col space-y-1">
                                    <Label htmlFor="status">Package Status</Label>
                                    <span className="text-sm text-muted-foreground">
                    {packageData.status === "Active"
                        ? "Package is currently active"
                        : "Package is currently inactive"}
                  </span>
                                </div>
                                <Switch
                                    id="status"
                                    checked={packageData.status === "Active"}
                                    onCheckedChange={(checked) => handleChange("status", checked ? "Active" : "Inactive")}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Package Details</CardTitle>
                            <CardDescription>Additional information about the package</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={packageData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    placeholder="Describe what's included in this package"
                                    rows={5}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Package Image</Label>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed">
                                        <Package className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={() => {}}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <Button type="button" variant="outline" size="sm">
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload Image
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Recommended: 600x600px, Max 2MB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Package Color</Label>
                                <div className="flex gap-2">
                                    {["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"].map((color) => (
                                        <div
                                            key={color}
                                            className={`h-8 w-8 rounded-md ${color} ${color === currentColor ? "ring-2 ring-primary" : ""} cursor-pointer ring-offset-2`}
                                            onClick={() => setCurrentColor(color)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" type="button" asChild>
                                <a href="/packages">Cancel</a>
                            </Button>
                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Features Section - Full Width */}
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Package Features</CardTitle>
                        <CardDescription>Define what's included in this package</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Input
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        placeholder={`Feature ${index + 1}`}
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        disabled={features.length === 1}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" type="button" onClick={addFeature}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Feature
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default PackageEditPage;