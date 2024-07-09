import React from "react";
import SearchService from "@/services/SearchService";
import PostService from "@/services/PostService";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LIMIT_SCROLLING_PAGNATION_RESULT } from "@/helpers/constants";
import NotFoundSearch from "@/components/layout/NotFoundSearch";
import { Spinner } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import useSearchParam from "@/hooks/useSearchParam";
import CommentFilter from "@/components/comment/CommentFilter";
import SearchPost from "@/components/search/SearchPost";

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchCommentPage: React.FC = () => {
  const { ref, inView } = useInView();

  const queryParams = useQueryParams();
  const keyword = queryParams.get("keyword") ?? "";
  const [filter, setFilter] = useSearchParam<string>({
    key: "filter",
    defaultValue: "New"
  });

  const {
    data: comments,
    fetchNextPage,
    isPending,
    isFetching,
    refetch
  } = useInfiniteQuery({
    queryKey: [`search-comments-${filter}-query`, keyword],
    queryFn: async ({ pageParam = 1 }) => {
      if (!keyword) return { data: [], nextPage: undefined, hasMore: false };
      try {
        const comments = await SearchService.searchComments(
          keyword,
          pageParam,
          LIMIT_SCROLLING_PAGNATION_RESULT,
          filter
        );
        const posts = await Promise.all(
          comments.map(comment =>
            PostService.getById(comment.postId.toString())
          )
        );
        return {
          data: comments.map((comment, index) => ({
            comment: comment,
            post: posts[index]
          })),
          nextPage:
            comments.length === LIMIT_SCROLLING_PAGNATION_RESULT
              ? pageParam + 1
              : undefined,
          hasMore: comments.length === LIMIT_SCROLLING_PAGNATION_RESULT
        };
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.message === "Request failed with status code 404"
        ) {
          return { data: [], nextPage: undefined, hasMore: false };
        } else {
          throw error;
        }
      }
    },
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    enabled: !!keyword,
    initialPageParam: 1
  });

  const results = comments?.pages.flatMap(page => page.data) || [];

  React.useEffect(() => {
    if (inView && !isFetching) {
      fetchNextPage();
    }
  }, [inView, isFetching, fetchNextPage]);

  React.useEffect(() => {
    refetch();
  }, [keyword, refetch]);

  if (isPending) return <Spinner className="mx-auto" />;
  console.table(results);

  return (
    <>
      <div className="relative flex text-left z-20">
        <CommentFilter setFilter={setFilter} filter={filter} />
      </div>
      {results.length === 0 && !isPending && (
        <NotFoundSearch keyword={keyword} />
      )}
      {results.map(({ post, comment }, index) => (
        <div key={index} className="w-full ">
          <div className="hover:bg-gray-100 rounded-lg w-full py-3">
            {/* <SearchPost key={index} data={post} comment={comment} />. */}
          </div>
          <hr className="my-1 border-blue-gray-50" />
        </div>
      ))}
      <div ref={ref} className="text-center">
        {isFetching && <Spinner className="mx-auto" />}
      </div>
    </>
  );
};

export default SearchCommentPage;
