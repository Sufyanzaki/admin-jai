"use client";

import React from "react";
import {Controller} from "react-hook-form";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  useSidebar,
} from "@/components/client/ux/sidebar";
import {Input} from "@/components/client/ux/input";
import {Button} from "@/components/client/ux/button";
import {
  Baby,
  Calendar,
  ChevronsUp,
  Church,
  Filter,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Search,
  User,
  Users,
} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/client/ux/collapsible";
import LocationSearchInput from "@/components/client/location-search";
import useSearchForm from "../_hooks/useSearchForm";
import {MemberLocation} from "@/app/shared-types/member";
import {AttributeSelect} from "@/app/(client)/dashboard/_components/attribute-select";
import {useProfile} from "@/app/shared-hooks/useProfile";

export default function SidebarData() {
  const { open } = useSidebar();

  const { user } = useProfile();

  const {
    errors,
    onSubmit,
    handleSubmit,
    control,
    setValue,
    watch,
    register,
  } = useSearchForm();

  const city = watch("city");
  const state = watch("state");
  const country = watch("country");

  const currentLocation =
      city || state || country
          ? {
            city: city ?? "",
            state: state ?? "",
            country: country ?? "",
          }
          : null;

  const handleLocationSelect = (location: Partial<MemberLocation>) => {
    setValue("city", location.city);
    location.state && setValue("state", location.state);
    location.country && setValue("country", location.country);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SidebarContent className={open ? "px-6" : "px-3"}>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-white/80 text-xs mb-3 group-data-[collapsible=icon]:hidden">
            Quick Search
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4">
            <div className="relative group-data-[collapsible=icon]:hidden">
              <Input
                placeholder="Quick Search"
                {...register("quickSearch")}
                className="bg-white border-white/20 text-black placeholder:text-gray-500 h-12 text-sm pl-4 pr-12 rounded-[5px]"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-[5px] hover:bg-transparent"
              >
                <Search className="w-4 h-4 text-gray-500" />
              </Button>
            </div>

            <div className="relative group-data-[collapsible=icon]:hidden">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
              <Controller
                  name="amLookingFor"
                  control={control}
                  render={({ field }) => (
                      <AttributeSelect
                          triggerClasses="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white"
                          attributeKey="amLookingFor"
                          value={field.value || undefined}
                          onChange={field.onChange}
                          placeholder="Am Looking for"
                      />
                  )}
              />
            </div>

            <div className="relative group-data-[collapsible=icon]:hidden">
              <HeartHandshake className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
              <Controller
                  name="relationshipStatus"
                  control={control}
                  render={({ field }) => (
                      <AttributeSelect
                          attributeKey="relationStatus"
                          value={field.value || undefined}
                          onChange={field.onChange}
                          placeholder="Relation Status"
                          triggerClasses="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white"
                      />
                  )}
              />
            </div>

            <div className="space-y-2 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-center w-full bg-white border-white/20 pl-4 h-12 rounded-[5px] group-data-[collapsible=icon]:hidden">
                <MapPin className="w-5 h-5 text-gray-500 z-10" />
                <LocationSearchInput
                  value={currentLocation}
                  onSelect={handleLocationSelect}
                  className="text-black placeholder:text-gray-500 w-full"
                  placeholder="Enter Location"
                />
              </div>
              {(errors.state || errors.country) && <p className="text-sm text-red-500">Invalid Address</p>}

            </div>

            <div className="relative group-data-[collapsible=icon]:hidden">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <div className="flex bg-white rounded-[5px] border border-white/20">
                <Input
                  type="number"
                  placeholder="From Age"
                  {...register("ageFrom")}
                  className="border-0 text-black placeholder:text-gray-500 h-12 text-sm pl-12 rounded-r-none rounded-l-[5px]"
                />
                <div className="w-px bg-gray-200"></div>
                <Input
                  type="number"
                  placeholder="To Age"
                  {...register("ageTo")}
                  className="border-0 text-black placeholder:text-gray-500 h-12 text-sm pl-4 rounded-l-none rounded-r-[5px]"
                />
              </div>
            </div>
            <div className="hidden group-data-[collapsible=icon]:flex flex-col gap-2 items-center">
              <SidebarMenuButton
                className="text-white cursor-pointer p-0 rounded-[5px] bg-white"
                size="md"
              >
                <Search className="block mx-auto text-gray-700" />
              </SidebarMenuButton>
              <SidebarMenuButton
                className="text-white cursor-pointer p-0 rounded-[5px] bg-white"
                size="md"
              >
                <MapPin className="block mx-auto text-gray-700" />
              </SidebarMenuButton>
              <SidebarMenuButton
                className="text-white cursor-pointer p-0 rounded-[5px] bg-white"
                size="md"
              >
                <Users className="block mx-auto text-gray-700" />
              </SidebarMenuButton>
              <SidebarMenuButton
                className="text-white cursor-pointer p-0 rounded-[5px] bg-white"
                size="md"
              >
                <Calendar className="block mx-auto text-gray-700" />
              </SidebarMenuButton>

              <SidebarMenuButton
                className="text-white cursor-pointer p-0 rounded-[5px] bg-white"
                size="md"
              >
                <Filter className="block mx-auto text-gray-700" />
              </SidebarMenuButton>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Advanced Filters */}
        <Collapsible className="mt-6">
          <CollapsibleTrigger asChild>
            <Button
              variant="dashboard"
              size="dashboard"
              className="group-data-[collapsible=icon]:hidden w-full justify-between"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Advanced Search</span>
              </div>
              <ChevronsUp className="w-4 h-4" />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 mt-4 group-data-[collapsible=icon]:hidden">
            <div className="relative">
              <Church className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
              <Controller
                  name="religion"
                  control={control}
                  render={({ field }) => (
                      <AttributeSelect
                          attributeKey="religion"
                          value={field.value || undefined}
                          onChange={field.onChange}
                          placeholder="Select Religion"
                          triggerClasses="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white"
                      />
                  )}
              />
            </div>

            <div className="relative">
              <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
              <Controller
                  name="hasChildren"
                  control={control}
                  render={({ field }) => (
                      <AttributeSelect
                          attributeKey="children"
                          value={field.value || undefined}
                          onChange={field.onChange}
                          placeholder="Select Children"
                          triggerClasses="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white"
                      />
                  )}
              />
            </div>

            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
              <Controller
                  name="education"
                  control={control}
                  render={({ field }) => (
                      <AttributeSelect
                          attributeKey="education"
                          value={field.value || undefined}
                          onChange={field.onChange}
                          placeholder="Select Education"
                          triggerClasses="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white"
                      />
                  )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button
          type="submit"
          variant="dashboard"
          size="dashboard"
          disabled={user?.route !== "/auth/profile/partner-preferences"}
          className="w-full mt-1 group-data-[collapsible=icon]:hidden"
        >
          <span>Search</span>
        </Button>
      </SidebarContent>
    </form>
  );
}
