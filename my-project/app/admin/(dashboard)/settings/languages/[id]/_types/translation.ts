
export type LanguageTranslationsDto = {
    translations: TranslationsResponse;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
};


type TranslationPagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

type TranslationsResponse = {
    translations: TranslationDto;
}

export type TranslationDto = {
    languageCode: string;
    language: string;
    translations: Record<string, string>;
    pagination: TranslationPagination;
}