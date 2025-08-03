"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PaginationSection from "@/components/Pagination";
import { CheckedState } from "@radix-ui/react-checkbox";
import useAllMembers from "./_hooks/useAllMembers";
import { useDebounce } from "@/hooks/useDebounce";

// Import new components
import MembersTable from "@/components/members/MembersTable";
import MembersGrid from "@/components/members/MembersGrid";
import MembersFilters from "@/components/members/MembersFilters";
import MembersOverview from "@/components/members/MembersOverview";
import DeleteMemberDialog from "@/components/members/DeleteMemberDialog";
import {useDeleteMember} from "@/app/(dashboard)/members/_hooks/useDeleteMember";
import {useUpdateMemberStatus} from "@/app/(dashboard)/members/_hooks/useUpdateMemberStatus";

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState({key: '', value:false});
  const [selectedMemberships, setSelectedMemberships] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [checkedAll, setCheckedAll] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(20);
  const [bulkSelectValue, setBulkSelectValue] = useState<string>("");

  // Use custom debounce hook
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const params = {
    page: currentPage,
    limit,
    search: debouncedSearchQuery || undefined,
    status: selectedStatuses.length === 1 ? selectedStatuses[0].toLowerCase() : undefined,
    gender: selectedGender.length === 1 ? selectedGender[0] : undefined,
    isPremium: selectedMemberships.length === 1 
      ? (selectedMemberships[0] === "Premium" ? true : false) 
      : undefined,
  };

  const { data: membersData, error, isLoading } = useAllMembers(params);
  const { deleteMemberById, isItemDeleting } = useDeleteMember();
  const { updateMemberStatus, isItemUpdating } = useUpdateMemberStatus();

  const members = membersData?.users || [];
  const stats = membersData?.stats;

  const statuses = ["Active", "Inactive"];
  const membershipOptions = ["Premium", "Freemember"];
  const genderOptions = ["Male", "Female", "Other"];
  const activeFilters = selectedMemberships.length + selectedStatuses.length + selectedGender.length;

  const handleBulkSelectChange = (value: string) => {
    setBulkSelectValue(value);
    if (value === "active") {
      setSelectedStatuses(["Active"]);
    } else if (value === "inactive") {
      setSelectedStatuses(["Inactive"]);
    } else {
      setSelectedStatuses([]);
    }
    setCurrentPage(1);
  };

  // Toggle membership filter
  const toggleMembership = (membership: string) => {
    setSelectedMemberships((prev) =>
      prev.includes(membership) ? prev.filter((m) => m !== membership) : [...prev, membership]
    );
  };

  // Toggle status filter
  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const toggleGender = (gender: string) => {
    setSelectedGender(gender ? [gender] : []);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedMemberships([]);
    setSelectedStatuses([]);
    setSelectedGender([]);
    setSearchQuery("");
    setCurrentPage(1);
    setBulkSelectValue("");
  };

  // Apply filters
  const applyFilters = () => {
    setIsFilterOpen(false);
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const handleCheckAll = (checked: CheckedState) => {
    if (checked) setCheckedAll(members.map((member) => member.id.toString()));
    else setCheckedAll([]);
  };

  const handleSingleCheck = ({ checked, value }: { checked: CheckedState; value: string }) => {
    if (checked) setCheckedAll(prev => [...prev, value]);
    else setCheckedAll(prev => prev.filter((id) => id !== value));
  };

  const handleDeleteConfirm = () => {
    deleteMemberById(deleteDialogOpen.key).finally(() => setDeleteDialogOpen({key: '', value:false}));
  };

  if (error) {
    return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading members</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Members Management</h2>
            <p className="text-muted-foreground">Manage staff, roles, and permissions</p>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <Button asChild className="w-full sm:w-fit">
              <Link href="/members/add">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Member
              </Link>
            </Button>
          </div>
        </div>

        <div className="md:grid max-md:space-y-6 gap-6 md:grid-cols-4">
          <Card className="md:col-span-3">
            <CardHeader className="flex flex-col lg:flex-row items-start md:items-center justify-between gap-4 flex-wrap">
              <div>
                <CardTitle>Members List</CardTitle>
              </div>
              <MembersFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                bulkSelectValue={bulkSelectValue}
                onBulkSelectChange={handleBulkSelectChange}
                isFilterOpen={isFilterOpen}
                onFilterOpenChange={setIsFilterOpen}
                selectedMemberships={selectedMemberships}
                selectedStatuses={selectedStatuses}
                selectedGender={selectedGender}
                onToggleMembership={toggleMembership}
                onToggleStatus={toggleStatus}
                onToggleGender={toggleGender}
                onClearFilters={clearFilters}
                onApplyFilters={applyFilters}
                membershipOptions={membershipOptions}
                statuses={statuses}
                genderOptions={genderOptions}
                activeFilters={activeFilters}
              />
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-2">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="mt-0">
                  <MembersTable
                    members={members}
                    isLoading={isLoading}
                    checkedAll={checkedAll}
                    onCheckAll={handleCheckAll}
                    onSingleCheck={handleSingleCheck}
                    onDeleteClick={(id) => setDeleteDialogOpen({value: true, key: id})}
                    onStatusChange={updateMemberStatus}
                    isItemDeleting={isItemDeleting}
                    isItemUpdating={isItemUpdating}
                  />
                </TabsContent>
                <TabsContent value="grid" className="mt-0">
                  <MembersGrid
                    members={members}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    totalPages={membersData?.pagination?.totalPages}
                    onPageChange={setCurrentPage}
                    onDeleteClick={(id) => setDeleteDialogOpen({value: true, key: id})}
                    onStatusChange={updateMemberStatus}
                    isItemDeleting={isItemDeleting}
                    isItemUpdating={isItemUpdating}
                  />
                </TabsContent>
              </Tabs>
              <PaginationSection
                pagination={membersData?.pagination || { total: 0, page: 1, limit: 20, totalPages: 1 }}
                onPageChange={setCurrentPage}
              />
            </CardContent>
          </Card>

          <MembersOverview
            stats={stats}
            totalMembers={members.length}
          />
        </div>
      </div>

      <DeleteMemberDialog
        open={deleteDialogOpen}
        onOpenChange={value=>setDeleteDialogOpen({...deleteDialogOpen, value: value})}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
