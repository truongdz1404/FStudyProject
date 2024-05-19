import api from "./api";
import { Response } from "@/types/response";

const login = async (username: string, password: string) => {
    const response = await api.post<Response>("/auth/login", {
        username,
        password,
    });
    return response.data.message;
};

const refesh = async () => {
    const response = await api.get<Response>("/auth/refresh-token");
    return response.data.message;
};

const AuthService = {
    refesh,
    login,
};

export default AuthService;
