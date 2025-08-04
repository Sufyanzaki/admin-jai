export type ErrorResponse = {
    message: string;
    code: number;
}

type UserDto = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  role: 'ADMIN' | 'USER' | string;
  password: string;
  otp: string;
  otpExpiresAt: string;
  isActive: boolean;
  image: string;
  phone: string;
  department: string;
  location: string;
  origin: string;
  gender: 'Male' | 'Female' | 'Other' | string;
  age: number;
  relationshipStatus: 'Single' | 'Married' | 'Divorced' | string;
  lookingFor: string | null;
  children: boolean;
  religion: string;
  shortDescription: string;
  createdAt: string;
  updatedAt: string;
}

interface Token {
  token: string;
  expires: string;
}

interface Tokens {
  access: Token;
}

export type LoginResponse = {
  status: 'success' | 'error';
  user: UserDto;
  tokens: Tokens;
}