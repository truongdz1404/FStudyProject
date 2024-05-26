import api from "./api";
import { Response } from "@/types/response";

const login = async (username: string, password: string) => {
    const response = await api.post<Response>("/auth/login", {
        username,
        password,
    });
    return response.data.message;
};
const logout = async () => {
    const response = await api.get<Response>("/auth/logout");
    return response.data.message;
};

const refreshToken = async () => {
    const response = await api.get<Response>("/auth/refresh-token");
    return response.data.message;
};

const AuthService = {
    refreshToken,
    login,
    logout,
};

export default AuthService;
