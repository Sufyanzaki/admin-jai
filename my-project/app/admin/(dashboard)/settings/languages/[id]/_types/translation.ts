export type TranslationDto = {
    id: string;
    key: string;
    languageId: number;
    text: string;
    createdAt: string;
    updatedAt: string;

    languageCode?:string;
}

export interface LanguageTranslationsDto {
    language: string;
    translations: Record<string, string>;
}
