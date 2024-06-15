import api from "./api"
import { Response } from "@/types/response"

const login = async (username: string, password: string) => {
  const response = await api.post<Response>("/auth/login", {
    username,
    password
  })
  return response.data.message
}

const register = async (username: string, password: string) => {
  const response = await api.post<Response>("/auth/register", {
    username,
    password
  })
  return response.data.message
}

const loginGoogle = async (idToken: string) => {
  const response = await api.post<Response>("/auth/login-google", {
    provider: "Google",
    idToken
  })
  return response.data.message
}

const logout = async () => {
  const response = await api.post<Response>("/auth/logout")
  return response.data.message
}

const resendEmail = async (email: string) => {
  const response = await api.post<Response>(
    `/auth/resend-confirm-email?email=${email}`
  )
  return response.data.message
}

const forgotPassword = async (email: string) => {
  await api.post("/auth/forgot-password", { email })
}

const changePassword = async (
  token: string,
  email: string,
  password: string
) => {
  const response = await api.post<Response>("/auth/change-password", {
    token,
    email,
    password
  })
  return response.data.message
}

const AuthService = {
  login,
  loginGoogle,
  logout,
  register,
  resendEmail,
  forgotPassword,
  changePassword
}

export default AuthService
