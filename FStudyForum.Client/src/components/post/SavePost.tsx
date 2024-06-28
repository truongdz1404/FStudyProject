import { AxiosError } from "axios";
import SavedPostService from "@/services/SavedPostService";
import { Post } from "@/types/post";
import { Response } from "@/types/response";
import { showErrorToast, showSuccessToast } from "../toast/Toast";

export const handleSavedPost = async (
  post: Post,
  isSaved: boolean,
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>,
  username: string | undefined
) => {
  if (!username) {
    showErrorToast("User is not authenticated");
    return;
  }
  try {
    let response;
    if (!isSaved) {
      response = await SavedPostService.savedPost({
        postId: post.id,
        username,
      });
      showSuccessToast(response.message);
    } else {
      response = await SavedPostService.deletePost(
        username,
        post.id
      );
      showSuccessToast(response.message);
    }
    setIsSaved((prev) => !prev);
  } catch (e) {
    const error = e as AxiosError<Response>;
    showErrorToast(
      (error?.response?.data as Response)?.message || error.message
    );
  }
};
