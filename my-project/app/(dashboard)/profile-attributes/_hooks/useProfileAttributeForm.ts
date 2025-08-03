import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { patchProfileAttribute } from "../_api/patchProfileAttribute";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { useProfileAttributeInfo } from "./useProfileAttributeInfo";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import { ProfileAttributeResponse } from "../_api/getProfileAttribute";

const attributeSchema = z.object({
  options: z.string().min(1, "At least one value is required"),
  isVisible: z.boolean(),
  inputValue: z.string().optional().default("")
});

export type AttributeFormValues = z.infer<typeof attributeSchema>;

export function useProfileAttributeForm(attribute: ProfileAttributeResponse) {
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AttributeFormValues>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      options: "",
      isVisible: false,
      inputValue: "",
    },
    mode: "onBlur",
  });

  const { mutate } = useSWRConfig();    

  useEffect(() => {
    if (attribute) {
      setValue("options", attribute.options || "");
      setValue("isVisible", attribute.isVisible ?? false);
    }
  }, [attribute, setValue]);

  const options = watch("options");
  const inputValue = watch("inputValue");
  const values = options ? options.split(",").map(v => v.trim()).filter(Boolean) : [];

  const addChip = () => {
    const val = inputValue.trim();
    if (val && !values.includes(val)) {
      setValue("options", values.concat(val).join(","));
      setValue("inputValue", "");
    }
  };

  const removeChip = (valueToRemove: string) => {
    setValue("options", values.filter((v) => v !== valueToRemove).join(","));
  };

  const clearChips = () => {
    setValue("options", "");
  };

  const { trigger, isMutating } = useSWRMutation(
    "patchProfileAttribute",
    async (_: string, { arg }: { arg: AttributeFormValues }) => {
      const { options, isVisible } = arg;
      return await patchProfileAttribute(attribute.id, { options, isVisible });
    },
    {
      onError: (error: any) => {
        showError({ message: error.message });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: AttributeFormValues) => {
    const result = await trigger(values);
    if (result) {
      showSuccess("Profile attribute updated successfully!");
      mutate(`profile-attributes`);
    }
  };

  return {
    handleSubmit,
    setValue,
    watch,
    control,
    errors,
    isLoading: isSubmitting || isMutating,
    onSubmit,
    addChip,
    removeChip,
    clearChips,
    values,
    inputValue,
  };
} 