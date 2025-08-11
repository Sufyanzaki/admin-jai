export type ChatUser = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dob: string;
    role: string;
    password: string;
    otp: string | null;
    otpExpiresAt: string | null;
    isActive: boolean;
    isDeleted: boolean;
    image: string | null;
    phone: string | null;
    department: string | null;
    location: string | null;
    origin: string;
    gender: string;
    age: number;
    relationshipStatus: string;
    lookingFor: string | null;
    children: boolean;
    religion: string;
    shortDescription: string;
    isPremium: boolean;
    createdAt: string;
    updatedAt: string;
    route: string | null;
    roleId: number | null;
}

export type FullChat = {
    id: string;
    chatName: string;
    createdAt: string;
    updatedAt: string;
    users: ChatUser[];
}

export type ChatResponse = {
    message: string;
    data: {
        fullChat: FullChat;
    };
}
