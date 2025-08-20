"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/client/ux/select";
import { useProfileAttribute } from "@/app/shared-hooks/useProfileAttribute";
import { MultiSelectCombobox } from "@/components/client/ux/combo-box";

type AttributeSelectProps = {
    attributeKey: string;
    value?: string;
    onChange: (value: string) => void;
    triggerClasses?: string;
    placeholder?: string;
    size?: "sm" | "default";
};

export const AttributeSelect = ({ attributeKey, value, onChange, placeholder, triggerClasses = "", size }: AttributeSelectProps) => {
    const { profileAttribute, getProfileAttributeError } = useProfileAttribute(attributeKey);

    if (getProfileAttributeError) {
        return <p className="text-sm text-red-500">Failed to load {attributeKey}</p>;
    }

    return (
        <Select value={value} onValueChange={onChange} key={value}>
            <SelectTrigger className={triggerClasses} size={size}>
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
    label,
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
            label={label || attributeKey}
            options={profileAttribute?.updatedAttr ?? []}
            selected={value}
            onChange={onChange}
            id={attributeKey}
        />
    );
};

