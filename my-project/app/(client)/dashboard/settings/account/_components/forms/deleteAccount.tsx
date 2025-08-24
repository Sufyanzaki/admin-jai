'use client'
import { useState } from "react";
import { useDeleteMember } from "@/app/shared-hooks/useDeleteMember";
import { Button } from "@/components/client/ux/button";
import { useSession } from "next-auth/react";

export default function DeleteAccount() {
    const { data: session } = useSession();
    const [deleteInput, setDeleteInput] = useState("");

    const { deleteMemberById, isDeleting } = useDeleteMember();
    const handleDeleteConfirm = () => {
        deleteMemberById(String(session?.user?.id)).finally()
    };

    return (
        <div className="max-w-lg mx-auto mt-12">
            <div className="text-center">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">
                    Delete Account
                </h2>
                <p className="text-sm mb-8 leading-relaxed font-light">
                    Deleting account means you will no longer have access to it.
                    Please be careful.
                </p>
                <div className="flex flex-col gap-3">
                    <label>Please Type &#34;Delete My Account&#34; below: </label>
                    <input
                        type="text"
                        value={deleteInput}
                        onChange={(e) => setDeleteInput(e.target.value)}
                        className="border border-app-border rounded-md p-2 mb-8 focus:border-app-border outline-none text-center" />

                </div>
                <div className="flex justify-center gap-3">
                    <Button variant="outline" size="lg">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} disabled={deleteInput !== "Delete My Account"} variant="destructive" size="lg">
                        {isDeleting ? "Deleting" : "Delete"}
                    </Button>
                </div>
            </div>
        </div>
    )
}