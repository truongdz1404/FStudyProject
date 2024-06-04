import { User } from "@/types/user";
import api from "./api";
import { ResponseWith } from "@/types/response";

const getProfile = async () => {
    const response = await api.get<ResponseWith<User>>("/user/profile");
    return (response.data).data;
};


const forgotPassword = async (email: string): Promise<void> => {
    await api.post<void>("/auth/forgot-password", { email });
};

const changePassword = async (token: string, email: string, newPassword: string): Promise<void> => {
    await api.post<void>(`/auth/change-password?token=${token}&email=${email}`, { newPassword });
};

const UserService = {
    getProfile,
    forgotPassword,
    changePassword,
};

export default UserService;
