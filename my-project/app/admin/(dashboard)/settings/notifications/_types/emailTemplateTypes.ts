export interface EmailTemplateTranslationDto {
  language: string;
  subject: string;
  content: string;
}

export interface EmailTemplateDto {
  id: string;
  key: string;
  isActive: boolean;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  translations: EmailTemplateTranslationDto[];
} 