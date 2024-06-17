import { ResponseWith } from "@/types/response";
import api from "./api";
import { Topic, CreateTopicDTO, UpdateTopicDTO } from "@/types/topic";

const getActiveTopics = async (): Promise<Topic[]> => {
  const response = await api.get<Topic[]>("/topic/active-all");
  return response.data;
};


const getTopics = async () => {
  const response = await api.get<ResponseWith<Topic[]>>("/topic/all");
  return response.data.data;
};

const GetTopicByName = async (name: string): Promise<Topic> => {
  const response = await api.get<Topic>(`/topic/${name}`);
  return response.data;
};

const create = async (topic: CreateTopicDTO): Promise<Topic> => {
  const response = await api.post<Topic>("/topic/create", topic);
  return response.data;
};

const update = async (name: string, topic: UpdateTopicDTO): Promise<Topic> => {
  const response = await api.put<Topic>(`/topic/update/${name}`, topic);
  return response.data;
};

const Delete = async (name: string): Promise<void> => {
  await api.put<Topic>(`/topic/delete/${name}`);
};

const TopicService = {
  getTopics,
  getActiveTopics,
  GetTopicByName,
  create,
  update,
  Delete
};

export default TopicService;
