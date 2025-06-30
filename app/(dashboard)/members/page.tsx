"use client"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  Ban,
  Calendar,
  Edit,
  Eye,
  Filter,
  Mail,
  MapPin,
  MoreVertical,
  Package,
  Search,
  Trash,
  User,
  UserCheck,
  UserPlus,
  Users,
  UserX
} from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Checkbox} from "@/components/ui/checkbox";
import {Separator} from "@/components/ui/separator"
import {Label} from "@/components/ui/label";
import PaginationSection from "@/components/Pagination";
import {CheckedState} from "@radix-ui/react-checkbox";


// Mock data for staff members

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
    status: "Blocked",
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
const staffMembers = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    role: "Cardiologist",
    department: "Medical",
    email: "sarah.j@clinic.com",
    phone: "555-0101",
    status: "Active",
    avatar: "/mystical-forest-spirit.png",
    joinDate: "May 15, 2012",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    initials: "MC",
    role: "Neurologist",
    department: "Medical",
    email: "michael.c@clinic.com",
    phone: "555-0102",
    status: "Active",
    avatar: "",
    joinDate: "Jun 22, 2015",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    initials: "ER",
    role: "Head Nurse",
    department: "Nursing",
    email: "emma.r@clinic.com",
    phone: "555-0103",
    status: "On Leave",
    avatar: "",
    joinDate: "Feb 10, 2018",
  },
  {
    id: "4",
    name: "Robert Davis",
    initials: "RD",
    role: "Lab Technician",
    department: "Laboratory",
    email: "robert.d@clinic.com",
    phone: "555-0104",
    status: "Active",
    avatar: "",
    joinDate: "Nov 5, 2019",
  },
  {
    id: "5",
    name: "Jennifer Kim",
    initials: "JK",
    role: "Pharmacist",
    department: "Pharmacy",
    email: "jennifer.k@clinic.com",
    phone: "555-0105",
    status: "Active",
    avatar: "",
    joinDate: "Mar 18, 2017",
  },
  {
    id: "6",
    name: "David Wilson",
    initials: "DW",
    role: "Radiologist",
    department: "Radiology",
    email: "david.w@clinic.com",
    phone: "555-0106",
    status: "Inactive",
    avatar: "",
    joinDate: "Sep 30, 2016",
  },
  {
    id: "7",
    name: "Maria Garcia",
    initials: "MG",
    role: "Receptionist",
    department: "Administration",
    email: "maria.g@clinic.com",
    phone: "555-0107",
    status: "Active",
    avatar: "",
    joinDate: "Jan 12, 2020",
  },
  {
    id: "8",
    name: "James Brown",
    initials: "JB",
    role: "Physical Therapist",
    department: "Therapy",
    email: "james.b@clinic.com",
    phone: "555-0108",
    status: "Active",
    avatar: "",
    joinDate: "Jul 7, 2018",
  },
];

