"use client";

import { Check, X } from "lucide-react";
import { usePackages } from "@/app/shared-hooks/usePackages";

export function FeatureComparison() {
  const { packages, loading, error } = usePackages();

  if (loading) return <p>Loading features...</p>;
  if (error) return <p className="text-red-500">Failed to load features.</p>;
  if (!packages || packages.length === 0) return <p>No packages available.</p>;

  const allFeatureNames = Array.from(
      new Set(packages.flatMap((pkg) => pkg.features || []))
  );

  return (
      <div className="mb-32">
        <h4 className="text-xl font-semibold mb-6">Feature Comparison</h4>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
            <tr className="border-b border-app-border">
              <th className="text-left py-3 px-4">Features</th>
              {packages.map((pkg) => (
                  <th key={pkg.id} className="text-center py-3 px-4">
                    <div className="space-y-1">
                      <div className="font-semibold">{pkg.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ${pkg.price} / {pkg.validity} days
                      </div>
                    </div>
                  </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {allFeatureNames.map((feature) => (
                <tr key={feature} className="border-b border-app-border">
                  <td className="py-3 px-4">{feature}</td>
                  {packages.map((pkg) => (
                      <td
                          key={`${pkg.id}-${feature}`}
                          className="text-center py-3 px-4"
                      >
                        {pkg.features.includes(feature) ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                  ))}
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
