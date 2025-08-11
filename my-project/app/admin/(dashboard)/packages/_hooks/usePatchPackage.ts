import { useState } from "react";
import { mutate as globalMutate } from "swr";
import {PackageDto} from "@/app/shared-types/packages";
import {patchPackage} from "@/app/shared-api/packageApi";

export function usePatchPackage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (id: string, isActive: boolean) => {
    setLoading(true);
    setError(null);
    try {
      await patchPackage({ id, isActive });
      // Update the cache for this package in all-packages and the specific package
      globalMutate("all-packages", (current: PackageDto[] = []) =>
        current.map(pkg =>
          pkg.id === id
            ? { ...pkg, isActive }
            : pkg
        ), false
      );
      globalMutate(`package-${id}`, (current: PackageDto | undefined) =>
        current ? { ...current, isActive } : current, false
      );
    } catch (err: unknown) {
      if(err instanceof Error) setError(err.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
} 