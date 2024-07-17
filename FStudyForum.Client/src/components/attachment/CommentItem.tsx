import { FC, useCallback, useRef, useState } from "react";
import { ArrowBigUp, ArrowBigDown, MessageSquare, ArrowUp } from "lucide-react";
import { Comment } from "@/types/comment";
import ReplyInput from "@/components/comment/ReplyInput";
import MenuItemComment from "@/components/comment/MenuItem";
import CommentEditor from "@/components/comment/CommentEditor";
import Default from "@/assets/images/user.png";
import { cn, formatElapsedTime } from "@/helpers/utils";
import { Link } from "react-router-dom";
import { VoteTypes } from "@/helpers/constants";
import VoteService from "@/services/VoteService";
import CommentItemReply from "../comment/CommentItemReply";

type CommentItemProps = {
  comment: Comment;
  expandedComments: { [key: number]: boolean };
  toggleExpand: (commentId: number) => void;
  handleReplyClick: (commentId: number | null) => void;
  handleDeleteComment: (id: string) => Promise<void>;
  handleCreateReply: (commentId: number, content: string) => void;
  handleEditComment: (commentId: number | null) => void;
  handleSaveEditedComment: (commentId: number, content: string) => void;
  replyToCommentId: number | null;
  editingCommentId: number | null;
  level: number;
};

const CommentItem: FC<CommentItemProps> = ({
  comment,
  expandedComments,
  toggleExpand,
  handleReplyClick,
  handleDeleteComment,
  handleCreateReply,
  handleEditComment,
  handleSaveEditedComment,
  replyToCommentId,
  editingCommentId,
  level
}) => {
  const [voteType, setVoteType] = useState(comment.voteType);
  const [voteCount, setVoteCount] = useState(comment.voteCount);
  const lastCommentChildRef = useRef<HTMLDivElement>(null);

  const isExpand = useCallback(
    () => expandedComments[comment.id],
    [comment.id, expandedComments]
  );

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
    <div key={comment.id} className={`comment pb-4`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center h-full gap-x-2 relative">
          <img
            src={comment.avatar || Default}
            alt="avatar"
            className={"w-8 h-8 rounded-full"}
          />
          <div className="flex flex-col">
            <div className="flex items-center">
              <Link
                to={`/user/${comment.author}`}
                className="action text-xs font-medium text-gray-800"
              >
                {comment.author}
              </Link>
              <span className="text-xs font-light ml-1">•</span>
              <span className="text-xs font-light ml-1">
                {formatElapsedTime(comment.elapsed)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col relative">
          <div className="flex-1 ml-10 z-10">
            {editingCommentId === comment.id ? (
              <div className="mb-2">
                <CommentEditor
                  commentId={comment.id}
                  content={comment.content}
                  onSave={handleSaveEditedComment}
                  onCancel={() => handleEditComment(null)}
                />
              </div>
            ) : (
              <span className="text-sm break-words min-w-0">
                {comment.content}
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
                    className={cn(
                      "w-6 h-6 hover:text-red-400",
                      voteType === VoteTypes.UP && "text-red-400"
                    )}
                  />
                </div>
                <span className={cn("text-xs font-medium")}>{voteCount}</span>
                <div
                  className="hover:bg-blue-gray-900/15 rounded-full p-[0.25rem] cursor-pointer"
                  onClick={() => handleVote(VoteTypes.DOWN)}
                >
                  <ArrowBigDown
                    strokeWidth={1.2}
                    fill={
                      voteType === VoteTypes.DOWN ? "#42a5f5" : "transparent"
                    }
                    className={cn(
                      "w-6 h-6 hover:text-blue-400",
                      voteType === VoteTypes.DOWN && "text-blue-400"
                    )}
                  />
                </div>
              </div>
              <div
                className={cn(
                  "flex items-center px-3 py-1 rounded-full space-x-2",
                  "bg-blue-gray-30 hover:bg-blue-gray-100/75 cursor-pointer select-none"
                )}
                onClick={() => handleReplyClick(comment.id)}
              >
                <MessageSquare strokeWidth={1.8} className={cn("w-4 h-4")} />
                <span className={cn("text-xs")}>Reply</span>
              </div>
              <div className="action flex items-center">
                <MenuItemComment
                  key={comment.id}
                  comment={comment}
                  onDelete={handleDeleteComment}
                  onEdit={handleEditComment}
                />
              </div>
            </div>
          </div>
          <div className="w-full z-10 flex">
            <div className="flex-1">
              {replyToCommentId === comment.id && (
                <div className="mt-2">
                  <ReplyInput
                    commentId={comment.id}
                    onSubmit={handleCreateReply}
                    onCancel={() => handleReplyClick(null)}
                  />
                </div>
              )}
              {expandedComments[comment.id] && (
                <>
                  {comment.replies?.map((reply, index) => (
                    <div
                      key={reply.id}
                      ref={
                        index + 1 === comment.replies?.length
                          ? lastCommentChildRef
                          : null
                      }
                    >
                      <CommentItemReply
                        key={reply.id}
                        comment={reply}
                        handleReplyClick={handleReplyClick}
                        handleDeleteComment={handleDeleteComment}
                        handleCreateReply={handleCreateReply}
                        handleEditComment={handleEditComment}
                        handleSaveEditedComment={handleSaveEditedComment}
                        replyToCommentId={replyToCommentId}
                        editingCommentId={editingCommentId}
                      />
                    </div>
                  ))}
                </>
              )}
              <div>
                {comment.replies &&
                  comment.replies.length > 0 &&
                  level === 0 && (
                    <button
                      className="flex space-x-1 w-full pl-10 bg-white"
                      onClick={() => toggleExpand(comment.id)}
                    >
                      <span className="mr-1 flex items-center text-xs text-gray-600">
                        <span className="mr-2">
                          <ArrowUp
                            size={12}
                            className={cn(
                              "transition-transform",
                              !isExpand() ? "rotate-180" : ""
                            )}
                          />
                        </span>
                        {isExpand() ? "Hide replies" : "Show replies"}
                      </span>
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
