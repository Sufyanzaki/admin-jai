"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
        if (onPageChange) onPageChange(newPage);
    };

    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    return (
        <div className={cn("mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", extraClasses)}>
            {showDescription && (
                <p className="text-sm text-muted-foreground md:whitespace-nowrap">
                    Showing <strong>{end === 0 ? 0 : start}</strong>
                    {" "}to <strong>{end}</strong> of <strong>{total}</strong> Results
                </p>
            )}

            <Pagination className="mx-0 w-fit">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => handlePageChange(Math.max(1, page - 1))}
                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i + 1}>
                            <PaginationLink
                                isActive={page === i + 1}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationLink
                            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
