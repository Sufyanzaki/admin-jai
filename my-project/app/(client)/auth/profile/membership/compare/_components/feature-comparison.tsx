"use client";

import { Check, X } from "lucide-react";

export function FeatureComparison() {
  const features = [
    {
      name: "Profile Creation",
      free: true,
      silver: true,
      gold: true,
    },
    {
      name: "Basic Matching",
      free: true,
      silver: true,
      gold: true,
    },
    {
      name: "Send Messages",
      free: false,
      silver: true,
      gold: true,
    },
    {
      name: "Advanced Filters",
      free: false,
      silver: true,
      gold: true,
    },
    {
      name: "See Who Liked You",
      free: false,
      silver: false,
      gold: true,
    },
    {
      name: "Profile Boost",
      free: false,
      silver: false,
      gold: true,
    },
    {
      name: "Video Calls",
      free: false,
      silver: false,
      gold: true,
    },
    {
      name: "Priority Support",
      free: false,
      silver: true,
      gold: true,
    },
    {
      name: "Read Receipts",
      free: false,
      silver: true,
      gold: true,
    },
    {
      name: "Unlimited Likes",
      free: false,
      silver: true,
      gold: true,
    },
  ];

  return (
    <div className="mb-32">
      <h4 className="text-xl font-semibold mb-6">Feature Comparison</h4>
      <>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-app-border">
                <th className="text-left py-3 px-4">Features</th>
                <th className="text-center py-3 px-4">
                  <div className="space-y-1">
                    <div className="font-semibold">Free</div>
                    <div className="text-sm text-gray-500">24 Hours</div>
                  </div>
                </th>
                <th className="text-center py-3 px-4">
                  <div className="space-y-1">
                    <div className="font-semibold">Silver</div>
                    <div className="text-sm text-gray-500">1 Month</div>
                  </div>
                </th>
                <th className="text-center py-3 px-4">
                  <div className="space-y-1">
                    <div className="font-semibold">Gold</div>
                    <div className="text-sm text-gray-500">6 Months</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b border-app-border">
                  <td className="py-3 px-4 font-medium text-sm lg:text-lg">
                    {feature.name}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {feature.free ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {feature.silver ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {feature.gold ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
}
