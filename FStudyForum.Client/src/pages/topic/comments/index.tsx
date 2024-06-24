import { FC, useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowBigUp, ArrowBigDown, MessageSquare, Share, Plus, Minus } from "lucide-react";
import { Alert } from "@material-tailwind/react";
import PostService from "@/services/PostService";
import CommentService from "@/services/CommentService";
import PostItem from "@/components/post/PostItem";
import { Post } from "@/types/post";
import { Response } from "@/types/response";
import { Comment, CreateComment } from "@/types/comment";
import MenuItemPost from "@/components/post/MenuItem";
import CommentInput from "@/components/comment/CommentInput";
import ReplyInput from "@/components/comment/ReplyInput";

interface Props { }

const Comments: FC<Props> = () => {
  const navigate = useNavigate();
  const { name: topicName, id: postId } = useParams<{ name: string; id: string }>();
  const { state } = useLocation();
  const [post, setPost] = useState<Post | undefined>(state?.data);
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});

  const initializeExpandedComments = (comments: Comment[]) => {
    const expanded: { [key: number]: boolean } = {};
    const traverseComments = (commentList: Comment[]) => {
      commentList.forEach((comment) => {
        expanded[comment.id] = !comment.replies || comment.replies.length < 2;
        if (comment.replies) {
          traverseComments(comment.replies);
        }
      });
    };
    traverseComments(comments);
    return expanded;
  };

  useEffect(() => {
    if (!postId || !topicName) {
      setError("Invalid post id or topic name");
      return;
    }
    if (post) return;
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await PostService.getPostById(postId);
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

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await CommentService.getCommentsByPostId(postId);
        const structuredComments = structureComments(data || []);
        setComments(structuredComments);
        setExpandedComments(initializeExpandedComments(structuredComments));
      } catch (e) {
        const error = e as AxiosError;
        setError((error?.response?.data as Response)?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  const structureComments = (comments: Comment[]) => {
    const map: { [key: number]: Comment } = {};
    const roots: Comment[] = [];
    comments.forEach((comment) => {
      comment.replies = [];
      map[comment.id] = comment;
      if (comment.replyId == null) {
        roots.push(comment);
      } else {
        if (map[comment.replyId]) {
          map[comment.replyId].replies?.push(comment);
        } else {
          map[comment.replyId] = { ...comment, replies: [comment] };
        }
      }
    });
    return roots;
  };

  const handleBack = () => {
    if (state?.from) {
      navigate(state?.from);
    } else {
      navigate(`/topic/${topicName}`);
    }
  };

  const handleCreateComment = async (content: string) => {
    try {
      if (!postId) return;
      const newCommentData = await CommentService.createComment({
        postId: Number(postId),
        content,
      } as CreateComment);
      setComments([...comments, newCommentData]);
    } catch (e) {
      const error = e as AxiosError;
      setError((error?.response?.data as Response)?.message || error.message);
    }
  };

  const addReplyToComments = (comments: Comment[], reply: Comment, commentId: number): Comment[] => {
    return comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, replies: [...(comment.replies || []), reply] };
      }
      if (comment.replies && comment.replies.length > 0) {
        return { ...comment, replies: addReplyToComments(comment.replies, reply, commentId) };
      }
      return comment;
    });
  };

  const handleCreateReply = async (commentId: number, content: string) => {
    try {
      if (!postId) return;
      const newReplyData = await CommentService.createComment({
        postId: Number(postId),
        replyId: commentId,
        content,
      } as CreateComment);
      const updatedComments = addReplyToComments(comments, newReplyData, commentId);
      setComments(updatedComments);
      setReplyToCommentId(null);
    } catch (e) {
      const error = e as AxiosError;
      setError((error?.response?.data as Response)?.message || error.message);
    }
  };

  const handleReplyClick = (commentId: number) => {
    setReplyToCommentId(commentId);
  };

  const toggleExpand = (commentId: number) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderComment = (comment: Comment, level = 0) => (

    <div key={comment.id} className="border-b py-2" style={{ marginLeft: level * 20 }}>
      <div className="flex mb-2">
        <img
          src="https://preview.redd.it/snoovatar/avatars/nftv2_bmZ0X2VpcDE1NToxMzdfNzg2MWVmZmVhZDUzMWI2MGQ3YTE5NDhlMGQ5OTRiMzU1MTU2ZmU2NV8xOTU_rare_dc319928-6fcd-434b-bc82-7e58c385461f-headshot.png?width=64&height=64&crop=smart&auto=webp&s=515bf177007c6cc7c32f0837cd9dfb7f127bcbe0"
          alt="avatar"
          className="w-8 h-8 rounded-full mr-2"
          style={{ flexShrink: 0 }}
        />
        <div className="flex flex-col w-full">
          <div className="flex items-center" style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            <span className="font-bold text-sm">{comment.author}</span>
          </div>
          <span className="text-xs text-gray-500">{comment.createdAt}</span>
          <span className="font text-sm">{comment.content}</span>
          <div
            className="flex space-x-7 text-bold-black-700"
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          >
            <div className="action flex items-center rounded-full bg-blue-gray-30">
              <div className="hover:bg-blue-gray-100/75 rounded-full p-[0.25rem] cursor-pointer">
                <ArrowBigUp strokeWidth={1.2} className="w-6 h-6 hover:text-red-400" />
              </div>
              <span className="text-xs font-medium">{comment.voteCount}</span>
              <div className="hover:bg-blue-gray-100/75 rounded-full p-[0.25rem] cursor-pointer">
                <ArrowBigDown strokeWidth={1.2} className="w-6 h-6 hover:text-blue-400" />
              </div>
            </div>
            <div
              className="flex items-center px-3 py-1 rounded-full space-x-2 bg-blue-gray-30 hover:bg-blue-gray-100/75 cursor-pointer"
              onClick={() => handleReplyClick(comment.id)}
            >
              <MessageSquare strokeWidth={1.8} className="w-4 h-4" />
              <span className="text-xs">Reply</span>
            </div>
            <div className="action flex items-center space-x-2 px-3 rounded-full bg-blue-gray-30 hover:bg-blue-gray-100/75 transition cursor-pointer">
              <Share className="w-4 h-4" strokeWidth={1.8} />
              <span className="text-xs">Share</span>
            </div>
            <div className="action flex items-center">
              <MenuItemPost />
            </div>
          </div>
          {replyToCommentId === comment.id && (
            <ReplyInput
              commentId={comment.id}
              onSubmit={handleCreateReply}
              onCancel={() => setReplyToCommentId(null)}
            />
          )}
          {comment.replies && comment.replies.length > 0 && (
            <>
              <button
                className="text-xs text-blue-500 flex items-center space-x-1"
                onClick={() => toggleExpand(comment.id)}
              >
                {expandedComments[comment.id] ? <Minus size={12} /> : <Plus size={12} />}
                <span>{expandedComments[comment.id] ? '' : `${comment.replies.length} replies`}</span>
              </button>
              {expandedComments[comment.id] && (
                <div className="ml-4 border-l-2 pl-2">
                  {comment.replies.map(reply => renderComment(reply, level + 1))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (loading || !post) return null;
  return (
    <div className="relative">
      {error && (
        <Alert color="red" className="mb-4">
          {error}
        </Alert>
      )}
      {loading && <p>Loading...</p>}
      <div onClick={handleBack} className="rounded-full bg-blue-gray-50 hover:bg-blue-gray-100 p-2 absolute top-0 -left-6 hidden md:block">
        <ArrowLeft className="w-4 h-4" />
      </div>
      <PostItem data={post} hideLess={false} />
      <CommentInput onSubmit={handleCreateComment} />
      <div className="mt-4">
        {comments && comments.length > 0 ? (
          comments.map(comment => renderComment(comment))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
