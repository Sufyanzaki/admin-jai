export type ProfileAttributeResponse = {
    id: string;
    key: string;
    label: string;
    type: string;
    options: string;
    isActive: boolean;
    isVisible: boolean;
    isRequired: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;

    //transformed
    updatedAttr: string[];
}