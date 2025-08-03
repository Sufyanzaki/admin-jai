"use client"

import { getPackageById } from "../_api/getPackageById";
import type { Package } from "../_api/getAllPackages";
import { useSWRFix } from "@/admin-utils/lib/useSwrFix";

export default function usePackageById(id: number | string | undefined) {
  const { data, error, loading, mutate } = useSWRFix<Package>({
    key: id ? `package-${id}` : '',
    fetcher: () => id ? getPackageById(id) : Promise.reject("No ID provided"),
  });
  return {
    pkg: data,
    loading,
    error,
    mutate,
  };
} 