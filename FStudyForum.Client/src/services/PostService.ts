import { ResponseWith } from "@/types/response"
import api from "./api"
import { Post } from "@/types/post"

const getPosts = async (page: number) => {
  const response = await api.get<ResponseWith<Post[]>>(`post/${page}`)
  return response.data.data
}
const PostService = {
  getPosts
}
export default PostService
