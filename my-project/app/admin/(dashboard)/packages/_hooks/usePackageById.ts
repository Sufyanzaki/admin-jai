"use client"

import { useSWRFix } from "@/shared-lib";
import {PackageDto} from "@/app/shared-types/packages";
import { getPackageById } from "@/app/shared-api/packageApi";

export default function usePackageById(id: number | string | undefined) {
  const { data, error, loading, mutate } = useSWRFix<PackageDto>({
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