import { ResponseWith } from "@/types/response"
import api from "./api"
import { Topic, CreateTopicDTO, UpdateTopicDTO } from "@/types/topic"
import { Post } from "@/types/post"

const getActiveTopics = async (): Promise<Topic[]> => {
  const response = await api.get<Topic[]>("/topic/active")
  return response.data
}

const getPostsByTopic = async (topicId: number): Promise<Post[]> => {
  const response = await api.get<ResponseWith<Post[]>>(`/topic/${topicId}/posts`);
  return response.data.data;
}


const getTopics = async () => {
  const response = await api.get<ResponseWith<Topic[]>>("/topic")
  return response.data.data
}

const GetTopicById = async (id: number): Promise<Topic> => {
  const response = await api.get<Topic>(`/topic/${id}`)
  return response.data
}

const create = async (topic: CreateTopicDTO): Promise<Topic> => {
  const response = await api.post<Topic>("/topic/create", topic)
  return response.data
}

const update = async (id: number, topic: UpdateTopicDTO): Promise<Topic> => {
  const response = await api.put<Topic>(`/topic/update/${id}`, topic)
  return response.data
}

const Delete = async (id: number): Promise<void> => {
  await api.put<Topic>(`/topic/delete/${id}`)
}

const TopicService = {
  getTopics,
  getActiveTopics,
  getPostsByTopic,
  GetTopicById,
  create,
  update,
  Delete
}

export default TopicService
