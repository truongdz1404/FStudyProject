import { ServerResponse } from "@/contexts/auth/types";
import api from "./api";
import { ResponseWith } from "@/types/response";
import { AxiosError } from "axios";
import { Profile } from "@/types/profile";

const getProfileByUserName = async (userName: string) => {
    const response = await api.get<ResponseWith<Profile>>(`/profile/getProfileByUsername/${userName}`); 
    return (response.data).data;
}
const editProfile = async (username: string, profile: Profile) => {
    let response;
    try {
        response = await api.put<Response>(`/profile/edit-profile/${username}`, {
            firstName: profile.firstName,
            lastName: profile.lastName,
            gender: profile.gender,
            birthDate: profile.birthDate,
            avatarUrl: profile.avatarUrl
        });
        return response.data;
    } catch (error: unknown) {
        if (error && (error as AxiosError).isAxiosError) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response?.data){
                const serverError = axiosError.response.data as ServerResponse;
                throw new AxiosError(serverError.message);   
            }
        } else {
            throw error;
        }
    }
};
const  ProfileService = {
     getProfileByUserName,
     editProfile
}
export default ProfileService;

