export interface ProfileDTO {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  birthDate: string;
  gender: number;
}
export interface Profile {
  firstName: string;
  lastName: string;
  gender: number;
  birthDate: Date | null;
  avatarUrl: string | File;
}
