import { EditUser, User } from "@/types/user";
import api from "./api";
import { ResponseWith, Response, ResponseWithPagniate } from "@/types/response";
import { Paginated } from "@/types/paginated";
import { Profile } from "@/types/profile";
import { Topic } from "@/types/topic";

const getProfile = async () => {
  const response = await api.get<ResponseWith<User>>("/user/profile");
  return response.data.data;
};
const getAll = async (
  pageNumber: number,
  pageSize: number,
  keyword: string
) => {
  const response = await api.get<ResponseWith<Paginated<User>>>(
    `/user/all?pageNumber=${pageNumber}&pageSize=${pageSize}${
      keyword ? `&search=${keyword}` : ""
    }`
  );
  return response.data.data;
};

const search = async (keyword: string) => {
  const response = await api.get<ResponseWith<Profile[]>>(
    `/user/search?keyword=${keyword}&size=5`
  );
  return response.data.data;
};

const edit = async (payload: EditUser) => {
  const response = await api.post<Response>(`/user/edit`, payload);
  return response.data.message;
};

const getMods = async (pageNumber: number, pageSize: number) => {
  const response = await api.get<ResponseWithPagniate<Topic>>(
    `/user/mods?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  return response.data.data;
};

const UserService = {
  getProfile,
  getAll,
  search,
  edit,
  getMods
};
export default UserService;
