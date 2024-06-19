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

const getHotPosts = async (topicId: number | null) => {
  console.log("Get hot posts");
  let response
  if (topicId) {
    response = await api.get<ResponseWith<Post[]>>(`/post/hot/topicId=${topicId}`);
  } else {
    response = await api.get<ResponseWith<Post[]>>(`/post/hot`);
  }
  return response.data.data;
}

const getNewPosts = async (topicId: number | null) => {
  console.log("Get new posts");
  let response
  if (topicId) {
    response = await api.get<ResponseWith<Post[]>>(`/post/new/topicId=${topicId}`);
  } else {
    response = await api.get<ResponseWith<Post[]>>(`/post/new`);
  }
  return response.data.data;
}
const createPost = async (post: CreatePost) => {
  const response = await api.post<ResponseWith<Post[]>>("/post/create", post);
  return response.data.data;
};
const PostService = {
  getPosts,
  getPostsByTopicId,
  getNewPosts,
  getHotPosts,
  createPost,
};
export default PostService;
