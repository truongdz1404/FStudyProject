import { ResponseWith } from "@/types/response";
import api from "./api";
import { Post } from "@/types/post";

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
const PostService = {
  getPosts,
  getPostsByTopicId,
  NewestPosts
};
export default PostService;
