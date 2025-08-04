"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  useSidebar,
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
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LocationSearchInput from "@/components/client/location-search";

export default function SidebarData() {
  const { open } = useSidebar();
  const router = useRouter();
  const [showAdvancedIcons, setShowAdvancedIcons] = useState(false);

  return (
    <SidebarContent className={open ? "px-6" : "px-3"}>
      <SidebarGroup className="p-0">
        <SidebarGroupLabel className="text-white/80 text-xs mb-3 group-data-[collapsible=icon]:hidden">
          Quick Search
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-4">
          <div className="relative group-data-[collapsible=icon]:hidden">
            <Input
              placeholder="Quick Search"
              className="bg-white border-white/20 text-black placeholder:text-gray-500 h-12 text-sm pl-4 pr-12 rounded-[5px]"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-[5px] hover:bg-transparent"
            >
              <Search className="w-4 h-4 text-gray-500" />
            </Button>
          </div>

          <div className="space-y-4 group-data-[collapsible=icon]:hidden">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
              <Select>
                <SelectTrigger className="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white">
                  <SelectValue placeholder="Am Looking for" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="man">Man</SelectItem>
                  <SelectItem value="woman">Woman</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <HeartHandshake className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
              <Select>
                <SelectTrigger className="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white">
                  <SelectValue placeholder="Relation Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">All</SelectItem>
                  <SelectItem value="single">Single - never married</SelectItem>
                  <SelectItem value="widow">Single - widowed</SelectItem>
                  <SelectItem value="married">
                    Married - open marriage
                  </SelectItem>
                  <SelectItem value="divorced">Single - divorced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" /> */}
            <div className="flex items-center justify-center w-full bg-white border-white/20  pl-4 h-12 rounded-[5px]">
              {" "}
              <MapPin className="w-5 h-5 text-gray-500 z-10" />
              <LocationSearchInput
                onSelect={(location) => {
                  console.log("Selected location:", location);
                }}
                className="text-black placeholder:text-gray-500 w-full"
                placeholder={"Enter Location"}
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <div className="flex bg-white rounded-[5px] border border-white/20">
                <Input
                  type="number"
                  placeholder="From Age"
                  className="border-0 text-black placeholder:text-gray-500 h-12 text-sm pl-12 rounded-r-none rounded-l-[5px]"
                />
                <div className="w-px bg-gray-200"></div>
                <Input
                  type="number"
                  placeholder="To Age"
                  className="border-0 text-black placeholder:text-gray-500 h-12 text-sm pl-4 rounded-l-none rounded-r-[5px]"
                />
              </div>
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
              onClick={() => setShowAdvancedIcons((prev) => !prev)}
              className="text-white cursor-pointer p-0 rounded-[5px] bg-white"
              size="md"
            >
              <Filter className="block mx-auto text-gray-700" />
            </SidebarMenuButton>

            {showAdvancedIcons && (
              <>
                <SidebarMenuButton
                  className="text-white cursor-pointer p-0 rounded-[5px] bg-white"
                  size="md"
                >
                  <BookOpen className="block mx-auto text-gray-700" />
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
                  <BookOpen className="block mx-auto text-gray-700" />
                </SidebarMenuButton>
              </>
            )}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

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
            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
            <Select>
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

          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
            <Select>
              <SelectTrigger className="bg-white border-white/20 text-black h-12 text-sm rounded-[5px] pl-12 hover:bg-white">
                <SelectValue placeholder="Children" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">All</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="4+">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
            <Select>
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
        </CollapsibleContent>
      </Collapsible>
      <Button
        variant="dashboard"
        size="dashboard"
        className="w-full mt-1 group-data-[collapsible=icon]:hidden"
        onClick={() => router.push("/dashboard/search")}
      >
        <span>Search</span>
      </Button>
    </SidebarContent>
  );
}
