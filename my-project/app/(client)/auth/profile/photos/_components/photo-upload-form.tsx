"use client";

import { useState } from "react";
import { Button } from "@/components/client/ux/button";
import { Card } from "@/components/client/ux/card";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageWrapper from "@/components/client/image-wrapper";
import usePhotoForm from "@/app/(client)/auth/profile/photos/_hooks/usePhotoForm";

interface PhotoSlot {
  id: number;
  file: File | null;
  preview: string | null;
}

export function PhotoUploadForm() {
  const router = useRouter();
  const {
    handleSubmit,
    isLoading,
    onSubmit,
    setValue,
    watch
  } = usePhotoForm();

  const [photoSlots, setPhotoSlots] = useState<PhotoSlot[]>([
    { id: 1, file: null, preview: null }
  ]);

  const handleFileUpload = (slotId: number, files: FileList) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoSlots(prev => prev.map(slot =>
          slot.id === slotId
              ? { ...slot, file, preview: e.target?.result as string }
              : slot
      ));

      const currentImages = watch("images") || [];
      setValue("images", [...currentImages, file], { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewSlot = () => {
    const newSlot = {
      id: Date.now(),
      file: null,
      preview: null
    };
    setPhotoSlots(prev => [...prev, newSlot]);
  };

  const handleRemoveSlot = (slotId: number) => {
    if (slotId === 1) return;

    setPhotoSlots(prev => prev.filter(slot => slot.id !== slotId));

    const currentImages = watch("images") || [];
    setValue("images", currentImages.filter((_, index) => {
      return index !== photoSlots.findIndex(s => s.id === slotId);
    }), { shouldValidate: true });
  };

  const handleTriggerFileInput = (slotId: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        handleFileUpload(slotId, files);
      }
    };
    input.click();
  };

  const handleNext = async () => {
    await handleSubmit(v=>onSubmit(v))();
    router.push("/auth/profile/partner-preferences");
  };

  const handleBack = () => {
    router.push("/auth/profile/personality");
  };

  return (
      <div className="space-y-8 py-3 text-start">
        <h4 className="text-2xl font-bold text-gray-900">Upload your photo</h4>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
            {photoSlots.map((slot) => (
                <PhotoSlot
                    key={slot.id}
                    slot={slot}
                    onFileUpload={(files) => handleFileUpload(slot.id, files)}
                    onRemove={() => handleRemoveSlot(slot.id)}
                    canRemove={slot.id !== 1}
                    onTriggerUpload={() => handleTriggerFileInput(slot.id)}
                />
            ))}

            <button
                type="button"
                onClick={handleAddNewSlot}
                className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
              <Plus className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-500 mt-2">Add Slot</span>
            </button>
          </div>

          <div className="flex justify-center gap-4 my-16 lg:my-26">
            <Button variant="outline" onClick={handleBack} size="lg" type="button">
              <ArrowLeft className="mr-1 w-4 h-4" /> Back
            </Button>
            <Button variant="outline" onClick={handleNext} size="lg" type="button">
              Skip
            </Button>
            <Button
                variant="default"
                onClick={handleNext}
                size="lg"
                type="submit"
                disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Next"} <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
  );
}

interface PhotoSlotProps {
  slot: {
    id: number;
    file: File | null;
    preview: string | null;
  };
  onFileUpload: (files: FileList) => void;
  onRemove: () => void;
  canRemove: boolean;
  onTriggerUpload: () => void;
}

function PhotoSlot({ slot, onFileUpload, onRemove, canRemove, onTriggerUpload }: PhotoSlotProps) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files);
    }
  };

  return (
      <Card className="aspect-square relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
        {slot.preview ? (
            <>
              <ImageWrapper
                  src={slot.preview}
                  alt={`Photo ${slot.id}`}
                  className="w-full h-full object-cover"
              />
              {canRemove && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        size="icon"
                        variant="destructive"
                        className="w-8 h-8 z-20"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove();
                        }}
                        type="button"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
              )}
            </>
        ) : (
            <div
                className="w-full h-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
                onClick={onTriggerUpload}
            >
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
        )}
        <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            multiple={false}
        />
      </Card>
  );
}