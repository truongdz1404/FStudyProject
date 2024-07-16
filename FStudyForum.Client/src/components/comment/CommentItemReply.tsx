import { FC, useEffect, useRef, useState } from "react";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
} from "lucide-react";
import { Comment } from "@/types/comment";
import ReplyInput from "@/components/comment/ReplyInput";
import MenuItemComment from "@/components/comment/MenuItem";
import CommentEditor from "@/components/comment/CommentEditor";
import Default from "@/assets/images/user.png";
import { cn, formatElapsedTime } from "@/helpers/utils";
import { Link } from "react-router-dom";
import { VoteTypes } from "@/helpers/constants";
import VoteService from "@/services/VoteService";
import CommentService from "@/services/CommentService";

type CommentItemProps = {
  comment: Comment;
  handleReplyClick: (commentId: number | null) => void;
  handleDeleteComment: (id: string) => Promise<void>;
  handleCreateReply: (commentId: number, content: string) => void;
  handleEditComment: (commentId: number | null) => void;
  handleSaveEditedComment: (commentId: number, content: string) => void;
  replyToCommentId: number | null;
  editingCommentId: number | null;
};

const CommentItemReply: FC<CommentItemProps> = ({
  comment,
  handleReplyClick,
  handleDeleteComment,
  handleCreateReply,
  handleEditComment,
  handleSaveEditedComment,
  replyToCommentId,
  editingCommentId,
}) => {
  const [voteType, setVoteType] = useState(comment.voteType);
  const [voteCount, setVoteCount] = useState(comment.voteCount);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [commentParent, setCommentParent] = useState<Comment | undefined>(comment.commentParent);
  const lastCommentChildRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchComments = () => {
      const getAllReplies = (comment: Comment) => {
        let commentsList: Comment[] = [comment];
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach(reply => {
            commentsList = commentsList.concat(getAllReplies(reply));
          });
        }
        return commentsList;
      };

      const commentsList = getAllReplies(comment);
      commentsList.sort((a, b) => a.id - b.id);
      setAllComments(commentsList);
    };

    fetchComments();
  }, [comment]);
  
  useEffect(() => {
    const fetchComments = async () => {
      if (!comment.replyId) return;
      try {
        const data = await CommentService.getCommentById(comment.replyId.toString());
        setCommentParent(data);
      }
      catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [comment]);

  const handleVote = async (type: number) => {
    const realType = voteType === type ? VoteTypes.UNVOTE : type;
    setVoteType(realType);
    setVoteCount(comment.voteCount - comment.voteType + realType);
    try {
      const count = await VoteService.voteComment(comment.id, realType);
      setVoteCount(count);
    } catch (error) {
      setVoteType(voteType);
      setVoteCount(comment.voteCount);
    }
  };

  return (
    <>
      {allComments.map((commentItem, index) => (
        <div key={commentItem.id}
          ref={index + 1 === commentItem.replies?.length ? lastCommentChildRef : null}
          className={`comment pl-10`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center h-full gap-x-2 relative">
              <img
                src={commentItem.avatar || Default}
                alt="avatar"
                className={"w-7 h-7 rounded-full"}
              />
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Link
                    to={`/user/${commentItem.author}`}
                    className="action text-xs font-medium text-gray-800"
                  >
                    {commentItem.author}
                  </Link>
                  <span className="text-xs font-light ml-1">•</span>
                  <span className="text-xs font-light ml-1">
                    {formatElapsedTime(commentItem.elapsed)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col relative">
              <div className="flex-1 ml-10 z-10">
                {editingCommentId === commentItem.id ? (
                  <div className="mb-2">
                    <CommentEditor
                      commentId={commentItem.id}
                      content={commentItem.content}
                      onSave={handleSaveEditedComment}
                      onCancel={() => handleEditComment(null)}
                    />
                  </div>
                ) : (
                  <span className="text-sm break-words min-w-0">
                    <>
                    {console.log(comment.id)}
                    {console.log(commentItem.replyId)}
                    </>
                    {commentItem.replyId !== comment.id && (
                      <span className="text-sm font-medium">
                        <Link to={`/user/${commentParent?.author}`} className="mr-1 font-medium">
                          @{commentParent?.author}:
                        </Link>
                      </span>
                    )}
                    {commentItem.content}
                  </span>
                )}
                <div className="flex space-x-2 text-gray-700">
                  <div className={cn("action flex items-center min-w-0")}>
                    <div
                      className="hover:bg-blue-gray-900/15 rounded-full p-[0.25rem] cursor-pointer"
                      onClick={() => handleVote(VoteTypes.UP)}
                    >
                      <ArrowBigUp
                        strokeWidth={1.2}
                        fill={voteType === VoteTypes.UP ? "#ef5350" : "transparent"}
                        className={cn("w-6 h-6 hover:text-red-400", voteType === VoteTypes.UP && "text-red-400")}
                      />
                    </div>
                    <span className={cn("text-xs font-medium")}>{voteCount}</span>
                    <div
                      className="hover:bg-blue-gray-900/15 rounded-full p-[0.25rem] cursor-pointer"
                      onClick={() => handleVote(VoteTypes.DOWN)}
                    >
                      <ArrowBigDown
                        strokeWidth={1.2}
                        fill={voteType === VoteTypes.DOWN ? "#42a5f5" : "transparent"}
                        className={cn("w-6 h-6 hover:text-blue-400", voteType === VoteTypes.DOWN && "text-blue-400")}
                      />
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex items-center px-3 py-1 rounded-full space-x-2",
                      "bg-blue-gray-30 hover:bg-blue-gray-100/75 cursor-pointer select-none"
                    )}
                    onClick={() => handleReplyClick(commentItem.id)}
                  >
                    <MessageSquare
                      strokeWidth={1.8}
                      className={cn("w-4 h-4")}
                    />
                    <span className={cn("text-xs")}>
                      Reply
                    </span>
                  </div>
                  <div className="action flex items-center">
                    <MenuItemComment
                      key={commentItem.id}
                      comment={commentItem}
                      onDelete={handleDeleteComment}
                      onEdit={handleEditComment}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full z-10 flex">
                <div className="flex-1">
                  {replyToCommentId === commentItem.id && (
                    <div className="mt-2">
                      <ReplyInput
                        commentId={commentItem.id}
                        onSubmit={handleCreateReply}
                        onCancel={() => handleReplyClick(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentItemReply;
