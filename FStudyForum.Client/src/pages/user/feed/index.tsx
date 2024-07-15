import ContentLayout from "@/components/layout/ContentLayout";
import { useRouterParam } from "@/hooks/useRouterParam";
import DefaultFeed from "@/assets/images/feed.png";
import { Spinner } from "@material-tailwind/react";
import FeedDescription from "@/components/feed/FeedDescription";
import MenuItemFeed from "@/components/feed/MenuItem";

const FeedPage = () => {
  const { feed, user } = useRouterParam();
  if (!feed || !user) return <Spinner className="mx-auto" />;
  return (
    <ContentLayout pannel={<FeedDescription />}>
      <div className="flex items-end text-blue-gray-800 pb-2 border-b relative">
        <img src={DefaultFeed} className="w-16 h-16" />
        <div className="p-1">
          <h1>{feed?.name}</h1>
          <span className="text-sm font-light">
            Created by <strong>{user.username}</strong>
          </span>
        </div>
        <div className="absolute right-0 bottom-0">
          <MenuItemFeed feed={feed} />
        </div>
      </div>
      {feed.topics.length == 0 ? (
        <div className="flex flex-col items-center mt-12 font-semibold gap-y-2">
          <p>This feed doesn't have any topics yet</p>
          <span className="font-light text-xs">
            Add some and get this feed started
          </span>
          {/* <button
            type="button"
            className="p-2 px-4 bg-blue-800 text-xs rounded-full text-white"
          >
            Add topics
          </button> */}
        </div>
      ) : (
        <></>
      )}
    </ContentLayout>
  );
};

export default FeedPage;
