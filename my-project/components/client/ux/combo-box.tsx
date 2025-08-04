"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/client/ux/label"
import { useState } from "react"
import { Command, CommandItem, CommandList, CommandInput } from "@/components/client/ux/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/client/ux/popover"

interface MultiSelectComboboxProps {
    options: string[]
    selected: string[]
    onChange: (selected: string[]) => void
    label?: string
    id?: string
}

export function MultiSelectCombobox({
                                        options,
                                        selected,
                                        onChange,
                                        label,
                                        id
                                    }: MultiSelectComboboxProps) {
    const [open, setOpen] = useState(false)
    const inputId = id || ""

    const toggleOption = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value]
        onChange(newSelected)
    }

    return (
        <div className="space-y-2">
            {label && <Label htmlFor={inputId}>{label}</Label>}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div
                        id={inputId}
                        className={cn(
                            "flex min-h-10 w-full flex-wrap items-center gap-1 rounded-[5px] border border-app-border bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        )}
                    >
                        {selected.length > 0 ? (
                            selected.map((item) => (
                                <span
                                    key={item}
                                    className="flex items-center gap-1 rounded bg-app-theme px-2 py-1 text-xs text-white"
                                >
                                    {item}
                                    <button
                                        type="button"
                                        className="text-white hover:text-destructive text-sm"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onChange(selected.filter((s) => s !== item))
                                        }}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))
                        ) : (
                            <span className="text-muted-foreground">Select</span>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-gray-50 border border-gray-200 rounded-[5px]">
                    <Command>
                        <CommandInput placeholder="Search..." className="border-b border-gray-200" />
                        <CommandList>
                            {options.map((option) => (
                                <CommandItem
                                    key={option}
                                    onSelect={() => toggleOption(option)}
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="mr-2">
                                        <Check
                                            className={cn(
                                                "h-4 w-4",
                                                selected.includes(option) ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </div>
                                    {option}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
