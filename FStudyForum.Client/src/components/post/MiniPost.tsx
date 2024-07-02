import { Post } from "@/types/post";
import { Link } from "react-router-dom";
interface MiniPostProps {
  data: Post;
}
const MiniPost: React.FC<MiniPostProps> = ({ data }) => {
  return (
    <>
      <div className="shadow-lg p-4 bg-blue-gray-100">
        <div className="flex-nowrap items-center">
          <Link
            to={`/profile/${data.author}`}
            className="action text-xs font-light hidden lg:block hover:underline"
          >{`u/${data.author}`}</Link>
          <Link
            className="text-base text-gray-800 line-clamp-2 lg:block hover:underline"
            to={`/topic/${data.topicName}/comments/${data.id}`}
          >
            {data.title}
          </Link>
          {/* image */}
        </div>
        <div className="text-xs text-gray-700">
          {data.voteCount} &middot; {data.commentCount}
        </div>
      </div>
      <hr className=" border-blue-gray-50" />
    </>
  );
};

export default MiniPost;
