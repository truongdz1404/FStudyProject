import React from "react";
import { Avatar, Spinner } from "@material-tailwind/react";
import { useRouterParam } from "@/hooks/useRouterParam";
import ContentLayout from "@/components/layout/ContentLayout";
import ImageWithLoading from "@/components/ui/ImageWithLoading";
import BannerDefault from "@/assets/images/banner.png";
import AvatarDefault from "@/assets/images/user.png";
import { Link } from "react-router-dom";
import { PencilLine } from "lucide-react";
import TopicDescription from "@/components/topic/TopicDescription";
import useSearchParam from "@/hooks/useSearchParam";
import PostFilter from "@/components/post/PostFilter";
const TopicDetail: React.FC = () => {
  const { topic } = useRouterParam();
  const [filter, setFilter] = useSearchParam<string>({
    key: "filter",
    defaultValue: "New"
  });
  if (!topic) {
    return <Spinner className="mx-auto" />;
  }

  return (
    <ContentLayout pannel={<TopicDescription />}>
      <div className="flex flex-col items-center w-full mb-16">
        <div className="relative w-full max-w-screen-lg">
          <div className="w-full rounded-lg h-28 overflow-hidden">
            <ImageWithLoading
              src={topic.banner || BannerDefault}
              className="object-cover w-full h-full "
            />
          </div>
          <div className="absolute -bottom-1/3 left-4">
            <Avatar
              variant="circular"
              size="xl"
              alt="avatar"
              className="bg-white  p-0.5"
              src={topic.avatar || AvatarDefault}
            />
          </div>

          <div className="absolute left-24 flex items-center gap-x-2">
            <p className="text-md font-semibold">{"t/" + topic.name}</p>
            <Link to="/settings/profile">
              <PencilLine className="w-4 h-4 text-blue-gray-600" />
            </Link>
          </div>
        </div>
      </div>
      <div className="py-4 border-b-2">
        <div className="relative flex text-left z-20 mx-2">
          <PostFilter setFilter={setFilter} filter={filter} />
        </div>
      </div>
      <div className="px-4"></div>
    </ContentLayout>
  );
};

export default TopicDetail;
