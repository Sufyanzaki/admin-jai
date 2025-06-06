"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter, MoreHorizontal, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const members = [
  {
    id: "M206",
    name: "Amaad",
    image: "/user-3.png",
    gender: "Man",
    age: 31,
    email: "amaadkareem365@gmail.com",
    city: "'s-Heerenberg",
    plan: "-",
    joinDate: "30-05-2025",
    membership: "Free Member",
    status: "Active",
  },
  {
    id: "M205",
    name: "Asad",
    image: "/user-3.png",
    gender: "Man",
    age: null,
    email: "kareembakhs112244@gmail.com",
    city: "-",
    plan: "-",
    joinDate: "30-05-2025",
    membership: "Free Member",
    status: "Inactive",
  },
  {
    id: "M36",
    name: "shahzaib7890",
    image: "/user-3.png",
    gender: "Man",
    age: 74,
    email: "ahmed.shsssasaxb@gmail.com",
    city: "Roelofarendsveen",
    plan: "-",
    joinDate: "15-05-2025",
    membership: "Free Member",
    status: "Active",
  },
  {
    id: "M35",
    name: "c23d23",
    image: "/user-3.png",
    gender: "Vrouw",
    age: 72,
    email: "talhakhalid62332338@gmail.com",
    city: "Totness",
    plan: "-",
    joinDate: "08-05-2025",
    membership: "Free Member",
    status: "Active",
  },
  {
    id: "M34",
    name: "ahmadshahzaib2287",
    image: "/user-3.png",
    gender: "Man",
    age: 74,
    email: "ahmed.shaasashzaib.2287@gmail.com",
    city: "Abbekerk",
    plan: "-",
    joinDate: "06-05-2025",
    membership: "Free Member",
    status: "Active",
  },
  {
    id: "M33",
    name: "jan",
    image: "/user-3.png",
    gender: "Vrouw",
    age: 25,
    email: "ik@ik.me",
    city: "Baflo",
    plan: "-",
    joinDate: "06-05-2025",
    membership: "Free Member",
    status: "Inactive",
  },
  {
    id: "M32",
    name: "shahzaib789",
    image: "/user-3.png",
    gender: "Man",
    age: 72,
    email: "shassasaahzaib@gmail.com",
    city: "Islamabad",
    plan: "-",
    joinDate: "06-05-2025",
    membership: "Free Member",
    status: "Active",
  },
  {
    id: "M31",
    name: "raj",
    image: "/user-3.png",
    gender: "Man",
    age: 47,
    email: "loes.aziem@hotmail.com",
    city: "'s-Gravenland",
    plan: "Vip",
    joinDate: "25-04-2025",
    membership: "VIP Member",
    status: "Active",
  },
  {
    id: "M30",
    name: "dvdsvsa",
    image: "/user-3.png",
    gender: "Man",
    age: 72,
    email: "ik@ikas.nl",
    city: "'t Zand",
    plan: "-",
    joinDate: "21-04-2025",
    membership: "Free Member",
    status: "Active",
  },
  {
    id: "M29",
    name: "aimen3892",
    image: "/user-3.png",
    gender: "Vrouw",
    age: 37,
    email: "Aimen329@gmail.com",
    city: "Islamabad",
    plan: "Vip",
    joinDate: "07-04-2025",
    membership: "VIP Member",
    status: "Active",
  },

];


