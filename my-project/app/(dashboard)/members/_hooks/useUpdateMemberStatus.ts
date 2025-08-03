import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { patchUserStatus } from "@/app/(dashboard)/members/add/_api/createUser";
import { showError, showSuccess } from "@/admin-utils";
import { GetAllMembersResponse } from "@/app/(dashboard)/members/_types/member";
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
                globalMutate("all-members");
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
                    return {
                        ...currentData,
                        users: currentData.users.map(member =>
                            member.id === id ? { ...member, isActive } : member
                        )
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