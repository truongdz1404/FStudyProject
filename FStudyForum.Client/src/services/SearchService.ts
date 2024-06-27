import { ResponseWith } from "@/types/response";
import api from "./api";
import { Comment } from "@/types/comment";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import { Topic } from "@/types/topic";

const searchComments = async (keyword: string) => {
  const response = await api.get<ResponseWith<Comment[]>>(`/search/comment?keyword=${keyword}`);
  return response.data.data;
};

const searchPosts = async (keyword: string) => {
  const response = await api.get<ResponseWith<Post[]>>(`/search/post?keyword=${keyword}`);
  return response.data.data;
};

const searchUsers = async (keyword: string) => {
  const response = await api.get<ResponseWith<User[]>>(`/search/user?keyword=${keyword}`);
  return response.data.data;
};

const searchTopics = async (keyword: string) => {
  const response = await api.get<ResponseWith<Topic[]>>(`/search/topic?keyword=${keyword}`);
  return response.data.data;
};

const SearchService = {
  searchComments,
  searchPosts,
  searchUsers,
  searchTopics,
};

export default SearchService;
