import { SavedPost } from "@/types/savedpost";
import api from "./api";
import { ResponseWith } from "@/types/response";

const savedPost = async (savedPost: SavedPost) => {
    const response = await api.post<ResponseWith<SavedPost>>(
        "/post/savepost",
        savedPost
    );
    return response.data;
};
const deletePost = async (username: string, postId: number) => {
    const response = await api.delete<ResponseWith<SavedPost>>(
        `/post/deletePost/${username}/${postId}`
    );
    return response.data;
};
const SavedPostService = {
    savedPost,
    deletePost,
};
export default SavedPostService;
