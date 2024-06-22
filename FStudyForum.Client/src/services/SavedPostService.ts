import { SavedPost } from "@/types/savedpost";
import api from "./api";
import { ResponseWith } from "@/types/response";
import { Post } from "@/types/post";

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
const isPostSaved = async (username: string, postId: number) => {
    const response = await api.get<ResponseWith<boolean>>(
        `/post/isPostExists/${username}/${postId}`
    );
    return response.data;
}
const listSavedPosts = async (username: string) => {
    const response = await api.get<ResponseWith<Post[]>>(
        `/post/getSavePost/${username}`
    );
    return response.data.data;
}
const SavedPostService = {
    savedPost,
    deletePost,
    isPostSaved,
    listSavedPosts
};
export default SavedPostService;
