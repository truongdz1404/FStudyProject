import { ResponseWith } from "@/types/response";
import api from "./api";
import { CreatePost, Post, SavePost } from "@/types/post";

const save = async (postId: number) => {
  const response = await api.post<ResponseWith<SavePost>>(
    `/post/save/${postId}`
  );
  return response.data;
};
const removeFromSave = async (postId: number) => {
  const response = await api.delete<ResponseWith<SavePost>>(
    `/post/remove-save/${postId}`
  );
  return response.data;
};
const isSaved = async (username: string, postId: number) => {
  const response = await api.get<ResponseWith<boolean>>(
    `/post/saved/${username}/${postId}`
  );
  return response.data;
};
const getSavedPosts = async (username: string) => {
  const response = await api.get<ResponseWith<Post[]>>(
    `/post/saved-all/${username}`
  );
  return response.data.data;
};

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
  save,
  removeFromSave,
  isSaved,
  getSavedPosts,
  get,
  create,
  getById
};

export default PostService;
