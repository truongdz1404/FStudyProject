import { VOTE_TYPE } from "@/helpers/constants";
import { cn } from "@/helpers/utils";
import VoteService from "@/services/VoteService";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React from "react";
import { FC } from "react";

interface Props {
  postId: number;
  initType: number;
  initCount: number;
}

const PostVote: FC<Props> = ({ postId, initType, initCount }) => {
  const [vote, setVote] = React.useState(initType);
  const [count, setCount] = React.useState(initCount);

  React.useEffect(() => {
    setVote(initType);
    setCount(initCount);
  }, [initCount, initType]);

  const handleVote = async (type: number) => {
    const voteType = vote === type ? VOTE_TYPE.UNVOTE : type;
    setVote(voteType);
    setCount(initCount - initType + voteType);
    try {
      await VoteService.votePost(postId, voteType);
    } catch (error) {
      setVote(vote);
      setCount(count);
    }
  };
  return (
    <div
      className={cn(
        "action flex items-center rounded-full bg-blue-gray-50",
        vote !== VOTE_TYPE.UNVOTE &&
          (vote === VOTE_TYPE.UP ? "bg-red-400" : "bg-blue-400")
      )}
    >
      <div
        className="hover:bg-blue-gray-900/15 rounded-full p-[0.25rem] cursor-pointer"
        onClick={() => handleVote(VOTE_TYPE.UP)}
      >
        <ArrowBigUp
          strokeWidth={1.2}
          fill={
            vote !== VOTE_TYPE.UNVOTE && vote === VOTE_TYPE.UP
              ? "white"
              : "transparent"
          }
          className={cn(
            "w-6 h-6  hover:text-red-400",
            vote !== VOTE_TYPE.UNVOTE && "text-white hover:text-white"
          )}
        />
      </div>
      <span
        className={cn(
          "text-xs font-medium",
          vote !== VOTE_TYPE.UNVOTE && "text-white"
        )}
      >
        {count}
      </span>
      <div
        className="hover:bg-blue-gray-900/15  rounded-full p-[0.25rem] cursor-pointer"
        onClick={() => handleVote(VOTE_TYPE.DOWN)}
      >
        <ArrowBigDown
          strokeWidth={1.2}
          fill={
            vote !== VOTE_TYPE.UNVOTE && vote === VOTE_TYPE.DOWN
              ? "white"
              : "transparent"
          }
          className={cn(
            "w-6 h-6  hover:text-blue-400",
            vote !== VOTE_TYPE.UNVOTE && "text-white hover:text-white"
          )}
        />
      </div>
    </div>
  );
};

export default PostVote;
