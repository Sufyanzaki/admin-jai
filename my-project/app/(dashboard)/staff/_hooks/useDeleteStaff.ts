import {useSWRConfig} from "swr";
import useSWRMutation from "swr/mutation";
import {deleteStaff} from "@/app/(dashboard)/staff/_api/deleteStaff";
import {showError, showSuccess} from "@/admin-utils";
import {StaffListResponse} from "@/app/(dashboard)/staff/_types/staff";
import { useState } from "react";

export const useDeleteStaff = () => {
    const { mutate: globalMutate } = useSWRConfig();
    const [deletingIds, setDeletingIds] = useState<string[]>([]);

    const { trigger, isMutating } = useSWRMutation(
        "delete-staff",
        async (_, { arg }: { arg: { id: string } }) => {
            return await deleteStaff(arg.id);
        },
        {
            onSuccess: () => showSuccess("Staff member deleted successfully!"),
            onError: (error) => {
                // Revalidate all staff-members keys on error
                globalMutate((key) => Array.isArray(key) && key[0] === "staff-members");
                showError({ message: error.message });
            }
        }
    );

    const deleteStaffById = async (id: string) => {
        setDeletingIds(prev => [...prev, id]);
        try {
            await trigger({ id });
            
            // Mutate all staff-members keys (with different params)
            await globalMutate(
                (key) => Array.isArray(key) && key[0] === "staff-members",
                (currentData: StaffListResponse | undefined) => {
                    if (!currentData?.staffMembers) return currentData;

                    const updatedStaff = currentData.staffMembers.filter(member => member.id !== id);
                    const removedMember = currentData.staffMembers.find(member => member.id === id);
                    
                    if (!removedMember) return currentData;

                    const wasActive = removedMember.isActive;
                    const role = removedMember.role;

                    return {
                        ...currentData,
                        staffMembers: updatedStaff,
                        totalStaff: currentData.totalStaff - 1,
                        activeStaffCount: wasActive
                            ? currentData.activeStaffCount - 1
                            : currentData.activeStaffCount,
                        inactiveStaffCount: wasActive
                            ? currentData.inactiveStaffCount
                            : currentData.inactiveStaffCount - 1,
                        countByRoles: {
                            ...currentData.countByRoles,
                            ...(role && {
                                [role]: Math.max((currentData.countByRoles?.[role] || 1) - 1, 0)
                            })
                        }
                    };
                },
                false
            );
        } finally {
            setDeletingIds(prev => prev.filter(itemId => itemId !== id));
        }
    };

    const isItemDeleting = (id: string) => deletingIds.includes(id);

    return {
        deleteStaffById,
        isDeleting: isMutating,
        isItemDeleting
    };
};