"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import LocationSearchInput from "@/components/location-search";
import useLivingLocationForm from "../add/_hooks/useLivingLocationForm";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { getUserTrackingId } from "@/lib/access-token";
import { AlertTriangle } from "lucide-react";

export default function LivingTab({callback}: { callback: () => void}) {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const userId = tracker?.id ?? id;

  const {
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    setValue,
    watch,
  } = useLivingLocationForm();

  const city = watch("city");
  const state = watch("state");
  const country = watch("country");

  const currentLocation = city || state || country ? { city, state, country } : null;

  const handleLocationSelect = (location: { city?: string; state?: string; country?: string }) => {
    setValue("city", location.city);
    setValue("state", location.state);
    setValue("country", location.country);
  };

  return (
      <TabsContent value="living" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Where are you located?
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit((values) => onSubmit(values, callback))}>
            {!userId && (
                <div className="border border-amber-200 bg-amber-50 rounded-sm p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <div className="text-amber-700 text-sm">
                      You need to initialize a new member profile before you can add other details.
                      Go back to basic Information to initialize a member
                    </div>
                  </div>
                </div>
            )}
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <LocationSearchInput
                    value={currentLocation}
                    onSelect={handleLocationSelect}
                    placeholder="Search for your city, state, or country"
                />
                {(errors.city || errors.state || errors.country) && (
                    <div className="space-y-1">
                      {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                      {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                      {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
                    </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading || !userId}>
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </TabsContent>
  );
}