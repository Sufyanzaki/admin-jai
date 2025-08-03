"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {Ban, Calendar, Edit, Eye, Mail, MapPin, Package, Trash2, User, UserCheck} from "lucide-react";
import Link from "next/link";
import { Member } from "@/app/(dashboard)/members/_types/member";
import Preloader from "../ui/Preloader";

interface MembersGridProps {
  members: Member[];
  isLoading: boolean;
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  onDeleteClick: (val:string) => void;
  onStatusChange?: (id: string, isActive: boolean) => void;
  isItemDeleting?: (id: string) => boolean;
  isItemUpdating?: (id: string) => boolean;
}

export default function MembersGrid({
  members,
  isLoading,
  onDeleteClick,
  onStatusChange,
  isItemDeleting,
  isItemUpdating
}: MembersGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center flex-col justify-center">
            <Preloader />
            <p className="text-muted-foreground">Loading members...</p>
          </div>
      </div>
    );
  }

  if (!members || members.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm">No members found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardContent className="!p-0">
              <div className="flex flex-col">
                <div className="flex items-center justify-between bg-muted p-2 lg:p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.image || "/user-2.png"} alt={`${member.firstName} ${member.lastName}`} />
                      <AvatarFallback>{member.firstName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.firstName} {member.lastName}</div>
                      <div className="text-xs text-muted-foreground">{member.isPremium ? "Premium Member" : "Free Member"}</div>
                    </div>
                  </div>
                  <Badge variant={member.isActive ? "success" : "secondary"}>
                    {member.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="p-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Joined {new Date(member.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{member.gender}, {member.age} years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{member.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Plan: {member.isPremium ? "Premium" : "Free"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex border-t">
                  <Button asChild variant="ghost" className="flex-1 rounded-none rounded-bl-md py-2 justify-center">
                    <Link href={`/members/${member.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="ghost" className="flex-1 rounded-none border-l py-2 justify-center">
                    <Link href={`/members/${member.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="flex-1 rounded-none border-l py-2 justify-center"
                    onClick={() => onStatusChange && onStatusChange(member.id, !member.isActive)}
                  >
                    {isItemUpdating && isItemUpdating(member.id) ? (
                      <Preloader size="sm" />
                    ) : member.isActive ? (
                      <Ban className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <UserCheck className="h-4 w-4 text-green-600" />
                    )}
                  </Button>

                  <Button variant="ghost" className="flex-1 rounded-none rounded-br-md border-l py-2 justify-center" onClick={()=>onDeleteClick(member.id)}>
                    {isItemDeleting && isItemDeleting(member.id) ? <Preloader />: (
                      <Trash2 className="h-4 w-4 text-red-600" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
