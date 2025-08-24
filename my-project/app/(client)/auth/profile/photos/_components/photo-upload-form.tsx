"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { Button } from "@/components/client/ux/button";
import { Card } from "@/components/client/ux/card";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageWrapper from "@/components/client/image-wrapper";
import usePhotoForm from "@/app/(client)/auth/profile/photos/_hooks/usePhotoForm";
import Preloader from "@/components/shared/Preloader";
import { useRegistration } from "@/app/shared-hooks/useRegistration";
import { useTranslation } from "react-i18next";

interface PhotoSlot {
  id: number;
  file: File | null;
  preview: string | null;
}

export function PhotoUploadForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const { registrationSettings } = useRegistration();

  const { handleSubmit, isLoading, onSubmit, setValue, images, isFetching } =
      usePhotoForm();

  const [photoSlots, setPhotoSlots] = useState<PhotoSlot[]>([
    { id: 1, file: null, preview: null },
  ]);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const hasLocalPreviews = photoSlots.some((slot) => slot.preview);
    if (hasLocalPreviews) return;

    setPhotoSlots(
        images.map((img, index) => ({
          id: Date.now() + index,
          file: img instanceof File ? img : null,
          preview: typeof img === "string" ? img : URL.createObjectURL(img),
        }))
    );
  }, [images, photoSlots]);

  useEffect(() => {
    const files = photoSlots
        .filter((slot) => slot.file || slot.preview)
        .map((slot) => slot.file ?? (slot.preview as unknown as File | string));
    setValue("images", files, { shouldValidate: true });
  }, [photoSlots, setValue]);

  const handleFileUpload = (slotId: number, files: FileList) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoSlots((prev) =>
          prev.map((slot) =>
              slot.id === slotId
                  ? { ...slot, file, preview: e.target?.result as string }
                  : slot
          )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewSlot = () => {
    setPhotoSlots((prev) => [
      ...prev,
      { id: Date.now(), file: null, preview: null },
    ]);
  };

  const handleRemoveSlot = (slotId: number) => {
    if (slotId === 1) return;
    setPhotoSlots((prev) => prev.filter((slot) => slot.id !== slotId));
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

  const handleBack = () => {
    router.push("/auth/profile/personality");
  };

  if (isFetching) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">{t("Loading...")}</p>
        </div>
    );
  }

  return (
      <div className="space-y-8 py-3 text-start">
        <h4 className="text-2xl font-bold text-gray-900">
          {t(registrationSettings?.myImageTitle || "")}
        </h4>
        <h5 className="text-xl font-medium text-gray-800 mt-[-20px]">
          {t(registrationSettings?.myImageDescription || "")}
        </h5>

        <form onSubmit={handleSubmit((v) => onSubmit(v))} className="space-y-6">
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
              <span className="text-sm text-gray-500 mt-2">{t("Add Slot")}</span>
            </button>
          </div>

          <div className="flex justify-center gap-4 my-16 lg:my-26">
            <Button
                variant="outline"
                onClick={handleBack}
                size="lg"
                type="button"
            >
              <ArrowLeft className="mr-1 w-4 h-4" /> {t("Back")}
            </Button>
            <Button
                variant="outline"
                onClick={() => router.push("/auth/profile/partner-preferences")}
                size="lg"
                type="button"
            >
              {t("Skip")}
            </Button>
            <Button
                variant="default"
                size="lg"
                type="submit"
                disabled={isLoading}
            >
              {isLoading ? t("Saving...") : t("Next")}{" "}
              <ArrowRight className="ml-1 w-4 h-4" />
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

function PhotoSlot({
                     slot,
                     onFileUpload,
                     onRemove,
                     canRemove,
                     onTriggerUpload,
                   }: PhotoSlotProps) {

  const { t } = useTranslation();

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
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
                  alt={t(`Photo ${slot.id}`)}
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
