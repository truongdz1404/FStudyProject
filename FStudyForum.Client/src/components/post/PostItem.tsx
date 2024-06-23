import { FC } from "react";
import MenuItemPost from "./MenuItem";
import { ArrowBigDown, ArrowBigUp, MessageSquare, Share } from "lucide-react";
import { Post } from "@/types/post";
import { Avatar } from "@material-tailwind/react";

import Demo from "@/assets/images/user.png";
import { cn, formatElapsedTime } from "@/helpers/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import EditorOutput from "./EditorOutput";
import FileContainer from "./FileContainer";
type PostProps = {
  data: Post;
  hideLess?: boolean;
};
const PostItem: FC<PostProps> = ({ data, hideLess = true }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const actionRefs = React.useRef<HTMLElement[]>([]);
  const navigate = useNavigate();
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
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

  const pRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      onClick={handleOutsideClick}
      className="px-4 py-1 w-full "
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Link
            to={`/topic/${data.topicName}`}
            className="action flex items-center gap-x-2 z-20"
          >
            <Avatar src={Demo} className="w-6 h-6" />
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
        <MenuItemPost />
      </div>
      <div className={cn("my-2 flex flex-col gap-y-2 w-full")} ref={pRef}>
        <p className="font-semibold text-blue-gray-900">{data.title}</p>
        <EditorOutput content={data.content} hide={hideLess} />

        <FileContainer files={data.attachments} />
      </div>
      <div className="flex space-x-4 text-gray-700">
        <div className="action flex items-center rounded-full bg-blue-gray-50">
          <div className="hover:bg-blue-gray-100/75 rounded-full p-[0.25rem] cursor-pointer">
            <ArrowBigUp
              strokeWidth={1.2}
              className="w-6 h-6  hover:text-red-400"
            />
          </div>
          <span className="text-xs font-medium">{data.voteCount}</span>
          <div className="hover:bg-blue-gray-100/75 rounded-full p-[0.25rem] cursor-pointer">
            <ArrowBigDown
              strokeWidth={1.2}
              className="w-6 h-6 hover:text-blue-400"
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
