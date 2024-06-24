import { ResponseWith } from "@/types/response";
import api from "./api";
import { CreatePost, Post } from "@/types/post";

const get = async (pageNumber: number, pageSize: number, topic?: number) => {
  const response = await api.get<ResponseWith<Post[]>>(
    `/post/all?pageNumber=${pageNumber}&pageSize=${pageSize}` +
      (topic ? `&topic=${topic}` : "")
  );

  return response.data.data;
};

const create = async (post: CreatePost) => {
  const response = await api.post<ResponseWith<Post>>("/post/create", post);
  return response.data.data;
};

const getById = async (id: string) => {
  const response = await api.get<ResponseWith<Post>>(`/post?id=${id}`);
  return response.data.data;
};
const PostService = {
  get,
  create,
  getById
};
export default PostService;
