import { User } from "@/types/user";
import api from "./api";
import { ResponseWith } from "@/types/response";
import { Paginated } from "@/types/paginated";

const getProfile = async () => {
  const response = await api.get<ResponseWith<User>>("/user/profile");
  return response.data.data;
};
const getAll = async () => {
  const response = await api.get<ResponseWith<Paginated<User>>>("/user");
  return response.data.data;
};


const search = async (
  keyword: string) => {
  const response = await api.get<ResponseWith<User[]>>(`/user/search?keyword=${keyword}&size=5`);
  return response.data.data;
};

const UserService = {
  getProfile,
  getAll,
  search
};
export default UserService;
