"use client"

import {DashboardFooter} from "@/app/(client)/dashboard/_components/dashboard-footer";
import { usePathname } from "next/navigation";
import React from "react";

export default function CustomFooter(){
    const pathname = usePathname();

    return (
        <>
            {!pathname.startsWith("/dashboard/chat/") && <DashboardFooter />}
        </>
    )
}