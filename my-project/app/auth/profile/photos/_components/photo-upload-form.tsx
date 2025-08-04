"use client";

import { useState } from "react";
import { Button } from "@/components/client/ux/button";
import { Card } from "@/components/client/ux/card";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageWrapper from "@/components/client/image-wrapper";

interface PhotoSlot {
  id: number;
  file: File | null;
  preview: string | null;
}

export function PhotoUploadForm() {
  const router = useRouter();
  const [photos, setPhotos] = useState<PhotoSlot[]>([
    { id: 1, file: null, preview: null },
  ]);

  const handleFileUpload = (slotId: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotos((prev) =>
        prev.map((photo) =>
          photo.id === slotId
            ? { ...photo, file, preview: e.target?.result as string }
            : photo
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (slotId: number) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== slotId));
  };

  const handleAddNewPhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newId = photos.length ? photos[photos.length - 1].id + 1 : 1;
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotos((prev) => [
            ...prev,
            {
              id: newId,
              file,
              preview: e.target?.result as string,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleNext = () => {
    router.push("/auth/profile/partner-prefrences");
    console.log(
      "Photos:",
      photos.filter((p) => p.file)
    );
  };

  const handleBack = () => {
    router.push("/auth/profile/personality");
  };

  return (
    <div className="space-y-8 py-3 text-start">
      <h4 className="text-2xl font-bold text-gray-900">Upload je foto</h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {photos.map((photo) => (
          <PhotoSlot
            key={photo.id}
            photo={photo}
            onFileUpload={(file) => handleFileUpload(photo.id, file)}
            onRemove={() => handleRemovePhoto(photo.id)}
            canRemove={photo.id !== 1} // ❗ do not allow removing first slot
          />
        ))}
      </div>

      <div className="flex justify-start">
        <Button
          onClick={handleAddNewPhoto}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add A New Photo
        </Button>
      </div>

      <div className="flex justify-center gap-4 my-16 lg:my-26">
        <Button variant="outline" onClick={handleBack} size="lg">
          <ArrowLeft className="mr-1 w-4 h-4" /> Back
        </Button>
        <Button variant="outline" onClick={handleNext} size="lg">
          Skip
        </Button>
        <Button variant="default" onClick={handleNext} size="lg">
          Next <ArrowRight className="ml-1 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

interface PhotoSlotProps {
  photo: PhotoSlot;
  onFileUpload: (file: File) => void;
  onRemove: () => void;
  canRemove: boolean;
}

function PhotoSlot({
  photo,
  onFileUpload,
  onRemove,
  canRemove,
}: PhotoSlotProps) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Card className="aspect-square relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        disabled={false}
      />

      {photo.preview && photo.file ? (
        <>
          <ImageWrapper
            key={photo.preview}
            src={photo.preview}
            alt={`Photo ${photo.id}`}
            className="w-full h-full object-cover"
          />
          {canRemove && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Button
                size="icon"
                variant="destructive"
                className="w-8 h-8 z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </Card>
  );
}
