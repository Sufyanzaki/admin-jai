"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import usePackageById from "@/app/shared-hooks/usePackageById";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {editPackage} from "@/app/shared-api/packageApi";

const packageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price is required"),
  validity: z.coerce.number().min(0, "Validity is required"),
  image: z.any().optional(),
  isActive: z.boolean().default(true),
  features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
});

export type PackageFormValues = z.infer<typeof packageSchema>;

export default function useEditPackage() {

  const params = useParams();
  const id = params.id as string;

  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: "",
      price: 0,
      validity: 0,
      image: null,
      isActive: true,
      features: [""],
    },
    mode: "onBlur",
  });


  const { pkg, loading } = usePackageById(id);

  useEffect(() => {
    if(!pkg) return;

    reset({
      name: pkg.name,
      price: Number(pkg.price),
      validity: Number(pkg.validity),
      image: pkg.image ?? null,
      isActive: pkg.isActive,
      features: pkg.features?.split(",") ?? [],
    })
  }, [pkg, reset]);

  const { trigger, isMutating } = useSWRMutation(
      "editPackage",
      async (_: string, { arg }: { arg: PackageFormValues }) => {
        let imageUrl = "";
        if (arg.image instanceof File) {
          imageUrl = await imageUpload(arg.image);
        } else if (typeof arg.image === "string") {
          imageUrl = arg.image;
        } else {
          imageUrl = "";
        }
        const featuresString = arg.features.join(", ");
        return await editPackage({
          ...arg,
          id,
          image: imageUrl,
          features: featuresString,
        });
      },
      {
        onError: (error: Error) => {
          showError({ message: error.message });
          console.error("Package creation error:", error);
        },
        revalidate: false,
        populateCache: false,
      }
  );

  const onSubmit = async (values: PackageFormValues) => {
    const result = await trigger(values);
    if (result) {
      showSuccess("Package added successfully!");
      reset();
    }
  };

  const features = watch("features");
  const addFeature = () => setValue("features", [...features, ""]);
  const removeFeature = (idx: number) => setValue("features", features.filter((_, i) => i !== idx));

  return {
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    register,
    setValue,
    watch,
    control,
    reset,
    features,
    loading,
    addFeature,
    removeFeature,
    packageData: pkg,
  };
} 