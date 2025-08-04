export type TermsSettingsDto = {
    id: number;
    Title: string;
    Url: string;
    pageSectiontitle: string;
    link: string;
    content: string; // HTML string
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    metaImage: string;
    pageType: string; // could be union type: 'terms' | 'privacy' | 'faq' etc.
    showOnHeader: boolean;
    isActive: boolean;
    createdAt: string; // or Date
    updatedAt: string; // or Date
  };
  