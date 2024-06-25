import PostService from "@/services/PostService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LIMIT_SCROLLING_PAGNATION_RESULT } from "@/helpers/constants";
import React from "react";

const HomePage: React.FC = () => {
  const lastPostRef = React.useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  });
  const { data, fetchNextPage } = useInfiniteQuery({
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
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap(p => p) ?? [];

  if (!posts) return <></>;
  return (
    <ContentLayout>
      {posts?.map((post, index) => {
        return (
          <div key={index} ref={index === posts.length - 1 ? ref : undefined}>
            <div className="hover:bg-gray-50 rounded-lg z-10">
              <PostItem key={index} data={post} />
            </div>
            <hr className="my-1 border-blue-gray-50" />
          </div>
        );
      })}
    </ContentLayout>
  );
};
export default HomePage;
