'use client'
import { useAgenda } from '@/app/shared-hooks/useAgenda';
import React from 'react'

export default function Agenda() {
    const { agendaSettings, agendaLoading } = useAgenda();
    console.log(agendaSettings)

    return (
        <div className="p-4 lg:p-6 flex flex-col min-h-screen gap-8">
            <div className="text-black space-y-1 lg:space-y-4">
                <h3 className="text-[22px] sm:text-xl lg:text-2xl xl:text-[32px] font-semibold">
                    {agendaSettings?.pageTitle}
                </h3>
                <p className="text-xs md:text-sm lg:text-base font-normal">
                    {agendaSettings?.pageSubtitle}
                </p>
            </div>
            <div className="flex flex-col space-y-8">
                {agendaSettings?.content}

            </div>
        </div>
    )
}
