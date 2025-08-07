import {MemberProfile} from "@/app/shared-types/member";

interface Token {
    token: string;
    expires: string;
}

interface Tokens {
    access: Token;
}

export type LoginResponse = {
    status: 'success' | 'error';
    user: MemberProfile;
    tokens: Tokens;
}

export type ProfileResponse = {
    user: MemberProfile;
}