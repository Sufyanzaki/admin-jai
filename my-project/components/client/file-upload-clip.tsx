import { useRef, ChangeEvent } from "react";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/client/ux/button";

interface FileUploadButtonProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  multiple?: boolean;
}

export default function FileUploadClip({
  onFileSelect,
  accept = "image/*",
  multiple = false,
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onFileSelect) {
      onFileSelect(multiple ? files[0] : files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
        accept={accept}
        multiple={multiple}
      />
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={handleButtonClick}
      >
        <Paperclip className="w-4 h-4 text-gray-500" />
      </Button>
    </>
  );
}
