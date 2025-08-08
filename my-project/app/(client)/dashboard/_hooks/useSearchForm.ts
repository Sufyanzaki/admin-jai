import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { postSearch } from "../_api/postSearch";
import { showError, showSuccess } from "@/shared-lib";

// ✅ Zod schema for form fields
const searchSchema = z.object({
  quickSearch: z.string().optional(),
  lookingFor: z.enum(["man", "woman"]).optional(),
  relationStatus: z
    .enum(["none", "single", "widow", "married", "divorced"])
    .optional(),
  location: z.string().optional(),
  ageFrom: z.coerce.number().optional(),
  ageTo: z.coerce.number().optional(),
  religion: z
    .enum(["none", "buddhist", "muslim", "hindu", "catholic"])
    .optional(),
  children: z.string().optional(),
  education: z
    .enum(["none", "primary", "secondary", "mbo", "hbo", "university"])
    .optional(),
});

export type SearchFormValues = z.infer<typeof searchSchema>;

// SWR mutation fetcher
async function searchFetcher(_: string, { arg }: { arg: SearchFormValues }) {
  return await postSearch(arg);
}

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
      quickSearch: "",
      lookingFor: undefined,
      relationStatus: undefined,
      location: "",
      ageFrom: undefined,
      ageTo: undefined,
      religion: undefined,
      children: undefined,
      education: undefined,
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    "searchProfiles", // cache key
    searchFetcher,
    {
      onSuccess: (data) => {
        showSuccess("Search completed!");
        router.push("/dashboard/search");
      },
      onError: (error: Error) => {
        showError({ message: error.message || "Search failed" });
        console.error(error);
      },
    }
  );

  const onSubmit = (values: SearchFormValues) => {
    trigger(values);
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: isSubmitting || isMutating,
    register,
    setValue,
    control,
    watch,
    reset,
  };
}
