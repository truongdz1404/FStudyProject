import { ResponseWith } from "@/types/response";
import api from "./api";
import { TopicBan, TopicBanDTO } from "@/types/topic";

const isLocked = async (username: string, topicId: number) => {
  const response = await api.post<ResponseWith<TopicBanDTO>>(
    "/topic/is-locked",
    {
      username,
      topicId
    }
  );
  return response.data;
};
const lockedUserByTopic = async (topicban: TopicBan) => {
  const response = await api.post<ResponseWith<TopicBan>>(
    "/topic/locked",
    topicban
  );
  return response.data;
};
const BanUserService = {
  isLocked,
  lockedUserByTopic
};
export default BanUserService;
