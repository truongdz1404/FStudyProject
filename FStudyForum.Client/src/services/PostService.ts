import { ResponseWith } from "@/types/response";
import api from "./api";
import { CreatePost, Post } from "@/types/post";

const get = async (
  type: string,
  pageNumber: number,
  pageSize: number,
  feature?: string,
  topic?: number
) => {
  const response = await api.get<ResponseWith<Post[]>>(
    `/post/${type}?pageNumber=${pageNumber}&pageSize=${pageSize}` +
      (feature !== "" ? `&Feature=${feature}` : "") +
      (topic !== -1 ? `&TopicId=${topic}` : "")
  );

  return response.data.data;
};

const getPostsByTopicName = async (topic: string) => {
  console.log("Get posts by topic id");
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
  const response = await api.get<ResponseWith<Post>>(`/post?id=${id}`);
  return response.data.data;
};
const PostService = {
  getPostsByTopicName,
  get,
  create,
  getById,
  getPosts,
  getPostsByFeature
};

export default PostService;
