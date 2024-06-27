import { FC } from "react";
import { ArrowBigUp, ArrowBigDown, MessageSquare, Plus, Minus } from "lucide-react";
import { Comment } from "@/types/comment";
import ReplyInput from "@/components/comment/ReplyInput";
import MenuItemComment from "@/components/comment/MenuItem";
import CommentUpdate from "@/components/comment/CommentUpdate";
import Default from "@/assets/images/user.png";
import { cn, formatElapsedTime } from "@/helpers/utils";
import { Link } from "react-router-dom";
import { VOTE_TYPE } from "@/helpers/constants";
import React from "react";
import VoteService from "@/services/VoteService";

type CommentItemProps = {
  comment: Comment;
  level: number;
  expandedComments: { [key: number]: boolean };
  toggleExpand: (commentId: number) => void;
  handleReplyClick: (commentId: number | null) => void;
  handleDeleteComment: (id: string) => Promise<void>;
  handleCreateReply: (commentId: number, content: string) => void;
  handleEditComment: (commentId: number | null) => void;
  handleSaveEditedComment: (commentId: number, content: string) => void;
  replyToCommentId: number | null;
  editingCommentId: number | null;
}

const CommentItem: FC<CommentItemProps> = ({
  comment,
  level,
  expandedComments,
  toggleExpand,
  handleReplyClick,
  handleDeleteComment,
  handleCreateReply,
  handleEditComment,
  handleSaveEditedComment,
  replyToCommentId,
  editingCommentId,
}) => {

  const [voteType, setVoteType] = React.useState(comment.voteType);
  const [voteCount, setVoteCount] = React.useState(comment.voteCount);

  React.useEffect(() => {
    setVoteType(comment.voteType);
    setVoteCount(comment.voteCount);
  }, [comment]);

  const handleVote = async (type: number) => {
    const realType = voteType === type ? VOTE_TYPE.UNVOTE : type;
    setVoteType(realType);
    setVoteCount((prevCount) =>
      prevCount +
      (realType === VOTE_TYPE.UP ? 1 : realType === VOTE_TYPE.DOWN ? -1 : 0)
    );
    try {
      const count = await VoteService.voteComment(comment.id, realType);
      setVoteCount(count);
    } catch (error) {
      // Quay lại trạng thái bỏ phiếu trước đó nếu có lỗi
      setVoteType(voteType);
      setVoteCount(comment.voteCount);
    }
  };

  return (
    <div key={comment.id} className="py-2" style={{ marginLeft: level * 20 }}>
      <div className="flex mb-2">
        <img
          src={comment.avatar || Default}
          alt="avatar"
          className="w-8 h-8 rounded-full mr-2"
          style={{ flexShrink: 0 }}
        />
        <div className="flex flex-col w-full">
          <div className="flex items-center" style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            <Link to={`/profile/${comment.author}`} className="action text-xs font-bold hidden lg:block">
              {`${comment.author}`}
            </Link>
            <span className="text-xs font-light ml-1">•</span>
            <span className="text-xs font-light ml-1">{formatElapsedTime(comment.elapsed)}</span>
          </div>

          {editingCommentId === comment.id ? (
            <CommentUpdate
              commentId={comment.id}
              content={comment.content}
              onSave={handleSaveEditedComment}
              onCancel={() => handleEditComment(null)}
            />
          ) : (
            <span className="font text-sm">{comment.content}</span>
          )}
          <div className="flex space-x-7 text-gray-700 my-[0.5rem]">
            <div
              className={cn(
                "action flex items-center rounded-full bg-blue-gray-50",
                voteType !== VOTE_TYPE.UNVOTE &&
                (voteType === VOTE_TYPE.UP ? "bg-red-400" : "bg-blue-400")
              )}
            >
              <div
                className="hover:bg-blue-gray-900/15 rounded-full p-[0.25rem] cursor-pointer"
                onClick={() => handleVote(VOTE_TYPE.UP)}
              >
                <ArrowBigUp
                  strokeWidth={1.2}
                  fill={voteType === VOTE_TYPE.UP ? "white" : "transparent"}
                  className={cn("w-6 h-6 hover:text-red-400", voteType === VOTE_TYPE.UP && "text-white")}
                />
              </div>
              <span className={cn("text-xs font-medium", voteType !== VOTE_TYPE.UNVOTE && "text-white")}>
                {voteCount}
              </span>
              <div
                className="hover:bg-blue-gray-900/15 rounded-full p-[0.25rem] cursor-pointer"
                onClick={() => handleVote(VOTE_TYPE.DOWN)}
              >
                <ArrowBigDown
                  strokeWidth={1.2}
                  fill={voteType === VOTE_TYPE.DOWN ? "white" : "transparent"}
                  className={cn("w-6 h-6 hover:text-blue-400", voteType === VOTE_TYPE.DOWN && "text-white")}
                />
              </div>
            </div>
            <div
              className="flex items-center px-3 py-1 rounded-full space-x-2 bg-blue-gray-30 hover:bg-blue-gray-100/75 cursor-pointer"
              onClick={() => handleReplyClick(comment.id)}
            >
              <MessageSquare strokeWidth={1.8} className="w-4 h-4" />
              <span className="text-xs">Reply</span>
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
          {replyToCommentId === comment.id && (
            <ReplyInput
              commentId={comment.id}
              onSubmit={handleCreateReply}
              onCancel={() => handleReplyClick(null)}
            />
          )}
          {comment.replies && comment.replies.length > 0 && (
            <>
              <button className="text-xs text-gray-500 flex items-center space-x-1" onClick={() => toggleExpand(comment.id)}>
                <div className="p-0.5 border rounded-full">
                  {expandedComments[comment.id] ? <Minus size={12} /> : <Plus size={12} />}
                </div>
                <span>
                  {expandedComments[comment.id] ? "" : `${comment.replies.length} replies`}
                </span>
              </button>
              {expandedComments[comment.id] && (
                <div className="ml-2 border-l-2">
                  {comment.replies.map(reply => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      level={level + 1}
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
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
