"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define the component with one name
interface DateRangePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  value?: DateRange;
  defaultValue?: DateRange;
}

function DateRangePickerComponent({
  className,
  onDateRangeChange,
  value,
  defaultValue = { from: new Date(), to: new Date() }
}: DateRangePickerProps) {
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(defaultValue);

  // Use controlled value if provided, otherwise use internal state
  const date = value !== undefined ? value : internalDate;

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    // Update internal state only if not controlled
    if (value === undefined) {
      setInternalDate(selectedDate);
    }

    if (selectedDate?.from && selectedDate?.to && onDateRangeChange) {
      // Convert dates to ISO string format for form compatibility
      const startDate = selectedDate.from.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
      const endDate = selectedDate.to.toISOString().slice(0, 16);
      onDateRangeChange(startDate, endDate);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[260px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Export with both names to faq all imports
export const DateRangePicker = DateRangePickerComponent
export const CalendarDateRangePicker = DateRangePickerComponent
