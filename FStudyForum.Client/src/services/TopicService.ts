import { ResponseWith } from "@/types/response";
import api from "./api";
import {
  Topic,
  CreateTopicDTO,
  UpdateTopicDTO,
  TopicBanDTO,
  Unlocktime,
  TopicBan
} from "@/types/topic";

const getActiveTopics = async (): Promise<Topic[]> => {
  const response = await api.get<Topic[]>("/topic/active-all");
  return response.data;
};


const getTopics = async () => {
  const response = await api.get<ResponseWith<Topic[]>>("/topic/all");
  return response.data.data;
};

const getTopicByName = async (name: string) => {
  const response = await api.get<ResponseWith<Topic>>(`/topic/${name}`);
  return response.data.data;
};

const create = async (topic: CreateTopicDTO): Promise<Topic> => {
  const response = await api.post<Topic>("/topic/create", topic);
  return response.data;
};

const update = async (name: string, topic: UpdateTopicDTO): Promise<Topic> => {
  const response = await api.put<Topic>(`/topic/update/${name}`, topic);
  return response.data;
};

const deleteTopic = async (name: string): Promise<void> => {
  await api.put<Topic>(`/topic/delete/${name}`);
};

const isLocked = async (username: string, topicName: string) => {
  const response = await api.post<ResponseWith<TopicBanDTO>>(
    "/topic/is-locked",
    {
      username,
      topicName
    }
  );
  return response.data;
};
const unlockTime = async (username: string, topicName: string) => {
  const response = await api.post<ResponseWith<Unlocktime>>(
    "/topic/unlock-time",
    {
      username,
      topicName
    }
  );
  return response.data;
};
const unban = async (username: string, topicName: string) => {
  const response = await api.post<ResponseWith<Unlocktime>>("/topic/unlocked", {
    username,
    topicName
  });
  return response.data;
};

const ban = async (topicban: TopicBan) => {
  const response = await api.post<ResponseWith<TopicBan>>(
    "/topic/locked",
    topicban
  );
  return response.data;
};

const search = async (value: string) => {
  const response = await api.get<ResponseWith<Topic[]>>(
    "/topic/search?value=" + value + "&size=10"
  );
  return response.data.data;
};
const topicByPost = async (postId: number) => {
  const response = await api.get<ResponseWith<Topic>>(
    `/topic/getTopicByPost/${postId}`
  );
  return response.data.data;
};
const TopicService = {
  getTopics,
  getActiveTopics,
  getTopicByName,
  search,
  create,
  update,
  isLocked,
  unlockTime,
  unban,
  ban,
  deleteTopic,
  topicByPost
};

export default TopicService;
