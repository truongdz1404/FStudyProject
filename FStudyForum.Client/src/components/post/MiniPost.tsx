import { Post } from "@/types/post";
import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Images } from "lucide-react";
import DefaultTopic from "@/assets/images/topic.png";
import ImageWithLoading from "../ui/ImageWithLoading";
import LightBox from "./LightBox";
import React from "react";

interface MiniPostProps {
  data: Post;
}
const MiniPost: React.FC<MiniPostProps> = ({ data }) => {
  const [open, setOpen] = React.useState(-1);

  const openLightBox = (index?: number) => {
    setOpen(index ?? 0);
  };

  return (
    <div className="flex p-2 border-b-2">
      <div className="flex flex-col gap-y-2 grow">
        <Link
          to={`/profile/${data.topicName}`}
          className="text-xs font-light hover:underline flex items-center gap-x-2"
        >
          <Avatar src={data.topicAvatar || DefaultTopic} className="w-6 h-6" />
          {`u/${data.topicName}`}
        </Link>
        <Link
          className="text-sm text-gray-800 hover:underline"
          to={`/topic/${data.topicName}/comments/${data.id}`}
        >
          {data.title}
        </Link>
        <div className="text-xs  font-light">
          {data.voteCount + " voting"} &middot;{" "}
          {data.commentCount +
            ` ${data.commentCount > 1 ? "comments" : "comment"} `}
        </div>
      </div>

      {data.attachments[0] && (
        <div
          className="flex shrink-0 ml-3 w-20 aspect-square overflow-hidden rounded-lg relative"
          onClick={() => openLightBox(0)}
        >
          <ImageWithLoading
            src={data.attachments[0].url}
            className="object-cover w-full h-full"
          />
          {data.attachments.length > 1 && (
            <div className="absolute bg-black/60 bottom-0 px-1 py-0.5 m-1 rounded-full text-white flex items-center gap-x-1">
              <Images className="w-3 h-3" />
              <span className="text-[0.6rem]">{data.attachments.length}</span>
            </div>
          )}
        </div>
      )}
      <LightBox
        index={open}
        hideArrow={data.attachments.length <= 1}
        sliders={data.attachments.map(file => ({ src: file.url }))}
        close={() => setOpen(-1)}
      />
    </div>
  );
};

export default MiniPost;
