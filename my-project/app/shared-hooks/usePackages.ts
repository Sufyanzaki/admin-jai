import {useSWRFix} from "@/shared-lib";
import {PackageDto} from "@/app/shared-types/packages";
import { getAllPackages } from "../shared-api/packageApi";

export function usePackages() {
  const { data, loading, error, mutate } = useSWRFix<PackageDto[]>({
    key: "all-packages",
    fetcher: async () => {
      const response = await getAllPackages();
      if (!response) {
        throw new Error("Failed to fetch packages");
      }
      return response;
    },
  });

  return {
    packages: data,
    loading,
    error,
    mutate,
  };
}
