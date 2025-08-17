export type BasicPageDto = {
    id: string;
    Title: string;
    Url: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    metaImage: string;
    pageType: string;
    pageTitle?: string;
    showOnHeader?: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    type: string;
}
