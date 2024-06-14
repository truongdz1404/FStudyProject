import { SavedPost } from "@/types/savedpost";
import api from "./api";
import { ResponseWith } from "@/types/response";

const savedPost = async (savedPost: SavedPost) => {
    const response = await api.post<ResponseWith<SavedPost>>("/savepost/add",savedPost);
    return response.data;
}
const SavedPostService = {
    savedPost
};
export default SavedPostService;