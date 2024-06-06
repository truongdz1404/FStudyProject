import { ServerResponse } from "@/contexts/auth/types";
import api from "./api";
import { ResponseWith } from "@/types/response";
import axios, { AxiosError } from "axios";
import { ProfileDTO, Profile } from "@/types/profile";

const getProfile = async () => {
  const response = await api.get<ResponseWith<ProfileDTO>>("/profile");
  return response.data.data;
};

const getProfileByUserName = async (userName: string) => {
  try {
    const response = await api.get<ResponseWith<Profile>>(
      `/profile/${userName}`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new AxiosError("Profile not found, please create a profile first.");
    }
    throw error;
  }
};
const editProfile = async (username: string, profile: Profile) => {
  let response;
  try {
    response = await api.put<Response>(`/profile/edit/${username}`, {
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      birthDate: profile.birthDate,
      avatarUrl: profile.avatarUrl,
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
const createProfile = async (profile: Profile) => {
  const response = await api.post<Response>(`/profile/create`, profile);
  return response.data;
};
const ProfileService = {
  getProfile,
  getProfileByUserName,
  editProfile,
  createProfile,
};
export default ProfileService;
