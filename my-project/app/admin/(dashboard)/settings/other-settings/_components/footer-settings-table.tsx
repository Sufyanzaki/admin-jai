"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/admin/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/admin/ui/dropdown-menu";
import { Settings, Plus, MoreVertical, Pencil, Trash } from "lucide-react";
import {useAllFooterSections} from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useAllFooterSections";
import Preloader from "@/components/shared/Preloader";
import React, {useState, useEffect} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/admin/ui/dialog";
import FooterSectionForm from "@/app/admin/(dashboard)/settings/other-settings/_components/footer-section-form";
import {useRouter, useSearchParams } from "next/navigation";
import {FooterSectionDto} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";
import {useFooterSectionDelete} from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useFooterSectionDelete";

interface FooterSettingsFormProps {
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

export default function FooterSettingsTable({ canEdit, canDelete, canCreate }: FooterSettingsFormProps) {

  const [openFooterDialog, setOpenFooterDialog] = useState(false);
  const [editingSection, setEditingSection] = useState<FooterSectionDto | null>(null);

  const { sections, sectionsLoading } = useAllFooterSections();
  const { deletePageById, deleteLoading } = useFooterSectionDelete();

  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");

  useEffect(() => {
    if (editId) {
      const sectionToEdit = sections?.find(section => section.id.toString() === editId);
      if (sectionToEdit) {
        setEditingSection(sectionToEdit);
        setOpenFooterDialog(true);
      }
    }
  }, [editId, sections]);

  const handleEdit = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("editId", id.toString());
    router.push(`?${params.toString()}`);
  };

  const handleCloseDialog = () => {
    setOpenFooterDialog(false);
    setEditingSection(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("editId");
    router.push(`?${params.toString()}`);
  };

  const handleAddNew = () => {
    setEditingSection(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("editId");
    router.push(`?${params.toString()}`);
    setOpenFooterDialog(true);
  };

  if(sectionsLoading) return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader />
        <p className="text-sm">Loading your sections...</p>
      </div>
  )

  if(!sections) return null;

  return (
      <>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <Settings className="h-5 w-5" />
                  Footer Section
                </CardTitle>
                <CardDescription>
                  Manage your system settings and appearance
                </CardDescription>
              </div>

              {canCreate && <Button
                  onClick={handleAddNew}
                  className="w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>}
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
                  {sections.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.sectionName}</TableCell>
                        <TableCell>{item.pageNames}</TableCell>
                        <TableCell className="text-right">
                          {deleteLoading(item.id) ? <div className="flex justify-end"><Preloader size="sm" /></div> : <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {canEdit &&  <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>}
                              {canDelete &&   <DropdownMenuItem onClick={()=>deletePageById(item.id)}>
                                <Trash className="w-4 h-4 mr-2 text-red-500" />
                                <span className="text-red-500">Delete</span>
                              </DropdownMenuItem>}
                            </DropdownMenuContent>
                          </DropdownMenu>}
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>

        <Dialog open={openFooterDialog} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingSection ? "Edit Footer Section" : "Add Footer Section"}
              </DialogTitle>
              <DialogDescription>
                {editingSection
                    ? `Update the details for "${editingSection.sectionName}" section.`
                    : "Provide the name and page associated with this section."
                }
              </DialogDescription>
            </DialogHeader>
            <FooterSectionForm callback={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </>
  );
}