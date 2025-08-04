export type Newsletter = {
  id: number;
  title: string;
  content: string;
  emails: string | string[];
  sent: boolean;
  createdAt: string;
}; 