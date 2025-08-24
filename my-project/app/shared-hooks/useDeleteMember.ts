"use client";

import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { deleteMember } from "@/app/shared-api/memberApi";
import { showError, showSuccess } from "@/shared-lib";
import { GetAllMembersResponse } from "@/app/admin/(dashboard)/members/_types/member";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const useDeleteMember = () => {
    const { t } = useTranslation();
    const { mutate: globalMutate } = useSWRConfig();
    const router = useRouter();
    const [deletingIds, setDeletingIds] = useState<string[]>([]);

    const { trigger, isMutating } = useSWRMutation(
        "delete-member",
        async (_, { arg }: { arg: { id: string } }) => {
            return await deleteMember(arg.id);
        },
        {
            onSuccess: () => showSuccess(t("Member deleted successfully!")),
            onError: (error: Error) => {
                globalMutate("all-members").finally();
                showError({ message: t(error.message) });
            },
        }
    );

    const deleteMemberById = async (id: string) => {
        setDeletingIds((prev) => [...prev, id]);
        try {
            await trigger({ id });
            await globalMutate(
                "all-members",
                (currentData: GetAllMembersResponse | undefined) => {
                    if (!currentData?.users) return currentData;
                    return {
                        ...currentData,
                        users: currentData.users.filter((member) => member.id !== id),
                    };
                },
                false
            );
            await signOut({ redirect: false });
            router.push("/");
        } finally {
            setDeletingIds((prev) => prev.filter((itemId) => itemId !== id));
        }
    };

    const isItemDeleting = (id: string) => deletingIds.includes(id);

    return {
        deleteMemberById,
        isDeleting: isMutating,
        isItemDeleting,
    };
};
