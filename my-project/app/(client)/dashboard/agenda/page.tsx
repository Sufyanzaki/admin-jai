'use client'

import { useAgenda } from '@/app/shared-hooks/useAgenda';
import React from 'react'
import Preloader from "@/components/shared/Preloader";
import {unescapeHtml} from "@/lib/utils";

export default function Agenda() {
    const { agendaSettings, agendaLoading } = useAgenda();

    if(agendaLoading) return (
        <div className="flex items-center justify-center min-h-60">
            <Preloader />
        </div>
    )

    if(!agendaSettings) return (
        <div className="flex items-center justify-center min-h-60">
            <p className="text-gray-500">No agenda settings found.</p>
        </div>
    )

    return (
        <div className="p-4 lg:p-6 flex flex-col min-h-[80vh] gap-8 space-y-4">
            <div className="text-black space-y-1 lg:space-y-4">
                <h3 className="text-[22px] sm:text-xl lg:text-2xl xl:text-[32px] font-semibold">
                    {agendaSettings.pageTitle}
                </h3>
                <p className="text-xs md:text-sm lg:text-base font-normal">
                    {agendaSettings.pageSubtitle}
                </p>
            </div>
            <div dangerouslySetInnerHTML={{__html: unescapeHtml(agendaSettings.content)}} />
        </div>
    )
}
