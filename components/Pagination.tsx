"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {cn} from "@/lib/utils";

type PaginationSectionProps = {
    extraClasses?: string;
    showDescription?: boolean;
}

export default function PaginationSection({extraClasses = "", showDescription=true}:PaginationSectionProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 1;

    return (
        <div className={cn("mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", extraClasses)}>
            {showDescription && <p className="text-sm text-muted-foreground md:whitespace-nowrap">
                Showing <strong>3</strong> of <strong>3</strong> Results
            </p>}

            <Pagination className="mx-0 w-fit">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>

                    {/* Page Number(s) */}
                    <PaginationItem>
                        <PaginationLink isActive>{currentPage}</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
