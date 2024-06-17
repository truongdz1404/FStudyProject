import { ResponseWith } from "@/types/response";
import api from "./api";
import { CreatePost, Post } from "@/types/post";

const getPosts = async () => {
  const response = await api.get<ResponseWith<Post[]>>(`/post/all`);
  return response.data.data;
};

const getPostsByTopicId = async (topicId: number) => {
  const response = await api.get<ResponseWith<Post[]>>(`/post/topicId=${topicId}`);
  return response.data.data;
};

const NewestPosts = async () => {
  const response = await api.get<ResponseWith<Post[]>>(`/post/newest`);
  return response.data.data;
}
const createPost = async (post: CreatePost) => {
  const response = await api.post<ResponseWith<Post[]>>("/post/create", post);
  return response.data.data;
};
const PostService = {
  getPosts,
  getPostsByTopicId,
  NewestPosts,
  createPost,
};
export default PostService;
