import api from "./api"
import { Response, ResponseWith } from "@/types/response"
import { Profile } from "@/types/profile"

const getByUsername = async (username: string) => {
  const response = await api.get<ResponseWith<Profile>>(`/profile/${username}`)
  return response.data.data
}
const update = async (username: string, profile: Profile) => {
  const response = await api.put<Response>(`/profile/edit/${username}`, profile)
  return response.data
}
const create = async (profile: Profile) => {
  const response = await api.post<Response>(`/profile/create`, profile)
  return response.data
}
const ProfileService = {
  getByUsername,
  update,
  create
}
export default ProfileService
