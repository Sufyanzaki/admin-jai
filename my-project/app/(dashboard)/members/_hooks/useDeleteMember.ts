import {useSWRConfig} from "swr";
import useSWRMutation from "swr/mutation";
import {deleteMember} from "@/app/(dashboard)/members/_api/deleteMember";
import {showError, showSuccess} from "@/admin-utils";
import {GetAllMembersResponse} from "@/app/(dashboard)/members/_types/member";
import { useState } from "react";

export const useDeleteMember = () => {
    const { mutate:globalMutate } = useSWRConfig();
    const [deletingIds, setDeletingIds] = useState<string[]>([]);

    const { trigger, isMutating } = useSWRMutation(
        "delete-member",
        async (_, { arg }: { arg: { id: string } }) => {
            return await deleteMember(arg.id);
        },
        {
            onSuccess: () => showSuccess("Member deleted successfully!"),
            onError: (error) => {
                globalMutate("all-members");
                showError({ message: error.message });
            }
        }
    );

    const deleteMemberById = async (id: string) => {
        setDeletingIds(prev => [...prev, id]);
        try {
            await trigger({ id });
            await globalMutate(
                "all-members",
                (currentData: GetAllMembersResponse | undefined) => {
                    if (!currentData?.users) return currentData;
                    return {
                        ...currentData,
                        users: currentData.users.filter(member => member.id !== id)
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
        deleteMemberById,
        isDeleting: isMutating,
        isItemDeleting
    };
};
