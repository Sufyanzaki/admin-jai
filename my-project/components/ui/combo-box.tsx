"use client"

import { Check } from "lucide-react"
import { useState } from "react"
import { Command, CommandItem, CommandList, CommandInput } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface MultiSelectComboboxProps {
    options: string[]
    selected: string[]
    onChange: (selected: string[]) => void
}

export function MultiSelectCombobox({ options, selected, onChange }: MultiSelectComboboxProps) {
    const [open, setOpen] = useState(false)

    const toggleOption = (value: string) => {
        const newSelected = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]
        onChange(newSelected)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    className="flex min-h-10 w-full flex-wrap gap-1 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    {selected.length > 0 ? (
                        selected.map((item) => (
                            <span
                                key={item}
                                className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
                            >
                                {item}
                                <button
                                    type="button"
                                    className="text-muted-foreground hover:text-destructive"
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
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        {options.map((option) => (
                            <CommandItem key={option} onSelect={() => toggleOption(option)} className="cursor-pointer">
                                <div className="mr-2">
                                    <Check className={cn("h-4 w-4", selected.includes(option) ? "opacity-100" : "opacity-0")} />
                                </div>
                                {option}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
