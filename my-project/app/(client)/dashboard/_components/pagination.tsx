"use client";

import { Button } from "@/components/client/ux/button"; // your custom ShadCN UI button
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationSectionProps = {
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    onPageChange?: (page: number) => void;
};

export default function PaginationSection({
                                              pagination,
                                              onPageChange,
                                          }: PaginationSectionProps) {
    const { page, totalPages } = pagination;

    const handlePageChange = (newPage: number) => {
        if (onPageChange) onPageChange(newPage);
    };

    return (
        <div className="flex justify-center mt-6 gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
                <Button
                    key={i + 1}
                    variant={page === i + 1 ? "theme" : "outline"}
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </Button>
            ))}

            <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
