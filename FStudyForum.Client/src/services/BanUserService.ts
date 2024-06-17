import { ResponseWith } from "@/types/response";
import api from "./api";
import { TopicBanDTO } from "@/types/topic";

const isLoked = async(username: string, topicId: number) => {
    const response = await api.post<ResponseWith<TopicBanDTO>>("/topic/is-locked",{
      username,
      topicId
    });
    return response.data;
  }
const BanUserService = {
    isLoked
}
export default BanUserService