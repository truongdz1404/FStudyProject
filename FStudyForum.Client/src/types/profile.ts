export interface Profile {
    firstName: string;
    lastName: string;
    gender: number;
    birthDate: Date | null;
    avatarUrl: string | File;
}
