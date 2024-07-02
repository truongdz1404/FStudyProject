import PostService from "@/services/PostService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LIMIT_SCROLLING_PAGNATION_RESULT } from "@/helpers/constants";
import PostFilter from "@/components/post/PostFilter";
import React from "react";
import NullLayout from "@/components/layout/NullLayout";
import { Spinner } from "@material-tailwind/react";
import useSearchParam from "@/hooks/useSearchParam";
import RecentPost from "@/components/post/RecentPost";

const HomePage: React.FC = () => {
  const [filter, setFilter] = useSearchParam<string>({
    key: "filter",
    defaultValue: "New"
  });
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isPending, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`home-${filter}-query`],
      queryFn: async ({ pageParam = 1 }) => {
        try {
          const posts = await PostService.get(
            "filter",
            pageParam,
            LIMIT_SCROLLING_PAGNATION_RESULT,
            filter
          );
          return posts;
        } catch (e) {
          return [];
        }
      },
      getNextPageParam: (_, pages) => pages.length + 1,
      initialPageParam: 1
    });
  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const addRecentPost = (postId: number) => {
    PostService.addRecentPost(postId);
  };

  const posts = data?.pages.flatMap(p => p) ?? [];
  if (isPending) return <Spinner className="mx-auto" />;

  return (
    <ContentLayout pannel={<RecentPost />}>
      <div className="relative flex text-left z-20">
        <PostFilter setFilter={setFilter} filter={filter} />
      </div>
      {posts.length === 0 && <NullLayout />}
      {posts.map((post, index) => {
        return (
          <div key={index} className="w-full">
            <div
              onClick={() => addRecentPost(post.id)}
              className="hover:bg-gray-50 rounded-lg w-full"
            >
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
