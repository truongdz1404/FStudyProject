import { FC } from "react";
import MenuItemPost from "./MenuItem";
import { ArrowBigDown, ArrowBigUp, MessageSquare, Share } from "lucide-react";
import { Post } from "@/types/post";
import { Avatar } from "@material-tailwind/react";
import Default from "@/assets/images/defaultTopic.png";
import { cn, formatElapsedTime } from "@/helpers/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import EditorOutput from "./EditorOutput";
import FileContainer from "./FileContainer";
import { VOTE_TYPE } from "@/helpers/constants";
import VoteService from "@/services/VoteService";
type PostProps = {
  data: Post;
  hideLess?: boolean;
};
const PostItem: FC<PostProps> = ({ data, hideLess = true }) => {
  const [voteType, setVoteType] = React.useState(data.voteType);
  const [voteCount, setVoteCount] = React.useState(data.voteCount);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const actionRefs = React.useRef<HTMLElement[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setVoteType(data.voteType);
    setVoteCount(data.voteCount);
  }, [data]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hideLess || !containerRef.current) return;
    const actions = Array.from(
      containerRef.current.querySelectorAll(".action")
    ) as HTMLElement[];
    actionRefs.current = actions;

    if (
      containerRef.current &&
      containerRef.current.contains(event.target as Node) &&
      !actionRefs.current.some(action => action.contains(event.target as Node))
    ) {
      navigate(`/topic/${data.topicName}/comments/${data.id}`, {
        state: { data, from: pathname }
      });
    }
  };
  const handleVote = async (type: number) => {
    const realType = voteType === type ? VOTE_TYPE.UNVOTE : type;
    setVoteType(realType);
    setVoteCount(
      data.voteCount +
        (realType === VOTE_TYPE.UP ? 1 : realType === VOTE_TYPE.DOWN ? -1 : 0)
    );
    try {
      const count = await VoteService.votePost(data.id, realType);
      data.voteType = realType;
      data.voteCount = count;
      setVoteCount(count);
    } catch (error) {
      //Back to pre vote type and vote count
      data.voteType = voteType;
      data.voteCount = voteCount;
      setVoteType(voteType);
      setVoteCount(voteCount);
    }
  };

  const handleAttachmentClick = (attachmentId?: number) => {
    console.log(attachmentId);
  };

  const pRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      onClick={handleOutsideClick}
      className="py-1 px-4 w-full "
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Link
            to={`/topic/${data.topicName}`}
            className="action flex items-center gap-x-2 z-10"
          >
            <Avatar src={Default} className="w-6 h-6" />
            <span className="text-xs">{`t/${data.topicName}`}</span>
          </Link>
          <span className="text-xs font-light hidden lg:block">•</span>
          <Link
            to={`/profile/${data.author}`}
            className="action text-xs font-light hidden lg:block"
          >{`Posted by u/${data.author}`}</Link>
          <span className="text-xs font-light">•</span>
          <span className="text-xs font-light">
            {formatElapsedTime(data.elapsed)}
          </span>
        </div>
        <MenuItemPost post={data} />
      </div>
      <div className={cn("my-2 flex flex-col gap-y-2 w-full")} ref={pRef}>
        <p className="font-semibold text-blue-gray-900">{data.title}</p>
        <EditorOutput content={data.content} hide={hideLess} />

        <FileContainer
          onClick={handleAttachmentClick}
          files={data.attachments}
        />
      </div>
      <div className="flex space-x-4 text-gray-700">
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
              fill={
                voteType !== VOTE_TYPE.UNVOTE && voteType === VOTE_TYPE.UP
                  ? "white"
                  : "transparent"
              }
              className={cn(
                "w-6 h-6  hover:text-red-400",
                voteType !== VOTE_TYPE.UNVOTE && "text-white hover:text-white"
              )}
            />
          </div>
          <span
            className={cn(
              "text-xs font-medium",
              voteType !== VOTE_TYPE.UNVOTE && "text-white"
            )}
          >
            {voteCount}
          </span>
          <div
            className="hover:bg-blue-gray-900/15  rounded-full p-[0.25rem] cursor-pointer"
            onClick={() => handleVote(VOTE_TYPE.DOWN)}
          >
            <ArrowBigDown
              strokeWidth={1.2}
              fill={
                voteType !== VOTE_TYPE.UNVOTE && voteType === VOTE_TYPE.DOWN
                  ? "white"
                  : "transparent"
              }
              className={cn(
                "w-6 h-6  hover:text-blue-400",
                voteType !== VOTE_TYPE.UNVOTE && "text-white hover:text-white"
              )}
            />
          </div>
        </div>
        <div className="flex items-center px-3 py-1 rounded-full space-x-2 bg-blue-gray-50 hover:bg-blue-gray-100/75 cursor-pointer">
          <MessageSquare strokeWidth={1.8} className="w-4 h-4" />
          <span className="text-xs">{data.commentCount}</span>
        </div>
        <div className="action flex items-center space-x-2 px-3 rounded-full  bg-blue-gray-50 hover:bg-blue-gray-100/75 transition cursor-pointer">
          <Share className="w-4 h-4 text-gray-700" strokeWidth={1.8} />
          <span className="text-blue-gray-700 text-xs">Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
