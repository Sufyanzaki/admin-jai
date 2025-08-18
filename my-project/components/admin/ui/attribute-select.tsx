"use client";

import {useProfileAttribute} from "@/app/shared-hooks/useProfileAttribute";
import {MultiSelectCombobox} from "@/components/admin/ui/combo-box";
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "@/components/admin/ui/select";
import {cn} from "@/lib/utils";

type AttributeSelectProps = {
    attributeKey: string;
    value?: string;
    onChange: (value: string) => void;
    triggerClasses?: string;
    placeholder?: string;
    size?: "sm" | "default";
};

export const AttributeSelect = ({ attributeKey, value, onChange, placeholder, triggerClasses = ""}: AttributeSelectProps) => {
    const { profileAttribute, getProfileAttributeError } = useProfileAttribute(attributeKey);

    if (getProfileAttributeError) {
        return <p className="text-sm text-red-500">Failed to load {attributeKey}</p>;
    }

    return (
        <Select value={value} onValueChange={onChange} key={value || "empty"}>
            <SelectTrigger className={cn(triggerClasses)}>
                <SelectValue placeholder={placeholder || `Select ${attributeKey}`} />
            </SelectTrigger>
            <SelectContent>
                {profileAttribute?.updatedAttr.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

type AttributeMultiSelectProps = {
    attributeKey: string;
    value?: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    label?: string;
};

export const AttributeMultiSelect = ({
                                         attributeKey,
                                         value = [],
                                         onChange,
                                     }: AttributeMultiSelectProps) => {
    const {
        profileAttribute,
        getProfileAttributeError,
    } = useProfileAttribute(attributeKey);

    if (getProfileAttributeError) {
        return <p className="text-sm text-red-500">Failed to load {attributeKey}</p>;
    }

    return (
        <MultiSelectCombobox
            options={profileAttribute?.updatedAttr ?? []}
            selected={value}
            onChange={onChange}
        />
    );
};

