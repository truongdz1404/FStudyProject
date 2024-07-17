import ContentLayout from "@/components/layout/ContentLayout";
import { useRouterParam } from "@/hooks/useRouterParam";
import DefaultFeed from "@/assets/images/feed.png";
import { Spinner } from "@material-tailwind/react";
import FeedDescription from "@/components/feed/FeedDescription";
import MenuItemFeed from "@/components/feed/MenuItem";
import PostService from "@/services/PostService";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LIMIT_SCROLLING_PAGNATION_RESULT } from "@/helpers/constants";
import React from "react";
import useSearchParam from "@/hooks/useSearchParam";
import PostItem from "@/components/post/PostItem";
import PostFilter from "@/components/post/PostFilter";

const FeedPage = () => {
  const { feed, user } = useRouterParam();
  const [filter, setFilter] = useSearchParam<string>({
    key: "filter",
    defaultValue: "New"
  });
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isPending, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        "POST_LIST",
        "FEED",
        feed?.name,
        { filter, topics: feed?.topics }
      ],
      queryFn: async ({ pageParam = 1 }) => {
        const test = await PostService.getPostsInFeed(
          pageParam,
          LIMIT_SCROLLING_PAGNATION_RESULT,
          filter,
          feed!.name
        );
        return test;
      },
      getNextPageParam: (last, pages) =>
        last.length ? pages.length + 1 : undefined,
      initialPageParam: 1,
      enabled: !!feed
    });

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (!feed || !user) return <Spinner className="mx-auto" />;
  const posts = data?.pages.flatMap(p => p) ?? [];

  return (
    <ContentLayout pannel={<FeedDescription />}>
      <div className="flex items-end text-blue-gray-800 relative">
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
        </div>
      ) : (
        <div className="mt-1">
          <div className="relative flex text-left z-20 border-b-2 pb-2 mx-2 mb-1">
            <PostFilter setFilter={setFilter} filter={filter} />
          </div>
          {posts.map((post, index) => {
            return (
              <div key={index} className="w-full">
                <div className="hover:bg-gray-50 rounded-lg w-full">
                  <PostItem key={index} data={post} />
                </div>
                <hr className="my-1 border-blue-gray-50" />
              </div>
            );
          })}
          <div ref={ref} className="text-center">
            {isFetchingNextPage ? (
              <Spinner className="mx-auto" />
            ) : (
              !isPending && (
                <span className="text-xs font-light">Nothing more</span>
              )
            )}
          </div>
        </div>
      )}
    </ContentLayout>
  );
};

export default FeedPage;
