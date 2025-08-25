'use client'

import { useState } from "react";
import { useDeleteMember } from "@/app/shared-hooks/useDeleteMember";
import { Button } from "@/components/client/ux/button";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

export default function DeleteAccount() {
    const { t } = useTranslation();
    const { data: session } = useSession();
    const [deleteInput, setDeleteInput] = useState("");

    const { deleteMemberById, isDeleting } = useDeleteMember();

    const handleDeleteConfirm = () => {
        deleteMemberById(String(session?.user?.id)).finally();
    };

    return (
        <div className="max-w-lg mx-auto mt-12">
            <div className="text-center">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">
                    {t("Delete Account")}
                </h2>
                <p className="text-sm mb-8 leading-relaxed font-light">
                    {t(
                        "Deleting account means you will no longer have access to it. Please be careful."
                    )}
                </p>
                <div className="flex flex-col gap-3">
                    <label>
                        {t('Please Type "Delete My Account" below:')}
                    </label>
                    <input
                        type="text"
                        value={deleteInput}
                        onChange={(e) => setDeleteInput(e.target.value)}
                        className="border border-app-border rounded-md p-2 mb-8 focus:border-app-border outline-none text-center"
                    />
                </div>
                <div className="flex justify-center gap-3">
                    <Button variant="outline" size="lg">
                        {t("Cancel")}
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        disabled={deleteInput !== t("Delete My Account")}
                        variant="destructive"
                        size="lg"
                    >
                        {isDeleting ? t("Deleting") : t("Delete")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
