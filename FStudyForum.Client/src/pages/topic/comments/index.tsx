import PostService from "@/services/PostService";
import { AxiosError } from "axios";
import React, { FC } from "react";
import { Response } from "@/types/response";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PostItem from "@/components/post/PostItem";
import { Post } from "@/types/post";
import { ArrowLeft } from "lucide-react";
import { Alert } from "@material-tailwind/react";
interface Props {}

const Comments: FC<Props> = () => {
  const navigate = useNavigate();
  const { name: topicName, id: postId } = useParams<{
    name: string;
    id: string;
  }>();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { state } = useLocation();
  const handleBack = () => {
    if (state?.from) {
      navigate(state?.from);
    } else {
      navigate(`/topic/${topicName}`);
    }
  };
  const [post, setPost] = React.useState<Post | undefined>(state?.data);
  React.useEffect(() => {
    if (!postId || !topicName) {
      setError("Invalid post id or topic name");
      return;
    }
    if (post) return;
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await PostService.getById(postId);
        setPost(data);
      } catch (e) {
        const error = e as AxiosError;
        setError((error?.response?.data as Response)?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [post, postId, topicName]);
  if (error)
    return (
      <Alert color="red" className="p-4">
        {error}
      </Alert>
    );
  if (loading || !post) return null;
  return (
    <div className="relative">
      <div
        onClick={() => handleBack()}
        className="rounded-full bg-blue-gray-50 hover:bg-blue-gray-100 p-2 absolute top-0 -left-6 hidden md:block"
      >
        <ArrowLeft className="w-4 h-4" />
      </div>
      <PostItem data={post} hideLess={false} />
    </div>
  );
};

export default Comments;
