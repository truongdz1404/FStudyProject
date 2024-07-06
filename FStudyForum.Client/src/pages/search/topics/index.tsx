import React from "react";
import SearchService from "@/services/SearchService";
import ContentLayout from "@/components/layout/ContentLayout";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LIMIT_SCROLLING_PAGNATION_RESULT } from "@/helpers/constants";
import NotFoundSearch from "@/components/layout/NotFoundSearch";
import { Spinner } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import SearchTabs from "@/components/search/SearchTabs";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchTopicPage: React.FC = () => {
  const { ref, inView } = useInView();
  const [hasMore, setHasMore] = React.useState(true);

  const query = useQuery();
  const keyword = query.get("keyword") ?? "";

  const { data, fetchNextPage, isPending, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`search-query-topic`, keyword],
      queryFn: async ({ pageParam = 1 }) => {
        try {
          const result = await SearchService.searchTopics(
            keyword || "",
            pageParam,
            LIMIT_SCROLLING_PAGNATION_RESULT
          );
          if (result.length < LIMIT_SCROLLING_PAGNATION_RESULT) {
            setHasMore(false);
          }
          return result;
        } catch (error) {
          if (
            error instanceof Error &&
            error.message === "Request failed with status code 404"
          ) {
            setHasMore(false);
            return [];
          } else {
            throw error;
          }
        }
      },
      getNextPageParam: (_, pages) => pages.length + 1,
      initialPageParam: 1
    });

  const topics = data?.pages.flatMap(page => page) ?? [];

  React.useEffect(() => {
    if (inView && hasMore) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasMore]);

  React.useEffect(() => {
    setHasMore(true);
    refetch();
  }, [keyword, refetch]);

  const uniqueTopics = Array.from(new Set(topics.map(t => t.id))).map(id =>
    topics.find(t => t.id === id)
  );

  if (isPending) return <Spinner className="mx-auto" />;

  return (
    <ContentLayout>
      <div className="relative flex text-left z-20 mt-3">
        <SearchTabs />
      </div>
      {uniqueTopics.length === 0 && <NotFoundSearch keyword={keyword} />}
      {uniqueTopics.map(topic => {
        if (!topic) return null;

        return (
          <Link to={`/topic/${topic.name}`} key={topic.id}>
            <div className="w-full flex flex-col item-center">
              <div className="hover:bg-gray-100 rounded-lg w-full py-6 flex items-center">
                <img
                  src={topic.avatar || "/src/assets/images/defaultTopic.png"}
                  alt={topic.name}
                  className="ml-3 w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold mb-1">{topic.name}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
              </div>
              <hr className="my-1 border-blue-gray-50 w-full" />
            </div>
          </Link>
        );
      })}
      <div ref={ref} className="text-center">
        {isFetchingNextPage ? (
          <Spinner className="mx-auto" />
        ) : (
          <span className="text-xs font-light">
            {uniqueTopics.length !== 0 && !isPending && "Nothing more"}
          </span>
        )}
      </div>
    </ContentLayout>
  );
};

export default SearchTopicPage;
