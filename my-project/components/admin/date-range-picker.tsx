"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/admin/ui/button"
import { Calendar } from "@/components/admin/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/admin/ui/popover"

interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
    onDateChange?: (date?: string) => void;
    value?: Date;
    defaultValue?: Date;
}

function DatePickerComponent({
                                 className,
                                 onDateChange,
                                 value,
                                 defaultValue = new Date(),
                             }: DatePickerProps) {
    const [internalDate, setInternalDate] = React.useState<Date | undefined>(defaultValue);

    const date = value !== undefined ? value : internalDate;

    const formatDateToISOString = (date?: Date): string | undefined => {
        if (!date) return undefined;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (value === undefined) {
            setInternalDate(selectedDate);
        }
        if (onDateChange) {
            onDateChange(formatDateToISOString(selectedDate));
        }
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        className={cn(
                            "w-[260px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "LLL dd, y") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end" forceMount>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        defaultMonth={date || new Date()}
                        showOutsideDays={false}
                        initialFocus
                        onDayClick={(day, modifiers, e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDateSelect(day);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export const DatePicker = DatePickerComponent