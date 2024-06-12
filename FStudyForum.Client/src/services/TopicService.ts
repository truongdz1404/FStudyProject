// src/services/TopicService.ts
import { Post } from "@/types/post";
import api from "./api";
import { ResponseWith } from "@/types/response";
import { Topic, CreateTopicDTO, UpdateTopicDTO } from "@/types/topic";

// get all
const getAllActiveTopics = async (): Promise<Topic[]> => {
  const response = await api.get<Topic[]>("/Topic/all");
  return response.data;
};

const getPostsByTopic = async (topicId: number): Promise<Post[]> => {
    const response = await api.get<ResponseWith<Post[]>>(`/Topic/${topicId}`);
    return response.data.data;
}
// get by id
const GetTopicById = async (id: number): Promise<Topic> => {
  const response = await api.get<Topic>(`/Topic/${id}`);
  return response.data;
};

// add topic
const create = async (topic: CreateTopicDTO): Promise<Topic> => {
  const response = await api.post<Topic>("/Topic/create", topic);
  return response.data;
};

// update topic
const update = async (id: number, topic: UpdateTopicDTO): Promise<Topic> => {
  const response = await api.put<Topic>(`/Topic/update/${id}`, topic);
  return response.data;
};

// Xóa topic
const Delete = async (id: number): Promise<void> => {
  await api.put<Topic>(`/Topic/delete/${id}`);
};

const TopicService = {
  getAllActiveTopics,
  getPostsByTopic,
  GetTopicById,
  create,
  update,
  Delete,
};

export default TopicService;
