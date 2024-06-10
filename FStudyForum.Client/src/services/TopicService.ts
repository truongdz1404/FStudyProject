// src/services/TopicService.ts
import api from "./api";
import { Topic } from "@/types/topic";

const getAllActiveTopics = async (): Promise<Topic[]> => {

    const response = await api.get<Topic[]>("/Topic/all");
    return response.data;
  
};
const TopicService = {
  getAllActiveTopics,
};

export default TopicService;
