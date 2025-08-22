
export type LanguageTranslationsDto = {
    translations: TranslationsResponse;
};


type TranslationPagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

type TranslationsResponse = {
    languageCode: string;
    language: string;
    translations: Record<string, string>;
    pagination: TranslationPagination;
}