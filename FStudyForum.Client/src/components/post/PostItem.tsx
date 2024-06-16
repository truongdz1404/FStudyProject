import { FC } from "react";
import MenuItemPost from "./MenuItem";
import { ArrowBigDown, ArrowBigUp, MessageSquare, Share } from "lucide-react";
import { Post } from "@/types/post";
import { Avatar } from "@material-tailwind/react";

import Demo from "@/assets/images/user.png";
type PostProps = {
  data: Post;
};
const PostItem: FC<PostProps> = ({ data }) => {
  return (
    <div className="rounded-lg px-4 py-1 w-full hover:bg-gray-50">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar src={Demo} className="w-6 h-6" />
          <span className="text-xs">t/hoclaptrinhcungbac</span>
          <span className="text-xs font-light">•</span>
          <span className="text-xs font-light">1 day ago</span>
        </div>
        <MenuItemPost post={data} />
      </div>
      <div className="my-2 flex flex-col gap-y-2">
        <p className="font-semibold text-blue-gray-900">{data.title}</p>
        <p className="text-gray-700 text-sm">{data.content}</p>
      </div>
      <div className="flex space-x-4 text-gray-700">
        <div className="flex items-center rounded-full bg-blue-gray-50">
          <div className="hover:bg-blue-gray-100/75 rounded-full p-[0.25rem] cursor-pointer">
            <ArrowBigUp
              strokeWidth={1.2}
              className="w-6 h-6  hover:text-red-400"
            />
          </div>
          <span className="text-xs font-medium">1</span>
          <div className="hover:bg-blue-gray-100/75 rounded-full p-[0.25rem] cursor-pointer">
            <ArrowBigDown
              strokeWidth={1.2}
              className="w-6 h-6 hover:text-blue-400"
            />
          </div>
        </div>
        <div className="flex items-center px-3 py-1 rounded-full space-x-2 bg-blue-gray-50 hover:bg-blue-gray-100/75 cursor-pointer">
          <MessageSquare strokeWidth={1.8} className="w-4 h-4" />
          <span className="text-xs">1</span>
        </div>
        <div className="flex items-center space-x-2 px-3 rounded-full  bg-blue-gray-50 hover:bg-blue-gray-100/75 transition cursor-pointer">
          <Share className="w-4 h-4 text-gray-700" strokeWidth={1.8} />
          <span className="text-blue-gray-700 text-xs">Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
