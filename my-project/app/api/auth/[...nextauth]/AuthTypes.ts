import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string | number;
    username?: string;
    firstName?: string;
    lastName?: string;
    dob?: string;
    role?: string;
    isActive?: boolean;
    image?: string;
    phone?: string;
    department?: string;
    location?: string;
    origin?: string;
    gender?: string;
    age?: number;
    relationshipStatus?: string;
    children?: boolean;
    religion?: string;
    shortDescription?: string;
    createdAt?: string;
    updatedAt?: string;
    token?: string;
  }

  interface Session {
    user: {
      id?: string | number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string;
      firstName?: string;
      lastName?: string;
      dob?: string;
      role?: string;
      isActive?: boolean;
      phone?: string;
      department?: string;
      location?: string;
      origin?: string;
      gender?: string;
      age?: number;
      relationshipStatus?: string;
      children?: boolean;
      religion?: string;
      shortDescription?: string;
      createdAt?: string;
      updatedAt?: string;
    };
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string | number;
    username?: string;
    firstName?: string;
    lastName?: string;
    dob?: string;
    role?: string;
    isActive?: boolean;
    image?: string;
    phone?: string;
    department?: string;
    location?: string;
    origin?: string;
    gender?: string;
    age?: number;
    relationshipStatus?: string;
    children?: boolean;
    religion?: string;
    shortDescription?: string;
    createdAt?: string;
    updatedAt?: string;
    token?: string;
  }
}
