import { ResponseWith } from "@/types/response";
import api from "./api";
import { Profile } from "@/types/profile";

const getProfile = async () => {
  const response = await api.get<ResponseWith<Profile>>("/profile");
  return response.data.data;
};
const ProfileService = {
  getProfile,
};

export default ProfileService;
