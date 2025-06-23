import {Label} from "@/components/ui/label";
import {FileText, Upload} from "lucide-react";
import {Button} from "@/components/ui/button";

type CustomImageUploadProps = {
    label: string;
    file: File | null;
    onFileChange: (file: File | null) => void;
    type?: string;
};

export const CustomImageUpload = ({ label, file, onFileChange, type }: CustomImageUploadProps) => {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <div className="flex flex-col items-center space-y-4">
                    <FileText className="w-12 h-12 text-gray-400" />
                    <div className="space-y-3">
                        <p className="text-sm mb-1 text-gray-500">No banner uploaded yet</p>
                        <p className="text-sm font-medium ">Click to upload banner</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="w-4 h-4 mr-2" />
                        Browse
                    </Button>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                    className="hidden"
                />
            </div>
        </div>)
}
