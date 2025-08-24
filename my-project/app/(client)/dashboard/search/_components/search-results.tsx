"use client";

import { Button } from "@/components/client/ux/button";
import { Label } from "@/components/client/ux/label";
import { Switch } from "@/components/client/ux/switch";
import { Grid3X3, List } from "lucide-react";
import {useEffect, useState } from "react";
import ProfileCard from "../../_components/profile-card";
import ListCard from "@/app/(client)/dashboard/_components/list-card";
import { useSearchParams } from "next/navigation";
import { paramsToSearchForm } from "../../_api/getSearch";
import { useSearch } from "../../_hooks/useSearch";
import PaginationSection from "@/app/(client)/dashboard/_components/pagination";
import { useTranslation } from "react-i18next";

export function SearchResults() {
  const { t } = useTranslation();
  const [online, setOnline] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const searchParams = useSearchParams();
  const formValues = paramsToSearchForm(searchParams);

  const { data, error, isLoading, mutate } = useSearch(formValues)

  useEffect(() => {
    if (formValues) {
      mutate().finally();
    }
  }, [searchParams.toString(), mutate]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return (
    <p>{t("Error Searching...")}</p>
  );

  if (!data) return <p>{t("No data found")}</p>

  const filteredResults = online ? data.data.results.filter(profile => profile?.isOnline) : data.data.results;

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <header className="bg-white px-6 pt-6 pb-4">
          <h1 className="text-[22px] sm:text-2xl lg:text-3xl xl:text-[36px] font-semibold">
            {t("Search Profiles")}
          </h1>
        </header>

        <main className="flex-1 px-6 py-8 space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Switch
                checked={online}
                onCheckedChange={setOnline}
                className="data-[state=checked]:bg-app-blue"
              />
              <Label className="text-sm mb-1">{t("Online")}</Label>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "theme" : "outline"}
                size="sm"
                className={`h-8 w-8 p-0`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "theme" : "outline"}
                size="sm"
                className={`h-8 w-8 p-0`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mb-8">
              {filteredResults.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {filteredResults.map((profile) => (
                <ListCard key={profile.id} profile={profile} />
              ))}
            </div>
          )}
          <PaginationSection
            pagination={{
              page: data.data.page,
              limit: data.data.limit,
              total: data.data.total,
              totalPages: data.data.totalPages,
            }}
            onPageChange={(newPage) => {
              console.log("Go to page:", newPage);
            }}
          />
        </main>
      </div>
    </div>
  );
}
