// src/services/TopicService.ts
import { Post } from "@/types/post";
import api from "./api";
import { Topic } from "@/types/topic";
import { ResponseWith } from "@/types/response";

const getAllActiveTopics = async (): Promise<Topic[]> => {

    const response = await api.get<Topic[]>("/Topic/all");
    return response.data;
  
};

const getPostsByTopic = async (topicId: number): Promise<Post[]> => {
    const response = await api.get<ResponseWith<Post[]>>(`/Topic/${topicId}`);
    return response.data.data;
};

const TopicService = {
  getAllActiveTopics,
  getPostsByTopic,
};

export default TopicService;
