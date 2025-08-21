import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { patchUserStatus } from "@/app/shared-api/userApi";
import { showError, showSuccess } from "@/shared-lib";
import { GetAllMembersResponse } from "@/app/admin/(dashboard)/members/_types/member";
import { useState } from "react";

export const useUpdateMemberStatus = () => {
    const { mutate: globalMutate } = useSWRConfig();
    const [updatingIds, setUpdatingIds] = useState<string[]>([]);

    const { trigger, isMutating } = useSWRMutation(
        "update-member-status",
        async (_, { arg }: { arg: { id: string, isActive: boolean } }) => {
            return await patchUserStatus(arg.id, arg.isActive);
        },
        {
            onSuccess: () => showSuccess("Member status updated successfully!"),
            onError: (error) => {
                globalMutate("all-members").finally();
                showError({ message: error.message });
            }
        }
    );

    const updateMemberStatus = async (id: string, isActive: boolean) => {
        setUpdatingIds(prev => [...prev, id]);
        try {
            await trigger({ id, isActive });
            await globalMutate(
                (key) => typeof key === 'string' && key.startsWith('all-members'),
                (currentData: GetAllMembersResponse | undefined) => {
                    if (!currentData?.users) return currentData;
                    const updatedUsers = currentData.users.map(member =>
                        member.id === id ? { ...member, isActive } : member
                    );
                    const activeCount = updatedUsers.filter(member => member.isActive).length;
                    const inactiveCount = updatedUsers.filter(member => !member.isActive).length;
                    return {
                        ...currentData,
                        stats: {
                            ...currentData.stats,
                            active: activeCount,
                            inactive: inactiveCount,
                        },
                        users: updatedUsers,
                    };
                },
                false
            );
        } finally {
            setUpdatingIds(prev => prev.filter(itemId => itemId !== id));
        }
    };

    const isItemUpdating = (id: string) => updatingIds.includes(id);

    return {
        updateMemberStatus,
        isUpdating: isMutating,
        isItemUpdating
    };
};