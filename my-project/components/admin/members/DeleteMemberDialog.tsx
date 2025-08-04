"use client";

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

type Props = {
  key: string;
  value: boolean;
}

interface DeleteMemberDialogProps {
  open: Props;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function DeleteMemberDialog({
  open,
  onOpenChange,
  onConfirm,
}: DeleteMemberDialogProps) {
  return (
    <AlertDialog open={open.value} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to Delete this member?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the member's record from the system.
            This action cannot be undone and will remove all associated data including schedules, 
            permissions and attendance records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            className="bg-red-500 text-neutral-50 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 