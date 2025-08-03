"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Filter, Search } from "lucide-react";

interface MembersFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  bulkSelectValue: string;
  onBulkSelectChange: (value: string) => void;
  isFilterOpen: boolean;
  onFilterOpenChange: (open: boolean) => void;
  selectedMemberships: string[];
  selectedStatuses: string[];
  selectedGender: string[];
  onToggleMembership: (membership: string) => void;
  onToggleStatus: (status: string) => void;
  onToggleGender: (gender: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  membershipOptions: string[];
  statuses: string[];
  genderOptions: string[];
  activeFilters: number;
}

export default function MembersFilters({
  searchQuery,
  onSearchChange,
  bulkSelectValue,
  onBulkSelectChange,
  isFilterOpen,
  onFilterOpenChange,
  selectedMemberships,
  selectedStatuses,
  selectedGender,
  onToggleMembership,
  onToggleStatus,
  onToggleGender,
  onClearFilters,
  onApplyFilters,
  membershipOptions,
  statuses,
  genderOptions,
  activeFilters,
}: MembersFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Select value={bulkSelectValue} onValueChange={onBulkSelectChange}>
        <SelectTrigger className="w-full sm:w-fit md:w-[250px]">
          <SelectValue placeholder="Bulk Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Members</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search members..."
          className="pl-8 w-full sm:w-fit md:w-[250px]"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Popover open={isFilterOpen} onOpenChange={onFilterOpenChange}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className={activeFilters > 0 ? "relative bg-primary/10" : ""}>
            <Filter className="h-4 w-4" />
            {activeFilters > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-md bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {activeFilters}
              </span>
            )}
            <span className="sr-only">Filter</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="end">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-auto p-0 text-muted-foreground">
                Reset
              </Button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Membership</h5>
              <div className="grid grid-cols-1 gap-2">
                {membershipOptions.map((memberShip) => (
                  <div key={memberShip} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`specialty-${memberShip}`} 
                      checked={selectedMemberships.includes(memberShip)} 
                      onCheckedChange={() => onToggleMembership(memberShip)} 
                    />
                    <Label htmlFor={`specialty-${memberShip}`} className="text-sm font-normal">
                      {memberShip}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Status</h5>
              <div className="grid grid-cols-1 gap-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`status-${status}`} 
                      checked={selectedStatuses.includes(status)} 
                      onCheckedChange={() => onToggleStatus(status)} 
                    />
                    <Label htmlFor={`status-${status}`} className="text-sm font-normal">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Gender</h5>
              <Select 
                value={selectedGender.length === 1 ? selectedGender[0] : ""} 
                onValueChange={(value) => onToggleGender(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border-t">
            <Button variant="outline" size="sm" onClick={() => onFilterOpenChange(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={onApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 
