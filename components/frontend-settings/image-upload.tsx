import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Upload, X} from "lucide-react";

export const ImageUploadField = ({
                              label,
                              file,
                              onFileChange,
                              type,
                          }: {
    label: string
    file: File | null
    onFileChange: (file: File | null) => void
    type: string
}) => (
    <div className="space-y-2">
        <Label htmlFor={type}>{label}</Label>
        <div className="flex items-center gap-4">
            <div className="flex-1">
                <Input
                    id={type}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                    className="hidden"
                />
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById(type)?.click()}
                            className="flex items-center gap-2"
                        >
                            <Upload className="h-4 w-4" />
                            Choose File
                        </Button>
                    </div>
                    <div className="flex gap-1 items-center">
                        <p className="text-sm text-muted-foreground">{file ? file.name : "No file chosen"}</p>
                        {file && (
                            <Button type="button" variant="ghost" size="sm" onClick={() => onFileChange(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
)