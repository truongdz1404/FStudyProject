export interface Profile {
    id: number;
    userName: string;
    firstName: string | "";
    lastName: string | "";
    gender: number | "",
    birthDate: string | "";
    avatarUrl: string | File;
}