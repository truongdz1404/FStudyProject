import { User } from "@/types/user";
import api from "./api";
import { Response, ResponseWith } from "@/types/response";

const getProfile = async () => {
  const response = await api.get<ResponseWith<User>>("/user/profile");
  return response.data.data;
};

const forgotPassword = async (email: string) => {
  await api.post("/auth/forgot-password", { email });
};

const changePassword = async (
  token: string,
  email: string,
  password: string
) => {
  const response = await api.post<Response>("/auth/change-password", {
    token,
    email,
    password,
  });
  return response.data.message;
};
const UserService = {
  getProfile,
  forgotPassword,
  changePassword,
};

export default UserService;
