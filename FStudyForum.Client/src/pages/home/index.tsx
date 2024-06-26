import PostService from "@/services/PostService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LIMIT_SCROLLING_PAGNATION_RESULT } from "@/helpers/constants";
import React from "react";
import { Spinner } from "@material-tailwind/react";

const HomePage: React.FC = () => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery({
      queryKey: ["home-infinite-query"],
      queryFn: async ({ pageParam = 1 }) => {
        const posts = await PostService.get(
          pageParam,
          LIMIT_SCROLLING_PAGNATION_RESULT
        );
        return posts;
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
      {posts?.map((post, index) => {
        return (
          <div key={index}>
            <div className="hover:bg-gray-50 rounded-lg z-10">
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
          <span className="text-sm font-light">Nothing more to load</span>
        )}
      </div>
    </ContentLayout>
  );
};
export default HomePage;
