"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
  SidebarMenuButton,
} from "@/components/client/ux/sidebar";
import { Input } from "@/components/client/ux/input";
import { Button } from "@/components/client/ux/button";
import {
  BookOpen,
  Calendar,
  ChevronsUp,
  Filter,
  HeartHandshake,
  MapPin,
  Search,
  User,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/client/ux/collapsible";
import LocationSearchInput from "@/components/client/location-search";
import useSearchForm from "../_hooks/useSearchForm";
import { MemberLocation } from "@/app/shared-types/member";

export default function SidebarData() {
  const { open } = useSidebar();
  const router = useRouter();
  const [showAdvancedIcons, setShowAdvancedIcons] = useState(false);

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
    city || state || country ? { city, state, country } : null;

  const handleLocationSelect = (location: Partial<MemberLocation>) => {
    setValue("city", location.city);
    location.state && setValue("state", location.state);
    location.country && setValue("country", location.country);
  };
console.log(errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SidebarContent className={open ? "px-6" : "px-3"}>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-white/80 text-xs mb-3 group-data-[collapsible=icon]:hidden">
            Quick Search
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4">
            {/* Quick Search */}
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

            {/* Looking For */}
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <div className="relative group-data-[collapsible=icon]:hidden">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white">
                      <SelectValue placeholder="Am Looking for" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Man</SelectItem>
                      <SelectItem value="female">Woman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {/* Relation Status */}
            <Controller
              control={control}
              name="relationshipStatus"
              render={({ field }) => (
                <div className="relative group-data-[collapsible=icon]:hidden">
                  <HeartHandshake className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white">
                      <SelectValue placeholder="Relation Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">All</SelectItem>
                      <SelectItem value="single">
                        Single - never married
                      </SelectItem>
                      <SelectItem value="widow">Single - widowed</SelectItem>
                      <SelectItem value="married">
                        Married - open marriage
                      </SelectItem>
                      <SelectItem value="divorced">
                        Single - divorced
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {/* Location */}
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

            {/* Age */}
            {/* <div className="relative group-data-[collapsible=icon]:hidden">
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
            </div> */}
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
                onClick={() => setShowAdvancedIcons((prev) => !prev)}
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
            {/* Religion */}
            <Controller
              control={control}
              name="religion"
              render={({ field }) => (
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white">
                      <SelectValue placeholder="Religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">All</SelectItem>
                      <SelectItem value="buddhist">Buddhist</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="catholic">Catholic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {/* Children */}
            <Controller
              control={control}
              name="hasChildren"
              render={({ field }) => (
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white">
                      <SelectValue placeholder="Children" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">None</SelectItem>
                      <SelectItem value="true">1 or more</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {/* Education */}
            <Controller
              control={control}
              name="education"
              render={({ field }) => (
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white">
                      <SelectValue placeholder="Education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">All</SelectItem>
                      <SelectItem value="primary">Primary School</SelectItem>
                      <SelectItem value="secondary">High School</SelectItem>
                      <SelectItem value="mbo">MBO</SelectItem>
                      <SelectItem value="hbo">HBO</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Search Button */}
        <Button
          type="submit"
          variant="dashboard"
          size="dashboard"
          className="w-full mt-1 group-data-[collapsible=icon]:hidden"
        >
          <span>Search</span>
        </Button>
      </SidebarContent>
    </form>
  );
}
