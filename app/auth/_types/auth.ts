export type LoginResponse = {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    phone?: string;
    location?: string;
  };
  token?: string;
  accessToken?: string;
}

export type ErrorResponse = {
    message: string;
    code: number;
}