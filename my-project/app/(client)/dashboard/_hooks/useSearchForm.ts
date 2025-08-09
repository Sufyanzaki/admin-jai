import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/shared-lib";
import { getSearch, SearchResponse } from "../_api/getSearch";
import { useState } from "react";

// ✅ Schema matches allowed API params
export const searchSchema = z.object({
  gender: z.string().optional(),
  relationshipStatus: z.enum(["single", "married", "widow", "divorced", "none"]).optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  religion: z.string().optional(),
  education: z.string().optional(),
  hasChildren: z.coerce.boolean().optional(),
  ageFrom: z.number().optional(),
  ageTo: z.number().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().max(30).default(30),

});

export type SearchFormValues = z.infer<typeof searchSchema>;

export default function useSearchForm() {
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      gender: "",
      relationshipStatus: undefined,
      country: "",
      state: "",
      city: "",
      religion: "",
      education: "",
      hasChildren: false,
      page: 1,
      limit: 30,
    },
  });

  const onSubmit = async (values: SearchFormValues) => {
    const params = new URLSearchParams(
      Object.entries(watch())
        .filter(([_, v]) => v !== undefined && v !== "" && v !== null)
        .map(([k, v]) => [k, String(v)])
    );
    router.push(`/dashboard/search?${params.toString()}`);
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    setValue,
    control,
    watch,
    reset,
  };
}
