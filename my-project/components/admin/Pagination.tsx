"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/admin/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/client/ux/button";

type PaginationSectionProps = {
    extraClasses?: string;
    showDescription?: boolean;
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    onPageChange?: (page: number) => void;
};

export default function PaginationSection({
                                              extraClasses = "",
                                              showDescription = true,
                                              pagination,
                                              onPageChange,
                                          }: PaginationSectionProps) {
    const { total, page, limit, totalPages } = pagination;

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        onPageChange?.(newPage);
    };

    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    const getVisiblePages = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }
        pages.push(1, 2);
        if (page > 4) pages.push("...");
        const start = Math.max(3, page - 1);
        const end = Math.min(totalPages - 2, page + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        if (page < totalPages - 3) pages.push("...");
        pages.push(totalPages - 1, totalPages);

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div
            className={cn(
                "mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
                extraClasses
            )}
        >
            {showDescription && (
                <p className="text-sm text-muted-foreground md:whitespace-nowrap">
                    Showing <strong>{end === 0 ? 0 : start}</strong> to{" "}
                    <strong>{end}</strong> of <strong>{total}</strong> Results
                </p>
            )}

            <Pagination className="mx-0 w-fit">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => handlePageChange(page - 1)}
                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                        >
                            <Button variant="outline" size="sm" disabled={page === 1} className="hover:text-dark-blue text-muted-foreground">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </PaginationLink>
                    </PaginationItem>

                    {visiblePages.map((p, i) => (
                        <PaginationItem key={i}>
                            {p === "..." ? (
                                <span className="px-2">...</span>
                            ) : (
                                <PaginationLink
                                    isActive={page === p}
                                    onClick={() => handlePageChange(p as number)}
                                >
                                    <Button
                                        variant={page === p ? "default" : "outline"}
                                        size="sm"
                                        className={page === p ? "hover:text-dark-blue bg-app-blue text-muted-foreground" : "hover:text-dark-blue"}
                                    >
                                        {p}
                                    </Button>
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationLink
                            onClick={() => handlePageChange(page + 1)}
                            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                        >
                            <Button variant="outline" size="sm" disabled={page === totalPages} className="text-muted-foreground">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
