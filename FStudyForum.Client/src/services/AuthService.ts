import api from "./api";
import { Response } from "@/types/response";

const login = async (username: string, password: string) => {
  const response = await api.post<Response>("/auth/login", {
    username,
    password,
  });
  return response.data.message;
};

const register = async (username: string, password: string) => {
  const response = await api.post<Response>("/auth/register", {
    username,
    password,
  });
  return response.data.message;
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

const resendEmail = async (email: string) => {
  const response = await api.post<Response>(
    `/auth/resend-confirm-email?email=${email}`,
    {
      params: { email },
    }
  );
  return response.data.message;
};

const AuthService = {
  refreshToken,
  login,
  loginGoogle,
  logout,
  register,
  resendEmail,
};

export default AuthService;
