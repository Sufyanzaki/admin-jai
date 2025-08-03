"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Settings, Plus, MoreVertical, Pencil, Trash } from "lucide-react";

interface FooterSettingsFormProps {
  pagesData: Array<{
    id: number;
    name: string;
    pages: string[];
  }>;
  onOpenDialog: () => void;
}

export default function FooterSettingsForm({ pagesData, onOpenDialog }: FooterSettingsFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Title + Description */}
          <div>
            <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
              <Settings className="h-5 w-5" />
              Footer Section
            </CardTitle>
            <CardDescription>
              Manage your system settings and appearance
            </CardDescription>
          </div>

          {/* Button */}
          <Button
            onClick={onOpenDialog}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </CardHeader>
      <div className="px-4 space-y-6 pb-6">
        <div className="py-3 md:py-4 xxl:py-6">
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagesData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.pages.join(", ")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onOpenDialog}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash className="w-4 h-4 mr-2 text-red-500" />
                          <span className="text-red-500">Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}