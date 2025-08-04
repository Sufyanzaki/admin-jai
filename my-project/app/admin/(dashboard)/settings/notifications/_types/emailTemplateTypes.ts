export interface EmailTemplateTranslation {
  id: number;
  emailTemplateId: number;
  language: string;
  subject: string;
  content: string;
}

export interface EmailTemplate {
  id: number;
  key: string;
  isActive: boolean;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  translations: EmailTemplateTranslation[];
} 