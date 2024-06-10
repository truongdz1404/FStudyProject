import { ServerResponse } from "@/contexts/auth/types";
import api from "./api";
import { Response, ResponseWith } from "@/types/response";
import { AxiosError } from "axios";
import { Profile } from "@/types/profile";

const getByUsername = async (username: string) => {
  const response = await api.get<ResponseWith<Profile>>(`/profile/${username}`);
  return response.data.data;
};
const update = async (username: string, profile: Profile) => {
  let response;
  try {
    response = await api.put<Response>(`/profile/edit/${username}`, {
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      // birthDate: profile.birthDate,
      // avatarUrl: profile.avatarUrl,
    });
    return response.data;
  } catch (error: unknown) {
    if (error && (error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response?.data) {
        const serverError = axiosError.response.data as ServerResponse;
        throw new AxiosError(serverError.message);
      }
    } else {
      throw error;
    }
  }
};
const create = async (profile: Profile) => {
  const response = await api.post<Response>(`/profile/create`, profile);
  return response.data;
};
const ProfileService = {
  getByUsername,
  update,
  create,
};
export default ProfileService;
