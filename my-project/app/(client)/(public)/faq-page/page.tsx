'use client'
import { useVee } from '@/app/shared-hooks/useVee'
import { Container } from '@/components/client/ux/container';
import Preloader from '@/components/shared/Preloader';
import { unescapeHtml } from '@/lib/utils'
import React from 'react'

export default function page() {
    const { veeData, veeLoading, error } = useVee()

    if (veeLoading) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader />
                <p className="text-sm">Loading your profile information...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center flex-col justify-center h-64 gap-3">
                <h2 className="text-2xl font-bold text-red-600">
                    Error loading your profile information
                </h2>
                <p className="text-muted-foreground">{error.message}</p>
            </div>
        );
    }
    return (
        <div className="py-[50px] pt-[114px] xl:pt-[124px] bg-white xl:pb-[92px]">
            <Container className="px-4 md:px-6">
                <h3 className="text-[22px] lg:text-[26px] font-semibold text-gray-900 mb-6">
                    {veeData?.Title}
                </h3>
                <div
                    className="text-label-black prose"
                    dangerouslySetInnerHTML={{ __html: unescapeHtml(veeData?.content ? veeData?.content : "page content") }}
                />
            </Container>
        </div>
    )
}
