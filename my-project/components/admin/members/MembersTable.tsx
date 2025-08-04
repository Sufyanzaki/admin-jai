"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Edit, Eye, MoreVertical, Trash, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import { Member } from "@/app/(dashboard)/members/_types/member";
import Preloader from "../ui/Preloader";

interface MembersTableProps {
  members: Member[];
  isLoading: boolean;
  checkedAll: string[];
  onCheckAll: (checked: CheckedState) => void;
  onSingleCheck: (params: { checked: CheckedState; value: string }) => void;
  onDeleteClick: (val:string) => void;
  onStatusChange?: (id: string, isActive: boolean) => void;
  isItemDeleting?: (id: string) => boolean;
  isItemUpdating?: (id: string) => boolean;
}

export default function MembersTable({
  members,
  isLoading,
  checkedAll,
  onCheckAll,
  onSingleCheck,
  onDeleteClick,
  onStatusChange,
  isItemDeleting,
  isItemUpdating,
}: MembersTableProps) {
  return (
    <div className="rounded-md border">
      <Table className="whitespace-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox id="member-0" onCheckedChange={onCheckAll} />
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex items-center flex-col justify-center h-64">
                  <Preloader />
                  <p className="text-muted-foreground">Loading members...</p>
                </div>
              </TableCell>
            </TableRow>
          ) : members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No members found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Checkbox
                    id={`member-${member.id}`}
                    checked={checkedAll.includes(member.id.toString())}
                    onCheckedChange={(checked) => onSingleCheck({ checked, value: member.id.toString() })}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.image || "/user-2.png"} alt={`${member.firstName} ${member.lastName}`} />
                      <AvatarFallback>{member.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.firstName} {member.lastName}</p>
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
                      member.isPremium
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-blue-100 text-blue-800 border-blue-200"
                    }
                  >
                    {member.isPremium ? "Premium Member" : "Free Member"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={member.isActive ? "default" : "secondary"}
                    className={
                      member.isActive
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >
                    {member.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {(isItemDeleting && isItemDeleting(member.id)) || (isItemUpdating && isItemUpdating(member.id)) ? (
                      <div className="flex justify-end"><Preloader size="sm" /></div>
                  ) : (
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
                          <DropdownMenuItem onClick={() => onStatusChange && onStatusChange(member.id, !member.isActive)}>
                            {member.isActive ? (
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
                          <DropdownMenuItem onClick={()=>onDeleteClick(member.id)} className="text-red-500">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
