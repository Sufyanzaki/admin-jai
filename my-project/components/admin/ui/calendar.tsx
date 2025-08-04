"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) {
    const today = new Date();
    const seventyYearsAgo = new Date(today.getFullYear() - 70, 0); // January, 70 years ago

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            captionLayout="dropdown"
            fromDate={seventyYearsAgo}
            toDate={today}
            defaultMonth={today}
            disabled={{ after: today }}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col space-y-4",
                month: "space-y-4 w-full",
                caption: "flex flex-col items-start gap-1 px-2 mb-2",
                caption_label: "hidden",
                caption_dropdowns: "flex flex-col gap-1 w-full",
                dropdown: "w-full px-2 py-2 bg-white border border-input rounded text-sm mb-2",
                nav: "flex items-center justify-between w-full px-2",
                nav_button: "w-6 h-6 text-muted-foreground hover:text-foreground",
                nav_button_previous: "",
                nav_button_next: "",
                table: "w-full border-collapse",
                head_row: "",
                head_cell: "text-muted-foreground text-xs font-medium text-center",
                row: "",
                cell: "h-9 w-9 text-center text-sm p-0 relative",
                day: "h-9 w-9 p-0 font-normal text-center hover:bg-muted rounded transition",
                day_selected:
                    "bg-primary text-primary-foreground rounded hover:bg-primary/90",
                day_today: "border border-primary rounded",
                day_outside: "text-muted-foreground",
                day_disabled: "opacity-50 text-muted",
                day_range_middle: "bg-accent text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
                IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
            }}
            {...props}
        />
    );
}

Calendar.displayName = "Calendar";
export { Calendar };