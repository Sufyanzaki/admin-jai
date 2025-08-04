import { useState } from "react";
import { patchPackage, PatchPackagePayload } from "../_api/patchPackage";
import { mutate as globalMutate } from "swr";
import type { Package } from "../_api/getAllPackages";

export function usePatchPackage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (id: number | string, isActive: boolean) => {
    setLoading(true);
    setError(null);
    try {
      await patchPackage({ id, isActive });
      // Update the cache for this package in all-packages and the specific package
      globalMutate("all-packages", (current: Package[] = []) =>
        current.map(pkg =>
          pkg.id === id
            ? { ...pkg, isActive }
            : pkg
        ), false
      );
      globalMutate(`package-${id}`, (current: Package | undefined) =>
        current ? { ...current, isActive } : current, false
      );
    } catch (err: any) {
      setError(err?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
} 