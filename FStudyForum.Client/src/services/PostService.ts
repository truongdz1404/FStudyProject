import { ResponseArray, ResponseWith} from "@/types/response";
import api from "./api"
import { Post } from "@/types/post";

const getPosts = async () => {
  const response = await api.get<ResponseWith<Post[]>>("/post/all");
  return response.data.data;
};
const PostService = {
    getPosts
}
export default PostService;
