import { ProfileResponse } from "@/app/shared-types/auth";
import { postRequest } from "@/shared-lib";
import { SearchFormValues } from "../_hooks/useSearchForm";

export async function postSearch(payload: SearchFormValues): Promise<ProfileResponse> {
  const r = await postRequest<SearchFormValues>({
    url: "search",
    data: payload,
    useAuth: true,
  });
  return r.response;
} 