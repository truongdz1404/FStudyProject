import api from "./api";
import { ResponseWith } from "@/types/response";

const votePost = async (postId: number, type: number) => {
  const response = await api.post<ResponseWith<number>>("/vote/post", {
    postId,
    type
  });
  return response.data.data;
};

const VoteService = {
  votePost
};

export default VoteService;
