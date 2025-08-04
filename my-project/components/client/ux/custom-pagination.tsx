import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/client/ux/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const CustomPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-full h-10 w-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          className={cn(
            "w-9 h-9 text-[18px] font-medium p-0 rounded-full",
            page === currentPage
              ? "bg-app-pink text-white hover:bg-light-pink"
              : "bg-gray-200 "
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-full h-10 w-10"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
};
