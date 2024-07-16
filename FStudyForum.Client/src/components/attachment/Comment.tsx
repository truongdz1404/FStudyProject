import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { Alert, Spinner } from "@material-tailwind/react";
import CommentService from "@/services/CommentService";
import AttachmentItem from "@/components/post/PostItemAttachment";
import { Response } from "@/types/response";
import { Comment, CreateComment } from "@/types/comment";
import CommentInput from "@/components/comment/CommentInput";
import ContentLayout from "@/components/layout/ContentLayout";
import CommentItem from "@/components/comment/CommentItemAttachment";
import TopicDescription from "@/components/topic/TopicDescription";
import { useRouterParam } from "@/hooks/useRouterParam";

const CommentBox = () => {
  const { name: topicName, id: postId, attachmentId } = useParams<{
    name: string;
    id: string;
    attachmentId: string;
  }>();

  const { post } = useRouterParam();
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedComments, setExpandedComments] = useState<{
    [key: number]: boolean;
  }>({});

  const initializeExpandedComments = (
    comments: Comment[],
    amount: number = 1
  ) => {
    const expanded: { [key: number]: boolean } = {};
    const traverseComments = (commentList: Comment[]) => {
      commentList.forEach(comment => {
        expanded[comment.id] =
          !comment.replies || comment.replies.length < amount;
        if (comment.replies) {
          traverseComments(comment.replies);
        }
      });
    };
    traverseComments(comments);
    return expanded;
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (!attachmentId) return;
      setLoading(true);
      try {
        const data = await CommentService.getCommentsByAttachmentId(attachmentId);
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
  }, [attachmentId]);

  const structureComments = (comments: Comment[]) => {
    const map: { [key: number]: Comment } = {};
    const roots: Comment[] = [];
    comments.forEach(comment => {
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


  const handleDeleteComment = async (id: string) => {
    try {
      await CommentService.deleteComment(id);
      setComments(prevComments => removeCommentById(prevComments, Number(id)));
    } catch (e) {
      const error = e as AxiosError<Response>;
      setError((error?.response?.data as Response)?.message || error.message);
    }
  };

  const removeCommentById = (comments: Comment[], id: number): Comment[] => {
    return comments
      .filter(comment => comment.id !== id)
      .map(comment => ({
        ...comment,
        replies: removeCommentById(comment.replies || [], id)
      }));
  };

  const handleCreateComment = async (content: string) => {
    try {
      if (!postId) return;
      const newCommentData = await CommentService.createComment({
        postId: Number(postId),
        content,
        attachmentId: Number(attachmentId)
      } as CreateComment);

      const updatedComment = await CommentService.getCommentById(
        newCommentData.id.toString()
      );
      setComments([...comments, updatedComment]);
    } catch (e) {
      const error = e as AxiosError;
      setError((error?.response?.data as Response)?.message || error.message);
    }
  };

  const handleCreateReply = async (commentId: number, content: string) => {
    try {
      if (!postId) return;
      const newReplyData = await CommentService.createComment({
        postId: Number(postId),
        replyId: commentId,
        content,
        attachmentId: Number(attachmentId)
      } as CreateComment);
  
      const updatedReply = await CommentService.getCommentById(newReplyData.id.toString());
      updatedReply.commentParent =  (await CommentService.getCommentById(commentId.toString())).author;
      const updatedComments = await addReplyToComments(comments, updatedReply, commentId);
      setComments(updatedComments);
      setReplyToCommentId(null);
      setExpandedComments(initializeExpandedComments(updatedComments, 100));
    } catch (e) {
      const error = e as AxiosError;
      setError((error?.response?.data as Response)?.message || error.message);
    }
  };
  
  const addReplyToComments = async (
    comments: Comment[],
    reply: Comment,
    commentId: number
  ): Promise<Comment[]> => {
    const updatedComments = await Promise.all(comments.map(async comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: await addReplyToComments(comment.replies, reply, commentId)
        };
      }
      return comment;
    }));
    return updatedComments;
  };  


  const handleReplyClick = (commentId: number | null) => {
    setReplyToCommentId(commentId);
  };
  const handleEditComment = (commentId: number | null) => {
    setEditingCommentId(commentId);
  };

  const handleSaveEditedComment = async (
    commentId: number,
    content: string
  ) => {
    try {
      await CommentService.updateComment(commentId.toString(), { content });
      setComments(prevComments =>
        updateCommentInTree(prevComments, commentId, content)
      );
      setEditingCommentId(null);
    } catch (e) {
      const error = e as AxiosError;
      setError((error?.response?.data as Response)?.message || error.message);
    }
  };

  const updateCommentInTree = (
    comments: Comment[],
    commentId: number,
    content: string
  ): Comment[] => {
    return comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, content };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentInTree(comment.replies, commentId, content)
        };
      }
      return comment;
    });
  };

  const toggleExpand = (commentId: number) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  if (loading || !post) return <Spinner className="mx-auto" />;

  return (
    <ContentLayout pannel={topicName ? <TopicDescription /> : undefined}>
      <div className="relative">
        {error && (
          <Alert color="red" className="mb-4">
            {error}
          </Alert>
        )}
        {loading && <p>Loading...</p>}
        <AttachmentItem data={post} hideLess={false} />
        <div className="px-4 pb-5">
          <CommentInput onSubmit={handleCreateComment} />
        </div>
        <div className="px-4">
          {comments && comments.length > 0 ? (
            comments
              .slice()
              .reverse()
              .map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  level={0}
                  expandedComments={expandedComments}
                  toggleExpand={toggleExpand}
                  handleReplyClick={handleReplyClick}
                  handleDeleteComment={handleDeleteComment}
                  handleCreateReply={handleCreateReply}
                  handleEditComment={handleEditComment}
                  handleSaveEditedComment={handleSaveEditedComment}
                  replyToCommentId={replyToCommentId}
                  editingCommentId={editingCommentId}
                />
              ))
          ) : (
            <p className="text-sm text-center">No comments yet</p>
          )}
        </div>

      </div>
    </ContentLayout>
  );
};

export default CommentBox;