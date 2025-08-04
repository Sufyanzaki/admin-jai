import useSWR from "swr";
import { getAllPackages, Package } from "../_api/getAllPackages";

export function usePackages() {
  const { data, error, isLoading, mutate } = useSWR("all-packages", getAllPackages);
  return {
    packages: data,
    loading: isLoading,
    error,
    mutate,
  };
} 