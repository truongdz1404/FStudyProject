import { FC, useCallback, useEffect, useRef, useState } from "react";
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
  level,
}) => {
  const [voteType, setVoteType] = useState(comment.voteType);
  const [voteCount, setVoteCount] = useState(comment.voteCount);
  const [commentParent, setCommentParent] = useState<Comment>();
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
  }, [comment.replyId]);

  return (
    <div key={comment.id} className={`comment ${level === 1 ? 'pl-10' : ''} ${level === 0 ? 'pb-4' : ''}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center h-full gap-x-2 relative">
          <img
            src={comment.avatar || Default}
            alt="avatar"
            className={level === 0 ? "w-8 h-8 rounded-full" : "w-7 h-7 rounded-full"}
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
                {level !== 1 && comment.replyId && (
                  <span className="text-sm font-medium">
                    <Link to={`/user/${commentParent?.author}`} className="mr-1 font-medium">
                      @{commentParent?.author}:
                    </Link>
                  </span>
                )}
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
                onClick={() => handleReplyClick(comment.id)}
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
                      ref={index + 1 === comment.replies?.length ? lastCommentChildRef : null}
                    >
                      <CommentItem
                        comment={reply}
                        expandedComments={expandedComments}
                        toggleExpand={toggleExpand}
                        handleReplyClick={handleReplyClick}
                        handleDeleteComment={handleDeleteComment}
                        handleCreateReply={handleCreateReply}
                        handleEditComment={handleEditComment}
                        handleSaveEditedComment={handleSaveEditedComment}
                        replyToCommentId={replyToCommentId}
                        editingCommentId={editingCommentId}
                        level={level + 1}
                      />
                    </div>
                  ))}
                </>
              )}
              <div>
                {comment.replies && comment.replies.length > 0 && level === 0 && (
                  <button
                    className="flex space-x-1 w-full pl-10 bg-white"
                    onClick={() => toggleExpand(comment.id)}
                  >
                    {isExpand() ? (
                      <span className="mr-1 flex items-center text-sm">
                        <span className="border-t border-black flex-grow mr-1"></span>
                        View less
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 inline-block transform -rotate-90 ml-1 mt-1"
                          style={{ verticalAlign: 'middle' }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L16.586 12 10.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="mr-1 flex items-center text-sm">
                        <span className="border-b border-black flex-grow mr-1"></span>
                        View more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 inline-block transform rotate-90 ml-1"
                          style={{ verticalAlign: 'middle' }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L16.586 12 10.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
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
