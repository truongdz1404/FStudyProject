import ContentLayout from "@/components/layout/ContentLayout";
import { useRouterParam } from "@/hooks/useRouterParam";
import DefaultFeed from "@/assets/images/feed.png";
import ImageWithLoading from "@/components/ui/ImageWithLoading";
import { Spinner } from "@material-tailwind/react";
import FeedDescription from "@/components/feed/FeedDescription";

const FeedPage = () => {
  const { feed, user } = useRouterParam();
  if (!feed || !user) return <Spinner className="mx-auto" />;
  return (
    <ContentLayout pannel={<FeedDescription />}>
      <div className="flex items-end text-blue-gray-800 pb-2 border-b">
        <ImageWithLoading src={DefaultFeed} className="w-16 h-16" />
        <div className="p-1">
          <h1>{feed?.name}</h1>
          <span className="text-sm font-light">
            Created by <strong>{user.username}</strong>
          </span>
        </div>
      </div>
    </ContentLayout>
  );
};

export default FeedPage;
