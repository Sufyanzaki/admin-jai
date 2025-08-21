export interface FaqDto {
    id: string;
    question: string;
    answer: string;
    categoryId: string;

    category: FaqCategoryDto;

    createdAt: string;
    updatedAt: string;
}

export interface FaqCategoryDto {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    faqs: FaqDto[];
}
