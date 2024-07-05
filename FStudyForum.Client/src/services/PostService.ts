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

const get = async (
  type: string,
  pageNumber: number,
  pageSize: number,
  filter: string
) => {
  const response = await api.get<ResponseWith<Post[]>>(
    `/post/${type}?pageNumber=${pageNumber}&pageSize=${pageSize}&filter=${filter}`
  );

  return response.data.data;
};

const getPostsByTopicName = async (topic: string) => {
  const response = await api.get<ResponseWith<Post[]>>(`/post/topic=${topic}`);
  return response.data.data;
};

const getPosts = async () => {
  const response = await api.get<ResponseWith<Post[]>>(`/post/all`);
  return response.data.data;
};

const getPostsByFeature = async (
  topicName: string | null,
  postType: string
) => {
  let response;
  if (topicName) {
    response = await api.get<ResponseWith<Post[]>>(
      `/post/${postType}/topic=${topicName}`
    );
  } else {
    response = await api.get<ResponseWith<Post[]>>(`/post/${postType}`);
  }
  return response.data.data;
};

const create = async (post: CreatePost) => {
  const response = await api.post<ResponseWith<Post>>("/post/create", post);
  return response.data.data;
};

const getById = async (id: string) => {
  const response = await api.get<ResponseWith<Post>>(`/post/${id}`);
  return response.data.data;
};

const addRecentPost = async (postId: number) => {
  const response = await api.post<ResponseWith<Post>>(`/post/recent/${postId}`);
  return response.data;
};

const getRecentPost = async () => {
  const response = await api.get<ResponseWith<Post[]>>("/post/recent");
  return response.data.data;
};

const clearRecentPost = async () => {
  const response = await api.delete<ResponseWith<boolean>>(
    "/post/clear-recent"
  );
  return response.data.data;
};

const PostService = {
  clearRecentPost,
  addRecentPost,
  getRecentPost,
  save,
  removeFromSave,
  isSaved,
  getSavedPosts,
  getPostsByTopicName,
  get,
  create,
  getById,
  getPosts,
  getPostsByFeature
};

export default PostService;
