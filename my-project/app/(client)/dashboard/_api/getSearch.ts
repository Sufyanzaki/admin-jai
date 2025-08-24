import {getRequest} from "@/shared-lib";
import {SearchFormValues} from "../_hooks/useSearchForm";
import {SearchApiResponse} from "@/app/(client)/dashboard/search/_types/search";

export function searchFormToParams(values: SearchFormValues): URLSearchParams {
  return new URLSearchParams(
    Object.entries(values)
      .filter(([_, v]) => v !== undefined && v !== "" && v !== null)
      .map(([k, v]) => [k, String(v)])
  );
}

export function paramsToSearchForm(params: URLSearchParams): SearchFormValues {
  return {
    amLookingFor: params.get("amLookingFor") ?? "",
    relationshipStatus: params.get("relationshipStatus") ?? undefined,
    country: params.get("country") ?? undefined,
    state: params.get("state") ?? undefined,
    city: params.get("city") ?? undefined,
    religion: params.get("religion") ?? undefined,
    education: params.get("education") ?? undefined,
    hasChildren: params.get("hasChildren") ? params.get("hasChildren") ?? undefined : undefined,
    page: Number(params.get("page") ?? 1),
    limit: Number(params.get("limit") ?? 30),
  };
}

export async function fetchSearch(params: SearchFormValues): Promise<SearchApiResponse | undefined> {
  const query = searchFormToParams(params);

  return await getRequest<SearchApiResponse>({
    url: `users/search?${query.toString()}`,
    useAuth: true,
  });
}