type SingleCheck = {
  checked: CheckedState;
  value: string;
}

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMemberships, setSelectedMemberships] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);

  const [checkedAll, setCheckedAll] = useState<string[]>([]);

  const statuses = [...new Set(members.map((member) => member.status))];
  const membershipOptions = [...new Set(members.map((member) => member.membership))];
  const genderOptions = [...new Set(members.map((member) => member.gender))];
  const activeFilters = selectedMemberships.length + selectedStatuses.length + selectedGender.length


  // Filter members based on search query and selected filters
  const filteredMembers = members.filter((member) => {
    // Search filter
    const matchesSearch = searchQuery === "" ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.city.toLowerCase().includes(searchQuery.toLowerCase());

    // Membership filter
    const matchesMembership = selectedMemberships.length === 0 || selectedMemberships.includes(member.membership);

    // Status filter
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(member.status);

    //gender Filter
    const matchesGender = selectedGender.length === 0 || selectedGender.includes(member.gender);
    return matchesSearch && matchesMembership && matchesStatus && matchesGender;
  })

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
    setSelectedGender((prev) =>
        prev.includes(gender) ? prev.filter((s) => s !== gender) : [...prev, gender]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedMemberships([]);
    setSelectedStatuses([]);
    setSelectedGender([]);
  };

  // Apply filters
  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  const handleCheckAll = (checked: CheckedState) => {
    if(checked) setCheckedAll(members.map((member) => member.id));
    else setCheckedAll([]);
  }

  const handleSingleCheck = ({checked, value}: SingleCheck)=>{
    if(checked) setCheckedAll(prev => [...prev, value]);
    else setCheckedAll(prev => prev.filter((id) => id !== value));
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
                <div className="flex flex-wrap gap-2">
                  <Select>
                    <SelectTrigger className="w-full sm:w-fit md:w-[250px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Bulk Select</SelectItem>
                      <SelectItem value="medical">Active</SelectItem>
                      <SelectItem value="nursing">Inactive</SelectItem>
                      <SelectItem value="admin">Blocked</SelectItem>
                      <SelectItem value="lab">Unblocked</SelectItem>
                      <SelectItem value="pharmacy">Delete</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search members..."
                        className="pl-8 w-full sm:w-fit md:w-[250px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
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
                          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto p-0 text-muted-foreground">
                            Reset
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Specialty</h5>
                          <div className="grid grid-cols-1 gap-2">
                            {membershipOptions.map((memberShip) => (
                                <div key={memberShip} className="flex items-center space-x-2">
                                  <Checkbox id={`specialty-${memberShip}`} checked={selectedMemberships.includes(memberShip)} onCheckedChange={() => toggleMembership(memberShip)} />
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
                                  <Checkbox id={`status-${status}`} checked={selectedStatuses.includes(status)} onCheckedChange={() => toggleStatus(status)} />
                                  <Label htmlFor={`status-${status}`} className="text-sm font-normal">
                                    {status}
                                  </Label>
                                </div>
                            ))}
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Experience</h5>
                          <div className="grid grid-cols-1 gap-2">
                            {genderOptions.map((gender) => (
                                <div key={gender} className="flex items-center space-x-2">
                                  <Checkbox id={`experience-${gender}`} checked={selectedGender.includes(gender)} onCheckedChange={() => toggleGender(gender)} />
                                  <Label htmlFor={`experience-${gender}`} className="text-sm font-normal">
                                    {gender}
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
                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-2">
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list" className="mt-0">
                    <div className="rounded-md border">
                      <Table className="whitespace-nowrap">
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              <Checkbox id={`member-0`} onCheckedChange={handleCheckAll} />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Membership</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="whitespace-nowrap">
                          {filteredMembers.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={9} className="h-24 text-center">
                                  No members found matching your filters.
                                </TableCell>
                              </TableRow>
                          ) : (
                              filteredMembers.map((member) => (
                                  <TableRow key={member.id}>
                                    <TableCell>
                                      <Checkbox id={`member-${member.id}`} checked={checkedAll.includes(member.id)} onCheckedChange={checked => handleSingleCheck({checked, value:member.id})} />
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                          <AvatarImage src={member.image || "/user-2.png"} alt={member.name} />
                                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="font-medium">{member.name}</p>
                                          <p className="text-xs text-muted-foreground">{member.email}</p>
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
                                          className={
                                            member.status === "Active"
                                                ? "bg-green-500 text-white"
                                                : member.status === "Inactive"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-yellow-500 text-white"
                                          }
                                      >
                                        {member.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                            <span className="sr-only">Actions</span>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem asChild>
                                            <Link href={`/members/${member.id}`} className="flex items-center gap-2">
                                              <Eye className="h-4 w-4" />
                                              View Profile
                                            </Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem asChild>
                                            <Link href={`/members/${member.id}/edit`} className="flex items-center gap-2">
                                              <Edit className="h-4 w-4" />
                                              Edit Profile
                                            </Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem>
                                            {member.status === "Active" ? (
                                                <>
                                                  <UserX className="mr-2 h-4 w-4" />
                                                  Deactivate
                                                </>
                                            ) : (
                                                <>
                                                  <UserCheck className="mr-2 h-4 w-4" />
                                                  Activate
                                                </>
                                            )}
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                              onClick={() => setDeleteDialogOpen(true)}
                                              className="text-red-500"
                                          >
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TableCell>
                                  </TableRow>
                              ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    <PaginationSection />
                  </TabsContent>
                  <TabsContent value="grid" className="mt-0">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredMembers.map((staff) => (
                          <Card key={staff.id} className="overflow-hidden">
                            <CardContent className="!p-0">
                              <div className="flex flex-col">
                                <div className="flex items-center justify-between bg-muted p-2 lg:p-4">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage src={staff.image || "/user-2.png"} alt={staff.name} />
                                      <AvatarFallback>{staff.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{staff.name}</div>
                                      <div className="text-xs text-muted-foreground">{staff.membership}</div>
                                    </div>
                                  </div>
                                  <Badge variant={
                                    staff.status === "Active" ? "success" :
                                        staff.status === "On Leave" ? "warning" :
                                            "secondary"
                                  }>
                                    {staff.status}
                                  </Badge>
                                </div>

                                <div className="p-4">
                                  <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">Joined {staff.joinDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">{staff.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <User className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">{staff.gender}, {staff.age} years</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">{staff.city}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Package className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">Plan: {staff.plan || "N/A"}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex border-t">
                                  <Button asChild variant="ghost" className="flex-1 rounded-none rounded-bl-md py-2 justify-center">
                                    <Link href={`/members/${staff.id}`}>
                                      <Eye className="h-4 w-4" />
                                    </Link>
                                  </Button>

                                  <Button asChild variant="ghost" className="flex-1 rounded-none border-l py-2 justify-center">
                                    <Link href={`/members/${staff.id}/edit`}>
                                      <Edit className="h-4 w-4" />
                                    </Link>
                                  </Button>

                                  <Button variant="ghost" className="flex-1 rounded-none border-l py-2 justify-center">
                                    <Ban className="h-4 w-4 text-yellow-600" />
                                  </Button>

                                  <Button variant="ghost" className="flex-1 rounded-none rounded-br-md border-l py-2 justify-center">
                                    <Trash className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                      ))}

                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Showing <strong>1-8</strong> of <strong>63</strong> staff members
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled>
                          Previous
                        </Button>
                        <Button variant="outline" size="sm">
                          Next
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader className="pb-2 flex !flex-row items-center justify-between">
                  <CardTitle className="text-base">Overview</CardTitle>
                  <Users className="size-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold">{members.length}</span>
                      <span className="text-xs text-muted-foreground">Total Members</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Active</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {members.filter(m => m.status === "Active").length}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
            {Math.round((members.filter(m => m.status === "Active").length / members.length) * 100)}%
          </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Inactive</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {members.filter(m => m.status === "Inactive").length}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
            {Math.round((members.filter(m => m.status === "Inactive").length / members.length) * 100)}%
          </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Blocked</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {members.filter(m => m.status === "Blocked").length}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
            {Math.round((members.filter(m => m.status === "Blocked").length / members.length) * 100)}%
          </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>VIP Members</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {members.filter(m => m.membership === "VIP Member").length}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
            {Math.round((members.filter(m => m.membership === "VIP Member").length / members.length) * 100)}%
          </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href="/members/add">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add New Member
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to Delete this staff member?</AlertDialogTitle>
              <AlertDialogDescription>This action will permanently delete the staff member's record from the system. This action cannot be undone and will remove all associated data including schedules, permissions and attendance records.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setDeleteDialogOpen(false)} className="bg-red-500 text-neutral-50 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
  );
}