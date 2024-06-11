import { ResponseArray, ResponseWith } from "@/types/response";
import api from "./api";
import { Post } from "@/types/post";

const getPosts = async (page: number) => {
    const response = await api.get<ResponseArray<Post>>(`post/${page}`);
    return response.data;
};
const PostService = {
    getPosts,
};
export default PostService;
