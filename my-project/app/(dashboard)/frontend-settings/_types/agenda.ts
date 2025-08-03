export type AgendaSettingsDto = {
    id: number;
    Title: string;
    Url: string;
    pageTitle: string;
    pageSubtitle: string;
    titleContentSection: string;
    link: string;
    content: string; // HTML string
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    metaImage: string;
    pageType: string; // optionally: 'Public' | 'Private' | etc.
    showOnHeader: boolean;
    isActive: boolean;
    createdAt: string; // or Date
    updatedAt: string; // or Date
  };
  