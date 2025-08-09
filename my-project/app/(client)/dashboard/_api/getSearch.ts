import { getRequest, showSuccess, showError } from "@/shared-lib";
import { SearchFormValues } from "../_hooks/useSearchForm";
import { MemberProfile } from "@/app/shared-types/member";
import useSWR from "swr";

/**
 * Converts a SearchFormValues object to URLSearchParams.
 */
export function searchFormToParams(values: SearchFormValues): URLSearchParams {
  return new URLSearchParams(
    Object.entries(values)
      .filter(([_, v]) => v !== undefined && v !== "" && v !== null)
      .map(([k, v]) => [k, String(v)])
  );
}

/**
 * Converts URLSearchParams to a SearchFormValues object.
 */
export function paramsToSearchForm(params: URLSearchParams): SearchFormValues {
  return {
    gender: params.get("gender") as any,
    relationshipStatus: params.get("relationshipStatus") as any,
    country: params.get("country") || undefined,
    state: params.get("state") || undefined,
    city: params.get("city") || undefined,
    religion: params.get("religion") as any,
    education: params.get("education") as any,
    hasChildren: params.get("hasChildren")
      ? params.get("hasChildren") === "true"
      : undefined,
    page: Number(params.get("page") || 1),
    limit: Number(params.get("limit") || 30),
  };
}


export type SearchResponse = {
  status: "success" | "error";
  data: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    results: MemberProfile[];
  };
};


export async function fetchSearch(params: SearchFormValues): Promise<SearchResponse> {
  const query = searchFormToParams(params);

  try {
    const r = await getRequest<SearchResponse>({
      url: `users/search?${query.toString()}`,
      useAuth: true,
    });

    showSuccess("Search completed!");
    return r;
  } catch (error: any) {
    showError({ message: error.message || "Search failed" });
    throw error;
  }
}


export function useSearch(params: SearchFormValues) {
  const { data, error, isLoading } = useSWR<SearchResponse>(
    ["searchResults", params],
    () => fetchSearch(params),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0, // disable polling
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}