import { User } from "@/types/user";
import api from "./api";
import { ResponseWith } from "@/types/response";

const getProfile = async () => {
    const response = await api.get<ResponseWith<User>>("/user/profile");
    return (response.data).data;
};

const UserService = {
    getProfile,
};

export default UserService;