// Extract unique memberships and statuses for filters
const memberships = [...new Set(members.map((member) => member.membership))];
const statuses = [...new Set(members.map((member) => member.status))];
const ageRanges = ["18-25", "26-35", "36-45", "46+"];

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemberships, setSelectedMemberships] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const activeFilters = selectedMemberships.length + selectedStatuses.length + selectedAgeRanges.length;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Filter members based on search query and selected filters
  const filteredMembers = members.filter((member) => {
    // Search filter
    const matchesSearch = searchQuery === "" ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.city.toLowerCase().includes(searchQuery.toLowerCase());

    // Membership filter
    const matchesMembership = selectedMemberships.length === 0 ||
        selectedMemberships.includes(member.membership);

    // Status filter
    const matchesStatus = selectedStatuses.length === 0 ||
        selectedStatuses.includes(member.status);

    // Age filter
    const matchesAge =
        selectedAgeRanges.length === 0 ||
        (member.age !== null && (
            (selectedAgeRanges.includes("18-25") && member.age >= 18 && member.age <= 25) ||
            (selectedAgeRanges.includes("26-35") && member.age >= 26 && member.age <= 35) ||
            (selectedAgeRanges.includes("36-45") && member.age >= 36 && member.age <= 45) ||
            (selectedAgeRanges.includes("46+") && member.age >= 46)
        ));

    return matchesSearch && matchesMembership && matchesStatus && matchesAge;
  });

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

  // Toggle age filter
  const toggleAgeRange = (range: string) => {
    setSelectedAgeRanges((prev) =>
        prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedMemberships([]);
    setSelectedStatuses([]);
    setSelectedAgeRanges([]);
  };

  // Apply filters
  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  return (
      <>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Members View</h2>
              <p className="text-muted-foreground">Manage your users and their information.</p>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <CardTitle>Members List</CardTitle>
                <CardDescription>A list of all members in your app with their details.</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="Search members..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className={activeFilters > 0 ? "relative bg-primary/10" : ""}>
                      <Filter className="h-4 w-4" />
                      {activeFilters > 0 && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
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
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto p-0 text-muted-foreground">
                          Reset
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Status</h5>
                        <div className="grid grid-cols-1 gap-2">
                          {statuses.map((status) => (
                              <div key={status} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`status-${status}`}
                                    checked={selectedStatuses.includes(status)}
                                    onCheckedChange={() => toggleStatus(status)}
                                />
                                <Label htmlFor={`status-${status}`} className="text-sm font-normal">
                                  {status}
                                </Label>
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border-t">
                      <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={applyFilters}>
                        Apply Filters
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent>
              {activeFilters > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {selectedMemberships.map((membership) => (
                        <Badge key={`badge-membership-${membership}`} variant="outline" className="flex items-center gap-1">
                          {membership}
                          <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => toggleMembership(membership)}
                          />
                        </Badge>
                    ))}
                    {selectedStatuses.map((status) => (
                        <Badge key={`badge-status-${status}`} variant="outline" className="flex items-center gap-1">
                          {status}
                          <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => toggleStatus(status)}
                          />
                        </Badge>
                    ))}
                    {selectedAgeRanges.map((range) => (
                        <Badge key={`badge-age-${range}`} variant="outline" className="flex items-center gap-1">
                          {range}
                          <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => toggleAgeRange(range)}
                          />
                        </Badge>
                    ))}
                    {activeFilters > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
                          Clear all
                        </Button>
                    )}
                  </div>
              )}
              <Table className="whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="whitespace-nowrap">
                  {filteredMembers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No members found matching your filters.
                        </TableCell>
                      </TableRow>
                  ) : (
                      filteredMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={member.image || "/user-2.png"} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{member.name}</p>
                                  <p className="text-sm text-muted-foreground">{member.email}</p> {/* ← Always shown now */}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{member.gender}</TableCell>
                            <TableCell>{member.age}</TableCell>
                            <TableCell>
                              <Badge
                                  variant="outline"
                                  className={
                                    member.membership === "VIP Member"
                                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                        : "bg-blue-100 text-blue-800 border-blue-200"
                                  }
                              >
                                {member.membership}
                              </Badge>
                            </TableCell>

                            <TableCell>
                              <Badge
                                  variant={member.status === "Active" ? "default" : "secondary"}
                                  className={member.status === "Active" ? "bg-green-500 text-neutral-700" : "bg-red-500 text-neutral-50"}
                              >
                                {member.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{member.city}</TableCell>
                            <TableCell>{member.joinDate}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/members/${member.id}`}>View profile</Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/members/${member.id}`}>Edit details</Link>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to {filteredMembers[0]?.status === "Active" ? "Deactivate" : "Activate"} this member?
              </AlertDialogTitle>
              <AlertDialogDescription>
                {filteredMembers[0]?.status === "Active"
                    ? "This action will deactivate the member and restrict their access to the platform. You can reactivate them later if needed."
                    : "This action will activate the member and grant them access to the platform."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                  onClick={() => setDeleteDialogOpen(false)}
                  className={filteredMembers[0]?.status === "Active" ? "bg-red-500 text-neutral-50 hover:bg-red-700" : "bg-green-500 text-neutral-50 hover:bg-green-700"}
              >
                {filteredMembers[0]?.status === "Active" ? "Deactivate" : "Activate"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
  );
}