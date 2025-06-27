"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {ArrowLeft, Upload} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CustomImageUpload} from "@/components/frontend-settings/CustomImageInput";
import Link from "next/link";
import {SimpleEditor} from "@/components/tiptap-templates/simple/simple-editor";


export default function TOSForm(){

    const [metaImage, setMetaImage] = useState<File | null>(null)
    const [showOnHeader, setShowOnHeader] = useState(false)
    const [pageType, setPageType] = useState("Public")

    const handleImageUpload = (file: File | null) => {
        setMetaImage(file)
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
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Terms and Conditions</h2>
                    <p className="text-muted-foreground">Fill the form to add new page.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Page Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title*</Label>
                        <Input id="title" defaultValue="Term and conditions" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="link">Link*</Label>
                        <Input id="link" defaultValue="terms" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="add-content">Add Content</Label>
                        <SimpleEditor />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>SEO Fields</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="meta-title">Meta Title</Label>
                        <Input id="meta-title" defaultValue="Term and conditions" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="meta-description">Meta Description</Label>
                        <Input id="meta-description" defaultValue="Term and conditions" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="keywords">Keywords</Label>
                        <Textarea id="keywords" defaultValue="Term and conditions" className="min-h-[100px]" />
                        <p className="text-sm text-muted-foreground">Separate with coma</p>
                    </div>

                    <CustomImageUpload label="Meta Image (200x200+)" file={null} onFileChange={()=>{}} type="meta-image" />

                    <div className="space-y-2">
                        <Label htmlFor="page-type">Page type*</Label>
                        <Select value={pageType} onValueChange={setPageType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select page type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Public">Public</SelectItem>
                                <SelectItem value="Private">Private</SelectItem>
                                <SelectItem value="Draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>
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
            <div className="flex justify-end">
                <Button type="submit">Update</Button>
            </div>
        </div>
    )
}