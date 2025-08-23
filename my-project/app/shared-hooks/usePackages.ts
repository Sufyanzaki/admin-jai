import {useSWRFix} from "@/shared-lib";
import {getAllPackages, GetPackageDto} from "../shared-api/packageApi";

export function usePackages() {
  const { data, loading, error, mutate } = useSWRFix<GetPackageDto>({
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
    packages: data?.packages ?? [],
    loading,
    error,
    mutate,
    totalEarnings: data?.totalEarnings ?? 0,
    totalSold: data?.totalSold ?? 0,
    activePackages: data?.activePackages ?? 0,
  };
}
