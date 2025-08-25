"use client"

import {useSWRConfig} from "swr";
import useSWRMutation from "swr/mutation";
import {deleteStaff} from "@/app/admin/(dashboard)/staff/_api/staffApi";
import {showError, showSuccess} from "@/shared-lib";
import {StaffListResponse} from "@/app/admin/(dashboard)/staff/_types/staff";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const useDeleteStaff = () => {
    const { t } = useTranslation();
    const { mutate: globalMutate } = useSWRConfig();
    const [deletingIds, setDeletingIds] = useState<string[]>([]);

    const { trigger, isMutating } = useSWRMutation(
        "delete-staff",
        async (_, { arg }: { arg: { id: string } }) => {
            return await deleteStaff(arg.id);
        },
        {
            onSuccess: () => showSuccess(t("Staff member deleted successfully!")),
            onError: (error) => {
                globalMutate((key) => Array.isArray(key) && key[0] === "staff-members").finally();
                showError({ message: t(error.message) });
            }
        }
    );

    const deleteStaffById = async (id: string) => {
        setDeletingIds(prev => [...prev, id]);
        try {
            await trigger({ id });
            
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