export type BlogDto = {
    id: string;
    title: string;
    slug: string;
    categoryId: number;
    bannerImage: string;
    shortDescription: string;
    description: string;
    metaTitle: string;
    metaImage: string;
    metaDescription: string;
    metaKeywords: string;
    createdAt: string;
    updatedAt: string;
    category: BlogCategoryDto;
};

export type BlogCategoryDto = {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    blogs: BlogDto[];
}