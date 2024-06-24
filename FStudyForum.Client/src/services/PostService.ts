import { ResponseWith } from "@/types/response";
import api from "./api";
import { CreatePost, Post } from "@/types/post";

const getPosts = async () => {
  const response = await api.get<ResponseWith<Post[]>>(`/post/all`);
  return response.data.data;
};

const getPostsByTopicId = async (topicId: number) => {
  console.log("Get posts by topic id");
  const response = await api.get<ResponseWith<Post[]>>(`/post/topicId=${topicId}`);
  return response.data.data;
};

const getPostsByFeature = async (topicId: number | null, postType: string) => {
  let response
  if (topicId) {
    response = await api.get<ResponseWith<Post[]>>(`/post/${postType}/topicId=${topicId}`);
  } else {
    response = await api.get<ResponseWith<Post[]>>(`/post/${postType}`);
  }
  return response.data.data;
}

const getPostById = async (postId: number) => {
  const response = await api.get<ResponseWith<Post>>(`/post/${postId}`);
  return response.data.data;
};

const createPost = async (post: CreatePost) => {
  const response = await api.post<ResponseWith<Post[]>>("/post/create", post);
  return response.data.data;
};
const PostService = {
  getPosts,
  getPostsByTopicId,
  getPostsByFeature,
  getPostById,
  createPost,
};
export default PostService;
