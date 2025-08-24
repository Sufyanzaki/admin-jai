"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/client/ux/select";
import { useProfileAttribute } from "@/app/shared-hooks/useProfileAttribute";
import { MultiSelectCombobox } from "@/components/client/ux/combo-box";
import { useTranslation } from "react-i18next";

type AttributeSelectProps = {
    attributeKey: string;
    value?: string;
    onChange: (value: string) => void;
    triggerClasses?: string;
    placeholder?: string;
    size?: "sm" | "default";
};

export const AttributeSelect = ({ attributeKey, value, onChange, placeholder, triggerClasses = "", size }: AttributeSelectProps) => {
    const { t } = useTranslation();
    const { profileAttribute, getProfileAttributeError } = useProfileAttribute(attributeKey);

    if (getProfileAttributeError) {
        return <p className="text-sm text-red-500">{t("Failed to load {{attribute}}", { attribute: attributeKey })}</p>;
    }

    return (
        <Select value={value} onValueChange={onChange} key={value}>
            <SelectTrigger className={triggerClasses} size={size}>
                <SelectValue placeholder={placeholder || t("Select {{attribute}}", { attribute: attributeKey })} />
            </SelectTrigger>
            <SelectContent>
                {profileAttribute?.updatedAttr.map((option) => (
                    <SelectItem key={option} value={option}>
                        {t(option)}
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
    const { t } = useTranslation();
    const { profileAttribute, getProfileAttributeError } = useProfileAttribute(attributeKey);

    if (getProfileAttributeError) {
        return <p className="text-sm text-red-500">{t("Failed to load {{attribute}}", { attribute: attributeKey })}</p>;
    }

    return (
        <MultiSelectCombobox
            label={label ? t(label) : t(attributeKey)}
            options={profileAttribute?.updatedAttr.map((opt) => t(opt)) ?? []}
            selected={value.map((v) => t(v))}
            onChange={onChange}
            id={attributeKey}
        />
    );
};
