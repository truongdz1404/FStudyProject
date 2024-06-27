import PostService from "@/services/PostService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  LIMIT_SCROLLING_PAGNATION_RESULT,
  SessionStorageKey
} from "@/helpers/constants";
import PostFilter from "@/components/filter/PostFilter";
import React from "react";
import NullLayout from "@/components/layout/NullLayout";
import { Spinner } from "@material-tailwind/react";

const HomePage: React.FC = () => {
  const [filter, setFilter] = React.useState<string>("New");
  const { ref, inView } = useInView();

  React.useEffect(() => {
    const filter = sessionStorage.getItem(SessionStorageKey.SelectedFilter);
    if (filter) setFilter(filter);
    else setFilter("New");
  }, []);

  const { data, fetchNextPage, isPending, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`home-${filter}-query`],
      queryFn: async ({ pageParam = 1 }) => {
        return await PostService.get(
          "filter",
          pageParam,
          LIMIT_SCROLLING_PAGNATION_RESULT,
          filter
        );
      },
      getNextPageParam: (_, pages) => pages.length + 1,
      initialPageParam: 1
    });
  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const posts = data?.pages.flatMap(p => p) ?? [];
  if (isPending) return <Spinner className="mx-auto" />;

  return (
    <ContentLayout>
      <div className="relative flex text-left z-20">
        <PostFilter setFilter={setFilter} filter={filter} />
      </div>
      {posts.length === 0 && <NullLayout />}
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
          <span className="text-xs font-light">Nothing more</span>
        )}
      </div>
    </ContentLayout>
  );
};
export default HomePage;
