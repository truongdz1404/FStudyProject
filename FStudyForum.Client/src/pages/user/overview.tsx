import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { LIMIT_SCROLLING_PAGNATION_RESULT } from "@/helpers/constants";
import { cn } from "@/helpers/utils";
import { useAuth } from "@/hooks/useAuth";
import useQueryParams from "@/hooks/useQueryParams";
import PostService from "@/services/PostService";
import { Spinner, Typography } from "@material-tailwind/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";

const Overview: React.FC = () => {
  const { user } = useAuth();
  const { ref, inView } = useInView();
  const filter = useQueryParams().get("filter") ?? "New";

  const { data, fetchNextPage, error, isPending, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        "POST_LIST",
        "IN_PROFILE",
        "BY_USER",
        { username: user?.username, filter }
      ],
      queryFn: async ({ pageParam = 1 }) => {
        try {
          const posts = await PostService.getPostsInUserProfile(
            user!.username,
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
      initialPageParam: 1,
      enabled: !!user
    });
  React.useEffect(() => {
    if (inView && !error) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, error]);
  if (!user || isPending) {
    return <Spinner className="mx-auto" />;
  }
  const posts = data?.pages.flatMap(p => p) ?? [];
  return (
    <ContentLayout>
      <div
        className={cn(
          "flex justify-center",
          (posts?.length ?? 0) > 0 && "hidden"
        )}
      >
        <Typography className="text-sm capitalize font-semibold">
          Hasn't posts yet
        </Typography>
      </div>

      <div>
        {posts?.map((post, index) => (
          <div key={index}>
            <div className="hover:bg-gray-50 rounded-lg w-full">
              <PostItem key={index} data={post} />
            </div>
            <hr className="my-1 border-blue-gray-50" />
          </div>
        ))}
      </div>
      <div ref={ref} className="text-center">
        {isFetchingNextPage && <Spinner className="mx-auto" />}
      </div>
    </ContentLayout>
  );
};
export default Overview;
