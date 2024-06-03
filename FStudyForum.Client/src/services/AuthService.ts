import { ServerResponse } from "@/contexts/auth/types";
import api from "./api";
import { Response } from "@/types/response";
import { AxiosError } from "axios";

const login = async (username: string, password: string) => {
    let response;
    try {
        response = await api.post<Response>("/auth/login", {
            username,
            password,
        });
        return response.data.message;
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

const loginGoogle = async (idToken: string) => {
    const response = await api.post<Response>("/auth/login-google", {
        provider: "Google",
        idToken,
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
    loginGoogle,
    logout,
};

export default AuthService;
