"use client"

import { Container } from '@/components/client/ux/container'
import React from 'react'
import { useParams } from "next/navigation";
import { useCustomPages } from "@/app/(client)/(public)/[slug]/_hooks/useCustomPages";
import Preloader from "@/components/shared/Preloader";
import { unescapeHtml } from '@/lib/utils';

export default function CustomPage() {

    const params = useParams()
    const key = Array.isArray(params.id) ? params.id[0] : params.id ?? '';

    const { basicPage, isLoading, error } = useCustomPages(key)

    if (isLoading) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader />
                <p className="text-sm">Loading Attributes</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <h2 className="text-2xl font-bold text-red-600">
                    Error loading Page
                </h2>
                <p className="text-muted-foreground">{error.message}</p>
            </div>
        )
    }

    if (!basicPage) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <h2 className="text-2xl font-bold text-red-600">
                    Page not found
                </h2>
                <p className="text-muted-foreground">Page not found</p>
            </div>
        )
    }

    return (
        <section className="mt-24 py-12 bg-gray-200">
            <Container>
                <h1 className="text-4xl font-bold">
                    Page not found
                </h1>
                <p className="text-lg">
                    The page you are looking for does not exist.
                </p>
                <p className="text-lg">
                    Please check the URL and try again.
                </p>
                <div className="text-sm prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: unescapeHtml(basicPage?.content ? basicPage?.content : "page content") }}
                >   </div>
            </Container>
        </section>
    )
}
