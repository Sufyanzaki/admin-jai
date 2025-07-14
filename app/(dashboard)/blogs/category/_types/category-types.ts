// Blog Category Types

export interface BlogCategory {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    blogs: any[]; // You can replace 'any' with a Blog type if available
}

export type BlogCategoryList = BlogCategory[]; 