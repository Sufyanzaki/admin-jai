import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { addPackage } from "../_api/addPackage";
import { imageUpload } from "@/admin-utils/utils/imageUpload";

const packageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price is required"),
  validity: z.coerce.number().min(0, "Validity is required"),
  image: z.union([z.string(), z.instanceof(File), z.null()]),
  isActive: z.boolean().default(true),
  features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
});

export type PackageFormValues = z.infer<typeof packageSchema>;

export default function usePackageForm() {
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


  const { trigger, isMutating } = useSWRMutation(
    "addPackage",
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
      return await addPackage({
        ...arg,
        image: imageUrl,
        features: featuresString as any,
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

  // Add helpers for features
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
    addFeature,
    removeFeature,
  };
} 