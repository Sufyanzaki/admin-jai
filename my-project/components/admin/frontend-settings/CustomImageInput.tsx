import {Label} from "@/components/ui/label";
import {FileText, Upload} from "lucide-react";
import {Button} from "@/components/ui/button";
import { useRef } from "react";
import React from "react";

// Add preview for selected image

type CustomImageUploadProps = {
    label: string;
    file: File | null;
    existingImage?: string;
    onFileChange: (file: File | null) => void;
    type?: string;
};

export const CustomImageUpload = ({ label, file, existingImage, onFileChange, type }: CustomImageUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target?.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [file]);

    const openFileDialog = () => {
        inputRef.current?.click();
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onClick={openFileDialog}
            >
                <div className="flex flex-col items-center space-y-4">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-md mx-auto" />
                    ) : existingImage ? (
                        <img src={existingImage} alt="Existing" className="w-24 h-24 object-cover rounded-md mx-auto" />
                    ) : (
                        <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                    )}
                    <div className="space-y-3">
                        <p className="text-sm mb-1 text-gray-500">
                            {file ? file.name : existingImage ? "Existing image" : "No image uploaded yet"}
                        </p>
                        <p className="text-sm font-medium ">Click to upload image</p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            openFileDialog();
                        }}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Browse
                    </Button>
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                    className="hidden"
                />
            </div>
        </div>
    );
};
