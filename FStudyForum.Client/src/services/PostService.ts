
import { ResponseWith } from "@/types/response";
import api from "./api";
import { CreatePost, Post } from "@/types/post";

const getPosts = async () => {
  const response = await api.get<ResponseWith<Post[]>>("/post/all");
  return response.data.data;
};
const createPost = async (post: CreatePost) => {
  const response = await api.post<ResponseWith<Post>>("/post/create", post);
  return response.data.data;
};

const getPostById = async (id: string) => {
  const response = await api.get<ResponseWith<Post>>(`/post?id=${id}`);
  return response.data.data;
};
const PostService = {

  getPosts,
  createPost,
  getPostById
};

export default PostService;
