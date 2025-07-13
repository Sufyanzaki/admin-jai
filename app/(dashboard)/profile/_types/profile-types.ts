export type ProfileResponse = {
    user: {
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        dob: string;
        role: string;
        isActive: boolean;
        image: string;
        phone: string;
        department: string;
        location: string;
        origin: string;
        gender: string;
        age: number;
        relationshipStatus: string;
        children: boolean;
        religion: string;
        shortDescription: string;
        createdAt: string;
        updatedAt: string;
    }
}