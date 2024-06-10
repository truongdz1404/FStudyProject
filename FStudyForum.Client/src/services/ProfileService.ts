import api from "./api";
import { ResponseWith } from "@/types/response";
import { ProfileDTO, Profile } from "@/types/profile";

const getProfile = async () => {
  const response = await api.get<ResponseWith<ProfileDTO>>("/profile");
  return response.data.data;
};

const getProfileByUserName = async (userName: string) => {
    const response = await api.get<ResponseWith<Profile>>(
      `/profile/${userName}`
    );
    return response.data.data;
};
const editProfile = async (username: string, profile: Profile) => {
  let response;
    response = await api.put<Response>(`/profile/edit/${username}`, {
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      birthDate: profile.birthDate,
      avatarUrl: profile.avatarUrl,
    });
    return response.data;
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
