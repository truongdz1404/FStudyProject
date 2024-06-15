<<<<<<< HEAD
import { ResponseWith } from "@/types/response"
import api from "./api"
import { Post } from "@/types/post"

const getPosts = async (page: number) => {
  const response = await api.get<ResponseWith<Post[]>>(`post/${page}`)
  return response.data.data
}
const PostService = {
  getPosts
}
export default PostService
=======
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
>>>>>>> 59719471ea37cc689097898e9fc0649f2bc475bb
